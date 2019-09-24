import React from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import NavigationOptions from '../config/NavigationOptions';

const volunteerUrl = 'http://chattahooligan.com/join/';

export default class Standings extends React.Component {
  static navigationOptions = {
    title: 'Volunteer',
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
      <Text>Chattahooligan volunteer form opens in WebBrowser component</Text>
    );
  }
}
