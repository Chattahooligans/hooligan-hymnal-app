import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { SongView } from '../containers'

// Used for single song viewing without the rest of the songbook
// We'll use this when entering App from the notifcation or from the "Capo Callout" screen
// add a unique header that includes a megaphone icon somewhere?
class SingleSongScreen extends Component{
    render(){
        
        return(
            <View style={styles.container}>
                <SongView song={{title:"Chattanooga Choo Choo", lyrics:"Pardon me boy<br/>Is that the Chattanooga Choo Choo"}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 12,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        width: 100+'%',
        alignItems: 'center', justifyContent: 'center'
    },
});

export default SingleSongScreen