import React from 'react';
import {
    Dimensions,
    Linking,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { RegularText } from '../components/StyledText';
import { parsePatterns, parsedStyles, renderBoldItalic, onUrlPress, onEmailPress } from '../components/ParsedTextHelper';
import { formatStringWithCampaignProps } from './PrideraiserHelper';
import PrideraiserRainbowBar from './PrideraiserRainbowBar';
import PostImageWrapper from './PostImageWrapper';
import { PRIDERAISER_LOGO, DefaultColors, Skin, Settings, Palette } from '../../config';
import { getCampaign } from '../services/prideraiserService';
import moment from 'moment';
import i18n from '../i18n';

import appParams from '../../app.json';

export default class PrideraiserCampaignSummary extends React.Component {
    state = {
        loadedCampaign: false,
        campaign: null,
        error: false,
        errorDetail: null,
        source: ""
    }

    componentDidMount = async () => {
        if (!this.state.campaign) {
            try {
                const campaign = await getCampaign(Settings.Prideraiser_CampaignId)

                // sanity check to confirm the campaign ID is right
                // campaigns that don't exist look like { "detail": "Not found." }
                if (campaign.hasOwnProperty("id")) {
                    this.setState({ loadedCampaign: true, campaign, source: Settings.PrideraiserCampaignSummary_AnalyticsSource || "" })
                }
                else
                    this.setState({ loadedCampaign: false, error: true, errorDetail: "Not found." })
            }
            catch (error) {
                this.setState({ loadedCampaign: false, error: true, errorDetail: error })
            }
        }
    }

    render() {
        if (this.state.error)
            console.log("PrideraiserCampaignsummary error: " + this.state.errorDetail)

        if (!this.state.loadedCampaign)
            return <View />
        else {
            const coverPhotoParams = Settings.PrideraiserCampaignSummary_CampaignCoverParams
            let parsedTextOptions = [
                { type: 'url', style: parsedStyles.url, onPress: onUrlPress },
                { type: 'email', style: parsedStyles.url, onPress: onEmailPress },
                { pattern: parsePatterns.bold, style: parsedStyles.bold, renderText: renderBoldItalic },
                { pattern: parsePatterns.italic, style: parsedStyles.italic, renderText: renderBoldItalic }
            ]
            const campaign = this.state.campaign

            let title = formatStringWithCampaignProps(i18n.t('components.prideraisercampaignsummary.title'), campaign, campaign.goals_made)
            let benefitting = formatStringWithCampaignProps(i18n.t('components.prideraisercampaignsummary.benefitting'), campaign, campaign.goals_made)
            let pledged = formatStringWithCampaignProps(i18n.t('components.prideraisercampaignsummary.pledged'), campaign, campaign.goals_made)
            let learnmore = formatStringWithCampaignProps(i18n.t('components.prideraisercampaignsummary.learnmore'), campaign, campaign.goals_made)

            return (
                <TouchableHighlight
                    style={styles.container}
                    underlayColor={'#fff'}
                    onPress={() => {
                        let source = ""
                        if (this.state.source)
                            source = "?source=" + this.state.source

                        Linking.openURL(campaign.public_url + source)
                    }}>
                    <View>
                        <View>
                            <PostImageWrapper
                                containerWidth={Dimensions.get("window").width}
                                source={{ uri: campaign.cover_photo.original + coverPhotoParams }} />
                            <RegularText style={styles.versionText}>
                                {appParams.expo.version}
                            </RegularText>
                        </View>
                        <View style={styles.contentContainer}>
                            <ParsedText
                                parse={parsedTextOptions}
                                style={[styles.title, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}>
                                {title}
                            </ParsedText>
                            <ParsedText
                                parse={parsedTextOptions}
                                style={[styles.benefitting, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}>
                                {benefitting}
                            </ParsedText>
                            {
                                // disabled for pandemic
                                false &&
                                <ParsedText
                                    parse={parsedTextOptions}
                                    style={[styles.pledged, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}>
                                    {pledged}
                                </ParsedText>
                            }
                            <ParsedText
                                parse={parsedTextOptions}
                                style={[styles.learnmore, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}>
                                {learnmore}
                            </ParsedText>
                        </View>
                        <PrideraiserRainbowBar />
                    </View>
                </TouchableHighlight>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Skin.Home_PostMarginVertical
    },
    contentContainer: {
        backgroundColor: DefaultColors.Background,
        alignItems: "center",
        padding: 5
    },
    versionText: {
        position: "absolute",
        bottom: 8,
        right: 8,
        color: Skin.PrideraiserCampaignSummary_VersionColor,
        fontSize: 14,
        fontFamily: Skin.Font_Regular
    },
    title: {
        fontSize: 15,
        color: DefaultColors.ColorText,
        fontFamily: Skin.Font_ParsedText
    },
    benefitting: {
        color: DefaultColors.ColorText,
        fontFamily: Skin.Font_ParsedText
    },
    pledged: {
        color: DefaultColors.ColorText,
        fontFamily: Skin.Font_ParsedText
    },
    learnmore: {
        marginTop: 5,
        color: DefaultColors.ColorText,
        fontFamily: Skin.Font_ParsedText
    }
});