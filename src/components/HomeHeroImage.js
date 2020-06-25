import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    View
} from 'react-native';
import { RegularText } from '../components/StyledText';
import PostImageWrapper from './PostImageWrapper';
import { Skin } from '../../config';

import appParams from '../../app.json';

export default class HomeHeroImage extends React.Component {
    render() {
        let { width, height } = Image.resolveAssetSource(Skin.Home_HeroImage)
        let ratio = width / height
        let scaledHeight = Dimensions.get("window").width / ratio;
        console.log(width, height)

        return (
            <View style={styles.container}>
                <Image
                    style={[styles.image, { width: "100%", height: scaledHeight }]}
                    source={Skin.Home_HeroImage} />
                <RegularText style={styles.versionText}>
                    {appParams.expo.version}
                </RegularText>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width
    },
    image: {
        
    },
    versionText: {
        position: "absolute",
        bottom: 8,
        right: 8,
        color: Skin.PrideraiserCampaignSummary_VersionColor,
        fontSize: 14,
        fontFamily: Skin.Font_Regular
    }
});