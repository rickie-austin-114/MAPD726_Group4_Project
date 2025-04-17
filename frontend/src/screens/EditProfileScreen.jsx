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
} from "react-native";
import axios from "axios";
import "../../global.css";
import { storeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "@react-native-firebase/auth";
import { useIsFocused } from "@react-navigation/native";

import { app, auth } from "../../firebaseConfig";
import { backendURL } from '../config.js';

import { GlobalContext } from "../../GlobalContext";


const EditProfileScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  
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

      setName(user.data.name)
      setPhone(user.data.phone)

      const ageString = user.data.age.toString();

      setAge(ageString);

      console.log(age)
      setGender(user.data.gender)
      setProfilePicture(user.data.profilePicture)


      } catch (error) {
      Alert.alert("Registration Failed", error.response.data.message);
    }
  };

  const updateProfile = async () => {
    try {
      const res = await axios.put(`${backendURL}api/users/${idGlobal}`, {
        name,
        phone,
        age,
        profilePicture,
        gender})
      console.log("Response from server: ");
      console.log(res.status);


      Alert.alert("Personal Information Updated Successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert("Update Failed", error.response.data.message);
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

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ backgroundColor: storeColors.bg }}
      >
        <Text
          className="text-gray-900 ml-4"
          style={{ fontSize: 40, fontWeight: "bold" }}
        >
          Edit
        </Text>
        <Text className="text-gray-700 ml-4">Change Your Profile</Text>

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



        <Pressable onPress={updateProfile} style={styles.button}>
          <Text style={styles.text}>Update Profile</Text>
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

export default EditProfileScreen;
