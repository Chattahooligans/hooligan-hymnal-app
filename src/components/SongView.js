import React, { Component } from 'react'
import { View, Text, WebView, StyleSheet } from 'react-native'

class SongView extends Component{
    render(){
        let songHtml = {
            // initial
            html: '<html><body style="background-color:pink;"><p><em>LYRICS_HERE</em></p></body></html>'
        };

        let template = '<html><body style=""><p style="font-size:20; font-style:italic;">$LYRICS</p></body></html>'

        let title = this.props.song.title
        let lyrics = this.props.song.lyrics
        let outputHtml = template.replace("$LYRICS", lyrics)
        return(
            <View
                style={styles.container}>
                <View style={{}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.icons}>🎶&nbsp;&nbsp;🗣️&nbsp;&nbsp;🥁&nbsp;&nbsp;🎺️&nbsp;&nbsp;🔔🚫</Text>
                </View>
                <WebView 
                    style={styles.song}
                    source={{html: outputHtml}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        paddingLeft: 4
    },
    icons: {
        backgroundColor: '#FFFFFF',
        padding: 2,
        paddingLeft: 6
    },
    container: {
        flex: 1,
        width: 100+'%',
        padding: 8,
    },
    song: {
        marginTop: 5
    }
});

export default SongView