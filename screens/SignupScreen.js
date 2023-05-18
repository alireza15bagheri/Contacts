import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// although not used directly in the code initializes the firebase app and MUST BE IMPORTED:
import { firebaseApp } from "../util/Firebase";

const SignupScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async (emailTxt, passwordTxt) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailTxt,
        passwordTxt
      );
      // User has been created successfully
      console.log(`User has been created successfully: ${userCredential}`);
      props.navigation.goBack();
    } catch (error) {
      alert(`Error registering user: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 50,
          fontSize: 50,
          textAlign: "center",
        }}
      >
        Sign Up
      </Text>

      <View
        style={{
          marginTop: 50,
          marginHorizontal: 20,
          width: "75%",
        }}
      >
        <TextInput
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{ marginTop: 10 }}
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={{ marginTop: 10 }}
          label="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Button
          style={{ marginTop: 20 }}
          mode="contained"
          onPress={() => {
            if (
              email != "" &&
              password != "" &&
              confirmPassword != "" &&
              password == confirmPassword
            ) {
              registerUser(email, password);
            } else {
              alert("Provide Correct Details To Sign Up...");
            }
          }}
        >
          Sign Up Now
        </Button>

        <Button
          style={{ marginTop: 20 }}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          Already Have An Account? Sign In Now...
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

export default SignupScreen;
