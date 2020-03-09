import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    View
} from 'react-native';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { DefaultColors, Skin } from '../config/Settings';
import i18n from '../../i18n';

export default class PostAttachmentComposePrideraiserMatch extends React.Component {
    render() {
        let campaign = this.props.campaign || {
            name: "name",
            charity_name: "charity",
            pledge_level: "pledge_level",
            goal_count: "goal_count",
            cover_photo: {
                phone: ""
            }
        }
        let pledgeLevel = 420
        let goalCount = 69

        let imageWidth = Dimensions.get("window").width - (this.props.paddingHorizontal * 2)

        return (
            <View>
                {campaign.cover_photo.phone &&
                    <Image
                        style={{ width: imageWidth, height: (.56 * imageWidth) }}
                        source={{ uri: campaign.cover_photo.phone }} />
                }
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
                    <RegularText>{goalCount}</RegularText>
                </View>
                <View style={{ flexDirection: i18n.getFlexDirection() }}>
                    <MediumText>Pledge per Goal: </MediumText>
                    <RegularText>{pledgeLevel}</RegularText>
                </View>
            </View>
        )
    }
}