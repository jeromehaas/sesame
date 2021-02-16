/* eslint-disable no-use-before-define */
import type { AppProps } from 'next/app';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../redux/reducers/index';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const store = createStore(rootReducer, {}, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>

  );
}

export default MyApp;
