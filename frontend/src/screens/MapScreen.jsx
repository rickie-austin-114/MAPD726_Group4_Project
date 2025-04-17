import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

import axios from "axios";


const MapScreen = ({ route, navigation }) => {

  const { tour } = route.params;

  // Initialize array of 5 coordinates (example: Paris landmarks)
  const [coordinates, setCoordinates] = useState([
    {
      id: 21342314234,
      name: "Eiffel Tower",
      description: "Iconic iron tower",
      latitude: 48.8584,
      longitude: 2.2945
    },
    {
      id: 43214351423,
      name: "Louvre Museum",
      description: "World's largest art museum",
      latitude: 48.8606,
      longitude: 2.3376
    },
    {
      id: 23432,
      name: "Notre-Dame Cathedral",
      description: "Medieval Catholic cathedral",
      latitude: 48.8530,
      longitude: 2.3499
    },
    {
      id: 2432,
      name: "Arc de Triomphe",
      description: "Triumphal arch",
      latitude: 48.8738,
      longitude: 2.2950
    },
    {
      id: 76534,
      name: "Montmartre",
      description: "Historic artists' district",
      latitude: 48.8867,
      longitude: 2.3431
    }
  ]);

  const fetchTourData = async () => {
    const res = await axios.get(`https://ninth-rhino-450106-u8.df.r.appspot.com/api/mappoints/${tour.name}`)
    console.log(res.data);

    for (let i = 0; i < res.data.length; i++) {
      res.data[i].id = i;;
    }

    setCoordinates(res.data);
  }

  useEffect(() => {
    fetchTourData();
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.2,  // Wider zoom to show all points
          longitudeDelta: 0.2
        }}
        showsUserLocation={false}

      >
        {/* Render markers for each point */}
        {coordinates.map((point) => (
          <Marker
            id={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude
            }}
            title={point.name}
            description={point.description}
          />
        ))}

        {/* Draw polyline connecting all points */}
        <Polyline
          coordinates={coordinates}
          strokeColor="#3498db"  // Blue line
          strokeWidth={4}
          lineDashPattern={[1]}  // Solid line (remove for dashed)
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