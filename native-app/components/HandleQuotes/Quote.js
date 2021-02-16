import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

function Quote({ quote, removeQuote }) {
  return (
    <View style={styles.quoteContainer}>
      <Text>{quote.text}</Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.registerBtn,
        ]}
        onPress={() => {
          removeQuote(quote.id);
        }}
      >
        <Text>Delete quote</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  quoteContainer: {
    borderWidth: 3,
    padding: 30,
  },
});

export default Quote;
