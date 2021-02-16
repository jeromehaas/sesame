import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import {
  imageRegistration,
  userRegistration,
  registrationStatus,
} from './store/reducers/registration';
import AppContainer from './AppContainer';

import { doorsReducer, selectedDoorReducer } from './store/reducers/doors';
import quotesReducer from './store/reducers/quotes';

const rootReducer = combineReducers({
  imageRegistration: imageRegistration,
  user: userRegistration,
  doors: doorsReducer,
  quotes: quotesReducer,
  selectedDoor: selectedDoorReducer,
  registrationStatus: registrationStatus,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
