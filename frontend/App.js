// App.tsx
import "./global.css"
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ViewDestinationScreen from './src/screens/ViewDestinationScreen';
import ViewFolderScreen from "./src/screens/ViewFolderScreen";
import FoldersListScreen from "./src/screens/FoldersListScreen";
import ViewProfileScreen from "./src/screens/ViewProfileScreen";
import BottomBar from "./src/bottom_bar/BottomBar";
import MapScreen from "./src/screens/MapScreen";

import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

// Subscribe to a topic
function subscribeToTopic() {
    messaging()
        .subscribeToTopic('allDevices')
        .then(() => console.log('Subscribed to topic: allDevices'))
        .catch((err) => console.log('Failed to subscribe to topic:', err));
}

async function createNotificationChannel() {
  if (Platform.OS === 'android') {
      await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
          sound: 'default',
      });
      console.log('Notification channel created');
  }
}

// Handle foreground notifications
function handleForegroundNotification() {
    return messaging().onMessage(async (remoteMessage) => {
        Alert.alert('New Notification', remoteMessage.notification?.body);
    });
}

// Handle background/quit notifications
function handleBackgroundNotification() {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
    });
}

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    createNotificationChannel();
    subscribeToTopic(); // Subscribe to the topic
    const unsubscribeForeground = handleForegroundNotification();
    handleBackgroundNotification();

    return unsubscribeForeground; // Cleanup on unmount
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomBar">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        <Stack.Screen name="BottomBar" component={BottomBar} />
        <Stack.Screen name="Map" component={MapScreen} />


        <Stack.Screen name="ViewDestination" component={ViewDestinationScreen} />

        <Stack.Screen name="ViewFolder" component={ViewFolderScreen} />
        <Stack.Screen name="FoldersList" component={FoldersListScreen} />

        {/* <Stack.Screen name="ViewProfile" component={ViewProfileScreen} /> */}



        {/* <Stack.Screen name="ViewRecord" component={ViewRecordScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;