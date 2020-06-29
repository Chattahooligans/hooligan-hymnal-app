import React from "react";
import { Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import i18n from "../i18n";

export default class WebView extends React.Component {
  componentDidMount() {
    this.openBrowser();
  }

  async openBrowser() {
    let result = await WebBrowser.openBrowserAsync(this.props.url);
    this.props.navigation.goBack();
  }

  render() {
    return <Text>{i18n.t("screens.webview.fallback")}</Text>;
  }
}
