import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView } from 'react-native';

const ChatBotScreen = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);

  const fetchAnswer = async () => {

    console.log('Fetching answer for question:', question);

    if (!question) return;


    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDHi3yBhI2PE-87iMdV2ZhNNXMpkVvk5K0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "contents": [{
            "parts":[{"text": question}]
            }]
           }),
      });

      const data = await response.json();
      const ans = data.candidates[0].content.parts[0].text;
      console.log('Answer:', ans);
      setAnswer(ans);
      setHistory([...history, { question, answer: ans }]);
      setQuestion('');
    } catch (error) {
      console.error('Error fetching answer:', error);
      setAnswer('Error retrieving answer.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.historyContainer}>
        {history.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.question}>Q: {item.question}</Text>
            <Text style={styles.answer}>A: {item.answer}</Text>
          </View>
        ))}

        {/* {answer && <Text style={styles.answerText}>Answer: {answer}</Text>} */}


      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Type your question..."
        value={question}
        onChangeText={setQuestion}
      />
      <Button title="Ask" onPress={fetchAnswer} />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  historyContainer: {
    flex: 1,
    marginBottom: 20,
    height: 500,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  historyItem: {
    marginBottom: 10,
  },
  question: {
    fontWeight: 'bold',
  },
  answer: {
    fontStyle: 'italic',
  },
  answerText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default ChatBotScreen;