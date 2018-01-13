import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

const comment = props => 
    <View style={styles.comment}>
        <Text style={styles.text}>{props.text}</Text>
    </View>

const styles = StyleSheet.create({
    comment: {
        backgroundColor: '#ECF0F1',
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    text: {
        fontSize: 16
    }
})

export default comment