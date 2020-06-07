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
import PrideraiserCampaignSummaryAdmin from '../components/PrideraiserCampaignSummaryAdmin';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultColors, Skin, Settings } from '../../config';
import { getCampaign } from '../services/prideraiserService';
import moment from 'moment';
import i18n from '../i18n';

export default class PostAttachmentComposePrideraiserMatch extends React.Component {
    state = {
        loadedCampaign: false,
        campaign: {
            goal_name_plural: "Goals"
        },
        goalCount: 0,
        error: false,
        errorDetail: null,
        source: ""
    }

    componentDidMount = async () => {
        this.props.navigation.setOptions({
            header: null
        })

        try {
            const campaign = await getCampaign(Settings.Prideraiser_CampaignId)

            // sanity check to confirm the campaign ID is right
            // campaigns that don't exist look like { "detail": "Not found." }
            if (campaign.hasOwnProperty("id")) {
                // populate analytics source from Skin
                let source = ""
                if (Settings.PostAttachmentComposePrideraiserMatch_AnalyticsSourcePrefix)
                    source += Settings.PostAttachmentComposePrideraiserMatch_AnalyticsSourcePrefix + "-"
                source += moment(new Date()).format(Settings.PostAttachmentComposePrideraiserMatch_AnalyticsSourceDateFormat)
                if (Settings.PostAttachmentComposePrideraiserMatch_AnalyticsSourceSuffix)
                    source += "-" + Settings.PostAttachmentComposePrideraiserMatch_AnalyticsSourceSuffix

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
        if (this.state.error)
            alert("Problem loading Prideraiser campaign\n " + (this.state.errorDetail || ""))

        let loader = []
        if (!this.state.loadedCampaign && !this.state.error) {
            loader = <View style={{ flexDirection: i18n.getFlexDirection(), width: "100%" }}>
                <ActivityIndicator
                    animating={true}
                    color={Settings.PostAttachmentComposePrideraiserMatch_ActivityIndicator} />
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
                    <PrideraiserCampaignSummaryAdmin
                        campaign={this.state.campaign}
                        paddingHorizontal={styles.container.padding} />}
                <BoldText>{i18n.t('screens.postattachmentcomposeprideraisermatch.howmanygoals').replace("%goal_name_plural%", this.state.campaign.goal_name_plural)}</BoldText>
                <TextInput
                    style={styles.goalCountInput}
                    placeholder={this.state.campaign.goal_name_plural}
                    onChangeText={(text) => this.setState({ goalCount: parseInt(text, 10) })}
                    keyboardType={'numeric'} />
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
                    iconName="plus" iconPosition="right"
                    onPress={() => {
                        if (this.props.route.params.onAttachmentComplete)
                            this.props.route.params.onAttachmentComplete(
                                {
                                    attachmentType: "prideraisermatch",
                                    data: {
                                        // our own values
                                        goalCount: this.state.goalCount,
                                        source: this.state.source,
                                        // and select values from the campaign API
                                        campaign: {
                                            public_url: this.state.campaign.public_url,
                                            name: this.state.campaign.name,
                                            team_name: this.state.campaign.team_name,
                                            charity_name: this.state.campaign.charity_name,
                                            goal_name: this.state.campaign.goal_name,
                                            goal_name_plural: this.state.campaign.goal_name_plural,
                                            goals_made: this.state.campaign.goals_made,
                                            pledge_count: this.state.campaign.pledge_count,
                                            pledged_total: this.state.campaign.pledged_total,
                                            supporter_group: {
                                                name: this.state.campaign.supporter_group.name
                                            }
                                        }
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
