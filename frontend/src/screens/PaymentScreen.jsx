import React from "react";
import { View, Text, Button, Platform, Alert, StyleSheet, Pressable } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";

import { backendURL } from '../config';


function PaymentScreen(props) {

  const name = props.name || "payment";
  const description = props.description || "thank you";
  const image = props.image || "https://rickie-austin-114.github.io/assets/air_canada.png";
  const amount = props.amount || 1000; // Default amount in cents

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePayment = async () => {
    try {
      // Step 1: Fetch client secret from your backend
      const response = await fetch(`${backendURL}api/payment/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: props.amount }), // Amount in cents
      });
      const { clientSecret } = await response.json();

      // Step 2: Initialize the payment sheet
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "TourVia - MAPD726 Group 4",
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      // Step 3: Present the payment sheet
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert("Error", paymentError.message);
      } else {
        Alert.alert("Success", "Payment successful!");
        axios.post(`${backendURL}api/orders`, {
          name: name,
          description: description, 
          image: image,
          price: amount,
        })
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={handlePayment} style={styles.button}>
        <Text style={styles.text}>Pay ${amount}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#213638",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width:200
  },
  buttonPressed: {
    backgroundColor: "#3700b3",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
export default PaymentScreen;
