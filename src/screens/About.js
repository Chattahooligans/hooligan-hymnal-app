import React from 'react';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import { FontSizes } from '../constants';
import { BoldText, MediumText, RegularTextMonospace, RegularText, LightText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { parsePatterns, parsedStyles, renderBoldItalic, onUrlPress, onEmailPress } from '../components/ParsedTextHelper';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from "../../i18n";
import appParams from '../../app.json';

// About info, link to website/fb/twitter
// maybe a url for the /songs page on website (where App Store/Google Play icons will be found)
// Email to send feedback?

class About extends React.Component {
  state = {
    pushToken: "",
    response: null
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: i18n.t('screens.about.title')
    })

    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.globalData.state.pushToken &&
        this.props.globalData.state.pushToken) ||
      (!prevProps.globalData.state.response &&
        this.props.globalData.state.response)
    ) {
      this.setData();
    }
  }

  setData = () => {
    let { pushToken, response } = this.props.globalData.state
    this.setState({ pushToken, response })
  }

  render() {
    let creditsTexts = []
    let creditsItems = i18n.t('screens.about.credits')
    let parsedTextOptions = [
      { type: 'url', style: parsedStyles.url, onPress: onUrlPress },
      { type: 'email', style: parsedStyles.url, onPress: onEmailPress },
      { pattern: parsePatterns.bold, style: parsedStyles.bold, renderText: renderBoldItalic },
      { pattern: parsePatterns.italic, style: parsedStyles.italic, renderText: renderBoldItalic }
    ]
    creditsItems.forEach(element => {
      creditsTexts.push(
        <ParsedText
          parse={parsedTextOptions}
          style={[styles.credits, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}>
          {element}
        </ParsedText>
      )
    });

    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: Palette.Sky, flexDirection: i18n.getFlexDirection() }}>
        <ScrollView style={{ flex: 1, backgroundColor: Palette.White, padding: 5 }}>
          <View style={{ flexDirection: i18n.getFlexDirection(), marginBottom: 10 }}>
            <BoldText style={{ fontSize: FontSizes.title, textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{i18n.t('screens.about.appTitle')}</BoldText>
            <LightText style={{ fontSize: FontSizes.title, textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}> {i18n.t('screens.about.version')}{appParams.expo.version}</LightText>
          </View>
          <ParsedText
            parse={parsedTextOptions}
            style={[styles.credits, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}>
            {i18n.t('screens.about.why')}
          </ParsedText>
          <View style={{ height: 10 }} />
          <ParsedText
            parse={parsedTextOptions}
            style={[styles.credits, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}>
            {i18n.t('screens.about.feedback')}
          </ParsedText>
          <View style={{ height: 20 }} />
          <MediumText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{i18n.t('screens.about.creditsheading')}</MediumText>
          {creditsTexts}
          <View style={{ height: 20 }} />
          <ParsedText
            parse={parsedTextOptions}
            style={[styles.credits, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}>
            {i18n.t('screens.about.appTitle') + i18n.t('screens.about.contribute')}
          </ParsedText>
          <View style={{ height: 20 }} />
          <ScrollView style={{ flex: 1 }}>
            <MediumText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{i18n.t('screens.about.debug')}</MediumText>
            <RegularTextMonospace selectable={true} style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>width: {Dimensions.get("screen").width}, height: {Dimensions.get("screen").height}</RegularTextMonospace>
            <RegularTextMonospace selectable={true} style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{this.state.pushToken}</RegularTextMonospace>
            <RegularTextMonospace selectable={true} style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>
              {
                this.state.response ?
                  JSON.stringify(this.state.response) : ''
              }
            </RegularTextMonospace>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  credits: {
    fontFamily: Skin.Font_ParsedText,
  },
});

export default withUnstated(About, { globalData: GlobalDataContainer });