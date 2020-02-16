import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View
} from 'react-native';
import { RegularText } from '../components/StyledText';
import i18n from "../../i18n";

export default class ImageViewerFooter extends React.Component {
    render() {
        let visible = this.props.visible
        let caption = this.props.images[this.props.index].caption
        let credit = this.props.images[this.props.index].credit

        if (!caption && !credit)
            visible = false

        if (!visible)
            return <View />;
        else {
            return (
                <View style={styles.container}>
                    {caption.length > 0 &&
                        <RegularText style={styles.caption}>{i18n.t('components.imageviewerfooter.captionprefix')}{this.props.images[this.props.index].caption}</RegularText>
                    }
                    {credit.length > 0 &&
                        <RegularText style={styles.credit}>{i18n.t('components.imageviewerfooter.creditprefix')}{this.props.images[this.props.index].credit}</RegularText>
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#00000040",
        padding: 10,
        width: Dimensions.get("window").width
    },
    caption: {
        color: "white"
    },
    credit: {
        color: "white"
    }
});