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

const Stack = createNativeStackNavigator();

const App = () => {
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