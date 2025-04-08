import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Spacer from "../components/Spacer";




const TransportOptionsScreen = ({routes, navigation}) => {

    

    const url = "http://ip-api.com/json"

    


    const [city, setCity] = useState("");

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCity(data.city);
            });
    })

    return (
        <View style={styles.container}>
            <Spacer size={20} />

            <Text>Your location is: {city}</Text>
            <WebView
                source={{ uri: 'https://www.rome2rio.com/map/Toronto/Paris' }} // Replace with your URL
                style={styles.webview}
            />
        </View>
    );

    function haversineDistance(lat1, lon1, lat2, lon2) {
        const toRad = (value) => (value * Math.PI) / 180;
      
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
      
        return distance;
      }
      

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default TransportOptionsScreen;