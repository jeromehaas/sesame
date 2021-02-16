import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Door from './Door';
// import LottieView from 'lottie-react-native';

function DoorsList({ navigation }) {
  // GLOBAL STATE
  const doors = useSelector((state) => state.doors);

  // RENDER
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.doorsContainer}
      >
        {doors.length !== 0 ? (
          doors.map((door) => (
            <Door door={door} key={door.did} navigation={navigation} />
          ))
        ) : (
          <Text>Loading doors</Text>
          // <LottieView
          //   source={require('./../../assets/animations/notspinner.json')}
          //   autoPlay
          //   loop
          // />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
  },
  doorsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DoorsList;
