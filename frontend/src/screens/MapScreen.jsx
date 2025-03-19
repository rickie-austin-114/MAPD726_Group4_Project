import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route, navigation }) => {
  // Coordinates of the Eiffel Tower

  const attractionCoordinates = {
    latitude: 48.8584,
    longitude: 2.2945,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: attractionCoordinates.latitude,
          longitude: attractionCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={attractionCoordinates}
          title="Eiffel Tower"
          description="Iconic landmark in Paris"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
