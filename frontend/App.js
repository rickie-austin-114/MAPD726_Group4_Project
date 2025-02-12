// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import "./global.css"

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="Main" component={MainScreen} />
        {/* <Stack.Screen name="ViewRecord" component={ViewRecordScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;