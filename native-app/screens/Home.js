import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import RedButton from './../components/UI/RedButton';
import * as cStyle from './../style';
import DoorsList from './../components/Home/DoorsList';

function Home({ navigation }) {
  // RENDER
  return (
    <View style={styles.container}>
      <View style={styles.chooseDoorContainer}>
        <View style={styles.chooseDoorCard}>
          <Text style={styles.chooseDoorText}>
            Please choose the door to enter
          </Text>
        </View>
      </View>
      <View style={styles.doorsListContainer}>
        <DoorsList navigation={navigation} />
      </View>
      <View style={styles.registerBtnContainer}>
        <RedButton
          size={'80%'}
          clicked={() => {
            navigation.navigate('RegistrationCode');
          }}
          text={'Register'}
          marginBottom={0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cStyle.colors.background,
  },
  chooseDoorContainer: {
    flex: 1,
    ...cStyle.centerItem,
  },
  chooseDoorCard: {
    ...cStyle.whiteCard,
    padding: 40,
  },
  chooseDoorText: {
    fontFamily: cStyle.fonts.medium,
    fontSize: 30,
    color: 'black',
  },
  doorsListContainer: {
    flex: 2,
    ...cStyle.centerItem,
  },
  registerBtnContainer: {
    flex: 1,
    ...cStyle.centerItem,
  },
});
export default Home;
