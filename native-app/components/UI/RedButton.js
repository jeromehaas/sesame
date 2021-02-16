import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import * as cStyle from './../../style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faQrcode } from '@fortawesome/free-solid-svg-icons';

function RedButton({ size, clicked, text, marginBottom, icon, iconName }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          shadowOffset: pressed
            ? {
                width: 0,
                height: 2,
              }
            : {
                width: 0,
                height: 8,
              },
          shadowOpacity: pressed ? 10 : 10,
          shadowRadius: pressed ? 4.65 : 8.5,
          elevation: pressed ? 6 : 8,
          transform: pressed ? [{ translateY: 3 }] : [{ translateY: 0 }],
        },
        {
          ...styles.redButton,
          width: size === undefined ? 200 : size,
          marginBottom: marginBottom === undefined ? 30 : marginBottom,
        },
      ]}
      onPress={clicked}
    >
      <Text style={styles.redButtonText}>{text}</Text>
      {icon ? (
        <FontAwesomeIcon
          icon={iconName === 'camera' ? faCamera : faQrcode}
          style={styles.icon}
        />
      ) : null}
    </Pressable>
  );
}

export default RedButton;

const styles = StyleSheet.create({
  redButton: {
    padding: 14,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: cStyle.colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
  },
  redButtonText: {
    fontSize: 15,
    color: cStyle.colors.lightest,
    textAlign: 'center',
    fontFamily: cStyle.fonts.medium,
  },
  icon: {
    marginLeft: 10,
    color: 'white',
  },
});
