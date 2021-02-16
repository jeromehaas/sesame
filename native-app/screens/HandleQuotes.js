import React from 'react';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import * as QuoteActions from './../store/actions/quotesActions';

import Quote from '../components/HandleQuotes/Quote';

import fileUri from './../fileSystemUri';

function HandleQuotes() {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes);
  const [newQuote, onChangeText] = React.useState('Useless Placeholder');

  const removeQuote = (id) => {
    dispatch(QuoteActions.removeQuote(fileUri, quotes, id));
  };

  const addQuote = () => {
    dispatch(QuoteActions.addQuote(fileUri, quotes, newQuote));
  };

  return (
    <ScrollView>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => onChangeText(text)}
        value={newQuote}
      />
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.registerBtn,
        ]}
        onPress={addQuote}
      >
        <Text>Add quote</Text>
      </Pressable>
      {quotes.length !== 0
        ? quotes.map((quote) => (
            <Quote key={quote.id} quote={quote} removeQuote={removeQuote} />
          ))
        : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default HandleQuotes;
