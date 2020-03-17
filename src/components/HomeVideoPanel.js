import React from 'react';
import {
    Image,
    StyleSheet,
    View
} from 'react-native';
import { Layout } from '../constants';
import VideoBackground from '../components/VideoBackground';
import { RegularText } from '../components/StyledText';
import { DefaultColors, Skin } from '../config/Settings';
import appParams from '../../app.json';

export default class HomeVideoPanel extends React.Component {
    render() {
        return (
            <View
                style={styles.container}>
                <View style={styles.headerVideoLayer}>
                    <VideoBackground />
                    <View style={styles.headerVideoOverlay} />
                </View>
                <Image
                    source={Skin.Home_VideoOverlay}
                    style={{ height: 100, resizeMode: 'contain', marginTop: 20 }} />
                <View style={styles.headerContent}>
                    <RegularText style={styles.versionText}>
                        {appParams.expo.version}
                    </RegularText>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Skin.HomeVideoPanel_TintColor,
        padding: 8,
        paddingTop: Layout.headerHeight - 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContent: {
        flex: 1,
        alignItems: 'flex-end',
        width: 100 + '%',
        marginTop: 5
    },
    headerVideoLayer: {
        ...StyleSheet.absoluteFillObject
    },
    headerVideoOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Skin.HomeVideoPanel_TintColor,
        opacity: Skin.HomeVideoPanel_TintOpacity
    },
    versionText: {
        color: DefaultColors.HeaderText,
        fontSize: 14
    }
});
