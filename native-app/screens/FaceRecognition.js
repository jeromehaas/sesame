import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

import base64ToArrayBuffer from 'base64-arraybuffer'; // for converting base64 images to array buffer
import * as AzureAPI from './../services/azureAPI';
import { checkUserFace, checkUserCode } from './../services/userAPI';

import TextMessage from './../components/FaceRecognition/TextMessage';
import EnterCode from './../components/FaceRecognition/EnterCode';

import * as cStyle from './../style';
import { useSelector } from 'react-redux';
import Recognize from '../components/FaceRecognition/Recognize';

function FaceRecognition() {
  // LOCAL STATE
  const [eUserRecState] = useState({
    TAKE_SELFIE: 1,
    TAKING_PICTURE: 2,
    ENTER_CODE: 3,
    CHECKING_USER: 4,
    ALLOWED: 5,
    NOT_ALLOWED: 6,
    NO_USER_FOUND: 7,
  });

  // GLOBAL STATE
  const selectedDoor = useSelector((state) => state.selectedDoor);

  const [hasPermission, setHasPermission] = useState(null);
  const [userRecState, setUserRecState] = useState(eUserRecState.TAKE_SELFIE);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [userName, setUserName] = useState('');

  // CAMERA REF
  const cam = useRef();

  // HOOKS
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // HELPER FUNCTIONS
  /**
   * Callback called when a face is detected, it updates the local state.
   *
   * @param {array} faces, array containing all the faces detected by the camera.
   */
  const _handleFacesDetected = ({ faces }) => {
    setDetectedFaces(faces);
  };

  /**
   * Callback called when a picture is taken.
   */
  const _takePicture = async () => {
    setUserRecState(eUserRecState.TAKING_PICTURE);
    const option = {
      quality: 0.25,
      base64: true,
    };
    try {
      const picture = await cam.current.takePictureAsync(option);
      setUserRecState(eUserRecState.CHECKING_USER);
      _checkPicture(picture);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  /**
   * Check if the code the user inserted is a valid code for opening the selected door.
   *
   * @param {number} code, code the user has input for opening the door.
   */
  const _checkCode = async (code) => {
    setUserRecState(eUserRecState.CHECKING_USER);
    const res = await checkUserCode(selectedDoor.did, code);
    _checkResponse(res);
  };

  /**
   * Check if a picture contains a face calling the Azure API.
   *
   * @param {object} picture, picture taken with the camera.
   */
  const _checkPicture = async (picture) => {
    const octetStream = base64ToArrayBuffer.decode(picture.base64);
    const faceDetectRes = await AzureAPI.detectFace(octetStream);
    const res = await checkUserFace(selectedDoor.did, faceDetectRes[0].faceId);

    _checkResponse(res);
  };

  /**
   * Given the response received by the server it checks if the user is allowed, not allowed or not recognized.
   * It also resets the local state to "TAKE_SELFIE" after SHOW_QUOTE_TIME ms.
   *
   * @param {object} res, object contaning the response received by the server.
   */
  const _checkResponse = (res) => {
    if (res.access === true) {
      setUserRecState(eUserRecState.ALLOWED);
      setUserName(res.firstName);
    } else if (res.access === false) {
      setUserRecState(eUserRecState.NOT_ALLOWED);
      setUserName(res.firstName);
    } else {
      setUserRecState(eUserRecState.NO_USER_FOUND);
    }
  };

  // RENDER
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        {userRecState === eUserRecState.TAKE_SELFIE ||
        userRecState === eUserRecState.TAKING_PICTURE ? (
          <Recognize
            detectedFaces={detectedFaces}
            _handleFacesDetected={_handleFacesDetected}
            _takePicture={_takePicture}
            cam={cam}
            userRecState={userRecState}
            eUserRecState={eUserRecState}
            setUserRecState={setUserRecState}
          />
        ) : null}
        {userRecState === eUserRecState.ENTER_CODE ? (
          <View style={styles.content}>
            <EnterCode _checkCode={_checkCode} />
          </View>
        ) : null}
        {userRecState >= eUserRecState.CHECKING_USER ? (
          <View style={styles.content}>
            <TextMessage
              userRecState={userRecState}
              eUserRecState={eUserRecState}
              userName={userName}
              selectedDoor={selectedDoor}
              setUserRecState={setUserRecState}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default FaceRecognition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cStyle.colors.background,
  },
  recognizeContainer: {
    width: '100%',
    height: '100%',
  },
  cameraContainer: {
    flex: 10,
    width: '90%',
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 30,
    overflow: 'hidden',
  },
  content: {
    ...cStyle.content,
  },
});
