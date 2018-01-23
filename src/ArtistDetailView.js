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
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ArtistBox from './ArtisBox'
import CommentList from './CommentList'
import { getArtist } from './apiClient'
import { firebaseDatabase, firebaseAuth } from './firebase'

export default class ArtistDetailView extends Component<{}> {
  state = {
    comments: []
  }

  componentDidMount() {
    this.getArtistCommentRef().on('child_added', this.addComment)

    this.getArtistCommentRef().once('value', snapshot => {
      let comments = {comments:[]}
      snapshot.forEach( comment => {
        comments.comments = comments.comments.concat(comment.val())
      })
      this.setState({
        comments: comments.comments
      })
    })  
  }

  componentWillUnmount () {
    this.getArtistCommentRef().off('child_added', this.addComment)
  }

  addComment =  data=>{
    const comment = data.val()
    this.setState({comments: this.state.comments.concat(comment)})
  }

  handleSend = () => {
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser
    const getArtistCommentRef = this.getArtistCommentRef()
    const newCommentRef = getArtistCommentRef.push()
    newCommentRef.set({
      text,
      userPhoto: photoURL,
      uid
    })
    this.setState({text:''})
  }

  getArtistCommentRef = () =>{
    const { id } = this.props.artist
    return firebaseDatabase.ref(`comments/${id}`)
  }

  handleChangeText = (text)=>this.setState({text})

  render() {
    const artist = this.props.artist
    const { comments } = this.state
    return (
      <View style={styles.container}>
        <ArtistBox artist={artist}/>
        <CommentList comments={comments} />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            value={this.state.text}
            placeholder="Opina sobre este artista"
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity onPress={this.handleSend}>
            <Icon name="ios-send-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
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
    paddingTop: 50
  },
  header:{
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  inputContainer: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 50
  }
});
