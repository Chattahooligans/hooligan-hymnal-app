import React from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import NavigationOptions from '../config/NavigationOptions';
import { EVENTS_URL } from '../config/Settings';
import i18n from "../../i18n";

export default class Events extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.events.title'),
    ...NavigationOptions
  };

  componentDidMount() {
    this.openBrowser();
  }

  async openBrowser() {
    let result = await WebBrowser.openBrowserAsync(EVENTS_URL);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Text>{i18n.t('screens.events.fallback')}</Text>
    );
  }
}
