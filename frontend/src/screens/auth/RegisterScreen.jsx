// screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  Image,
  Text,
  Pressable,
  Keyboard,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@react-native-firebase/auth";

import { storeColors } from "../../theme";
import "../../../global.css";
import { app, auth } from "../../../firebaseConfig";
import { backendURL } from "../../config";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleRegister = async () => {
    try {
      Keyboard.dismiss(); // Add this before auth calls

      console.log("Registering user...");

      console.log("Name: ", name);
      console.log("Phone: ", phone);
      console.log("Email: ", email);
      console.log("Password: ", password);

      console.log(`${backendURL}api/auth/register`);

      const res = await axios.post(`${backendURL}api/auth/register`, {
        name,
        phone,
        email,
        password,
        age,
        gender,
        profilePicture,
      });

      console.log("Response from server: ");
      console.log(res.status);

      if (res.status !== 201) {
        throw new Error("User already exist!");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Send verification email
      await userCredential.user.sendEmailVerification();

      Alert.alert("Registration Successful!");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      Alert.alert("Registration Failed", error.response.data.message);
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: storeColors.bg }}
    >
      {/* 
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/tourvia.png")}
            style={{ width: 200, height: 200, resizeMode: "stretch" }}
          />
        </View>
      </SafeAreaView> */}

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ backgroundColor: storeColors.bg }}
      >
        <Text
          className="text-gray-900 ml-4"
          style={{ fontSize: 40, fontWeight: "bold" }}
        >
          Sign Up
        </Text>
        <Text className="text-gray-700 ml-4">Create Your Account</Text>

        <Text className="text-gray-700 ml-4"></Text>

        <Text className="text-gray-700 ml-4">Name</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{ backgroundColor: storeColors.placeHolders }}
        />

        <Text className="text-gray-700 ml-4">Phone</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />

        <Text className="text-gray-700 ml-4">Age</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />

        <Text className="text-gray-700 ml-4">Gender</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />

        <Text className="text-gray-700 ml-4">Profile Picture</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Profile Picture"
          value={profilePicture}
          onChangeText={setProfilePicture}
        />

        <Text className="text-gray-700 ml-4">Email Address</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="text-gray-700 ml-4">Password</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffc5",
  },
  button: {
    backgroundColor: "#213638",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#3700b3",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default RegisterScreen;
