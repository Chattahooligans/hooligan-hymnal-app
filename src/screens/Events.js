import React from 'react';
import { Text } from 'react-native';
import { WebBrowser } from 'expo';
import NavigationOptions from '../config/NavigationOptions';

const eventsUrl = 'https://m.facebook.com/TheChattahooligans/events/';

export default class Events extends React.Component {
  static navigationOptions = {
    title: 'Events',
    ...NavigationOptions
  };

  componentDidMount() {
    this.openBrowser();
  }

  async openBrowser() {
    let result = await WebBrowser.openBrowserAsync(eventsUrl);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Text>Events open in WebBrowser component</Text>
    );
  }
}
