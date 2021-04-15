import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  BoldText,
  MediumText,
  RegularText,
  UnderlineText,
} from "../components/StyledText";
import { RectButton } from "react-native-gesture-handler";
import { HeaderBackButton } from "@react-navigation/stack";
import { FontSizes } from "../constants";
import { Skin, DefaultColors, Settings } from "../../config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import { openURL } from "../utils/LinkHelper.js";
import i18n from "../i18n";

class InstagramList extends React.Component {
  render() {
    this.props.navigation.setOptions({
      headerTitle: i18n.t("screens.instagramlist.title"),
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => this.props.navigation.goBack()}
          tintColor="#fff"
        />
      ),
    });

    let handles = "";
    this.props.route.params.roster.players.forEach((player) => {
      if (player.instagram) handles += "@" + player.instagram + " ";
    });

    handles += Settings.InstagramList_AppendHandles;

    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: Skin.InstagramList_BackgroundColor,
          flexDirection: i18n.getFlexDirection(),
        }}
      >
        <View style={{ flex: 1, padding: 5 }}>
          <MediumText
            style={{
              backgroundColor: DefaultColors.Background,
              paddingHorizontal: 5,
              fontSize: 18,
              textAlign: i18n.getRTLTextAlign(),
              writingDirection: i18n.getWritingDirection(),
            }}
          >
            {i18n.t("screens.instagramlist.heading")}
          </MediumText>
          <RegularText
            style={{
              backgroundColor: DefaultColors.Background,
              padding: 5,
              marginBottom: 1,
              textAlign: i18n.getRTLTextAlign(),
              writingDirection: i18n.getWritingDirection(),
            }}
          >
            {i18n.t("screens.instagramlist.instructions")}
          </RegularText>
          <ScrollView
            style={{
              flex: 1,
              padding: 5,
              backgroundColor: DefaultColors.Background,
            }}
          >
            <RegularText
              style={{
                fontSize: 18,
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              }}
              selectable={true}
            >
              {handles}
            </RegularText>
          </ScrollView>
          <ClipBorderRadius>
            <RectButton
              style={styles.bigButton}
              onPress={() => {
                openURL("https://instagram.com");
              }}
              underlayColor="#fff"
            >
              <MaterialCommunityIcons
                name="instagram"
                size={23}
                style={{
                  color: "#fff",
                  marginVertical: 3,
                  marginHorizontal: 5,
                  backgroundColor: "transparent",
                }}
              />
              <MediumText style={styles.bigButtonText}>
                {i18n.t("screens.instagramlist.openinstagram")}
              </MediumText>
            </RectButton>
          </ClipBorderRadius>
        </View>
      </View>
    );
  }
}

const ClipBorderRadius = ({ children, style }) => {
  return (
    <View
      style={[
        { borderRadius: BORDER_RADIUS, overflow: "hidden", marginTop: 10 },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
  bigButton: {
    backgroundColor: DefaultColors.ButtonBackground,
    marginTop: 5,
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    flexDirection: i18n.getFlexDirection(),
  },
  bigButtonText: {
    fontSize: FontSizes.normalButton,
    color: DefaultColors.ButtonText,
    textAlign: "center",
    writingDirection: i18n.getWritingDirection(),
  },
});

export default withUnstated(InstagramList, { globalData: GlobalDataContainer });
