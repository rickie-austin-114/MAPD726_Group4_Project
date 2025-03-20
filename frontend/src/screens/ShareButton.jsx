import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import Share from 'react-native-share';

const ShareButton = () => {
  const share = async () => {
    try {

      const shareOptions = {
        title: 'Share via',
        message: 'Check out this awesome trip to paris',
        url: 'https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Paris1.jpg',
      };
      
      const result = await Share.open(shareOptions);

      if (result.message) {
        Alert.alert('Success', 'Text shared to Facebook successfully!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Share" onPress={share} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShareButton;