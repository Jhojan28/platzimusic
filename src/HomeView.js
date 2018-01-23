/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import ArtistBox from './ArtisBox'
import ArtistList from './ArtistList'
import { getArtist } from './apiClient'

export default class HomeView extends Component<{}> {
  state = {
    artists: null
  }

  async componentDidMount () {
    const artists = await getArtist()
    this.setState({artists:artists})
  }
  render() {
    const artists = this.state.artists
    return (
      <View style={styles.container}>
        { !artists && <ActivityIndicator size="large"/> }
        { artists && <ArtistList artists={artists}/> }        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column', // Define el eje en que se veran los elementos (column o row)
   // justifyContent: 'space-around', //Alinea elementos con respecto al eje
   // alignItems: 'center', //Alinea elementos de manera contraria al eje
    backgroundColor: 'lightgrey',
    paddingTop: Platform.select({
      ios: 30,
      android: 10
    })
  }
});
