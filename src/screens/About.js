import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Skin, DefaultColors, Palette } from "../../config";
import { FontSizes } from "../constants";
import {
  BoldText,
  MediumText,
  RegularTextMonospace,
  RegularText,
  LightText,
} from "../components/StyledText";
import ParsedText from "react-native-parsed-text";
import {
  parsePatterns,
  parsedStyles,
  renderBoldItalic,
  onUrlPress,
  onEmailPress,
} from "../components/ParsedTextHelper";
import { openURL } from "../utils/LinkHelper.js";
import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import i18n from "../i18n";
import appJson from "../../app.json";

// About info, link to website/fb/twitter
// maybe a url for the /songs page on website (where App Store/Google Play icons will be found)
// Email to send feedback?

class About extends React.Component {
  state = {
    pushToken: "",
    response: null,
    debug: "",
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: i18n.t("screens.about.title"),
    });

    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.globalData.state.pushToken &&
        this.props.globalData.state.pushToken) ||
      (!prevProps.globalData.state.response &&
        this.props.globalData.state.response) ||
      (!prevProps.globalData.state.debug && this.props.globalData.state.debug)
    ) {
      this.setData();
    }
  }

  setData = () => {
    let { pushToken, response, debug } = this.props.globalData.state;
    this.setState({ pushToken, response, debug });
  };

  render() {
    // logo images are all exported to the same size
    let { width, height } = Image.resolveAssetSource(
      Skin.About_HooliganHymnalLogoSingleColor
    );
    let ratio = width / height;
    let availableWidth =
      Dimensions.get("window").width -
      2 *
        (styles.container.padding +
          styles.scrollContainer.padding +
          styles.platformContainer.paddingHorizontal);
    let scaledHeight = availableWidth / ratio;

    let creditsTexts = [];
    let creditsItems = i18n.t("screens.about.credits");
    let parsedTextOptions = [
      { type: "url", style: parsedStyles.url, onPress: onUrlPress },
      { type: "email", style: parsedStyles.url, onPress: onEmailPress },
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
    ];
    creditsItems.forEach((element, index) => {
      creditsTexts.push(
        <ParsedText
          key={"about-credits-" + index}
          parse={parsedTextOptions}
          style={[
            styles.credits,
            {
              textAlign: i18n.getRTLTextAlign(),
              writingDirection: i18n.getWritingDirection(),
            },
          ]}
        >
          {element}
        </ParsedText>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View
            style={{ flexDirection: i18n.getFlexDirection(), marginBottom: 10 }}
          >
            <BoldText
              style={{
                fontSize: FontSizes.title,
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              }}
            >
              {i18n.t("screens.about.appTitle")}
            </BoldText>
            <LightText
              style={{
                fontSize: FontSizes.title,
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              }}
            >
              {" "}
              {i18n.t("screens.about.version")}
              {appJson.expo.version}
            </LightText>
          </View>
          <ParsedText
            parse={parsedTextOptions}
            style={[
              styles.credits,
              {
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              },
            ]}
          >
            {i18n.t("screens.about.description")}
          </ParsedText>
          <View style={{ height: 10 }} />
          <ParsedText
            parse={parsedTextOptions}
            style={[
              styles.credits,
              {
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              },
            ]}
          >
            {i18n.t("screens.about.feedback")}
          </ParsedText>
          <View style={{ height: 20 }} />
          <MediumText
            style={{
              textAlign: i18n.getRTLTextAlign(),
              writingDirection: i18n.getWritingDirection(),
            }}
          >
            {i18n.t("screens.about.creditsheading")}
          </MediumText>
          {creditsTexts}
          <View style={{ height: 20 }} />
          <ParsedText
            parse={parsedTextOptions}
            style={[
              styles.credits,
              {
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
                marginBottom: 10,
              },
            ]}
          >
            {i18n.t("screens.about.appTitle") +
              i18n.getLocalizedText(
                appJson.expo.extra.hooliganHymnal.aboutPlug
              )}
          </ParsedText>
          <TouchableOpacity
            onPress={() => {
              openURL("https://github.com/Chattahooligans");
            }}
          >
            <View style={[styles.platformContainer, { height: scaledHeight }]}>
              <Image
                source={require("../../assets/about/hooligan-hymnal-layer1.png")}
                style={{
                  width: availableWidth,
                  height: scaledHeight,
                  position: "absolute",
                  left: styles.platformContainer.paddingHorizontal,
                  tintColor: Skin.About_HooliganHymnalLogoLayer1Tint,
                }}
              />
              <Image
                source={require("../../assets/about/hooligan-hymnal-layer2.png")}
                style={{
                  width: availableWidth,
                  height: scaledHeight,
                  position: "absolute",
                  left: styles.platformContainer.paddingHorizontal,
                  tintColor: Skin.About_HooliganHymnalLogoLayer2Tint,
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
          <ScrollView style={{ flex: 1 }}>
            <MediumText
              style={{
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              }}
            >
              {i18n.t("screens.about.debug")}
            </MediumText>
            <RegularTextMonospace
              selectable={true}
              style={{
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              }}
            >
              width: {Dimensions.get("screen").width}, height:{" "}
              {Dimensions.get("screen").height}
            </RegularTextMonospace>
            <RegularTextMonospace
              selectable={true}
              style={{
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              }}
            >
              {this.state.pushToken}
            </RegularTextMonospace>
            <RegularTextMonospace
              selectable={true}
              style={{
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              }}
            >
              {this.state.response ? JSON.stringify(this.state.response) : ""}
            </RegularTextMonospace>
            <RegularTextMonospace
              selectable={true}
              style={{
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
                marginBottom: 15,
              }}
            >
              {this.state.debug ? this.state.debug : ""}
            </RegularTextMonospace>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Skin.About_BackgroundColor,
    flexDirection: i18n.getFlexDirection(),
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: DefaultColors.Background,
    padding: 5,
  },
  credits: {
    fontFamily: Skin.Font_ParsedText,
  },
  platformContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
});

export default withUnstated(About, { globalData: GlobalDataContainer });
