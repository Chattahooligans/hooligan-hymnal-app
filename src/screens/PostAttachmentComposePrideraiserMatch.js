import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import PrideraiserCampaignSummary from '../components/PrideraiserCampaignSummary';
import { Ionicons } from '@expo/vector-icons';
import { PRIDERAISER_CAMPAIGN_ID, DefaultColors, Skin } from '../config/Settings';
import { getCampaign } from '../services/prideraiserService';
import moment from 'moment';
import i18n from "../../i18n";

export default class PostAttachmentComposePrideraiserMatch extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        loadedCampaign: false,
        campaign: null,
        goalCount: 0,
        error: false,
        errorDetail: null,
        source: "hooliganhymnal-" + moment(new Date()).format("YYYY-MM-DD")
    }

    componentWillMount = async () => {
        try {
            const campaign = await getCampaign(PRIDERAISER_CAMPAIGN_ID)

            // sanity check to confirm the campaign ID is right
            // campaigns that don't exist look like { "detail": "Not found." }
            if (campaign.hasOwnProperty("id"))
                this.setState({ loadedCampaign: true, campaign })
            else
                this.setState({ loadedCampaign: false, error: true, errorDetail: "Not found." })
        }
        catch (error) {
            this.setState({ loadedCampaign: false, error: true, errorDetail: error })
        }
    }

    render() {
        if (this.state.error)
            alert("Problem loading Prideraiser campaign\n " + (this.state.errorDetail || ""))

        let loader = []
        if (!this.state.loadedCampaign && !this.state.error) {
            loader = <View style={{ flexDirection: i18n.getFlexDirection(), width: "100%" }}>
                <ActivityIndicator
                    animating={true}
                    color={Skin.PostAttachmentComposePrideraiserMatch_ActivityIndicator} />
                <RegularText style={{ color: DefaultColors.ColorText }}>Loading</RegularText>
            </View>
        }
        else if (this.state.error) {
            loader = <RegularText style={{ color: DefaultColors.ColorText }}>
                {"Problem loading Prideraiser campaign\n " + (this.state.errorDetail || "")}
            </RegularText>
        }
        else {
            loader = []
        }

        return (
            <ScrollView style={styles.container}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattachmentcomposeprideraisermatch.prideraisermatch')}</BoldText>
                {loader}
                {this.state.loadedCampaign &&
                    <PrideraiserCampaignSummary
                        campaign={this.state.campaign}
                        paddingHorizontal={styles.container.padding} />}
                <BoldText>{i18n.t('screens.postattachmentcomposeprideraisermatch.howmanygoals')}</BoldText>
                <TextInput
                    style={styles.goalCountInput}
                    placeholder={i18n.t('screens.postattachmentcomposeprideraisermatch.goals')}
                    onChangeText={(text) => this.setState({ goalCount: parseInt(text, 10) })} />
                <BoldText>{i18n.t('screens.postattachmentcomposeprideraisermatch.analytics')}</BoldText>
                <TextInput
                    style={styles.sourceInput}
                    value={this.state.source}
                    placeholder={i18n.t('screens.postattachmentcomposeprideraisermatch.source')}
                    onChangeText={(text) => this.setState({ source: text })} />
                <BigButton
                    disabled={!this.state.loadedCampaign}
                    buttonStyle={!this.state.loadedCampaign ? { backgroundColor: "gray", marginBottom: 15 } : { marginBottom: 15 }}
                    label={i18n.t('screens.postattachmentcomposeprideraisermatch.attach')}
                    iconName="md-add" iconPosition="right"
                    onPress={() => {
                        if (this.props.screenProps.onAttachmentComplete)
                            this.props.screenProps.onAttachmentComplete(
                                {
                                    attachmentType: "prideraisermatch",
                                    data: {
                                        campaignId: PRIDERAISER_CAMPAIGN_ID,
                                        goalCount: this.state.goalCount,
                                        pledgeLevel: 420.69,
                                        source: this.state.source
                                    }
                                }
                            );
                    }} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    goalCountInput: {
        fontSize: 24,
        fontWeight: 'bold',
        height: 50
    },
    sourceInput: {

    }
});
