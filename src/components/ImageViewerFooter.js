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
        let caption = ""
        let credit = ""

        if (this.props.images[this.props.index].hasOwnProperty("metadata"))
            if (this.props.images[this.props.index].metadata.hasOwnProperty("caption"))
                caption = this.props.images[this.props.index].metadata.caption

        if (this.props.images[this.props.index].hasOwnProperty("metadata"))
            if (this.props.images[this.props.index].metadata.hasOwnProperty("credit"))
                credit = this.props.images[this.props.index].metadata.credit

        if (!caption && !credit)
            visible = false

        if (!visible)
            return <View />;
        else {
            return (
                <View style={styles.container}>
                    {caption.length > 0 &&
                        <RegularText style={styles.caption}>{i18n.t('components.imageviewerfooter.captionprefix')}{caption}</RegularText>
                    }
                    {credit.length > 0 &&
                        <RegularText style={styles.credit}>{i18n.t('components.imageviewerfooter.creditprefix')}{credit}</RegularText>
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