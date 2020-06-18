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
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import { Skin, DefaultColors, Palette } from '../../config';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from '../i18n';

class RosterRow extends React.Component {
    render() {
        const roster = this.props.roster;

        let thumbnail = Skin.Roster_DefaultThumbnail;
        if (roster.defaultThumbnail)
            thumbnail = { uri: roster.defaultThumbnail };

        return (
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={this._handlePress}
                    activeOpacity={0.2}
                    style={{ flex: 1 }}>
                    <View style={{ flexDirection: i18n.getFlexDirection() }}>
                        <View style={styles.rowImageContainer}>
                            <FadeIn>
                                <Image
                                    source={thumbnail}
                                    style={{ width: 50, height: 50, borderRadius: 25 }}
                                />
                            </FadeIn>
                        </View>
                        <View>
                            <BoldText style={styles.title}>{roster.rosterTitle}</BoldText>
                            <RegularText style={styles.season}>{roster.season}</RegularText>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _handlePress = () => {
        this.props.onPress(this.props.roster);
    };
}

class PostAttachmentSelectMassTweet extends React.Component {    
    state = {
        search: "",
        rosters: []
    }

    componentDidMount() {
        this.props.navigation.setOptions({header: null})
        
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.rosters && this.props.globalData.state.rosters)
            this.setData();
    }

    setData = () => {
        this.setState({ rosters: this.props.globalData.state.rosters });
    }

    _onSearchChange = (text) => {
        this.setState({ search: text });
    }

    isSearchMatch = (roster) => {
        let isMatch = false;
        ["rosterTitle", "season"].forEach((prop) => {
            if (roster[prop] &&
                roster[prop].toLowerCase().includes(this.state.search.toLowerCase()))
                isMatch = true;
        });
        return isMatch;
    }
    compareRosters = (a, b) => {
        // TODO: test season-first sorting
        if (a.season > b.season)
            return true;
        if (b.season > a.season)
            return false;
        return (a.rosterTitle > b.rosterTitle);
    }

    _handlePressRoster = (roster) => {
        if (this.props.route.params.onAttachmentComplete)
            this.props.route.params.onAttachmentComplete({ attachmentType: "masstweet", data: { rosterId: roster._id } });
    }

    render() {
        let filteredRosters = [];
        if (this.state.search == "")
            filteredRosters = this.state.rosters;
        else
            filteredRosters = this.state.rosters.filter(this.isSearchMatch);
        filteredRosters.sort(this.compareRosters);

        return (
            <View style={{ flex: 1 }}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattachmentselectmasstweet.selectroster')}</BoldText>
                <View style={{ flexDirection: i18n.getFlexDirection(), borderWidth: 1 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('screens.postattachmentselectmasstweet.search')}
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
                    data={filteredRosters}
                    renderItem={(item) => { return <RosterRow roster={item.item} onPress={this._handlePressRoster} /> }}
                    keyExtractor={(item) => item._id} />
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
    rowLogoContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    title: {
        fontSize: 18,
        color: DefaultColors.Primary,
        backgroundColor: DefaultColors.Background,
        paddingLeft: 4,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    },
    season: {
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

export default withUnstated(PostAttachmentSelectMassTweet, { globalData: GlobalDataContainer });