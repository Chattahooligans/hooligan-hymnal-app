import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, MediumText } from "./StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FadeIn from "react-native-fade-in-image";
import { openURL } from "../utils/LinkHelper.js";
import { Skin, DefaultColors, Palette } from "../../config";
import containerStyle from "./PostAttachmentContainerStyle";
import i18n from "../i18n";

export default class PostAttachmentMultiTweet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._handlePress}
          activeOpacity={0.2}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, flexDirection: i18n.getFlexDirection() }}>
            <View style={{ flex: 1 }}>
              <View style={styles.tweetAllContainer}>
                <MaterialCommunityIcons
                  name={"twitter"}
                  size={16}
                  style={{
                    color: Skin.PostAttachmentMultiTweet_TwitterColor,
                    backgroundColor: "transparent",
                  }}
                />
                <RegularText style={styles.tweetAllText}>
                  {i18n.t(
                    "components.postattachmentmultitweet.tweettheplayers"
                  )}
                </RegularText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _handlePress = () => {
    const players = this.props.players;
    var handleList = "";
    for (player of players) {
      handleList += "@" + player.twitter + "%20";
    }
    openURL("https://twitter.com/intent/tweet?text=" + handleList + "+");
  };
}

const styles = StyleSheet.create({
  container: {
    ...containerStyle,
    flex: 1,
    flexDirection: i18n.getFlexDirection(),
  },
  imageContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 18,
    color: Palette.Rouge,
    backgroundColor: DefaultColors.Background,
    paddingLeft: 4,
    textAlign: i18n.getRTLTextAlign(),
    writingDirection: i18n.getWritingDirection(),
  },
  tweetAllContainer: {
    flexDirection: i18n.getFlexDirection(),
    alignItems: "center",
    marginHorizontal: 8,
  },
  tweetAllText: {
    fontFamily: Skin.Font_ParsedText,
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    color: Palette.Rouge,
    backgroundColor: DefaultColors.Background,
    marginLeft: 5,
    textAlign: i18n.getRTLTextAlign(),
    writingDirection: i18n.getWritingDirection(),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 18,
    textAlign: i18n.getRTLTextAlign(),
  },
});
