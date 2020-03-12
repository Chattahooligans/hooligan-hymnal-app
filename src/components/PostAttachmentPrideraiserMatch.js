import React from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, RegularTextMonospace } from './StyledText';
import PrideraiserRainbowBar from './PrideraiserRainbowBar';
import { PRIDERAISER_LOGO } from '../config/Settings';
import i18n from "../../i18n";

export default class PostAttachmentPrideraiserMatch extends React.Component {

    // TODO: document find/replace strings in Settings.PostAttachmentPrideraiserMatch_Message and PostAttachmentPrideraiserMatch_MessageZeroGoals
    // actually put this stuff in locale

    render() {
        let match = this.props.match
        let message = ""

        if (match) {

            if (match.goalCount > 0) {
                const matchRaise = match.goalCount * match.pledged_total
                const goal_name = match.goalCount > 0 ? match.goal_name_plural : match.goal_name
                message = `Because of ${match.goalCount} ${goal_name}, we raised $${matchRaise} to benefit ${match.charity_name}! Make your pledge now.`
            }
            else {
                message = `No ${match.goal_name_plural} from this match, but we can raise ${match.pledged_total} to benefit ${match.charity_name} with each one. Make your pledge now.`
            }
        }



        return (
            <View style={{ flex: 1 }}>
                <PrideraiserRainbowBar />
                <View style={{ flex: 1, flexDirection: i18n.getFlexDirection(), margin: 5 }}>
                    <Image
                        style={{ width: 100, height: 100, marginRight: 5 }}
                        resizeMode="contain"
                        source={PRIDERAISER_LOGO} />
                    <View style={{ flex: 1 }}>
                        <BoldText>{this.props.match.name} Update</BoldText>
                        <RegularText>{message}</RegularText>
                    </View>
                </View>
                <BigButton
                    buttonStyle={{ backgroundColor: "rgb(0, 166, 81)", marginTop: 0, marginHorizontal: 0 }}
                    iconName="md-heart-empty" iconPosition="right"
                    label={"Pledge"} />
            </View >
        )
    }
}