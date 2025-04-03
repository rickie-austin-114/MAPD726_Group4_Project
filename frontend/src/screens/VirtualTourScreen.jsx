import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const url = "http://ip-api.com/json"

const VirtualTourScreen = () => {

    const [city, setCity] = useState("");

    useEffect(() => {
        setCity("paris");
    })

    return (
        <View style={styles.container}>

            <WebView
                source={{ uri: `https://rickie-austin-114.github.io/models/${city}.html` }} // Replace with your URL
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

export default VirtualTourScreen;