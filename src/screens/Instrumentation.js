import React from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import NavigationOptions from '../config/NavigationOptions';
import { INSTRUMENTATION_URL } from '../config/Settings';

export default class Instrumentation extends React.Component {
  static navigationOptions = {
    title: 'Instrumentation',
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
      <Text>Instrumentation opens in WebBrowser component</Text>
    );
  }
}
