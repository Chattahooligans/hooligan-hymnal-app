import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NavigationOptions from '../config/NavigationOptions';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import { FontSizes } from '../constants';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
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
    token: "",
    response: null
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.globalData.state.token &&
      this.props.globalData.state.token) ||
      (!prevProps.globalData.state.response &&
        this.props.globalData.state.response)
    ) {
      this.setData();
    }
  }

  setData = () => {
    let { token, response } = this.props.globalData.state
    this.setState({token, response})
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10, backgroundColor: Palette.Sky }}>
        <ScrollView style={{ flex: 1, backgroundColor: Palette.White, padding: 5 }}>
          <BoldText style={{ fontSize: FontSizes.title, marginBottom: 10 }}>Chattahooligan Hymnal</BoldText>
          <RegularText>The Chattahooligan Hymnal is built to help you support Chattanooga FC.</RegularText>
          <View style={{ height: 10 }} />
          <RegularText>Please send feedback to @chattahooligan or @hooliganhymnal on Twitter, or email thechattahooligans@gmail.com</RegularText>
          <View style={{ height: 20 }} />
          <MediumText>Credits</MediumText>
          <RegularText>- Home screen video created by Jay Kaley</RegularText>
          <RegularText>- Menu photo from Phil Thach photography</RegularText>
          <RegularText>- Some player photos from Madonna Kemp and Ray Soldano, used with permission</RegularText>
          <RegularText>- Player headshots provided by Chattanooga FC, used with permission</RegularText>
          <RegularText>- Some code based on open source @nodevember conference schedule app</RegularText>
          <View style={{ height: 20 }} />
          <RegularText>Interested in contriburing? If you can code, design, write, or help in any way, we'd love to work with you! Please reach out to @chattahooligan or @hooliganhymnal on Twitter, or email thechattahooligans@gmail.com</RegularText>
          <View style={{ height: 20 }} />
          <ScrollView style={{flex: 1}}>
            <MediumText>Debug</MediumText>
            <RegularText selectable={true}>{this.state.token}</RegularText>
            <RegularText selectable={true}>
              {
                this.state.response ? 
                  JSON.stringify(this.state.response) : ''
              }
            </RegularText>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default withUnstated(About, { globalData: GlobalDataContainer });