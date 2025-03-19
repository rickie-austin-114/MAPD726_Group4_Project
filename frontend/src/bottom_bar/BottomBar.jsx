// src/screens/ListPatientsScreen.tsx
import React, { useEffect, useState } from "react";
import "../../global.css";

import MainScreen from '../screens/MainScreen';
import FoldersListScreen from "../screens/FoldersListScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatBotScreen from "../screens/ChatBotScreen";

const Tab = createBottomTabNavigator();

function BottomBar({ route, navigation }) {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="Favorite" component={FoldersListScreen} />
        <Tab.Screen name="ChatBot" component={ChatBotScreen} />
      </Tab.Navigator>
  );
}

export default BottomBar;