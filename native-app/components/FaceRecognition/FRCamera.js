import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as cStyle from './../../style';

function FRCamera({
  detectedFaces,
  _handleFacesDetected,
  _takePicture,
  cam,
  userRecState,
  eUserRecState,
}) {
  // RENDER
  return (
    <Camera
      ref={cam}
      style={styles.camera}
      type={Camera.Constants.Type.front}
      onFacesDetected={_handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.Constants.Mode.fast,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        runClassifications: FaceDetector.Constants.Classifications.none,
        minDetectionInterval: 100,
        tracking: true,
      }}
    >
      <View style={styles.takeButtonContainer}>
        <TouchableOpacity
          onPress={_takePicture}
          style={
            userRecState !== eUserRecState.TAKE_SELFIE ||
            detectedFaces.length === 0
              ? styles.takeButtonDis
              : styles.takeButton
          }
        />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
  },
  takeButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  takeButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: cStyle.colors.highlight,
  },
  takeButtonDis: {
    display: 'none',
  },
});

export default FRCamera;
