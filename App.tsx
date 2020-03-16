/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { createRootNavigator } from './src/navigation/navigationSetup';
import NavigationService from './src/navigation/navigationService';
import configureStore from './src/redux/config';
import LoaderScreen from './src/screens/loader/loader.screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshTokenSuccess } from './src/screens/auth/store/actions';
import { AuthenticateSuccess } from './src/screens/auth/models';
import { API_BASE } from './src/constants';
import { hideLoaderAction, showLoaderAction } from './src/redux/store';

export class App extends Component {

  render() {
    const configuredStore = configureStore();
    const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
    const AppContainer = createRootNavigator(configuredStore.store.getState().auth.status.loggedIn);
    initInterceptors(configuredStore.store);
    return (
      <Provider store={ configuredStore.store }>
        <PersistGate loading={ null } persistor={ configuredStore.persistor }>
          <AppContainer
            ref={ navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            } }
          />
          <LoaderScreen/>
        </PersistGate>
      </Provider>
    );
  }
}

export function initInterceptors(store: any) {
  axios.interceptors.response.use((response: AxiosResponse) => response, async (error: AxiosError) => {
    const currentState = store.getState();
    store.dispatch(hideLoaderAction());
    if ((error && error.response && error.response.status) !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.config.url.includes('/auth/refresh')) {
      return new Promise((resolve, reject) => reject(error));
    }
    // return error;
    const {data = null} = await axios.post<AuthenticateSuccess>(`${ API_BASE }/auth/refresh`, {refreshToken: currentState && currentState.auth && currentState.auth.status && currentState.auth.status.refreshToken});
    const config = error.config;
    if (data) {
      store.dispatch(refreshTokenSuccess(data));
      config.headers['Authorization'] = `Bearer ${ data.accessToken }`;

      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.request(config);
          if (response)
            resolve(response);
        } catch (e) {
          reject(e);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  });

  axios.interceptors.request.use((request: AxiosRequestConfig) => {
    const currentState = store.getState();
    request.headers['Authorization'] = `Bearer ${ currentState.auth.status.token || null }`;
    return request;
  });

  axios.interceptors.request.use((request: AxiosRequestConfig) => {
    store.dispatch(showLoaderAction());
    return request;
  });

  axios.interceptors.response.use((response: AxiosResponse) => {
    store.dispatch(hideLoaderAction());
    return response;
  });

}

export default App;
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
