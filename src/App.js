/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Scene, Router, Stack } from 'react-native-router-flux'
import HomeView from './HomeView'
import ArtistDetailView from './ArtistDetailView'
import LoginView from './LoginView'

export default class App extends Component<{}> {
  render() {
    const isAndroid = Platform.OS === 'android'
    return (
      <Router>          
          <Stack key="root">
          <Scene key="login" component={LoginView} hideNavBar={true}/>
            <Scene key="home" component={HomeView} hideNavBar={true}/>
            <Scene key="artistDetail" component={ArtistDetailView} hideNavBar={isAndroid}/>
          </Stack>
      </Router>
    );
  }
}