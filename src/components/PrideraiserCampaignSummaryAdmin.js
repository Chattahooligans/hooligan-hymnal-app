import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { BoldText, RegularText, MediumText } from "./StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultColors, Skin } from "../../config";
import i18n from "../i18n";

// This is only used in the post creation admin, not stuff that is user-facing
export default class PrideraiserCampaignSummaryAdmin extends React.Component {
  render() {
    let campaign = this.props.campaign || {
      name: "",
      charity_name: "",
      goals_made: 0,
      pledged_total: 0,
      cover_photo: {
        tablet: "",
      },
    };

    let imageWidth =
      Dimensions.get("window").width - this.props.paddingHorizontal * 2;

    return (
      <View>
        {campaign.cover_photo.phone && (
          <Image
            style={{ width: imageWidth, height: 0.56 * imageWidth }}
            source={{ uri: campaign.cover_photo.tablet + "&wm=pr&wmp=br" }}
          />
        )}
        <View style={{ flexDirection: i18n.getFlexDirection() }}>
          <MediumText>Name: </MediumText>
          <RegularText>{campaign.name}</RegularText>
        </View>
        <View style={{ flexDirection: i18n.getFlexDirection() }}>
          <MediumText>Charity: </MediumText>
          <RegularText>{campaign.charity_name}</RegularText>
        </View>
        <View style={{ flexDirection: i18n.getFlexDirection() }}>
          <MediumText>Goals Recorded: </MediumText>
          <RegularText>{campaign.goals_made}</RegularText>
        </View>
        <View style={{ flexDirection: i18n.getFlexDirection() }}>
          <MediumText>Pledge per Goal: </MediumText>
          <RegularText>{campaign.pledged_total}</RegularText>
        </View>
      </View>
    );
  }
}
