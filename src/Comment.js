import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'

const DEFAULT_AVATAR = "https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png"
const AVATAR_SIZE = 32

const comment = props => 
    <View style={styles.comment}>
        {
            props.avatar ? 
                <Image style={styles.avatar} source={{ uri: props.avatar }} /> :
                <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} />
        }
       
        <Text style={styles.text}>{props.text}</Text>
    </View>

const styles = StyleSheet.create({
    comment: {
        backgroundColor: '#ECF0F1',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        marginLeft: 10
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE/2
    }
})

export default comment