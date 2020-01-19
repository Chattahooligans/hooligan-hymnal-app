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
import { Ionicons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from "../../i18n";

class PlayerRow extends React.Component {
    render() {
        const player = this.props.player;

        let thumbnail = Skin.Roster_DefaultThumbnail;
        if (player.defaultThumbnail)
            thumbnail = { uri: player.defaultThumbnail };
        if (player.thumbnail)
            thumbnail = { uri: player.thumbnail };

        return (
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={this._handlePress}
                    activeOpacity={0.2}
                    style={{ flex: 1 }}>
                    <View style={{ flexDirection: i18n.getFlexDirection() }}>
                        <View style={styles.rowAvatarContainer}>
                            <FadeIn>
                                <Image
                                    source={thumbnail}
                                    style={{ width: 50, height: 50, borderRadius: 25 }}
                                />
                            </FadeIn>
                        </View>
                        <View style={styles.rowData}>
                            <View
                                style={{ width: 25, alignItems: 'flex-end', paddingRight: 5 }}
                            >
                                <BoldText>{player.squadNumber}</BoldText>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <MediumText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{player.name}</MediumText>
                                <RegularText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{i18n.t('positions.' + player.position)}</RegularText>
                                <RegularText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{player.flag}</RegularText>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _handlePress = () => {
        this.props.onPress(this.props.player);
    };
}

class PostAttachmentSelectPlayer extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        search: "",
        players: []
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.players && this.props.globalData.state.players)
            this.setData();
    }

    setData = () => {
        this.setState({ players: this.props.globalData.state.players });
    }

    _onSearchChange = (text) => {
        this.setState({ search: text });
    }

    isSearchMatch = (player) => {
        let isMatch = false;
        ["name", "squadNumber", "position"].forEach((prop) => {
            if (player[prop] &&
                player[prop].toLowerCase().includes(this.state.search.toLowerCase()))
                isMatch = true;
        });
        return isMatch;
    }
    comparePlayers = (a, b) => {
        return (a.name > b.name);
    }

    _handlePressPlayer = (player) => {
        if (this.props.screenProps.onAttachmentComplete)
            this.props.screenProps.onAttachmentComplete({ attachmentType: "player", relatedId: player._id });
    }

    render() {
        let filteredPlayers = [];
        if (this.state.search == "")
            filteredPlayers = this.state.players;
        else
            filteredPlayers = this.state.players.filter(this.isSearchMatch);
        filteredPlayers.sort(this.comparePlayers);

        return (
            <View style={{ flex: 1 }}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattachmentselectplayer.selectplayer')}</BoldText>
                <View style={{ flexDirection: i18n.getFlexDirection(), borderWidth: 1 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('screens.postattachmentselectplayer.search')}
                        value={this.state.search}
                        onChangeText={this._onSearchChange} />
                    <TouchableOpacity
                        onPress={() => this.setState({ search: "" })}>
                        <Ionicons
                            name={"md-close"}
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
                    data={filteredPlayers}
                    renderItem={(item) => { return <PlayerRow player={item.item} onPress={this._handlePressPlayer} /> }}
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
        backgroundColor: Palette.White,
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: i18n.getFlexDirection()
    },
    rowAvatarContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    rowData: {
        flex: 1,
        flexDirection: i18n.getFlexDirection()
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 4,
        fontSize: 18,
        textAlign: i18n.getRTLTextAlign()
    },
});

export default withUnstated(PostAttachmentSelectPlayer, { globalData: GlobalDataContainer });