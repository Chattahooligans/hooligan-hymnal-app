import React from "react";
import {
  Clipboard,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class ImageViewerHeader extends React.Component {
  render() {
    let visible = this.props.visible;

    if (!visible) return <View />;
    else {
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.props.onClose}>
            <MaterialCommunityIcons name={"close"} size={25} color={"white"} />
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#00000040",
    padding: 10,
    width: Dimensions.get("window").width,
    alignItems: "flex-end",
  },
});
