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
import { ScrollView } from "react-native-gesture-handler";

const AddDestinationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("5 days");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const createDestination = async () => {
    try {
      const res = await axios.post(`${backendURL}api/tours`, {
        name,
        price,
        duration,
        description,
        profilePicture: image,
        category,
        latitude,
        longitude,
      });

      console.log(res.status);

      if (res.status !== 201) {
        throw new Error("Destination already exist!");
      } else {
        Alert.alert("Destination Created Successfully!");
      }
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


     <Text className="text-gray-700 ml-4"></Text>

          <Text className="text-gray-700 ml-4">Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={{ backgroundColor: storeColors.placeHolders }}
          />

          <Text className="text-gray-700 ml-4">Price</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            style={{ backgroundColor: storeColors.placeHolders }}
          />

          <Text className="text-gray-700 ml-4">Description</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={{ backgroundColor: storeColors.placeHolders }}
          />

          <Text className="text-gray-700 ml-4">Image</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Image"
            value={image}
            onChangeText={setImage}
            style={{ backgroundColor: storeColors.placeHolders }}
          />

          <Text className="text-gray-700 ml-4">Continent</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={{ backgroundColor: storeColors.placeHolders }}
          />

          <Pressable onPress={createDestination} style={styles.button}>
            <Text style={styles.text}>Create Destination</Text>
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

export default AddDestinationScreen;
