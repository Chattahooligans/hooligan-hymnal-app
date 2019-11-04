import React from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import NavigationOptions from '../config/NavigationOptions';
import { INSTRUMENTATION_URL } from '../config/Settings';
import i18n from "../../i18n";

export default class Instrumentation extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.instrumentation.title'),
    ...NavigationOptions
  };

  componentDidMount() {
    this.openBrowser();
  }

  async openBrowser() {
    let result = await WebBrowser.openBrowserAsync(INSTRUMENTATION_URL);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Text>{i18n.t('screens.instrumentation.fallback')}</Text>
    );
  }
}
