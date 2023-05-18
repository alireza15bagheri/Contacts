import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { firebaseApp } from "../util/Firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { ToastAndroid } from "react-native";

const UpdateScreen = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");

  const auth = getAuth();
  const userID = auth.currentUser.uid;

  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const id = props.route.params.id;
    const name = props.route.params.name;
    const phone = props.route.params.phone;

    setId(id);
    setName(name);
    setPhone(phone);
  }, [UpdateScreen]);

  return (
    <View style={styles.container}>
      <View style={{ width: "85%" }}>
        <TextInput
          value={name}
          label="Name"
          onChangeText={(text) => setName(text)}
          style={{ margin: 10 }}
        />
        <TextInput
          value={phone}
          label="Phone"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhone(text)}
          style={{ margin: 10 }}
        />
        <Button
          mode="contained"
          onPress={async () => {
            const docRef = doc(collection(db, "data", userID, "contacts"), id);
            await updateDoc(docRef, {
              name: name,
              phone: phone,
            }).then(() => {
                ToastAndroid.show("Contact Updated", ToastAndroid.SHORT);
                props.navigation.goBack();
            });
          }}
          style={{ margin: 25 }}
        >
          Update
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});

export default UpdateScreen;
