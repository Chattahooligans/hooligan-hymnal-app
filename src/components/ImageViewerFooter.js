import React from "react";
import {
  Clipboard,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RegularText } from "../components/StyledText";
import ParsedText from "react-native-parsed-text";
import {
  parsePatterns,
  parsedStyles,
  renderBoldItalic,
  onUrlPress,
  onEmailPress,
} from "./ParsedTextHelper";
import Toast from "react-native-tiny-toast";
import i18n from "../i18n";

export default class ImageViewerFooter extends React.Component {
  setClipboard = () => {
    let forClipboard = "";

    if (this.props.images[this.props.index].hasOwnProperty("metadata")) {
      if (
        this.props.images[this.props.index].metadata.hasOwnProperty("caption")
      ) {
        let caption = this.props.images[this.props.index].metadata.caption;

        if (caption.length > 0)
          forClipboard +=
            i18n.t("components.imageviewerfooter.captionprefix") + caption;
      }
    }

    if (this.props.images[this.props.index].hasOwnProperty("metadata")) {
      if (
        this.props.images[this.props.index].metadata.hasOwnProperty("credit")
      ) {
        let credit = this.props.images[this.props.index].metadata.credit;

        if (forClipboard.length > 0) forClipboard += "\n";
        if (credit.length > 0)
          forClipboard +=
            i18n.t("components.imageviewerfooter.creditprefix") + credit;
      }
    }

    // TODO: This Toast appears under the modal image viewer. Figure out a way around that.
    Toast.show(i18n.t("components.imageviewerfooter.copied"));
    Clipboard.setString(forClipboard);
  };

  render() {
    let visible = this.props.visible;
    let caption = "";
    let credit = "";

    if (this.props.images[this.props.index].hasOwnProperty("metadata"))
      if (
        this.props.images[this.props.index].metadata.hasOwnProperty("caption")
      )
        caption = this.props.images[this.props.index].metadata.caption;

    if (this.props.images[this.props.index].hasOwnProperty("metadata"))
      if (this.props.images[this.props.index].metadata.hasOwnProperty("credit"))
        credit = this.props.images[this.props.index].metadata.credit;

    if (!caption && !credit) visible = false;

    if (!visible) return <View />;
    else {
      return (
        <TouchableWithoutFeedback
          underlayColor={"#fff"}
          onLongPress={this.setClipboard}
        >
          <View style={styles.container}>
            {caption.length > 0 && (
              <ParsedText
                style={styles.caption}
                parse={[
                  { type: "url", style: parsedStyles.url, onPress: onUrlPress },
                  {
                    type: "email",
                    style: parsedStyles.url,
                    onPress: onEmailPress,
                  },
                  {
                    pattern: parsePatterns.bold,
                    style: parsedStyles.bold,
                    renderText: renderBoldItalic,
                  },
                  {
                    pattern: parsePatterns.italic,
                    style: parsedStyles.italic,
                    renderText: renderBoldItalic,
                  },
                ]}
              >
                {i18n.t("components.imageviewerfooter.captionprefix")}
                {caption}
              </ParsedText>
            )}
            {credit.length > 0 && (
              <ParsedText
                style={styles.credit}
                parse={[
                  { type: "url", style: styles.url, onPress: onUrlPress },
                  { type: "email", style: styles.url, onPress: onEmailPress },
                  {
                    pattern: parsePatterns.bold,
                    style: parsedStyles.bold,
                    renderText: renderBoldItalic,
                  },
                  {
                    pattern: parsePatterns.italic,
                    style: parsedStyles.italic,
                    renderText: renderBoldItalic,
                  },
                ]}
              >
                {i18n.t("components.imageviewerfooter.creditprefix")}
                {credit}
              </ParsedText>
            )}
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000040",
    padding: 10,
    width: Dimensions.get("window").width,
  },
  caption: {
    color: "white",
  },
  credit: {
    color: "white",
  },
  url: {
    textDecorationLine: "underline",
  },
});
