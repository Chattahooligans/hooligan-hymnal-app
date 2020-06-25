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
import { Settings, Skin } from '../../config';
import i18n from '../i18n';

class PostAttach extends React.Component {
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattach.attachmenttypes')}</BoldText>

                <BigButton
                    label={i18n.t('screens.postattach.selectplayer')} iconName="account"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentSelectPlayer", {
                            onAttachmentComplete: this.props.onAttachmentComplete
                        })
                    }} />
                <BigButton label={i18n.t('screens.postattach.selectsong')} iconName="music"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentSelectSong", {
                            onAttachmentComplete: this.props.onAttachmentComplete
                        })
                    }} />
                <BigButton label={i18n.t('screens.postattach.composesong')} iconName="microphone"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentComposeSong", {
                            onAttachmentComplete: this.props.onAttachmentComplete
                        })
                    }} />
                <BigButton label={i18n.t('screens.postattach.masstweet')} iconName="twitter"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentSelectMassTweet", {
                            onAttachmentComplete: this.props.onAttachmentComplete
                        })
                    }} />
                {Settings.PostAttach_ShowGKNickname &&
                    <BigButton label={i18n.t('screens.postattach.gknickname')} iconName="hand"
                        onPress={() => {
                            this.props.navigation.navigate("PostAttachmentComposeGkNickname", {
                                onAttachmentComplete: this.props.onAttachmentComplete
                            })
                        }} />
                }
                {Settings.PostAttach_ShowJuanstagram &&
                    <BigButton label={"Juanstagram"} iconName="account-heart-outline" inModal={true}
                        onPress={() => {
                            this.props.navigation.navigate("PostAttachmentSelectJuanstagram", {
                                onAttachmentComplete: this.props.onAttachmentComplete
                            })
                        }} />
                }
                <BigButton label={i18n.t('screens.postattach.prideraisermatch')} iconName="chart-line"
                    onPress={() => {
                        this.props.navigation.navigate("PostAttachmentComposePrideraiserMatch", {
                            onAttachmentComplete: this.props.onAttachmentComplete
                        })
                    }} />

                <BigButton
                    disabled={true}
                    label="Link to App Songbook" iconName={Skin.Icon_Songbook}
                    buttonStyle={{ backgroundColor: "gray" }} />
                <BigButton
                    disabled={true}
                    label="Link to App Roster" iconName={Skin.Icon_Roster}
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

