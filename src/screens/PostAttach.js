import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import NavigationOptions from '../config/NavigationOptions';
import { Settings } from '../config/Settings';
import i18n from "../../i18n";

class PostAttach extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattach.attachmenttypes')}</BoldText>

                <BigButton
                    label={i18n.t('screens.postattach.selectplayer')} iconName="md-person"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentSelectPlayer", {
                            onAttachmentComplete: this.props.screenProps.onAttachmentComplete
                        })
                    }} />
                <BigButton label={i18n.t('screens.postattach.selectsong')} iconName="md-musical-notes"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentSelectSong", {
                            onAttachmentComplete: this.props.screenProps.onAttachmentComplete
                        })
                    }} />
                <BigButton label={i18n.t('screens.postattach.composesong')} iconName="md-microphone"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentComposeSong", {
                            onAttachmentComplete: this.props.screenProps.onAttachmentComplete
                        })
                    }} />
                <BigButton label={i18n.t('screens.postattach.masstweet')} iconName="logo-twitter"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentSelectMassTweet", {
                            onAttachmentComplete: this.props.screenProps.onAttachmentComplete
                        })
                    }} />
                {Settings.CapoHome_GKNicknameEnabled &&
                    <BigButton label={i18n.t('screens.postattach.gknickname')} iconName="md-hand"
                        onPress={() => {
                            this.props.navigation.navigate("PostAttachmentComposeGkNickname", {
                                onAttachmentComplete: this.props.screenProps.onAttachmentComplete
                            })
                        }} />
                }
                {Settings.Juanstagram &&
                    <BigButton label={"Juanstagram"} iconName="md-heart-empty" inModal={true}
                        onPress={() => {
                            this.props.navigation.navigate("PostAttachmentSelectJuanstagram", {
                                onAttachmentComplete: this.props.screenProps.onAttachmentComplete
                            })
                        }} />
                }

                <BigButton
                    disabled={true}
                    label="Link to App Songbook" iconName="md-book"
                    buttonStyle={{ backgroundColor: "gray" }} />
                <BigButton
                    disabled={true}
                    label="Link to App Roster" iconName="md-people"
                    buttonStyle={{ backgroundColor: "gray" }} />
            </ScrollView>
        )
    }

    onAttachmentComplete = (data) => {
        if (this.onAttachmentComplete)
            this.onAttachmentComplete(data);
    }
}

export default withUnstated(PostAttach, { globalData: GlobalDataContainer });

