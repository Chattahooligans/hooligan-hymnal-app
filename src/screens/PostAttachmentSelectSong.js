import React from 'react';
import {
    Image,
    FlatList,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import { Skin, DefaultColors, Palette } from '../../config';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from '../i18n';

class SongRow extends React.Component {
    render() {
        const song = this.props.song;

        let referenceDisplay;
        if (song.referenceTitle)
            referenceDisplay = <RegularText style={styles.reference}>{song.referenceTitle}</RegularText>

        let lyrics = song.lyrics + "\n";
        lyrics = lyrics.substring(0, lyrics.indexOf("\n"));

        return (
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={this._handlePress}
                    activeOpacity={0.2}
                    style={{ flex: 1 }}>
                    <BoldText style={styles.title}>{song.title}</BoldText>
                    {referenceDisplay}
                    <ParsedText
                        parse={
                            [
                                { pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted },
                                { pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted }
                            ]
                        }
                        style={styles.lyrics}>
                        {lyrics}...
                    </ParsedText>
                </TouchableOpacity>
            </View>
        );
    }

    _renderFormatted = (matchingString) => {
        return matchingString.slice(1, matchingString.length - 1)
    }

    _handlePress = () => {
        this.props.onPress(this.props.song);
    };
}

class PostAttachmentSelectSong extends React.Component {
    state = {
        search: "",
        songs: []
    }

    componentDidMount() {
        this.props.navigation.setOptions({ header: null })
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.songs && this.props.globalData.state.songs)
            this.setData();
    }

    setData = () => {
        this.setState({ songs: this.props.globalData.state.songs });
    }

    _onSearchChange = (text) => {
        this.setState({ search: text });
    }

    isSearchMatch = (song) => {
        let isMatch = false;
        ["title", "reference", "lyrics", "category"].forEach((prop) => {
            if (song[prop] &&
                song[prop].toLowerCase().includes(this.state.search.toLowerCase()))
                isMatch = true;
        });
        return isMatch;
    }
    compareSongs = (a, b) => {
        return (a.title > b.title);
    }

    _handlePressSong = (song) => {
        if (this.props.route.params.onAttachmentComplete)
            this.props.route.params.onAttachmentComplete({ attachmentType: "song", relatedId: song._id });
    }

    render() {
        let filteredSongs = [];
        if (this.state.search == "")
            filteredSongs = this.state.songs;
        else
            filteredSongs = this.state.songs.filter(this.isSearchMatch);
        filteredSongs.sort(this.compareSongs);

        return (
            <View style={{ flex: 1 }}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattachmentselectsong.selectsong')}</BoldText>
                <View style={{ flexDirection: i18n.getFlexDirection(), borderWidth: 1 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('screens.postattachmentselectsong.search')}
                        value={this.state.search}
                        onChangeText={this._onSearchChange} />
                    <TouchableOpacity
                        onPress={() => this.setState({ search: "" })}>
                        <MaterialCommunityIcons
                            name={"close"}
                            size={23}
                            style={{
                                color: DefaultColors.ButtonBackground,
                                backgroundColor: 'transparent',
                                marginHorizontal: 8,
                                marginVertical: 3
                            }} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    renderScrollComponent={props => <ScrollView {...props} />}
                    data={filteredSongs}
                    renderItem={(item) => { return <SongRow song={item.item} onPress={this._handlePressSong} /> }}
                    keyExtractor={(item) => item._id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        paddingTop: 10,
        padding: 10,
        backgroundColor: DefaultColors.Background,
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: i18n.getFlexDirection()
    },
    title: {
        fontSize: 18,
        color: DefaultColors.Primary,
        backgroundColor: DefaultColors.Background,
        paddingLeft: 4,
    },
    reference: {
        fontSize: 14,
        fontStyle: 'italic',
        fontFamily: Skin.Font_Italic,
        color: DefaultColors.Primary,
        backgroundColor: DefaultColors.Background,
        paddingLeft: 12
    },
    lyrics: {
        fontFamily: Skin.Font_ParsedText,
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
        color: DefaultColors.Primary,
        backgroundColor: DefaultColors.Background,
        paddingLeft: 12,
        paddingTop: 3,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 4,
        fontSize: 18,
        textAlign: i18n.getRTLTextAlign()
    },
});

export default withUnstated(PostAttachmentSelectSong, { globalData: GlobalDataContainer });