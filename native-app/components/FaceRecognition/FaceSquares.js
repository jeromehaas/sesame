import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as cStyle from './../../style';

function FaceSquares({ detectedFaces }) {
  // RENDERING FUNCTIONS
  const renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.facesContainer} pointerEvents="none">
      {detectedFaces.map(renderFace)}
    </View>
  );
}

const styles = StyleSheet.create({
  face: {
    padding: 10,
    borderWidth: 3,
    borderRadius: 2,
    position: 'absolute',
    borderColor: cStyle.colors.highlight,
    justifyContent: 'center',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
});

export default FaceSquares;
