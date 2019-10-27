import React from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import NavigationOptions from '../config/NavigationOptions';
import i18n from "../../i18n";

const standingsUrl = 'https://www.npsl.com/table/2019-npsl-members-cup/';

export default class Standings extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.standings.title'),
    ...NavigationOptions
  };

  componentDidMount() {
    this.openBrowser();
  }

  async openBrowser() {
    let result = await WebBrowser.openBrowserAsync(standingsUrl);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Text>{i18n.t('screens.standings.fallback')}</Text>
    );
  }
}
