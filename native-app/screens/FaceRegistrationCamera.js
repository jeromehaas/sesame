import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { setCurrentImage } from '../store/actions/registrationActions';
import { useDispatch } from 'react-redux';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as cStyle from '../style';
import smile from '../assets/registration/1.png';
import sad from '../assets/registration/2.png';
import silly from '../assets/registration/3.png';

function FaceRegistrationCamera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const user = useSelector((state) => state.user);
  const emojis = [smile, sad, silly];

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Camera doesn't have permission</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        base64: true,
        quality: 0.25,
      });
      dispatch(setCurrentImage(data));
      navigation.navigate('FaceRegistrationProcess');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={emojis[user.images.length]} style={styles.emoji} />
      </View>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={Camera.Constants.Type.front}
        />
      </View>
      <Pressable
        style={styles.cameraClick}
        title="Take picture"
        onPress={() => takePicture()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cStyle.colors.lightest,
  },
  emoji: {
    width: 50,
    height: 50,
    margin: 30,
  },
  cameraContainer: {
    flex: 6,
    width: '90%',
    // marginTop: 40,
    marginBottom: 150,
    overflow: 'hidden',
    borderRadius: 15,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraClick: {
    width: 70,
    height: 70,
    bottom: 40,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: cStyle.colors.highlight,
    position: 'absolute',
  },
});

export default FaceRegistrationCamera;
