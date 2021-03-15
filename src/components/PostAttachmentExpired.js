import React from "react";
import { StyleSheet, View } from "react-native";
import { RegularText } from "./StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import containerStyle from "./PostAttachmentContainerStyle";
import { Skin } from "../../config";
import i18n from "../i18n";

export default class PostAttachmentExpired extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.imageContainer}>
          <MaterialCommunityIcons
            name="widgets"
            size={14}
            style={{ color: Skin.PostAttachmentExpired_IconColor }}
          />
        </View>
        <View style={styles.textContainer}>
          <RegularText style={styles.preambleText}>
            {i18n.t("components.postattachmentexpired.expired")}
          </RegularText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...containerStyle,
    flex: 1,
    flexDirection: i18n.getFlexDirection(),
    alignItems: "center",
  },
  imageContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  textContainer: {
    flex: 1,
  },
  preambleText: {
    fontSize: 14,
    color: Skin.PostAttachmentExpired_TextColor,
    paddingLeft: 4,
  },
});
