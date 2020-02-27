import React from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { PRIDERAISER_CAMPAIGN_ID } from '../config/Settings';
import { getCampaign } from '../services/prideraiserService';
import i18n from "../../i18n";

export default class PostAttachmentComposeSong extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        loadedCampaign: false,
        campaign: "",
        goalCount: 0
    }

    componentWillMount = async () => {
        try {
            const campaign = await getCampaign(PRIDERAISER_CAMPAIGN_ID)
            this.setState({ loadedCampaign: true, campaign })
        }
        catch (e) {
            alert("could not load campaign (" + PRIDERAISER_CAMPAIGN_ID + "): " + e.toString());
        }
    }

    render() {
        if (this.state.loadedCampaign) {
            console.log("PRIDERAISER CAMPAIGN")
            console.log(this.state.campaign)
        }

        return (
            <View style={styles.container}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattachmentcomposeprideraiser.prideraiser')}</BoldText>
                <TextInput
                    style={styles.goalCountInput}
                    placeholder={i18n.t('screens.postattachmentcomposeprideraiser.howmanygoals')}
                    onChangeText={(text) => this.setState({ goalCount: parseInt(text, 10) })} />
                <BigButton
                    label={i18n.t('screens.postattachmentcomposeprideraiser.attach')}
                    iconName="md-add" iconPosition="right"
                    onPress={() => {
                        if (this.props.screenProps.onAttachmentComplete)
                            this.props.screenProps.onAttachmentComplete(
                                {
                                    attachmentType: "song",
                                    data: {
                                        title: this.state.title,
                                        lyrics: this.state.lyrics
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
