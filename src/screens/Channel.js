import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
import Post from '../components/Post';
import NavigationOptions from '../config/NavigationOptions';
import { HeaderBackButton } from 'react-navigation';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { DefaultColors, Palette, Skin } from '../config/Settings';

class Channel extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "View Post",
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    render() {
        let channelData = this.props.globalData.getChannelBasicInfo(this.props.channelId)

        let channelPosts = [];
        let channelPostsDisplay = [];

        return (
            <ScrollView>
                <Image source={{uri: channelData.headerUrl}} />
                <Image source={{uri: channelData.avatarUrl}} />
                <BoldText>{channelData.name}</BoldText>
                <RegularText>{channelData.description}</RegularText>
                {channelPostsDisplay}
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default withUnstated(Channel, { globalData: GlobalDataContainer });