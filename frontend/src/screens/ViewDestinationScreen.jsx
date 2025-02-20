// screens/LoginScreen.js
import React, { useState } from "react";
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
} from "react-native";
import axios from "axios";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { storeColors } from "../theme";
import PaymentScreen from "./PaymentScreen";

const ViewDestinationScreen = ({ route, navigation }) => {
  const { patient } = route.params;

  const baseURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5001/"
      : "http://localhost:5001/";

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
            source={{ uri: patient.profilePicture }}
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
            {patient.name}
          </Text>

          <Text> </Text>

          <Text className="text-gray-700 ml-4">Rating: {patient.ratings}</Text>

          <Text> </Text>

          <Text className="text-gray-700 ml-4">Price: {patient.price}</Text>

          <Text> </Text>

          <Text className="text-gray-700 ml-4">{patient.description}</Text>
          <Text> </Text>



          <StripeProvider publishableKey="pk_test_51QuLVCPlUnLIZAQCnwrRbSpCJhgJZsH1PLPQEh9Jt9YUlJauxShMIQbxNKdKYmRkSP83OSsJeZQdsDwrK5IYwjvi00d0lp5KXm">
            <PaymentScreen amount={patient.price} />
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
});

export default ViewDestinationScreen;
