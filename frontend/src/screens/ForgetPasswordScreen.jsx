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
} from "react-native";
import axios from "axios";
import "../../global.css";
import { storeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { backendURL } from '../config';


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "@react-native-firebase/auth";

import { app, auth } from "../../firebaseConfig";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");


  const handleRegister = async () => {
    try {


        /*
      await axios.put(`${baseURL}api/forgetPassword`, {
        email,
        password,
      });*/

      sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset Successful!");
      navigation.navigate("Login");


    } catch (error) {
      Alert.alert("Password Reset Failed", error.response.data.message);
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
Forget password
        </Text>
        <Text className="text-gray-700 ml-4">
            Create a new password
        </Text>

        <Text className="text-gray-700 ml-4">

        </Text>


        <Text className="text-gray-700 ml-4">Email Address</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />


        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={styles.text}>Reset Password</Text>
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

export default ForgetPasswordScreen;
