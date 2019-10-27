import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NavigationOptions from '../config/NavigationOptions';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import { FontSizes } from '../constants';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from "../../i18n";

// About info, link to website/fb/twitter
// maybe a url for the /songs page on website (where App Store/Google Play icons will be found)
// Email to send feedback?

class About extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.about.title'),
    ...NavigationOptions
  };

  state = {
    token: "",
    response: null
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.globalData.state.token &&
      this.props.globalData.state.token) ||
      (!prevProps.globalData.state.response &&
        this.props.globalData.state.response)
    ) {
      this.setData();
    }
  }

  setData = () => {
    let { token, response } = this.props.globalData.state
    this.setState({token, response})
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10, backgroundColor: Palette.Sky }}>
        <ScrollView style={{ flex: 1, backgroundColor: Palette.White, padding: 5 }}>
          <BoldText style={{ fontSize: FontSizes.title, marginBottom: 10 }}>{i18n.t('screens.about.appTitle')}</BoldText>
          <RegularText>{i18n.t('screens.about.why')}</RegularText>
          <View style={{ height: 10 }} />
          <RegularText>{i18n.t('screens.about.feedback')}</RegularText>
          <View style={{ height: 20 }} />
          <MediumText>{i18n.t('screens.about.credits')}</MediumText>
          <RegularText>{i18n.t('screens.about.homescreenvideo')}</RegularText>
          <RegularText>{i18n.t('screens.about.menuphoto')}</RegularText>
          <RegularText>{i18n.t('screens.about.playerphotos')}</RegularText>
          <RegularText>{i18n.t('screens.about.playerheadshots')}</RegularText>
          <RegularText>{i18n.t('screens.about.nodevember')}</RegularText>
          <View style={{ height: 20 }} />
          <RegularText>{i18n.t('screens.about.contribute')}</RegularText>
          <View style={{ height: 20 }} />
          <ScrollView style={{flex: 1}}>
            <MediumText>{i18n.t('screens.about.debug')}</MediumText>
            <RegularText selectable={true}>{this.state.token}</RegularText>
            <RegularText selectable={true}>
              {
                this.state.response ? 
                  JSON.stringify(this.state.response) : ''
              }
            </RegularText>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default withUnstated(About, { globalData: GlobalDataContainer });