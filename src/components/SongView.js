import React from 'react';
import { ScrollView, View, Text, StyleSheet, NativeModules, ToastAndroid, Clipboard } from 'react-native';
import { BoldText, RegularText } from './StyledText';
import { WebBrowser } from 'expo';
import ParsedText from 'react-native-parsed-text';
import Tags from './Tags';
import { FontSizes, Layout } from '../constants';
import { Skin, Palette } from '../config/Settings';

// TODO: platform select
// on android, longpress event with clipboard setting
// on iOS, selectable=true and make them copy it manually
export default class SongView extends React.Component {
  render() {
    let song = this.props.song;
    let pageCount = this.props.pageCount;

    let referenceDisplay;
    if (song.reference_title)
      referenceDisplay = <RegularText style={styles.reference} onLongPress={this._onLongPressReference}>{song.reference_title}</RegularText>

    return (
      <View style={styles.container}>
        <View style={{paddingBottom: 1}}>
          <BoldText style={styles.title} onLongPress={this._onLongPressTitle}>{song.title}</BoldText>
          {referenceDisplay}
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <RegularText style={styles.instructions}>{song.instructions}</RegularText>
            <ParsedText 
              parse={
                [
                  {type: 'url', style: styles.url, onPress: this._urlPress},
                  {pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted},
                  {pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted}
                ]
              }
              style={styles.lyrics} 
              onLongPress={this._onLongPressLyrics}
              >
              {song.lyrics}
            </ParsedText>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 6,
            padding: 8,
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{flex:1}}>
            <Tags style={styles.icons} tags={song.tags} />
          </View>
          <View style={{flex:1}}>
            <RegularText style={{textAlign:'right'}}>
              {pageCount}
            </RegularText>
          </View>
        </View>
      </View>
    );
  }

  _onLongPressTitle = () => {
    ToastAndroid.show('Copied title to clipboard', ToastAndroid.SHORT);
    Clipboard.setString(this.props.song.title);
  };

  _onLongPressReference = () => {
    ToastAndroid.show('Copied reference to clipboard', ToastAndroid.SHORT);
    Clipboard.setString(this.props.song.reference_title);
  };
  
  _onLongPressLyrics = () => {
    ToastAndroid.show('Copied lyrics to clipboard', ToastAndroid.SHORT);
    Clipboard.setString(this.props.song.lyrics);
  };

  _urlPress = (url) => {
    WebBrowser.openBrowserAsync(url);
  }

  _renderFormatted = (matchingString) => {
    return matchingString.slice(1, matchingString.length-1)
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Palette.Black,
    backgroundColor: Palette.White,
    paddingLeft: 4,
  },
  reference: {
    fontStyle: 'italic',
    color: Palette.Navy,
    backgroundColor: Palette.White,
    paddingLeft: 12,
    paddingBottom: 3
  },
  icons: {
    backgroundColor: Palette.White
  },
  container: {
    flex: 1,
    width: 100 + '%',
    padding: 8,
    paddingBottom: 0
  },
  instructions: {
    fontStyle: 'italic',
    color: '#AAAAAA',
    backgroundColor: Palette.White,
    paddingLeft: 12
  },
  lyrics: {
    fontFamily: 'heebo',
    fontSize: 18,
    lineHeight: 24,
    flex: 1,
    color: Palette.Navy,
    backgroundColor: Palette.White,
    paddingLeft: 8
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});
