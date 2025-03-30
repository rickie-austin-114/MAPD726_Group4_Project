import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const url = "http://ip-api.com/json"

const TransportOptionsScreen = () => {

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