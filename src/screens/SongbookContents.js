import React from 'react';
import {
    Image,
    SectionList,
    StyleSheet,
    View
} from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { DefaultColors, Skin } from '../../config';
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
                <MaterialCommunityIcons name={'music-clef-treble'} style={{ color: Skin.Home_SocialButtons }} />
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
        ToCData: this.props.globalData.state.songbookContents
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerTitle: i18n.t('screens.songbook.title')
        })

        this.setData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.globalData.state.songbookContents != this.props.globalData.state.songbookContents)
            this.setData()
    }


    setData() {
        if (!this.state.ToCData)
            this.props.globalData.computeSongbook(() => this.setState({ ToCData: this.props.globalData.state.songbookContents }))
    }

    _renderSectionHeader = ({ section }) => {
        return (
            <View style={styles.sectionHeader}>
                <RegularText style={{ textAlign: 'center', writingDirection: i18n.getWritingDirection() }}>{section.title}</RegularText>
            </View>
        );
    };

    _renderItem = ({ item }) => {
        return <SongRow song={item} onPress={this._handlePressRow} />
    };

    _handlePressRow = item => {
        this.props.navigation.navigate('SongbookPages', { page: item.pageLabel });
    };

    render() {
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
}

export default withUnstated(SongbookContents, { globalData: GlobalDataContainer });

const styles = StyleSheet.create({
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