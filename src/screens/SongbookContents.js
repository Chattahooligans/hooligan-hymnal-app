import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    SectionList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { DefaultColors, Images, Skin } from '../../config';
import { find } from 'lodash';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { RegularText } from '../components/StyledText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../i18n';

class SongRow extends React.Component {
    render() {
        const song = this.props.song;

        let capoSignal;
        if (song.capoSignal)
            capoSignal = '📢: ' + song.capoSignal;

        let playDisplay;
        let sheetMusicDisplay;
        if (song.referenceLink)
            playDisplay = <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 3 }}>
                <MaterialCommunityIcons name={'play-circle'} style={{ color: Skin.Home_SocialButtons }} />
            </View>
        if (song.sheetMusicLink)
            sheetMusicDisplay = <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 3 }}>
                <Image
                    resizeMode='contain'
                    tintColor={Skin.Home_SocialButtons}
                    source={Images.Songbook_MusicalScore}
                    style={{ height: 12, width: 12 }} />
            </View>

        return (
            <RectButton
                onPress={this._handlePress}
                activeOpacity={0.05}
                style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.row}>
                    <View style={styles.rowData}>
                        <RegularText style={{ color: DefaultColors.ColorText }}>{song.title}</RegularText>
                        {sheetMusicDisplay}
                        {playDisplay}
                        <View style={{ flex: 1, flexDirection: i18n.getFlexDirection(), justifyContent: 'flex-end', opacity: 0.5 }}>
                            <RegularText style={{ marginRight: 10 }}>
                                {capoSignal}
                            </RegularText>
                            <RegularText style={styles.pageLabel}>
                                {song.pageLabel}
                            </RegularText>
                        </View>
                    </View>
                </View>
            </RectButton>
        );
    }

    _handlePress = () => {
        this.props.onPress(this.props.song);
    };
}

class SongbookContents extends React.Component {
    state = {
        showSongbookCover: this.props.globalData.state.showSongbookCover,
        ToCData: this.props.globalData.state.songbookContents
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerTitle: i18n.t('screens.songbook.title')
        })

        this.setData();
    }
    componentDidUpdate(prevProps) {
        /*
        if (prevProps.globalData.state.songbookContents != this.props.globalData.state.songbookContents)
            this.setData()
            */
    }


    setData() {
        if (!this.state.ToCData) {
            this.props.globalData.computeSongbook(() => this.setState({ ToCData: this.props.globalData.state.songbookContents }))
        }

        // simulate load
        if (this.state.showSongbookCover) {
            setTimeout(() => {
                this.setState({ showSongbookCover: false })
                this.props.globalData.setShowSongbookCover(false)
            }, 1000)
        }
    }

    _renderSectionHeader = ({ section }) => {
        return (
            <View style={styles.sectionHeader}>
                <RegularText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{section.title}</RegularText>
            </View>
        );
    };

    _renderItem = ({ item }) => {
        return <SongRow song={item} onPress={this._handlePressRow} />
    };

    _handlePressRow = item => {
        const song = find(this.props.globalData.state.songs, { _id: item._id });
        
        this.props.navigation.navigate('SongbookPages', { page: item.pageLabel });
    };

    render() {
        let { width, height } = Image.resolveAssetSource(Skin.Songbook_Cover)
        let ratio = width / height
        let scaledHeight = Dimensions.get("window").width / ratio

        if (this.state.ToCData && !this.state.showSongbookCover) {
            return (
                <View style={styles.contentsContainer}>
                    <SectionList
                        renderScrollComponent={props => <ScrollView {...props} />}
                        stickySectionHeadersEnabled={false}
                        renderItem={this._renderItem}
                        renderSectionHeader={this._renderSectionHeader}
                        sections={this.state.ToCData}
                        keyExtractor={(item, index) => index} />
                </View>
            )
        }
        else {
            return (
                <View style={styles.coverContainer}>
                    <Image
                        style={{ width: Dimensions.get("window").width, height: scaledHeight }}
                        source={Skin.Songbook_Cover} />
                    <ActivityIndicator size="large" animating={true} color={DefaultColors.Primary} />
                </View>
            )
        }
    }
}

export default withUnstated(SongbookContents, { globalData: GlobalDataContainer });

const styles = StyleSheet.create({
    coverContainer: {
        flex: 1,
        backgroundColor: Skin.Songbook_Background,
        alignItems: "center",
        justifyContent: "space-around",
    },
    contentsContainer: {
        flex: 1,
    },
    row: {
        flex: 1,
        paddingTop: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: i18n.getFlexDirection()
    },
    rowData: {
        flex: 1,
        flexDirection: i18n.getFlexDirection(),
        justifyContent: 'space-between'
    },
    pageLabel: {
        width: 16,
        textAlign: i18n.getRTLTextAlign(),
        color: '#999999'
    },
    sectionHeader: {
        paddingHorizontal: 10,
        paddingTop: 7,
        paddingBottom: 5,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#eee',
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    }
})