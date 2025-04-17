// src/screens/ListPatientsScreen.tsx
import React, { useEffect, useState, useContext } from "react";
import "../../global.css";

import MainScreen from "../screens/MainScreen";
import FoldersListScreen from "../screens/FoldersListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatBotScreen from "../screens/ChatBotScreen";
import UsersListScreen from "../screens/UsersListScreen";
import OrdersScreen from "../screens/main/OrdersScreen";
import ViewProfileScreen from "../screens/ViewProfileScreen.jsx";


import Icon from "react-native-vector-icons/Ionicons";


const Tab = createBottomTabNavigator();

import { GlobalContext } from "../../GlobalContext.jsx";
import AddDestinationScreen from "../screens/main/AddDestinationScreen.jsx";

function BottomBar({ route, navigation }) {
  const { isAdminGlobal } = useContext(GlobalContext);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />

{/*       
      <Tab.Screen
        name="Favorite"
        component={FoldersListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="star-outline" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="ChatBot"
        component={ChatBotScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubble-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-outline" color={color} size={size} />
          ),
        }}
      />

{/* <Tab.Screen
        name="Profile"
        component={ViewProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      /> */}

      {isAdminGlobal && (
        <>
          <Tab.Screen name="Users List" component={UsersListScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="menu" color={color} size={size} />
            ),
          }}
          />
          <Tab.Screen name="Add Destination" component={AddDestinationScreen}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="add" color={color} size={size} />
                      ),
                    }}
                     />
        </>
      )}
    </Tab.Navigator>
  );
}

export default BottomBar;
