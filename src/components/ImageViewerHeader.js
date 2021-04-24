import React from "react";
import {
  Clipboard,
  Dimensions,
  Platform,
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
          <TouchableWithoutFeedback
            onPress={this.props.onClose}
            style={{ padding: 10 }}
          >
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
    paddingTop: Platform.OS == "ios" ? 25 : 10,
    width: Dimensions.get("window").width,
    alignItems: "flex-end",
  },
});
