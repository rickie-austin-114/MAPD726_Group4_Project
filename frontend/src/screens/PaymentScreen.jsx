import React from 'react';
import { View, Text, Button,   Platform, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

function PaymentScreen(props) {
      const baseURL =
        Platform.OS === "android"
          ? "http://10.0.2.2:5001/"
          : "http://localhost:5001/";

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePayment = async () => {
    try {
      // Step 1: Fetch client secret from your backend
      const response = await fetch(`${baseURL}create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: props.amount }), // Amount in cents
      });
      const { clientSecret } = await response.json();

      // Step 2: Initialize the payment sheet
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      // Step 3: Present the payment sheet
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert('Error', paymentError.message);
      } else {
        Alert.alert('Success', 'Payment successful!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;