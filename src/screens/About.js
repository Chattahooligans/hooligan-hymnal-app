import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationOptions from '../config/NavigationOptions';

// About info, link to website/fb/twitter
// maybe a url for the /songs page on website (where App Store/Google Play icons will be found)
// Email to send feedback?
export default class About extends React.Component {
  static navigationOptions = {
    title: 'About',
    ...NavigationOptions
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Chattahooligan Hymnal BETA</Text>
        <View style={{ height: 10 }} />
        <Text>
          Thanks for testing! Stay tuned for updates before the season begins
        </Text>
        <Text>
          Please send feedback to Twitter: @chattahooligan or
          thechattahooligans@gmail.com
        </Text>
        <View style={{ height: 50 }} />
        <Text>Visit us at:</Text>
        <Text>fb.com/TheChattahooligans</Text>
        <Text>twitter.com/chattahooligan</Text>
        <Text>instagram.com/thechattahooligans</Text>
        <Text>thechattahooligans.com</Text>
        <View style={{ height: 50 }} />
        <Text>Home screen video created by Jay Kaley</Text>
        <Text>Menu photo from Phil Thach photography</Text>
        <Text>
          Some code based on open source @nodevember conference schedule app
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
