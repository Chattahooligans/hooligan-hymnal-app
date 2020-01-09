import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DefaultColors } from '../config/Settings';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import withUnstated from '@airship/with-unstated';
import PostAttachmentGkNickname from './PostAttachmentGkNickname';
import PostAttachmentMassTweet from './PostAttachmentMassTweet';
import PostAttachmentPlayer from './PostAttachmentPlayer';
import PostAttachmentSong from './PostAttachmentSong';
import i18n from "../../i18n";

class PostAttachmentDeleteWrapper extends React.Component {
    render() {
        let attachment = this.props.attachment;
        let index = this.props.index;
        let attachmentDisplay;

        switch (attachment.type.toLowerCase()) {
            case "player":
                let player = this.props.globalData.state.players.find(player => player._id === attachment._id);
                let playerDisplay = <PostAttachmentPlayer key={index} player={player}
                    onPress={() => { this.props.navigation.navigate("Player", { player }) }} />
                attachmentDisplay = playerDisplay;
                break;
            case "song":
                let song;
                if (attachment._id) {
                    song = this.props.globalData.state.songs.find(song => song._id === attachment._id);
                } else if (attachment.data) {
                    song = attachment.data;
                }
                let songDisplay = <PostAttachmentSong key={index} song={song}
                    onPress={() => { this.props.navigation.navigate("SingleSong", { song }) }} />
                attachmentDisplay = songDisplay;
                break;
            case "gknickname":
                let gkNickname = attachment.data;
                let gkNicknameDisplay = <PostAttachmentGkNickname key={index} gkNickname={gkNickname} />
                attachmentDisplay = gkNicknameDisplay;
                break;
            case "masstweet":
                let roster = this.props.globalData.state.rosters.find(roster => roster._id === attachment.data.rosterId);
                let massTweetDisplay = <PostAttachmentMassTweet key={index} roster={roster}
                    onPress={() => { this.props.navigation.navigate("TwitterList", { roster }) }} />
                attachmentDisplay = massTweetDisplay;
                break;
            default:
                attachmentDisplay = <RegularText key={index}>Can't render attachment {JSON.stringify(attachment)}</RegularText>;
        }

        return (
            <View
                style={{ flexDirection: i18n.getFlexDirection() }}>
                <View style={{ flex: 1 }} pointerEvents="none">
                    {attachmentDisplay}
                </View>
                <TouchableOpacity
                    onPress={() => this.props.onPressDelete(this.props.attachment)}>
                    <Ionicons
                        name="md-close"
                        size={50}
                        style={{ color: DefaultColors.Primary, backgroundColor: 'transparent', margin: 5 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default withUnstated(PostAttachmentDeleteWrapper, { globalData: GlobalDataContainer });