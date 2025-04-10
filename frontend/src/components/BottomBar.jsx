// src/screens/ListPatientsScreen.tsx
import React, { useEffect, useState, useContext } from "react";
import "../../global.css";

import MainScreen from '../screens/MainScreen';
import FoldersListScreen from "../screens/FoldersListScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatBotScreen from "../screens/ChatBotScreen";
import UsersListScreen from "../screens/UsersListScreen";
import OrdersScreen from "../screens/main/OrdersScreen";

const Tab = createBottomTabNavigator();

import { GlobalContext } from "../../GlobalContext.jsx";
import AddDestinationScreen from "../screens/main/AddDestinationScreen.jsx";



function BottomBar({ route, navigation }) {

  const { isAdmin } = useContext(GlobalContext);

  return (
      <Tab.Navigator>
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="Favorite" component={FoldersListScreen} />
        <Tab.Screen name="ChatBot" component={ChatBotScreen} />


        
        <Tab.Screen name="Orders" component={OrdersScreen} />

        {isAdmin && (
          <>
          <Tab.Screen name="Users List" component={UsersListScreen} />
          <Tab.Screen name="Add Destination" component={AddDestinationScreen} />
          </>
        )}

      </Tab.Navigator>
  );
}

export default BottomBar;