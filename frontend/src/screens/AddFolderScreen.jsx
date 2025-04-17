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


const AddFolderScreen = ({ navigation, route }) => {
  const [folderName, setFolderName] = useState("");
  
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




  const addFolder = async () => {
    try {
      const res = await axios.post(`${backendURL}folders`, { 
        userId: idGlobal,
        name: folderName
    } );

      console.log("Response from server: ");
      console.log(res.status);


      Alert.alert("Folder Created Successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert("Update Failed", error.response.data.message);
    }
  };


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
          Add Folder
        </Text>
        <Text className="text-gray-700 ml-4">Create A New Folder</Text>

        <Text className="text-gray-700 ml-4"></Text>

        <Text className="text-gray-700 ml-4">Name</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Name"
          value={folderName}
          onChangeText={setFolderName}
          style={{ backgroundColor: storeColors.placeHolders }}
        />


        <Pressable onPress={addFolder} style={styles.button}>
          <Text style={styles.text}>Add Folder</Text>
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

export default AddFolderScreen;
