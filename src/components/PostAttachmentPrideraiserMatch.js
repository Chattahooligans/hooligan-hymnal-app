import React from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, RegularTextMonospace } from './StyledText';
import { formatStringWithCampaignProps, PrideraiserPalette } from './PrideraiserHelper';
import PrideraiserRainbowBar from './PrideraiserRainbowBar';
import { PRIDERAISER_LOGO } from '../../config';
import i18n from '../i18n';

export default class PostAttachmentPrideraiserMatch extends React.Component {
    render() {
        let data = this.props.data
        let heading = ""
        let message = ""

        if (data) {
            console.log(data)

            // data.campaign contains a subset of campaign data baked in
            heading = formatStringWithCampaignProps(i18n.t('components.postattachmentprideraisermatch.heading'), data.campaign, data.goalCount)

            if (data.goalCount > 0) {
                /*
                    We also look for %goalCount% and %raised% in the locale strings,
                    to be replaced with data.goalCount and a calculation based on data.goalCount * data.pledged_total, respectively
                */
                const raised = data.goalCount * data.campaign.pledged_total
                message = formatStringWithCampaignProps(i18n.t('components.postattachmentprideraisermatch.message'), data.campaign, data.goalCount)
                message = message.replace("%goalCount%", data.goalCount)
                message = message.replace("%raised%", raised)
            }
            else {
                message = formatStringWithCampaignProps(i18n.t('components.postattachmentprideraisermatch.messagezerogoals'), data.campaign, data.goalCount)
                message = message.replace("%goalCount%", data.goalCount)
                message = message.replace("%raised%", 0)
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
                        <BoldText>{heading}</BoldText>
                        <RegularText>{message}</RegularText>
                    </View>
                </View>
                <BigButton
                    buttonStyle={{ backgroundColor: PrideraiserPalette.green, marginTop: 0, marginHorizontal: 0 }}
                    iconName="heart-outline" iconPosition="right"
                    label={"Pledge"}
                    onPress={() => {
                        let source = ""
                        if (data.source)
                            source = "?source=" + data.source

                        Linking.openURL(data.campaign.public_url + source)
                    }} />
            </View >
        )
    }
}