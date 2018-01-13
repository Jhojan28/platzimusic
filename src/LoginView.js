/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'

import {  Actions } from 'react-native-router-flux'
import firebase, { firebaseAuth } from './firebase'

const { FacebookAuthProvider } = firebase.auth


export default class LoginView extends Component {
  state = {
    credential: null
  }

  componentWillMount() {
    this.authenticateUser()
  }
  authenticateUser = ()=> {
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken } = data
      const credential = FacebookAuthProvider.credential(accessToken)
      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        Actions.home()
      }).catch(function(error) {
        console.warn("Sign In Error", error);
      });
    })
  }
  handleLoginFinished = (error, result) => {
    if (error) {
      console.error("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      this.authenticateUser()
    }
  }

  handleButtonPress = () => {
    Actions.home()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bienvenidos a PlatziMusic</Text>
        <Text style={styles.welcome}>{this.state.credentials && this.state.credentials.displayName}</Text>
        <LoginButton
          readPermissions={["public_profile", "email"]}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20
  }
});