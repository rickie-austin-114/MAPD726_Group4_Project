// screens/LoginScreen.js
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
import { SafeAreaView } from "react-native-safe-area-context";
import { storeColors } from "../theme";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5001/"
      : "http://localhost:5001/";

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}api/login`, {
        email,
        password,
      });
      Alert.alert("Login Successful!");
      // Store token and navigate to Account
      const token = response.data.token;
      // You might want to store the token using AsyncStorage for later use
      navigation.navigate("Main", { token });
    } catch (error) {
      Alert.alert("Login Failed", error.response.data.message);
    }
  };

  const handleRegister = async () => {
    try {
      // You might want to store the token using AsyncStorage for later use
      navigation.navigate("Register");
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    }
  };


  const handleForgetPassword = async () => {
    try {
      // You might want to store the token using AsyncStorage for later use
      navigation.navigate("ForgetPassword");
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    }
  };

  return (
    // <View style={styles.container}>
    //   <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
    //   <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
    //   <Button title="Login" onPress={handleLogin} />
    //   <Button title="Register" onPress={handleRegister} />

    // </View>

    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: storeColors.bg }}
    >
      {/* <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/tourvia.png")}
            style={{ width: 300, height: 300, resizeMode: "stretch" }}
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
          Welcome Back
        </Text>
        <Text> </Text>

        <Text className="text-gray-700 ml-4">Enter your credentials to login</Text>
        <Text> </Text>


        <Text className="text-gray-700 ml-4">Email Address</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          value={email}
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <Text className="text-gray-700 ml-4">Password</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
        <Text> </Text>
        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
        <Text> </Text>

        <Pressable onPress={handleForgetPassword} style={styles.button}>
          <Text style={styles.text}>Forget Password</Text>
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

export default LoginScreen;
