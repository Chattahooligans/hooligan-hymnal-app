import React from 'react';
import { ViewPagerAndroid, Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import SongView from '../components/SongView';

import { NavigationActions } from 'react-navigation';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Colors, FontSizes, Layout } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import TableOfContents from './TableOfContents';

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
                    <ClipBorderRadius>
                        <RectButton
                            style={styles.tocButton}
                            onPress={this._handlePressTOCButton}
                            underlayColor="#fff"
                        >
                            <SemiBoldText style={styles.tocButtonText}>
                            Table of Contents
                            </SemiBoldText>
                        </RectButton>
                    </ClipBorderRadius>
                    <ViewPagerAndroid 
                        style={styles.container}
                        horizontal={true} pagingEnabled={true}>
                        <View><TableOfContents /></View>
                        <View style={styles.container}>
                            <Image 
                                style={{width: 400, height: 400}} 
                                source={{uri: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/13139207_848269078636976_5837517176582356954_n.png?oh=e27168f667887ef71b165c32fff65fb4&oe=5AF26ED8'}}
                            />
                            <Text style={styles.welcome}>The Chattahooligan Hymnal</Text>
                            <Text style={styles.welcome}>Swipe to View Songs</Text>
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

    _handlePressTOCButton = () => {
        console.log("clicked TOC");
        this.props.navigation.navigate('TableOfContents');
    };
}

const ClipBorderRadius = ({ children, style }) => {
    return (
        <View
            style={[
            { borderRadius: BORDER_RADIUS, overflow: 'hidden', marginTop: 3, marginBottom: 3 },
            style
            ]}
        >
            {children}
        </View>
    );
};
const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
    tocButton: {
        backgroundColor: Colors.green,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    tocButtonText: {
        fontSize: FontSizes.normalButton,
        color: '#fff',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        width: 100+'%',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#A5D8F6'
    },
});