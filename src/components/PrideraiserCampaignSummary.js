import React from 'react';
import {
    Dimensions,
    Image,
    Linking,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, RegularTextMonospace } from './StyledText';
import { formatStringWithCampaignProps, PrideraiserPalette } from './PrideraiserHelper';
import PrideraiserRainbowBar from './PrideraiserRainbowBar';
import PostImageWrapper from './PostImageWrapper';
import { PRIDERAISER_LOGO, Skin, Settings } from '../config/Settings';
import { getCampaign } from '../services/prideraiserService';
import i18n from "../../i18n";

export default class PrideraiserCampaignSummary extends React.Component {

    // TODO: Move a bunch of shit to settings


    state = {
        loadedCampaign: false,
        campaign: {},
        error: false,
        errorDetail: null,
        source: ""
    }

    componentWillMount = async () => {
        try {
            const campaign = await getCampaign(Settings.Prideraiser_CampaignId)

            // sanity check to confirm the campaign ID is right
            // campaigns that don't exist look like { "detail": "Not found." }
            if (campaign.hasOwnProperty("id")) {
                // populate analytics source from Skin
                let source = ""
                if (Skin.PostAttachmentComposePrideraiserMatch_AnalyticsSourcePrefix)
                    source += Skin.PostAttachmentComposePrideraiserMatch_AnalyticsSourcePrefix + "-"
                source += moment(new Date()).format(Skin.PostAttachmentComposePrideraiserMatch_AnalyticsSourceDateFormat)
                if (Skin.PostAttachmentComposePrideraiserMatch_AnalyticsSourceSuffix)
                    source += "-" + Skin.PostAttachmentComposePrideraiserMatch_AnalyticsSourceSuffix

                this.setState({ loadedCampaign: true, campaign, source })
            }
            else
                this.setState({ loadedCampaign: false, error: true, errorDetail: "Not found." })
        }
        catch (error) {
            this.setState({ loadedCampaign: false, error: true, errorDetail: error })
        }
    }

    render() {
        // move this to settings
        const coverPhotoParams = Settings.Prideraiser_CampaignCoverParams

        if (!this.state.loadedCampaign)
            return <View />
        else
            return (
                <TouchableHighlight
                    style={styles.container}
                    underlayColor={'#fff'}>
                    <PrideraiserRainbowBar />
                    <RegularText>text</RegularText>
                    <PostImageWrapper
                        containerWidth={Dimensions.get("window").width}
                        source={{ uri: this.state.campaign.cover_photo.original + coverPhotoParams }} />
                </TouchableHighlight>
            )
    }
}

const styles = StyleSheet.create({
    container: {

    }
});