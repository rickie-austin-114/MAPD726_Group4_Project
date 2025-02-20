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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="ViewDestination" component={ViewDestinationScreen} />

        <Stack.Screen name="ViewFolder" component={ViewFolderScreen} />
        <Stack.Screen name="FolderList" component={ViewFolderScreen} />


        {/* <Stack.Screen name="ViewRecord" component={ViewRecordScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;