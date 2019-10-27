import React from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import NavigationOptions from '../config/NavigationOptions';
import i18n from "../../i18n";

const volunteerUrl = 'http://chattahooligan.com/join/';

export default class Standings extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.volunteer.title'),
    ...NavigationOptions
  };

  componentDidMount() {
    this.openBrowser();
  }

  async openBrowser() {
    let result = await WebBrowser.openBrowserAsync(volunteerUrl);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Text>{i18n.t('screens.volunteer.fallback')}</Text>
    );
  }
}
