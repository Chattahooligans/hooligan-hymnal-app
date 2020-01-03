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
import i18n from "../../i18n";

class PostAttach extends React.Component {
    state = {
        onAttachmentComplete: null
    }

    componentDidMount = () => this.setData();
    componentDidUpdate(prevProps) {
        if (!prevProps.onAttachmentComplete && this.props.onAttachmentComplete)
            this.setData();
    }

    setData() {
        if (this.props.onAttachmentComplete) {
            let onAttachmentComplete = this.props.onAttachmentComplete
            this.setState({ onAttachmentComplete });
        }
    }
    render() {
        let onAttachmentComplete = this.state.onAttachmentComplete;
        console.log("onAttachmentComplete is:\n" + onAttachmentComplete);

        return (
            <View style={{ flex: 1 }} setData>
                <BoldText style={{textAlign: 'center'}}>Post Attachment Types</BoldText>

                <BigButton label="Select Player" iconName="md-person" />
                <BigButton label="Select Song" iconName="md-musical-notes" />
                <BigButton label="Compose Song" iconName="md-microphone" />
                <BigButton label="GK Nickname" iconName="md-hand" />
                <BigButton label="Tweet the Players" iconName="logo-twitter" />
                <BigButton label="Link to Songbook" iconName="md-book" />
                <BigButton label="Link to Roster" iconName="md-people" />

                <BigButton inModal={true} label="SIMULATE COMPLETE" iconName="md-checkmark" iconPosition="right" onPress={this._handlePressSimulate} />
            </View>
        )
    }

    _handlePressSimulate = () => {
        console.log("simulate click");
        alert("simulate click");
        if (this.state.onAttachmentComplete)
            this.state.onAttachmentComplete();
    };
}

const styles = StyleSheet.create({

});

export default withUnstated(PostAttach, { globalData: GlobalDataContainer });