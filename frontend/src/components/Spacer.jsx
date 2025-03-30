import React from "react";
import { View } from "react-native";



const Spacer = ({ height = 20000, width = 0 }) => {
  return (    <View style={{ height, width }} />
  )
}

export default Spacer;