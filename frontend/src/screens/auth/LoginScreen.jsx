// screens/LoginScreen.js
import React, { useState, useEffect, useContext } from "react";
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
  TouchableOpacity,
  Keyboard,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "../../../GlobalContext";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "@react-native-firebase/auth";

import { storeColors } from "../../theme";
import "../../../global.css";
import { app, auth } from "../../../firebaseConfig";
import { backendURL } from '../../config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {         
    isAdminGlobal,
    setIsAdminGlobal,
    usernameGlobal,
    setUsernameGlobal,
    phoneGlobal,
    setPhoneGlobal,
    ageGlobal,
    setAgeGlobal,
    genderGlobal,
    setGenderGlobal,
    profilePictureGlobal,
    setProfilePictureGlobal,
    idGlobal,
    setIdGlobal } = useContext(GlobalContext);


  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId:
        "518815540074-n01vhhjpeacntd87utfrnuquaei4pmpq.apps.googleusercontent.com", // From Firebase Console
      offlineAccess: true,
    });
  }, []);

  const handleLogin = async () => {
    try {

      console.log("Logging in user...");
      await signInWithEmailAndPassword(auth, email, password);


      /*
      const response = await axios.post(`${baseURL}api/login`, {
        email,
        password,
      });*/
      Alert.alert("Login Successful!");


      const res2 = await axios.get(`${backendURL}api/users/email/${email}`);

      console.log(res2.data.isAdmin);

      setIsAdminGlobal(res2.data.isAdmin);
      setUsernameGlobal(res2.data.name);
      setPhoneGlobal(res2.data.phone);
      setAgeGlobal(res2.data.age);
      setGenderGlobal(res2.data.gender);
      setProfilePictureGlobal(res2.data.profilePicture);
      setIdGlobal(res2.data._id);
      // Store token and navigate to Account
      const token = "rickie"// response.data.token;
      // You might want to store the token using AsyncStorage for later use
      navigation.navigate("BottomBar", { token });
    } catch (error) {
      Alert.alert("Login Failed", error.response.data.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Step 1: Start the Google sign-in flow
      await GoogleSignin.hasPlayServices(); // Ensure that Google Play services are available
      const userInfo = await GoogleSignin.signIn(); // Perform Google Sign-In


      // Step 2: Get Google ID token and access token
      const idToken = userInfo.data.idToken;

      //console.log(idToken);

      console.log(userInfo);

      const user = userInfo.data.user;

      console.log(user);

      const email = user["email"]
      const name = user["name"];
      const profilePicture = user["photo"]




      const res = await axios.post(`${backendURL}api/users`, {
        name,
        email,
        profilePicture
      });


      if (idToken !== null) {
        console.log("User signed in successfully with Google!");

        const res2 = await axios.get(`${backendURL}api/users/email/${email}`);

        console.log(res2.data.isAdmin);

        setIsAdminGlobal(res2.data.isAdmin);
        setUsernameGlobal(res2.data.name);
        setPhoneGlobal(res2.data.phone);
        setAgeGlobal(res2.data.age);
        setGenderGlobal(res2.data.gender);
        setProfilePictureGlobal(res2.data.profilePicture);
        setIdGlobal(res2.data._id);



  
        Alert.alert("Login Successful!");
        const token = "google"// response.data.token;
        navigation.navigate("BottomBar", { token });
      } else {
        Alert.alert("Login Failed", error.response.data.message);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);

      Alert.alert("Error during Google sign-in:", error);
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

        <Text className="text-gray-700 ml-4">
          Enter your credentials to login
        </Text>
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

        <TouchableOpacity onPress={handleGoogleLogin}>
          <Image
            source={require("../../assets/google-signin-button-1024x260.png")} // Replace with your image URL
            style={styles.image}
          />
        </TouchableOpacity>
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
  image: {
    width: 200,  // Set your desired width
    height: 100, // Set your desired height
    resizeMode: 'contain',
},
});

export default LoginScreen;
