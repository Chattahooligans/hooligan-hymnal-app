import React from 'react';
import { ViewPagerAndroid, Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import SongView from '../components/SongView';

import { Layout, Colors } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

// Android uses ViewPagerAndroid
// iOS uses ScrollView with pagingEnabled and horizontal properties
export default class Songbook extends React.Component{
    static navigationOptions = {
        title: 'Hooligan Hymnal',
        headerStyle: { backgroundColor: Colors.green },
        headerTintColor: 'white',
        headerLeft: <MenuButton />,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        },
    };
    
    render(){
        
        return(
            <LoadingPlaceholder>
                <View style={styles.container}>
                    <Text style={styles.header}>table of contents?</Text>
                    <ViewPagerAndroid 
                        style={styles.container}
                        horizontal={true} pagingEnabled={true}>
                        <View style={styles.container}>
                            <Image 
                                style={{width: 400, height: 400}} 
                                source={{uri: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/13139207_848269078636976_5837517176582356954_n.png?oh=e27168f667887ef71b165c32fff65fb4&oe=5AF26ED8'}}
                            />
                            <Text style={styles.welcome}>
                            The Chattahooligan Hymnal test
                            </Text>
                        </View>
                        <View>
                            <SongView song={{title:"Chattanooga Choo Choo", lyrics:"Pardon me boy<br/>Is that the Chattanooga Choo Choo"}} />
                        </View>
                        <View>
                            <SongView song={{title:"True Colors", lyrics:"I see your true colors<br/>Shining through"}} />
                        </View>
                        <View>
                            <SongView song={{title:"Drink/Sing", lyrics:"Chattanooga, we are here (x3)<br />Getting rowdy, drinking beer!"}} />
                        </View>
                        <View>
                            <SongView song={{title:"Just Can't Get Enough", lyrics:"When I see you, Nooga<br/>I go out of my head"}} />
                        </View>
                    </ViewPagerAndroid>
                </View>
            </LoadingPlaceholder>
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
        backgroundColor: '#A5D8F6'
    },
    sampleText: {
        color: 'red',
        fontSize: 36,
        textAlign: 'center'
    },
});