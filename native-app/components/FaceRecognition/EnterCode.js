import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import RedButton from './../UI/RedButton';

import * as cStyle from './../../style';

function EnterCode({ _checkCode }) {
  const [code, setCode] = useState(null); //111118=Francesco, 532956=Matthieu
  return (
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Enter your door key</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(text) => setCode(text)}
          value={code}
          selectionColor={cStyle.colors.dismiss}
          maxLength={6}
        />
      </View>

      <View style={styles.enterCodeBtnContainer}>
        <RedButton
          size={200}
          clicked={() => {
            if (code !== null && code !== '') {
              _checkCode(code);
              setCode(null);
            } else {
              Alert.alert('Insert a valid code', 'The code must not be empty');
            }
          }}
          text={'Enter code'}
          marginBottom={0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  textContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  text: {
    fontSize: 30,
    fontFamily: cStyle.fonts.medium,
  },
  textInputContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInput: {
    marginBottom: 30,
    ...cStyle.codeInput,
    width: '80%',
    letterSpacing: 15,
  },
  enterCodeBtnContainer: {
    alignItems: 'center',
    flex: 10,
  },
  enterCodeBtn: {
    ...cStyle.redButton,
  },
  enterCodeBtnText: {
    ...cStyle.redButtonText,
    fontSize: 18,
  },
});

export default EnterCode;
