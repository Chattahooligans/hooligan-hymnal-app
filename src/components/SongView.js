import React from 'react';
import { ScrollView, View, Text, StyleSheet, NativeModules, ToastAndroid, Clipboard } from 'react-native';
import { RegularText } from './StyledText';
import { WebBrowser } from 'expo';
import ParsedText from 'react-native-parsed-text';
import Tags from './Tags';
import { Colors, FontSizes, Layout } from '../constants';

// TODO: platform select
// on android, longpress event with clipboard setting
// on iOS, selectable=true and make them copy it manually
export default class SongView extends React.Component {
  render() {
    let song = this.props.song;
    let pageCount = this.props.pageCount;

    return (
      <View style={styles.container}>
        <View style={{paddingBottom: 8}}>
          <Text style={styles.title} onLongPress={this._onLongPressTitle}>{song.title}</Text>
          <Text style={styles.reference} onLongPress={this._onLongPressReference}>{song.reference_title}</Text>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <Text style={styles.instructions}>{song.instructions}</Text>
            <ParsedText 
              parse={
                [
                  {type: 'url', style: styles.url, onPress: this._urlPress}
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
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    paddingLeft: 4,
  },
  reference: {
    fontStyle: 'italic',
    color: '#AAAAAA',
    backgroundColor: '#FFFFFF',
    paddingLeft: 12
  },
  icons: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    paddingLeft: 12
  },
  lyrics: {
    fontSize: 18,
    flex: 1,
    color: Colors.green,
    backgroundColor: '#FFFFFF',
    paddingLeft: 8
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});
