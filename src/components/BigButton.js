import React, { Children } from "react";
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MediumText } from "./StyledText";
import { FontSizes } from "../constants";
import { DefaultColors } from "../../config";
import i18n from "../i18n.js";

export class BigButton extends React.Component {
  render() {
    let iconPosition = "left";
    if (this.props.iconName)
      if (this.props.iconPosition == "right") iconPosition = "right";

    let tintColor = DefaultColors.ButtonText;
    if (this.props.tintColor) tintColor = this.props.tintColor;

    if (Platform.OS === "ios")
      return (
        <TouchableHighlight
          disabled={this.props.disabled}
          style={this.props.style}
          underlayColor={"#fff"}
          onPress={this.props.onPress}
        >
          <View style={[styles.container, this.props.buttonStyle]}>
            {this.props.iconName && iconPosition == "left" && (
              <MaterialCommunityIcons
                name={this.props.iconName}
                size={23}
                style={[styles.iconLeft, { color: tintColor }]}
              />
            )}
            <MediumText
              style={[
                styles.label,
                this.props.labelStyle,
                { color: tintColor },
              ]}
            >
              {this.props.label}
            </MediumText>
            {this.props.iconName && iconPosition == "right" && (
              <MaterialCommunityIcons
                name={this.props.iconName}
                size={23}
                style={[styles.iconRight, { color: tintColor }]}
              />
            )}
          </View>
        </TouchableHighlight>
      );
    if (Platform.OS === "android")
      return (
        <TouchableNativeFeedback
          disabled={this.props.disabled}
          style={this.props.style}
          onPress={this.props.onPress}
        >
          <View style={[styles.container, this.props.buttonStyle]}>
            {this.props.iconName && iconPosition == "left" && (
              <MaterialCommunityIcons
                name={this.props.iconName}
                size={23}
                style={[styles.iconLeft, { color: tintColor }]}
              />
            )}
            <MediumText
              style={[
                styles.label,
                this.props.labelStyle,
                { color: tintColor },
              ]}
            >
              {this.props.label}
            </MediumText>
            {this.props.iconName && iconPosition == "right" && (
              <MaterialCommunityIcons
                name={this.props.iconName}
                size={23}
                style={[styles.iconRight, { color: tintColor }]}
              />
            )}
          </View>
        </TouchableNativeFeedback>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultColors.ButtonBackground,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 10,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    overflow: "hidden",
    flexDirection: i18n.getFlexDirection(),
  },
  iconLeft: {
    backgroundColor: "transparent",
    marginHorizontal: 8,
    marginVertical: 3,
  },
  iconRight: {
    backgroundColor: "transparent",
    marginHorizontal: 8,
    marginVertical: 3,
    position: "absolute",
    right: 8,
  },
  label: {
    fontSize: FontSizes.normalButton,
    textAlign: "center",
    color: DefaultColors.ButtonText,
  },
});
