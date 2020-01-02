import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    View
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { FontSizes, Layout } from '../constants';
import { Skin, Palette } from '../config/Settings';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import withUnstated from '@airship/with-unstated';
import i18n from "../../i18n";

class Post extends React.Component {
    state = {
        post: {
            publishedAt: Date.now,
            channel: { _id: -1, name: "", avatarUrl: "" },
            text: "",
            images: [],
            attachments: []
        }
    }

    componentDidMount = () => this.setData();
    componentDidUpdate(prevProps) {
        if (!prevProps.post && this.props.post)
            this.setData();
    }

    setData() {
        if (this.props.post) {
            let post = this.props.post;
            post.channel = this.props.globalData.getChannelBasicInfo(this.props.post.channel)
            this.setState({ post });
        }
    }

    render() {
        let post = this.state.post;
        console.log("Rendering Post:\n" + JSON.stringify(post));

        return (
            <View>
                {/* Facebook style */}
                <View style={{ flexDirection: i18n.getFlexDirection() }}>
                    <FadeIn>
                        <Image
                            source={{uri: post.channel.avatarUrl}}
                            style={{ width: 50, height: 50, borderRadius: 25 }} />
                    </FadeIn>
                    <View>
                        <BoldText>{post.channel.name}</BoldText>
                        <RegularText>{post.publishedAt.toString()}</RegularText>
                    </View>
                </View>
                <MediumText>{post.text}</MediumText>
                <RegularText>Images {JSON.stringify(post.images)}</RegularText>
                <RegularText>Attachments {JSON.stringify(post.attachments)}</RegularText>
            </View>
        )
    }
}

export default withUnstated(Post, { globalData: GlobalDataContainer });