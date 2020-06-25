import React from "react";
import { View } from "react-native";
import {
  formatStringWithCampaignProps,
  PrideraiserPalette,
} from "./PrideraiserHelper";

export default class PrideraiserRainbowBar extends React.Component {
  render() {
    let barHeight = this.props.height || 4;

    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: PrideraiserPalette.red,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.orange,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.yellow,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.green,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.blue,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.violet,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.brown,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.black,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.paleBlue,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.white,
            flex: 1,
            height: barHeight,
          }}
        />
        <View
          style={{
            backgroundColor: PrideraiserPalette.palePink,
            flex: 1,
            height: barHeight,
          }}
        />
      </View>
    );
  }
}
