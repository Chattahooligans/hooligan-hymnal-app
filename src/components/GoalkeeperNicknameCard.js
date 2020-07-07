import React from "react";
import { StyleSheet, View } from "react-native";
import { BoldText, RegularText } from "./StyledText";
import { FontSizes } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../i18n";

export default class GoalkeeperNicknameCard extends React.Component {
  render() {
    const { goalkeeperNickname } = this.props;

    if (!goalkeeperNickname) {
      return <View />;
    }

    return (
      <View
        style={{
          flexDirection: i18n.getFlexDirection(),
          alignItems: "center",
          backgroundColor: goalkeeperNickname.backgroundColor,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        <MaterialCommunityIcons
          name="hand"
          size={23}
          style={{
            color: goalkeeperNickname.textColor,
            backgroundColor: "transparent",
            marginHorizontal: 5,
          }}
        />
        <RegularText
          style={[styles.text, { color: goalkeeperNickname.textColor }]}
        >
          {i18n.t("components.gkNickname.gonnascore")}
        </RegularText>
        <BoldText
          style={[styles.nickname, { color: goalkeeperNickname.textColor }]}
        >
          {goalkeeperNickname.nickname}
        </BoldText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizes.subtitle,
  },
  nickname: {
    fontSize: FontSizes.subtitle,
    marginRight: 5,
  },
});
