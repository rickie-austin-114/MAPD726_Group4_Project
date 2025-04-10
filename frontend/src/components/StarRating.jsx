import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const StarRating = ({ numberOfStars }) => {
  return (
    <View style={styles.starContainer}>
      {Array.from({ length: numberOfStars }, (_, index) => (
        <Icon key={index} name="star" size={20} color="gold" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    starContainer: {
      flexDirection: 'row',
    },
  });

  export default StarRating;