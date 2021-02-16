import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as cStyle from '../style';
import { setCurrentUser } from '../store/actions/registrationActions';
import QRScanner from '../components/FaceRegistration/QRScanner';
import RedButton from '../components/UI/RedButton';

function RegistrationCode({ navigation }) {
  const [scanning, setScanning] = useState(false);
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState('');

  const inputCodeHandler = (e) => {
    const code = e.nativeEvent.text || userInput;
    dispatch(setCurrentUser(code));
    navigation.navigate('FaceRegistration');
    setScanning(false);
  };
  const readCodeHandler = (result) => {
    const code = result.data;
    dispatch(setCurrentUser(code));
    navigation.navigate('FaceRegistration');
    setScanning(false);
  };

  let content;
  if (scanning === true) {
    content = (
      <QRScanner scanning={scanning} readCodeHandler={readCodeHandler} />
    );
  } else if (scanning === false) {
    content = (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Registration</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.codeInputTitle}>
            Enter your personal code to start the registration process
          </Text>
          <TextInput
            style={styles.codeInput}
            autoCompleteType="off"
            keyboardType="number-pad"
            maxLength={5}
            onSubmitEditing={inputCodeHandler}
            onChangeText={(text) => setUserInput(text)}
            selectionColor={cStyle.colors.dismiss}
          />
          <RedButton
            text={'Send code'}
            clicked={inputCodeHandler}
            size={'80%'}
            icon={false}
            iconName={'nonee'}
          />
          <Text style={styles.codeInputText}>or</Text>
          <RedButton
            text={'Scan QR'}
            clicked={() => setScanning(true)}
            size={'80%'}
            icon={true}
            iconName={'qr'}
          />
        </View>
        <View style={styles.inputMissingContainer}>
          <Text style={styles.codeMissing}>
            Did not receive a registration code? Please check your span folder
            or contact your company.
          </Text>
        </View>
      </View>
    );
  } else {
    content = (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={cStyle.colors.highlight}
        />
      </View>
    );
  }
  return content;
}

export default RegistrationCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: cStyle.colors.lightest,
    paddingBottom: 30,
  },
  titleContainer: {
    ...cStyle.card,
    width: '80%',
    flex: 1,
  },
  title: {
    color: cStyle.colors.highlight,
    fontFamily: cStyle.fonts.medium,
    fontSize: 40,
    width: '80%',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 7,
    ...cStyle.card,
    width: '80%',
    justifyContent: 'space-evenly',
  },
  codeInputTitle: {
    color: '#444',
    textAlign: 'center',
    fontFamily: cStyle.fonts.regular,
    fontSize: 20,
  },
  codeInputText: {
    color: '#444',
    textAlign: 'center',
    fontFamily: cStyle.fonts.regular,
    fontSize: 20,
    marginBottom: 20,
  },
  codeInput: {
    ...cStyle.codeInput,
    width: '80%',
    letterSpacing: 15,
  },
  inputMissingContainer: {
    ...cStyle.card,
    width: '80%',
  },
  codeMissing: {
    color: cStyle.colors.fontColor,
    textAlign: 'center',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
