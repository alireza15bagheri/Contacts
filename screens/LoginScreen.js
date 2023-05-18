import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput, FAB } from "react-native-paper";
import { firebaseApp } from "../util/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;

    // if user is signed in:
    if (user != null) {
      props.navigation.replace("Home");
    }
  }, []);

  // Login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      props.navigation.replace("Home");
      console.log("login successful", userCredential.user.uid); // successful login
    } catch (error) {
      console.log(error.code, error.message); // failed login
      alert(error.code, error.message); // failed login
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
        Sign In
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
        <Button
          style={{ marginTop: 20 }}
          mode="contained"
          onPress={() => {
            if (email != "" && password != "") {
              handleLogin();
            } else {
              alert("Please Provide Proper Information.");
            }
          }}
        >
          Login Now
        </Button>

        <Button
          style={{ marginTop: 20 }}
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          New User? Signup Now...
        </Button>
      </View>

      <FAB
        icon="information"
        style={styles.fab}
        onPress={() => {
          alert('Developed and designed by Alireza Bagheri.')
        }}
        color="blue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  fab: {
    position: "absolute",
    left: 0,
    bottom: 0,
    margin: 20,
  },
});

export default LoginScreen;
