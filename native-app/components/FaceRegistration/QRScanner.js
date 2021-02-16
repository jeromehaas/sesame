import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import BarcodeMask from 'react-native-barcode-mask';
import * as cStyle from '../../style';

function QRScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);

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

  return (
    <View style={styles.QRcontainer}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        barCodeScannerSettings={BarCodeScanner.Constants.BarCodeType.qr}
        onBarCodeScanned={
          props.scanning ? (result) => props.readCodeHandler(result) : undefined
        }
      />
      <BarcodeMask
        edgeColor={cStyle.colors.highlight}
        showAnimatedLine
        animatedLineColor={cStyle.colors.highlight}
        animatedLineHeight={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  QRcontainer: {
    backgroundColor: 'white',
  },
  camera: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});

export default QRScanner;
