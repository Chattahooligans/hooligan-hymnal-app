import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultColors } from "../../config";
import { RegularText } from "./StyledText";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import withUnstated from "@airship/with-unstated";
import PostAttachmentGkNickname from "./PostAttachmentGkNickname";
import PostAttachmentJuanstagram from "./PostAttachmentJuanstagram";
import PostAttachmentMassInstagram from "./PostAttachmentMassInstagram";
import PostAttachmentMassTweet from "./PostAttachmentMassTweet";
import PostAttachmentPlayer from "./PostAttachmentPlayer";
import PostAttachmentPrideraiserMatch from "./PostAttachmentPrideraiserMatch";
import PostAttachmentSong from "./PostAttachmentSong";
import i18n from "../i18n";

class PostCreateAttachmentWrapper extends React.Component {
  render() {
    let attachment = this.props.attachment;
    let attachmentDisplay;

    switch (attachment.attachmentType.toLowerCase()) {
      case "player":
        let player = this.props.globalData.state.players.find(
          (player) => player._id === attachment.relatedId
        );
        let playerDisplay = (
          <PostAttachmentPlayer
            player={player}
            onPress={() => {
              this.props.navigation.navigate("Player", { player });
            }}
          />
        );
        attachmentDisplay = playerDisplay;
        break;
      case "song":
        let song;
        if (attachment.relatedId) {
          song = this.props.globalData.state.songs.find(
            (song) => song._id === attachment.relatedId
          );
        } else if (attachment.data) {
          song = attachment.data;
        }
        let songDisplay = (
          <PostAttachmentSong
            song={song}
            onPress={() => {
              this.props.navigation.navigate("SingleSong", { song });
            }}
          />
        );
        attachmentDisplay = songDisplay;
        break;
      case "gknickname":
        let gkNickname = attachment.data;
        let gkNicknameDisplay = (
          <PostAttachmentGkNickname gkNickname={gkNickname} />
        );
        attachmentDisplay = gkNicknameDisplay;
        break;
      case "massinstagram":
        let massInstagramRoster = this.props.globalData.state.rosters.find(
          (roster) => roster._id === attachment.data.rosterId
        );
        let massInstagramDisplay = (
          <PostAttachmentMassInstagram
            roster={massInstagramRoster}
            onPress={() => {
              this.props.navigation.navigate("InstagramList", {
                roster: massInstagramRoster,
              });
            }}
          />
        );
        attachmentDisplay = massInstagramDisplay;
        break;
      case "masstweet":
        let massTweetRoster = this.props.globalData.state.rosters.find(
          (roster) => roster._id === attachment.data.rosterId
        );
        let massTweetDisplay = (
          <PostAttachmentMassTweet
            roster={massTweetRoster}
            onPress={() => {
              this.props.navigation.navigate("TwitterList", {
                roster: massTweetRoster,
              });
            }}
          />
        );
        attachmentDisplay = massTweetDisplay;
        break;
      case "prideraisermatch":
        let data = attachment.data;
        let prideraiserMatchDisplay = (
          <PostAttachmentPrideraiserMatch data={data} />
        );
        attachmentDisplay = prideraiserMatchDisplay;
        break;
      case "juanstagram":
        let juanstagramPost = attachment.data.juanstagramPost;
        let juanstagramDisplay = (
          <PostAttachmentJuanstagram juanstagramPost={juanstagramPost} />
        );
        attachmentDisplay = juanstagramDisplay;
        break;
      default:
        attachmentDisplay = (
          <RegularText>
            Can't render attachment {JSON.stringify(attachment)}
          </RegularText>
        );
    }

    return (
      <View style={{ flexDirection: i18n.getFlexDirection() }}>
        <View style={{ flex: 1 }}>{attachmentDisplay}</View>
        {/* Transparent overlay to prevent tapping the attachment content */}
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: "#00000000" }]}
        />
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            if (this.props.onPressDelete)
              this.props.onPressDelete(this.props.attachment);
          }}
        >
          <MaterialCommunityIcons
            name="close"
            size={25}
            style={{
              color: DefaultColors.Primary,
              backgroundColor: "transparent",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  delete: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: DefaultColors.Secondary,
    width: 25,
    height: 25,
    borderColor: DefaultColors.Primary,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default withUnstated(PostCreateAttachmentWrapper, {
  globalData: GlobalDataContainer,
});
