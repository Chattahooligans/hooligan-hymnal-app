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
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { FontSizes } from '../constants';
import { RegularText } from '../components/StyledText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../i18n';

class SongbookContents extends React.Component {
    state = {
        showSongbookCover: this.props.globalData.state.showSongbookCover
    }

    componentDidMount() {
        // simulate load
        if (this.state.showSongbookCover) {
            setTimeout(() => {
                this.setState({ showSongbookCover: false })
                this.props.globalData.setShowSongbookCover(false)
            }, 1000)
        }
    }

    render() {
        let { width, height } = Image.resolveAssetSource(Skin.Songbook_Cover)
        let ratio = width / height
        let scaledHeight = Dimensions.get("window").width / ratio

        if (this.state.showSongbookCover) {
            return (
                <View style={styles.coverContainer}>
                    <Image
                        style={{ width: Dimensions.get("window").width, height: scaledHeight }}
                        source={Skin.Songbook_Cover} />
                    <ActivityIndicator size="large" animating={true} color={DefaultColors.Primary} />
                </View>
            )
        }
        else {
            return (
                <View style={styles.contentsContainer}>
                    <Text>Songbook Contents</Text>
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
    }
})