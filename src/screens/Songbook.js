import React, { Component } from 'react'
import { ViewPagerAndroid, Image, View, Text, StyleSheet, ScrollView } from 'react-native'
import { SongView } from '../components/SongView'

// Android uses ViewPagerAndroid
// iOS uses ScrollView with pagingEnabled and horizontal properties
export default class Songbook extends Component{
    render(){
        
        return(
            <View style={styles.container}>
                <Text style={styles.header}>table of contents?</Text>
                <Image 
                    style={{width: 400, height: 100}} 
                    source={{uri: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/13139207_848269078636976_5837517176582356954_n.png?oh=e27168f667887ef71b165c32fff65fb4&oe=5AF26ED8'}}
                />
                <ViewPagerAndroid 
                    style={styles.container}
                    horizontal={true} pagingEnabled={true}>
                    <View style={styles.container}>
                        <Text style={styles.sampleText}>Text 1</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.sampleText}>Text 2</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.sampleText}>Text 3</Text>
                    </View>
                </ViewPagerAndroid>
                <View style={styles.container}>
                    <Text style={styles.sampleText}>Text 1</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.sampleText}>Text 2</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.sampleText}>Text 3</Text>
                </View>
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
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    sampleText: {
        color: 'red',
        fontSize: 36,
        textAlign: 'center'
    },
});