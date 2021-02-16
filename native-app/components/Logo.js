import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import logo from './../assets/sesame.png';

function Logo() {
  // RENDER
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 20,
    resizeMode: 'contain',
  },
});
export default Logo;
