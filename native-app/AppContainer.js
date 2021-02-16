import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as cStyle from './style';

import { fetchDoors } from './store/actions/doorsActions';
import { fetchQuotes, setQuotes } from './store/actions/quotesActions';
import Home from './screens/Home';
import FaceRecognition from './screens/FaceRecognition';
import FaceRegistration from './screens/FaceRegistration';
import RegistrationCode from './screens/RegistrationCode';
import FaceRegistrationProcess from './screens/FaceRegistrationProcess';
import FaceRegistrationCamera from './screens/FaceRegistrationCamera';
import FaceRegistrationSuccess from './screens/FaceRegistrationSuccess';
import HandleQuotes from './screens/HandleQuotes';
import fileUri from './fileSystemUri';
import Logo from './components/Logo';
import { View } from 'react-native';

const Stack = createStackNavigator();

const headerOptions = {
  headerTitle: (props) => <Logo {...props} />,
  headerRight: () => <View />,
  headerStyle: {
    shadowOpacity: 0, // remove shadow on iOS
    elevation: 0, // remove shadow on Android
  },
  headerTintColor: cStyle.colors.highlight,
};
export default function AppContainer() {
  const dispatch = useDispatch();
  const DELETE_FILE = false;

  useEffect(() => {
    if (DELETE_FILE) {
      FileSystem.deleteAsync(fileUri);
    } else {
      FileSystem.getInfoAsync(fileUri).then((info) => {
        if (!info.exists) {
          dispatch(setQuotes(fileUri));
        } else {
          dispatch(fetchQuotes(fileUri));
        }
      });
    }
    dispatch(fetchDoors());
  }, [dispatch, DELETE_FILE]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ ...headerOptions, headerRight: null }}
        />
        <Stack.Screen
          name="FaceRecognition"
          component={FaceRecognition}
          options={headerOptions}
        />
        <Stack.Screen
          name="RegistrationCode"
          component={RegistrationCode}
          options={headerOptions}
        />
        <Stack.Screen
          name="FaceRegistration"
          component={FaceRegistration}
          options={headerOptions}
        />
        <Stack.Screen
          name="HandleQuotes"
          component={HandleQuotes}
          options={headerOptions}
        />
        <Stack.Screen
          name="FaceRegistrationProcess"
          component={FaceRegistrationProcess}
          options={headerOptions}
        />
        <Stack.Screen
          name="FaceRegistrationCamera"
          component={FaceRegistrationCamera}
          options={headerOptions}
        />
        <Stack.Screen
          name="FaceRegistrationSuccess"
          component={FaceRegistrationSuccess}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
