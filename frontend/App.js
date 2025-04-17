// App.tsx
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import ForgetPasswordScreen from "./src/screens/ForgetPasswordScreen";
import ResetPasswordScreen from "./src/screens/auth/ResetPasswordScreen";
import ViewDestinationScreen from "./src/screens/ViewDestinationScreen";
import ViewFolderScreen from "./src/screens/ViewFolderScreen";
import FoldersListScreen from "./src/screens/FoldersListScreen";
import BottomBar from "./src/components/BottomBar";
import MapScreen from "./src/screens/MapScreen";
import TransportOptionsScreen from "./src/screens/TransportOptionsScreen";

import { Alert, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";

import React, { useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import notifee, { AndroidImportance } from "@notifee/react-native";
import UsersListScreen from "./src/screens/UsersListScreen";
import VirtualTourScreen from "./src/screens/VirtualTourScreen";
import ViewUserScreen from "./src/screens/ViewUserScreen";
import ListAttractionsScreen from "./src/screens/ListAttractionsScreen";
import ViewAttractionScreen from "./src/screens/ViewAttractionScreen";
import ListHotelsScreen from "./src/screens/ListHotelsScreen";
import ViewHotelScreen from "./src/screens/ViewHotelScreen";
import ViewRestaurantScreen from "./src/screens/ViewRestaurantScreen";
import ListRestaurantsScreen from "./src/screens/ListRestaurantsScreen";
import { GlobalProvider } from "./GlobalContext";
import ViewTransportScreen from "./src/screens/ViewTransportScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import AddFolderScreen from "./src/screens/AddFolderScreen";

async function createNotificationChannel() {
  if (Platform.OS === "android") {
    await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
      sound: "default",
    });
    console.log("Notification channel created");
  }
}

// Handle foreground notifications
function handleForegroundNotification() {
  return messaging().onMessage(async (remoteMessage) => {
    Alert.alert("New Notification", remoteMessage.notification?.body);
  });
}

// Handle background/quit notifications
function handleBackgroundNotification() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });
}

const Stack = createNativeStackNavigator();

const App = () => {
  // Create a notification channel (Android only)
  const createNotificationChannel = async () => {
    if (Platform.OS === "android") {
      await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        importance: AndroidImportance.HIGH,
        sound: "default",
      });
      console.log("Notification channel created");
    }
  };

  // Request notification permissions (iOS only)
  const requestNotificationPermission = async () => {
    if (Platform.OS === "ios") {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus >= 1) {
        console.log("Notification permission granted");
      } else {
        console.log("Notification permission denied");
      }
    }
  };

  // Display a notification with the user's input text
  const showNotification = async () => {
    // Create the notification channel (Android only)
    await createNotificationChannel();

    // Request notification permissions (iOS only)
    await requestNotificationPermission();

    // Display the notification
    await notifee.displayNotification({
      title: "TourVia",
      body: "Welcome to TourVia",
      android: {
        channelId: "default",
        importance: AndroidImportance.HIGH,
      },
      ios: {
        sound: "default",
      },
    });

    console.log("Notification displayed");
  };

  useEffect(() => {
    showNotification();
  }, []);

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

          <Stack.Screen
            name="BottomBar"
            component={BottomBar}
            options={{ title: "" }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="VirtualTour" component={VirtualTourScreen} />


          <Stack.Screen
            name="TransportOptions"
            component={TransportOptionsScreen}
          />
          <Stack.Screen name="ViewTransport" component={ViewTransportScreen} />

          <Stack.Screen
            name="ViewDestination"
            component={ViewDestinationScreen}
          />
          <Stack.Screen
            name="ListAttractions"
            component={ListAttractionsScreen}
          />
          <Stack.Screen
            name="ViewAttraction"
            component={ViewAttractionScreen}
          />

          <Stack.Screen name="ListHotels" component={ListHotelsScreen} />

          <Stack.Screen name="ViewHotel" component={ViewHotelScreen} />
          
          <Stack.Screen name="AddFolder" component={AddFolderScreen} />



          <Stack.Screen
            name="ListRestaurants"
            component={ListRestaurantsScreen}
          />
          <Stack.Screen
            name="ViewRestaurants"
            component={ViewRestaurantScreen}
          />

          <Stack.Screen name="ViewUser" component={ViewUserScreen} />

          <Stack.Screen name="ViewFolder" component={ViewFolderScreen} />
          <Stack.Screen name="FoldersList" component={FoldersListScreen} />

          <Stack.Screen name="EditProfile" component={EditProfileScreen} />


          {/* <Stack.Screen name="ViewProfile" component={ViewProfileScreen} /> */}

          {/* <Stack.Screen name="ViewRecord" component={ViewRecordScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
