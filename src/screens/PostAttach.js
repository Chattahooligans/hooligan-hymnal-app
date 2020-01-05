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
import { Skin, DefaultColors } from '../config/Settings';
import i18n from "../../i18n";

class PostAttach extends React.Component {
    static navigationOptions = {
        title: "Add Attachment to Post",
        headerStyle: { backgroundColor: DefaultColors.NavigationBarBackground },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontFamily: 'heebo-bold'
        }
    };

    state = {
        onAttachmentComplete: null
    }

    componentDidMount = () => this.setData();
    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.onAttachmentComplete && this.props.globalData.state.onAttachmentComplete)
            this.setData();
    }

    setData() {
        console.log("PostAttach.setData");
        this.setState({ onAttachmentComplete: this.props.globalData.state.onAttachmentComplete });
    }
    render() {
        console.log("state.onAttachmentComplete is:\n" + this.state.onAttachmentComplete);
        console.log("props.screenProps: " + JSON.stringify(this.props.screenProps));

        return (
            <ScrollView style={{ flex: 1 }}>
                    <BoldText style={{ textAlign: 'center' }}>Attachment Types</BoldText>

                    <BigButton
                        label="Select Player" iconName="md-person" inModal={true}
                        onPress={() => {
                            let params = {
                                onAttachmentComplete: this.state.onAttachmentComplete,
                                test: "test"
                            }
                            console.log("passing params to button: " + JSON.stringify(params))
                            this.props.navigation.navigate("PostAttachmentSelectPlayer", params)
                        }} />
                    <BigButton label="Select Song" iconName="md-musical-notes" inModal={true}
                        onPress={() => { this.props.navigation.navigate("PostAttachmentSelectSong") }} />
                    <BigButton label="Compose Song" iconName="md-microphone" inModal={true}
                        onPress={() => { this.props.navigation.navigate("PostAttachmentComposeSong") }} />
                    <BigButton label="GK Nickname" iconName="md-hand" inModal={true}
                        onPress={() => { this.props.navigation.navigate("PostAttachmentComposeGkNickname") }} />
                    <BigButton label="Tweet the Players" iconName="logo-twitter" inModal={true}
                        onPress={() => { this.props.navigation.navigate("PostAttachmentSelectMassTweet") }} />

                    <BigButton label="Link to App Songbook" iconName="md-book"
                        style={{ backgroundColor: "gray" }} />
                    <BigButton label="Link to App Roster" iconName="md-people"
                        style={{ backgroundColor: "gray" }} />

                    <BigButton inModal={true} label="SIMULATE COMPLETE" iconName="md-checkmark" iconPosition="right" onPress={this._handlePressSimulate} />
                </ScrollView>
        )
    }

    onAttachmentComplete = (data) => {
        if (this.onAttachmentComplete)
            this.onAttachmentComplete(data);
    }

    _handlePressSimulate = () => {
        console.log("simulate click");
        alert("simulate click");
        if (this.state.onAttachmentComplete)
            this.state.onAttachmentComplete();
    };
}

export default withUnstated(PostAttach, { globalData: GlobalDataContainer });

