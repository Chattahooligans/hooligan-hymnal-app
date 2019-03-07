import React from 'react';
import { Text } from 'react-native';
import { WebBrowser } from 'expo';
import NavigationOptions from '../config/NavigationOptions';

const eventsUrl = 'http://npsl.bonzidev.com/standings';

export default class Standings extends React.Component {
  static navigationOptions = {
    title: 'Standings',
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
      <Text>NPSL standings open in WebBrowser component</Text>
    );
  }
}
