import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { PRIDERAISER_CAMPAIGN_ID, DefaultColors, Skin } from '../config/Settings';
import { getCampaign } from '../services/prideraiserService';
import i18n from "../../i18n";

export default class PostAttachmentComposePrideraiserMatch extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        loadedCampaign: false,
        campaign: "",
        goalCount: 0,
        error: false,
        errorDetail: null
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
        let campaignSummary = []
        if (!this.state.loadedCampaign && !this.state.error) {
            loader = <View style={{ flexDirection: i18n.getFlexDirection(), width: "100%" }}>
                <ActivityIndicator
                    animating={true}
                    color={Skin.PostAttachmentComposePrideraiserMatch_ActivityIndicator} />
                <RegularText style={{ color: DefaultColors.ColorText }}>Loading</RegularText>
            </View>
        }
        else if (this.state.loadedCampaign && !this.state.error) {
            loader = <RegularText style={{ color: DefaultColors.ColorText }}>Loaded: {this.state.campaign.name}</RegularText>
            campaignSummary = <RegularText>some campaign details</RegularText>
        }
        else if (this.state.error) {
            loader = <RegularText style={{ color: DefaultColors.ColorText }}>
                {"Problem loading Prideraiser campaign\n " + (this.state.errorDetail || "")}
            </RegularText>
        }

        return (
            <View style={styles.container}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattachmentcomposeprideraisermatch.prideraiser')}</BoldText>
                {loader}
                {this.state.loadedCampaign &&
                    campaignSummary}
                <TextInput
                    style={styles.goalCountInput}
                    placeholder={i18n.t('screens.postattachmentcomposeprideraisermatch.howmanygoals')}
                    onChangeText={(text) => this.setState({ goalCount: parseInt(text, 10) })} />
                <BigButton
                    disabled={!this.state.loadedCampaign}
                    buttonStyle={!this.state.loadedCampaign ? { backgroundColor: "gray" } : {}}
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
                                        pledgeLevel: 420.69
                                    }
                                }
                            );
                    }} />
            </View>
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
    }
});
