import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { StackActions } from '@react-navigation/native';
import congrats from '../assets/registration/congrats.png';

import * as cStyle from '../style';
import RedButton from '../components/UI/RedButton';

const FaceRegistrationSuccess = ({ navigation }) => {
  const registrationStatus = useSelector((state) => state.registrationStatus);
  const user = useSelector((state) => state.user);

  let content;
  if (registrationStatus.status === 'pending') {
    content = (
      <View style={styles.spinnerContainer}>
        <LottieView
          source={require('./../assets/animations/notspinner.json')}
          autoPlay
          loop
        />
      </View>
    );
  } else if (registrationStatus.status === 'success') {
    content = (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Congratulations{' '}
            <Text style={styles.messageHighlight}>{user.firstName}</Text>! Your
            face is now registered!
          </Text>
          <View style={styles.imageContainer}>
            <Image source={congrats} style={styles.image} />
          </View>
          <Text style={styles.entry}>This is your manual entry code:</Text>
          <Text style={styles.code}>{registrationStatus.doorKey}</Text>
        </View>
        <View style={styles.goHomeButtonContainer}>
          <RedButton
            text={'Done!'}
            clicked={() => navigation.dispatch(StackActions.popToTop())}
            size={'80%'}
          />
        </View>
      </View>
    );
  } else {
    content = (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>Something went wrong</Text>
        </View>
        <View style={styles.goHomeButtonContainer}>
          <Pressable
            style={styles.goHomeButton}
            onPress={() => navigation.dispatch(StackActions.popToTop())}
          >
            <Text style={styles.goHomeButtonText}>Ok</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return content;
};

export default FaceRegistrationSuccess;

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cStyle.colors.lightest,
  },
  container: {
    flex: 1,
    backgroundColor: cStyle.colors.lightest,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContainer: {
    justifyContent: 'space-between',
    flex: 4,
    ...cStyle.whiteCard,
    width: '80%',
    paddingTop: 15,
  },
  message: {
    fontFamily: cStyle.fonts.medium,
    lineHeight: 40,
    fontSize: 34,
    color: '#444',
    height: '35%',
    textAlign: 'center',
  },
  messageHighlight: {
    lineHeight: 45,
    marginTop: 70,
    flex: 3,
    color: cStyle.colors.highlight,
    fontFamily: cStyle.fonts.bold,
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    marginBottom: 30,
  },
  image: {
    resizeMode: 'contain',
    marginTop: 20,
    width: '100%',
    height: '90%',
  },
  entry: {
    fontSize: 16,
    color: cStyle.colors.fontColor,
  },
  code: {
    fontFamily: cStyle.fonts.bold,
    fontSize: 40,
    color: cStyle.colors.highlight,
  },
  goHomeButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
});
