import React from 'react';
import {
    Dimensions,
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
import { PRIDERAISER_LOGO, Skin, Settings, Palette } from '../config/Settings';
import { getCampaign } from '../services/prideraiserService';
import moment from 'moment';
import i18n from "../../i18n";

export default class PrideraiserCampaignSummary extends React.Component {
    state = {
        loadedCampaign: false,
        campaign: null,
        error: false,
        errorDetail: null,
        source: ""
    }

    componentWillMount = async () => {
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
        const coverPhotoParams = Settings.PrideraiserCampaignSummary_CampaignCoverParams

        if (this.state.error)
            console.log("PrideraiserCampaignsummary error: " + this.state.errorDetail)

        if (!this.state.loadedCampaign)
            return <View />
        else
            return (
                <TouchableHighlight
                    style={styles.container}
                    underlayColor={'#fff'}
                    onPress={() => {
                        let source = ""
                        if (this.state.source)
                            source = "?source=" + data.source

                        Linking.openURL(data.campaign.public_url + source)
                    }}>
                    <View style={styles.container}>
                        <PrideraiserRainbowBar />
                        <PostImageWrapper
                            containerWidth={Dimensions.get("window").width}
                            source={{ uri: this.state.campaign.cover_photo.original + coverPhotoParams }} />
                        <View style={styles.contentContainer}>
                            <RegularText>text</RegularText>
                        </View>
                        <PrideraiserRainbowBar />
                    </View>
                </TouchableHighlight>
            )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    contentContainer: {
        backgroundColor: Palette.White
    }
});