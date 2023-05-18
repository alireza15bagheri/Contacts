import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  getDocs,
  collection,
  getFirestore,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Button, FAB } from "react-native-paper";
import { firebaseApp } from "../util/Firebase";
import { getAuth, signOut } from "firebase/auth";
import LoadingComponent from "../components/LoadingComponent";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = (props) => {
  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const db = getFirestore(firebaseApp);

  // FETCH ALL CONTACTS
  const getAllContacts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "data", userID, "contacts")
    );

    const listOfContacts = [];

    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      // console.log(`${doc.id} => ${JSON.stringify(doc.data().name)}`);
      // console.log(`${doc.id} => ${JSON.stringify(doc.data().phone)}`);
      listOfContacts.push({
        id: doc.id,
        name: doc.data()?.name,
        phone: doc.data()?.phone,
      });
    });

    setContacts(listOfContacts);
    setIsLoaded(true);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User was logged out");
        props.navigation.replace("Login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button icon="logout" onPress={() => handleSignOut()}>
          <Text>Logout</Text>
        </Button>
      ),
    });
    getAllContacts();
    props.navigation.addListener("focus", () => {
      getAllContacts();
    });
  }, []);

  const handleUpdate = (id, name, phone) => {
    props.navigation.navigate("Update", {
      id,
      name,
      phone,
    });
  };

  if (isLoaded) {
    return (
      <View style={styles.container}>
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => {
            return (
              // Rendering Each Contact:
              <TouchableOpacity
                onPress={() => {
                  handleUpdate(item.id, item.name, item.phone);
                }}
              >
                <View
                  style={{
                    backgroundColor: "#dedede",
                    marginTop: 10,
                    marginHorizontal: 20,
                    padding: 20,
                    borderRadius: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{flex: 6}}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 18,
                        fontWeight: "bold",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        marginTop: 5,
                        fontWeight: "bold",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.phone}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row",
                    }}
                  >
                    {/* CALL BUTTON */}
                    <TouchableOpacity
                      style={{ marginEnd: 15 }}
                      onPress={() => {
                        Linking.openURL(`tel:${item.phone}`);
                      }}
                    >
                      <MaterialIcons name="call" size={40} color="#06d6a0" />
                    </TouchableOpacity>

                    {/* DELETE BUTTON */}
                    <TouchableOpacity
                      onPress={async () => {
                        try {
                          const db = getFirestore(firebaseApp);

                          await deleteDoc(
                            doc(
                              collection(db, "data", userID, "contacts"),
                              item.id
                            )
                          );
                          console.log("Document successfully deleted!");
                          getAllContacts();
                        } catch (error) {
                          console.error("Error deleting document: ", error);
                        }
                      }}
                    >
                      <MaterialIcons name="delete" size={40} color="#e63946" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <FAB
          icon="account-plus"
          style={styles.fab}
          onPress={() => {
            props.navigation.navigate("Add");
          }}
          color="blue"
        />
      </View>
    );
  } else {
    return <LoadingComponent />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 20,
  },
});

export default HomeScreen;
