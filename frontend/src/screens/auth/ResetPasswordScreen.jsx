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
import { storeColors } from "../../theme";
import "../../../global.css";
import { app, auth } from "../../../firebaseConfig";
import { backendURL } from '../../config';



const ResetPasswordScreen = ({ route, navigation}) => {

  const { email } = route.params;

  //const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   useEffect(() => {
//     setEmail(userEmail);
// }, [])



  const handleRegister = async () => {
    try {

      

      await axios.put(`${backendURL}api/auth/forgetPassword`, {
        email,
        password,
      });
      Alert.alert("Password Reset Successful!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Password Reset Failed", error.response.data.message);
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
        <Text
          className="text-gray-900 ml-4"
          style={{ fontSize: 40, fontWeight: "bold" }}
        >
        Reset password
        </Text>
        <Text className="text-gray-700 ml-4">
            Enter your new password
        </Text>

        <Text className="text-gray-700 ml-4">

        </Text>


        {/* <Text className="text-gray-700 ml-4">Email Address</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        /> */}

        <Text className="text-gray-700 ml-4">Password</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={{ backgroundColor: storeColors.placeHolders }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={styles.text}>Reset Password</Text>
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

export default ResetPasswordScreen;
