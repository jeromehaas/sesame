import React from 'react';
import { Text, View, Pressable, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedDoor } from './../../store/actions/doorsActions';

import * as cStyle from './../../style';

function Door({ door, navigation }) {
  const dispatch = useDispatch();

  // HELPER FUNCTIONS
  /**
   * Set the selected door in the global state and navigate to the FaceRecognition component.
   */
  const _setSelectedDoor = () => {
    dispatch(setSelectedDoor(door));
    navigation.navigate('FaceRecognition');
  };

  // RENDER
  return (
    <Pressable
      style={({ pressed }) => [
        {
          transform: pressed ? [{ translateY: 3 }] : [{ translateY: 0 }],
        },
      ]}
      onPress={_setSelectedDoor}
    >
      <View style={styles.container}>
        <Image style={styles.doorImage} source={{ uri: `${door.doorUrl}` }} />
        <Text style={styles.doorName}>{door.doorName}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    width: 200,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
  },
  doorImage: {
    position: 'absolute',
    resizeMode: 'contain',
    width: 500,
    height: 500,
  },
  doorName: {
    position: 'absolute',
    fontFamily: cStyle.fonts.medium,
    color: cStyle.colors.lightest,
    fontSize: 30,
  },
});

export default Door;
