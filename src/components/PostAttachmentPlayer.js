import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, MediumText } from "../components/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FadeIn from "react-native-fade-in-image";
import { Skin } from "../../config";
import containerStyle from "./PostAttachmentContainerStyle";
import { openURL } from "../utils/LinkHelper.js";
import i18n from "../i18n";

export default class PostAttachmentPlayer extends React.Component {
  render() {
    const player = this.props.player;

    let thumbnail = Skin.Roster_DefaultThumbnail;
    if (player.defaultThumbnail) thumbnail = { uri: player.defaultThumbnail };
    if (player.thumbnail) thumbnail = { uri: player.thumbnail };

    let twitterDisplay;
    if (player.twitter) {
      twitterDisplay = (
        <TouchableOpacity
          style={{ alignContent: "center" }}
          key={"player-twitter-" + player.twitter}
          onPress={() => {
            openURL(
              "https://twitter.com/intent/tweet?text=@" + player.twitter + "+"
            );
          }}
        >
          <MaterialCommunityIcons
            name={"twitter"}
            size={30}
            style={{
              color: Skin.PostAttachmentPlayer_TwitterColor,
              marginVertical: 3,
              marginHorizontal: 5,
              backgroundColor: "transparent",
            }}
          />
        </TouchableOpacity>
      );
    }

    let instagramDisplay;
    if (player.instagram) {
      instagramDisplay = (
        <TouchableOpacity
          style={{ alignContent: "center" }}
          key={"player-instagram-" + player.instagram}
          onPress={() => {
            openURL("https://instagram.com/" + player.instagram);
          }}
        >
          <MaterialCommunityIcons
            name={"instagram"}
            size={30}
            style={{
              color: Skin.PostAttachmentPlayer_InstagramColor,
              marginVertical: 3,
              marginHorizontal: 5,
              backgroundColor: "transparent",
            }}
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._handlePress}
          activeOpacity={0.2}
          style={{ flex: 1 }}
        >
          <View style={{ flexDirection: i18n.getFlexDirection() }}>
            <View style={styles.imageContainer}>
              <FadeIn>
                <Image
                  source={thumbnail}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </FadeIn>
            </View>
            <View style={styles.rowData}>
              <View
                style={{ width: 25, alignItems: "flex-end", paddingRight: 5 }}
              >
                <BoldText>{player.squadNumber}</BoldText>
              </View>
              <View style={{ flexDirection: "column" }}>
                <MediumText
                  style={{
                    textAlign: i18n.getRTLTextAlign(),
                    writingDirection: i18n.getWritingDirection(),
                  }}
                >
                  {player.name}
                </MediumText>
                <RegularText
                  style={{
                    textAlign: i18n.getRTLTextAlign(),
                    writingDirection: i18n.getWritingDirection(),
                  }}
                >
                  {i18n.t("positions." + player.position)}
                </RegularText>
                <RegularText
                  style={{
                    textAlign: i18n.getRTLTextAlign(),
                    writingDirection: i18n.getWritingDirection(),
                  }}
                >
                  {player.flag}
                </RegularText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {twitterDisplay}
        {instagramDisplay}
      </View>
    );
  }

  _handlePress = () => {
    if (this.props.onPress) this.props.onPress(this.props.player);
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
  rowData: {
    flex: 1,
    flexDirection: i18n.getFlexDirection(),
  },
});
