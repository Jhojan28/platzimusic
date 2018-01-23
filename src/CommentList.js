/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView
} from 'react-native';
import Comment from './Comment'
import { Actions } from 'react-native-router-flux'

export default class CommentList extends Component<{}> {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource:ds}
  }

  componentDidMount() {
    this.updateDataSource(this.props.comments)
  }

  componentWillReceiveProps(newProps){
      if(newProps.comments !== this.props.comments){
          this.updateDataSource(newProps.comments)
      }
  }
  
  updateDataSource = (data)=> {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
      })
  }
  render() {
    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(comment) => {
          return(
              <Comment text={comment.text} avatar={comment.userPhoto} />
          )            
        }}
      />
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
  }
});
