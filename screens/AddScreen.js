import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { firebaseApp } from "../util/Firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddScreen = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const db = getFirestore();
  const { currentUser } = getAuth();

  const userID = currentUser?.uid;

  const handleSave = async () => {
    if (!name || !phone) {
      alert("Please provide proper information...");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "data", userID, "contacts"), {
        name,
        phone,
      });

      console.log(`Document written with ID: ${docRef.id}`);
      props.navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "85%" }}>
        <TextInput
          value={name}
          label="Name"
          onChangeText={setName}
          style={{ margin: 10 }}
        />
        <TextInput
          value={phone}
          label="Phone"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          style={{ margin: 10 }}
        />

        <Button mode="contained" onPress={handleSave} style={{ margin: 25 }}>
          Save
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

export default AddScreen;
