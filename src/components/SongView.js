import React from 'react';
import {
  Clipboard,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BoldText, ItalicText, RegularText } from './StyledText';
import * as WebBrowser from 'expo-web-browser';
import ParsedText from 'react-native-parsed-text';
import { parsePatterns, parsedStyles, renderBoldItalic, onUrlPress, onEmailPress } from './ParsedTextHelper';
import Toast from "react-native-tiny-toast";
// import Toast from 'react-native-simple-toast';
import { FontSizes, Layout } from '../constants';
import { Skin, DefaultColors } from '../../config';
import i18n from '../i18n';

// TODO: platform select
// on android, longpress event with clipboard setting
// on iOS, selectable=true and make them copy it manually
export default class SongView extends React.PureComponent {
  render() {
    let song = this.props.song;

    let referenceDisplay;
    let playButtonDisplay;
    let sheetMusicDisplay;
    if (song.referenceTitle)
      referenceDisplay = <ItalicText style={styles.reference} onLongPress={this._onLongPressReference}>{song.referenceTitle}</ItalicText>
    if (song.referenceLink)
      playButtonDisplay = <TouchableOpacity style={{
        top: 0, bottom: 0, paddingHorizontal: 6,
        backgroundColor: DefaultColors.Background
      }}
        onPress={() => { Linking.openURL(song.referenceLink) }}>
        <MaterialCommunityIcons
          name={'play-circle'}
          size={50}
          style={{
            color: Skin.Home_SocialButtons,
            backgroundColor: 'transparent'
          }} />
      </TouchableOpacity>
    if (song.sheetMusicLink)
      sheetMusicDisplay = <TouchableOpacity style={{
        top: 0, bottom: 0, paddingLeft: 6, paddingTop: 6,
        backgroundColor: DefaultColors.Background
      }}
        onPress={() => { Linking.openURL(song.sheetMusicLink) }}>
        <MaterialCommunityIcons
          name={'music-clef-treble'}
          size={41}
          style={{
            color: Skin.Home_SocialButtons,
            backgroundColor: 'transparent'
          }} />
      </TouchableOpacity>
    let capoSignal;
    if (song.capoSignal)
      capoSignal = '📢: ' + song.capoSignal;

    let pageCount = this.props.pageCount;

    return (
      <View style={styles.container}>
        <View style={{ paddingBottom: 1, flexDirection: i18n.getFlexDirection() }}>
          <View style={{ flex: 1, backgroundColor: DefaultColors.Background }}>
            <BoldText style={styles.title} onLongPress={this._onLongPressTitle}>{song.title}</BoldText>
            {referenceDisplay}
          </View>
          {sheetMusicDisplay}
          {playButtonDisplay}
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <ItalicText style={styles.instructions}>{song.instructions}</ItalicText>
            <ParsedText
              parse={
                [
                  { type: 'url', style: parsedStyles.url, onPress: onUrlPress },
                  { type: 'email', style: parsedStyles.url, onPress: onEmailPress },
                  { pattern: parsePatterns.bold, style: parsedStyles.bold, renderText: renderBoldItalic },
                  { pattern: parsePatterns.italic, style: parsedStyles.italic, renderText: renderBoldItalic }
                ]
              }
              style={styles.lyrics}
              onLongPress={this._onLongPressLyrics}>
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
            flexDirection: i18n.getFlexDirection(),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <RegularText>{song.legend}</RegularText>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', opacity: 0.5 }}>
            <RegularText style={{ marginRight: 10 }}>
              {capoSignal ? '' : ''}
            </RegularText>
            <RegularText style={{ textAlign: 'right', color: '#999999' }}>
              {pageCount}
            </RegularText>
          </View>
        </View>
      </View>
    );
  }

  _onLongPressTitle = () => {
    Toast.show(i18n.t('components.songview.copiedtitle'));
    Clipboard.setString(this.props.song.title);
  };

  _onLongPressReference = () => {
    Toast.show(i18n.t('components.songview.copiedreference'));
    Clipboard.setString(this.props.song.referenceTitle);
  };

  _onLongPressLyrics = () => {
    Toast.show(i18n.t('components.songview.copiedlyrics'));
    Clipboard.setString(this.props.song.lyrics);
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Skin.SongView_TitleColor,
    backgroundColor: DefaultColors.Background,
    paddingLeft: 4,
  },
  reference: {
    color: Skin.SongView_ReferenceColor,
    backgroundColor: DefaultColors.Background,
    paddingLeft: 12,
    paddingBottom: 3
  },
  icons: {
    backgroundColor: DefaultColors.Background
  },
  container: {
    flex: 1,
    width: 100 + '%',
    padding: 8,
    paddingBottom: 0
  },
  instructions: {
    color: Skin.SongView_InstructionsColor,
    backgroundColor: DefaultColors.Background,
    paddingLeft: 12,
    textAlign: i18n.getRTLTextAlign(),
    writingDirection: i18n.getWritingDirection()
  },
  lyrics: {
    fontFamily: Skin.Font_ParsedText,
    fontSize: 18,
    lineHeight: 24,
    flex: 1,
    color: Skin.SongView_LyricsColor,
    backgroundColor: DefaultColors.Background,
    paddingLeft: 8,
    textAlign: i18n.getRTLTextAlign(),
    writingDirection: i18n.getWritingDirection()
  }
});
