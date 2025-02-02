import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const App = () => {
  const [age, setAge] = useState('');
  const [budget, setBudget] = useState('');
  const [travelTime, setTravelTime] = useState('');

  const handleSubmit = () => {
    alert(`Age: ${age}, Budget: ${budget}, Travel Time: ${travelTime}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Information</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your budget"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter travel time (days)"
        keyboardType="numeric"
        value={travelTime}
        onChangeText={setTravelTime}
      />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default App;