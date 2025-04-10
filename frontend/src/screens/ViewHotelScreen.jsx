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
import {
  MapIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  TruckIcon,
} from "react-native-heroicons/solid";
import ShareButton from "../components/ShareButton";
import DatePicker from "react-native-date-picker";
import moment from "moment";


const ViewHotelScreen = ({ route, navigation }) => {
  const [folder, setFolder] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [daysBetween, setDaysBetween] = useState(0);

  const calculateDaysBetween = (start, end) => {
    const days = moment(end).diff(moment(start), "days");
    setDaysBetween(days);
    console.log(`Number of days between: ${days}`);
    console.log(moment(start).format("YYYY-MM-DD"));
    console.log(moment(end).format("YYYY-MM-DD"));
    return days;
  };

  const handleConfirmStartDate = (date) => {
    setStartDate(date);
    setOpenStartPicker(false);
    calculateDaysBetween(date, endDate);
  };

  const handleConfirmEndDate = (date) => {
    if (moment(date).isBefore(startDate)) {
      alert("End date cannot be before start date!");
      return;
    }
    setEndDate(date);
    setOpenEndPicker(false);
    calculateDaysBetween(startDate, date);
  };

  const { tour } = route.params;

  const viewAttractions = () => {
    navigation.navigate("ViewAttractions", { name: tour.name });
  };

  const viewTransportOption = () => {
    navigation.navigate("TransportOptions", { tour });
  };

  const viewMap = () => {
    console.log("Tour data before:", tour);

    navigation.navigate("Map", { tour });
  };

  const viewVirtualTour = () => {
    console.log("Tour data before:", tour);
    navigation.navigate("VirtualTour", { tour });
  };

  const fetchFolders = async () => {
    try {
      //if (activeCategory === "All") {
      const response = await axios.get(`${backendURL}folders`);
      setFolder(response.data);
      //}
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
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
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={{ uri: tour.image }}
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

          <ShareButton />

          <Text className="text-gray-700 ml-4">Rating: {tour.ratings}</Text>

          <Text> </Text>

          <Text className="text-gray-700 ml-4">Price: {tour.price}</Text>

          <Text> </Text>

          <Text className="text-gray-700 ml-4">{tour.description}</Text>

          <Text> </Text>

          <View style={styles.container}>
            {/* Start Date Picker */}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setOpenStartPicker(true)}
            >
              <Text style={styles.dateText}>
                Start Date: {moment(startDate).format("MMMM D, YYYY")}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openStartPicker}
              date={startDate}
              mode="date"
              onConfirm={handleConfirmStartDate}
              onCancel={() => setOpenStartPicker(false)}
              minimumDate={new Date(2000, 0, 1)}
              maximumDate={endDate}
            />

            {/* End Date Picker */}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setOpenEndPicker(true)}
            >
              <Text style={styles.dateText}>
                End Date: {moment(endDate).format("MMMM D, YYYY")}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openEndPicker}
              date={endDate}
              mode="date"
              onConfirm={handleConfirmEndDate}
              onCancel={() => setOpenEndPicker(false)}
              minimumDate={startDate}
              maximumDate={new Date(2030, 11, 31)}
            />

            {/* Results Display */}
            <Text style={styles.resultText}>
              Days between dates: {daysBetween}
            </Text>
          </View>

          <Text> </Text>

          <StripeProvider publishableKey="pk_test_51QuLVCPlUnLIZAQCnwrRbSpCJhgJZsH1PLPQEh9Jt9YUlJauxShMIQbxNKdKYmRkSP83OSsJeZQdsDwrK5IYwjvi00d0lp5KXm">
            <PaymentScreen name={tour.name} description={`Date: ${moment(startDate).format("MMMM D, YYYY")} - ${moment(endDate).format("MMMM D, YYYY")}`} image={tour.image} amount={tour.price * daysBetween} />
          </StripeProvider>

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
  dateButton: {
    padding: 15,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbdefb",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1976d2",
  },
  resultText: {
    marginTop: 25,
    fontSize: 18,
    textAlign: "center",
    color: "#2e7d32",
    fontWeight: "bold",
  },
});

export default ViewHotelScreen;
