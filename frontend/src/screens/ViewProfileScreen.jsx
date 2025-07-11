// screens/RegisterScreen.js
import React, { useEffect, useState, useContext } from "react";
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
  ScrollView
} from "react-native";
import axios from "axios";
import "../../global.css";
import { storeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "@react-native-firebase/auth";
import { backendURL } from '../config';
import { GlobalContext } from "../../GlobalContext";

import { useIsFocused } from "@react-navigation/native";

import { app, auth } from "../../firebaseConfig";

const ViewProfileScreen = ({ navigation, route }) => {

  const [userInfo, setUserInfo] = useState({});

  const isFocused = useIsFocused();
  
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


  const fetchUserInformation = async () => {
    try {
      const user = await axios.get(`${backendURL}api/users/${idGlobal}`); //67b73ee28885fbfe362254a1

      console.log(user);
      console.log(user.data)

      setUserInfo(user.data);

      } catch (error) {
      Alert.alert("Registration Failed", error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserInformation()
  }, [isFocused])

  return (
    <View
    className="flex-1 bg-white"
    style={{ backgroundColor: storeColors.bg }}
  >
    <SafeAreaView className="flex">
      <View className="flex-row justify-center">
        <Image
          source={{ uri: userInfo.profilePicture }}
          style={{ width: 300, height: 300, resizeMode: "stretch" }}
        />
      </View>
    </SafeAreaView>
    <View
      className="flex-1 bg-white px-8 pt-8"
      style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
    >
      <ScrollView>
        <Text
          className="text-gray-900 ml-4"
          style={{ fontSize: 40, fontWeight: "bold" }}
        >
          {userInfo.name}
        </Text>

        <Text> </Text>

        <Text className="text-gray-700 ml-4">Email: {userInfo.email}</Text>

        <Text> </Text>

        <Text className="text-gray-700 ml-4">Age: {userInfo.age}</Text>

        <Text> </Text>

        <Text className="text-gray-700 ml-4">Gender: {userInfo.gender}</Text>
        <Text> </Text>

        <Text className="text-gray-700 ml-4">Phone: {userInfo.phone}</Text>
        <Text> </Text>

        <Button onPress={() => navigation.navigate("EditProfile")} title="Edit Profile" />



        <Text> </Text>

        <Text> </Text>
      </ScrollView>
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

export default ViewProfileScreen;
