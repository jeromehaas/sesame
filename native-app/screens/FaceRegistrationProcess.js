import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  BackHandler,
  Dimensions,
} from 'react-native';
import { CommonActions, StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import smile from '../assets/registration/1.png';
import sad from '../assets/registration/2.png';
import silly from '../assets/registration/3.png';
import {
  addImage,
  registerCurrentUser,
} from '../store/actions/registrationActions';
import RedButton from '../components/UI/RedButton';
import * as cStyle from '../style';

function FaceRegistrationProcess({ navigation }) {
  const user = useSelector((state) => state.user);
  const currentImage = useSelector((state) => state.imageRegistration);
  const registrationStatus = useSelector((state) => state.registrationStatus);
  const emojis = [smile, sad, silly];
  const dispatch = useDispatch();

  const regStatus = useCallback(() => registrationStatus.status, [
    registrationStatus.status,
  ]);
  useEffect(() => {
    const handleBackButton = (e) => {
      Alert.alert(
        'Exit registration?',
        'If you leave, your images will not be saved. \n\nAre you sure you want to leave?',
        [
          {
            text: 'Continue registration',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => {
              navigation.dispatch(StackActions.pop(3));
            },
          },
        ],
      );
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [navigation, regStatus, dispatch]);

  const saveImageHandler = () => {
    if (user.images.length === 2) {
      dispatch(registerCurrentUser(user, currentImage));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Home' }, { name: 'FaceRegistrationSuccess' }],
        }),
      );
    } else {
      dispatch(addImage(currentImage));
    }
  };

  const pictureInstructions = [
    {
      title: 'Smile!',
      text: 'Imitate this face when you take your first picture',
    },
    {
      title: 'Think...',
      text:
        'Make sure to mimic this expression for better recognition accuracy!',
    },
    {
      title: 'Surprise!',
      text: "One more image, you're almost there!",
    },
  ];

  let options;
  if (!currentImage) {
    options = (
      <React.Fragment>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>
            {pictureInstructions[user.images.length].title}
          </Text>
          <Text style={styles.instructions}>
            {pictureInstructions[user.images.length].text}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <RedButton
            text={'Take picture'}
            clicked={() => navigation.navigate('FaceRegistrationCamera')}
            size={'80%'}
            icon={true}
            iconName={'camera'}
          />
        </View>
      </React.Fragment>
    );
  } else {
    options = (
      <React.Fragment>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>Does it match?</Text>
        </View>
        <View style={styles.optionsContainer}>
          <RedButton text={'Save'} clicked={saveImageHandler} size={'45%'} />
          <Text
            onPress={() => navigation.navigate('FaceRegistrationCamera')}
            style={styles.buttonTextDismiss}
          >
            ...or try again!
          </Text>
          {/* <Pressable
          style={styles.buttonTakePictureSecondDismiss}
          onPress={() => navigation.navigate('FaceRegistrationCamera')}
        >
          <Text style={styles.buttonTextDismiss}>Try again!</Text>
        </Pressable> */}
          {/* <Pressable
          style={styles.buttonTakePictureSecond}
          onPress={saveImageHandler}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable> */}
        </View>
      </React.Fragment>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Step {user.images.length + 1}</Text>
      </View>
      {currentImage ? (
        <View style={styles.imagesContainer}>
          <Image source={{ uri: currentImage.uri }} style={styles.image} />
          <View style={styles.emojiContainer1}>
            <Image source={emojis[user.images.length]} style={styles.emoji1} />
          </View>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <View style={styles.emojiContainer}>
            <Image source={emojis[user.images.length]} style={styles.emoji} />
          </View>
        </View>
      )}
      {/* <View
        style={currentImage ? styles.imagesContainer : styles.imageContainer}
      >
        <View style={styles.emojiContainer}>
          <Image source={emojis[user.images.length]} style={styles.emoji} />
        </View>
        {currentImage ? (
          <Image source={{ uri: currentImage.uri }} style={styles.image} />
        ) : null}
      </View> */}
      {options}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cStyle.colors.background,
    paddingBottom: 50,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    color: cStyle.colors.highlight,
    fontSize: 40,
    fontFamily: cStyle.fonts.black,
    backgroundColor: cStyle.colors.lightest,
    padding: 20,
    paddingHorizontal: 40,
    width: '100%',
    textAlign: 'center',
  },
  instructionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    // elevation: 1,
    // borderWidth: 2,
    borderColor: 'red',
    padding: 20,
  },
  instructionsTitle: {
    color: '#444',
    fontFamily: cStyle.fonts.bold,
    fontSize: 28,
    textAlign: 'center',
    marginTop: 15,
  },
  instructions: {
    color: '#444',
    fontFamily: cStyle.fonts.regular,
    fontSize: 22,
    textAlign: 'center',
    marginTop: 15,
  },
  imageContainer: {
    flex: 1,
    ...cStyle.whiteCard,
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingVertical: 20,
    // borderWidth: 2,
  },
  imagesContainer: {
    flex: 2,
    ...cStyle.whiteCard,
    height: Dimensions.get('window').width * 0.75,
    width: Dimensions.get('window').width * 0.75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // paddingBottom: 20,
    position: 'relative',
  },
  emojiContainer1: {
    height: Dimensions.get('window').width * 0.25,
    width: Dimensions.get('window').width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    top: -15,
    left: -15,
    padding: 15,
  },
  emojiContainer: {
    // borderWidth: 1,
    height: Dimensions.get('window').width * 0.5,
    width: Dimensions.get('window').width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#f5f5f5',
  },
  emoji1: {
    flex: 1,
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  emoji: {
    flex: 1,
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 500,
  },
  optionsContainer: {
    flex: 1,
    width: '100%',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTakePicture: {
    ...cStyle.redButton,
    width: '70%',
  },
  buttonTakePictureSecond: {
    ...cStyle.redButton,
    width: '40%',
    margin: 10,
    borderWidth: 2,
    borderColor: cStyle.colors.highlight,
  },
  buttonText: {
    ...cStyle.redButtonText,
    fontSize: 15,
    fontFamily: cStyle.fonts.medium,
  },
  buttonTextDismiss: {
    color: cStyle.colors.dismiss,
    fontFamily: cStyle.fonts.medium,
    fontSize: 15,
  },
});

export default FaceRegistrationProcess;
