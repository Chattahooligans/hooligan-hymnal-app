import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationOptions from '../config/NavigationOptions';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

// About info, link to website/fb/twitter
// maybe a url for the /songs page on website (where App Store/Google Play icons will be found)
// Email to send feedback?

class About extends React.Component {
  static navigationOptions = {
    title: 'About',
    ...NavigationOptions
  };

  state = {
    token: ""
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.globalData.state.token &&
      this.props.globalData.state.token
    ) {
      this.setData();
    }
  }

  setData = () => {
    let { token } = this.props.globalData.state
    this.setState({token})
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10, backgroundColor: Palette.Sky }}>
        <View style={{ flex: 1, backgroundColor: Palette.White, padding: 5 }}>
          <Text>Chattahooligan Hymnal</Text>
          <View style={{ height: 10 }} />
          <Text>
            Thanks for testing! Stay tuned for updates before the season begins
          </Text>
          <Text>
            Please send feedback to Twitter: @chattahooligan or
            thechattahooligans@gmail.com
          </Text>
          <View style={{ height: 50 }} />
          <Text>Home screen video created by Jay Kaley</Text>
          <Text>Menu photo from Phil Thach photography</Text>
          <Text>Some player photos from Madonna Kemp and Ray Soldano, used with permission</Text>
          <Text>Player headshots provided by Chattanooga FC, used with permission</Text>
          <Text>
            Some code based on open source @nodevember conference schedule app
          </Text>
          <View style={{ height: 50 }} />
          <Text>Debug</Text>
          <Text>{this.state.token}</Text>
          <Text></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default withUnstated(About, { globalData: GlobalDataContainer });