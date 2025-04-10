

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const TrasportOptionsScreen = () => {

  const [city, setCity] = useState("Toronto");
  const [country, setCountry] = useState("CA");

  useEffect(() => {

    axios.get("https://ipinfo.io/199.212.27.183?token=f310970223fa07")
      .then(response => {
        console.log(response.data);
        setCity(response.data.city);
        setCountry(response.data.country); 
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Text>Your City</Text>
      
    </View>
  );

}
export default TrasportOptionsScreen;