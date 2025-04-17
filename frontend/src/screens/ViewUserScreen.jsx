// screens/LoginScreen.js
import React, { useEffect, useState } from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
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
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { storeColors } from "../theme";
import PaymentScreen from "./PaymentScreen";
import { backendURL } from "../config";
import { MapIcon, InformationCircleIcon, MagnifyingGlassIcon, TruckIcon } from "react-native-heroicons/solid";
import ShareButton from "../components/ShareButton";

const ViewUserScreen = ({ route, navigation }) => {
  const [folder, setFolder] = useState([]);
  const [comments, setComments] = useState([]);

  const [userComment, setUserComment] = useState("");

  const { tour } = route.params;

  const fetchComments = async () => {
    try {
      const url = `${backendURL}api/comments/${tour._id}`;
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const addComments = async () => {
    try {
      const url = `${backendURL}api/comments`;
      const data = {
        content: userComment,
        author: "Rickie",
        tour: tour._id,
        // Add more key-value pairs as needed
      };
      const response = await axios.post(url, data);

      await fetchComments();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const viewMap = (tour) => {
    navigation.navigate("Map", { tour });
  };

  const viewTransportOption = (tour) => {
    navigation.navigate("TransportOptions", { tour });
  };

  const viewVirtualTour = (tour) => {
    navigation.navigate("VirtualTour", { tour });
  };


  const fetchFolders = async () => {
    try {
      const response = await axios.get(`${backendURL}folders`);
      setFolder(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (


    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: storeColors.bg }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={{ uri: tour.profilePicture }}
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
            {tour.name}
          </Text>

          <Text> </Text>


          <Text> </Text>


          <Text className="text-gray-700 ml-4">Name: {tour.name}</Text>

          <Text> </Text>

          <Text className="text-gray-700 ml-4">Age: {tour.age}</Text>

          <Text> </Text>

          <Text className="text-gray-700 ml-4">Email {tour.email}</Text>

          <Text> </Text>



          <Text> </Text>

          <Text> </Text>


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
  buttonPressed: {
    opacity: 0.7, // Change opacity when pressed
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
  },
  pressable: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  commentContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  author: {
    fontWeight: "bold",
  },
  content: {
    marginTop: 5,
  },
});

export default ViewUserScreen;
