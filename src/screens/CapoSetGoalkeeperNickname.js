import React from 'react';
import {
  Image,
  SectionList,
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import NavigationOptions from '../config/NavigationOptions';
import { NavigationActions } from 'react-navigation';

import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

import { BoldText, MediumText, RegularText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import Songs from '../data/songs.json';
import Songbook from '../data/songbook.json';
import { conferenceHasEnded } from '../utils/index';

import find from 'lodash/find';

import { Colors, FontSizes, Layout } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import gkNicknameSchema from '../data/goalkeeperNickname_schema.json';

// TODO: On row press, get the related song object by _id using snippet below and pass it to the next screen
//      Songs.filter(song => song._id === songChild._id)[0]
// Back Button on the nav bar for this screen, goes back to capo dashboard

//console.log("Songbook ToC json: " + Songbook.songbook_title);

class ColorRow extends React.Component {
  render() {
    const { item: color } = this.props;

    console.log("Color: " + this.props);

    return (
      <RectButton
        onPress={this._handlePress}
        activeOpacity={0.05}
        style={{ flex: 1, backgroundColor: color.name.toLowerCase() }}
      >
        <View style={styles.row}>
          <View style={styles.rowData}>
            <RegularText>{color.name}</RegularText>
          </View>
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

class CapoSetGoalkeeperNickname extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'GK Nickname',
    ...NavigationOptions,
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
    )
  });

  state = {
    colorData: [],
    nickname: 'Nickname',
    color: 'gray'
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.globalData.state.htmlColors &&
      this.props.globalData.state.htmlColors
    ) {
      this.setData();
    }
  }

  setData = () => {
    let colorData = [];
    this.props.globalData.state.htmlColors.colorFamilies.forEach(colorFamilyChild => {
      let colorList = [];

      colorFamilyChild.colors.forEach(colorChild => {
        colorList.push(colorChild);
      });

      colorData.push({ title: colorFamilyChild.familyName, data: colorList });
    });

    this.setState({ colorData });
  };

  render() {
    return (
      <View style={styles.container}>
        <MediumText style={styles.instructions}>1. We're gonna score on you...</MediumText>
        <TextInput
          style={styles.textInput}
          autoFocus={true}
          onChangeText={this._setNickname}
          value={this.state.value}
        />
        <MediumText style={styles.instructions}>2. Pick a color, any color</MediumText>
        <SectionList
          style={styles.colorPicker}
          renderScrollComponent={props => <ScrollView {...props} />}
          stickySectionHeadersEnabled={true}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          sections={this.state.colorData}
          keyExtractor={(item, index) => index}
        />
        <MediumText style={styles.instructions}>3. Which is more readable?</MediumText>
        <ClipBorderRadius>
          <RectButton
            style={[styles.bigButton, {backgroundColor: this.state.color}]}
            onPress={this._handlePressWhiteButton}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-hand"
              size={23}
              style={{
                color: 'white',
                marginTop: 3,
                backgroundColor: 'transparent',
                marginRight: 5
              }}
            />
            <BoldText style={[styles.bigButtonText, {color: 'white'}]}>{this.state.nickname}</BoldText>
          </RectButton>
        </ClipBorderRadius>
        <ClipBorderRadius>
          <RectButton
            style={[styles.bigButton, {backgroundColor: this.state.color}]}
            onPress={this._handlePressBlackButton}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-hand"
              size={23}
              style={{
                color: 'black',
                marginTop: 3,
                backgroundColor: 'transparent',
                marginRight: 5
              }}
            />
            <BoldText style={[styles.bigButtonText, {color: 'black'}]}>{this.state.nickname}</BoldText>
          </RectButton>
        </ClipBorderRadius>
      </View>
    );
  }

  _setNickname = nickname => this.setState({ nickname });

  _renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <RegularText>{section.title}</RegularText>
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return <ColorRow item={item} onPress={this._handlePressRow} />;
  };

  _handlePressRow = item => {
    this.setState({color: item.name.toLowerCase()})
  };

  _handlePressWhiteButton = () => {
    gkNicknameSchema.nickname = this.state.nickname;
    gkNicknameSchema.backgroundColor = this.state.color;
    gkNicknameSchema.textColor = 'white';

    this.props.globalData.setGoalkeeperNickname(gkNicknameSchema);
    this.props.navigation.navigate('CapoConfirmSendGoalkeeperNickname');
  }

  _handlePressBlackButton = () => {
    gkNicknameSchema.nickname = this.state.nickname;
    gkNicknameSchema.backgroundColor = this.state.color;
    gkNicknameSchema.textColor = 'black';

    this.props.globalData.setGoalkeeperNickname(gkNicknameSchema);
    this.props.navigation.navigate('CapoConfirmSendGoalkeeperNickname');
  }
}

const ClipBorderRadius = ({ children, style }) => {
    return (
      <View
        style={[
          { borderRadius: BORDER_RADIUS, overflow: 'hidden', marginTop: 10 },
          style
        ]}
      >
        {children}
      </View>
    );
  };

const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    paddingBottom: 8
  },
  instructions: {
    fontSize: 18,
    paddingHorizontal: 8,
    paddingTop: 8,
    color: DefaultColors.ColorText
  },
  textInput: {
    fontSize: 18,
    paddingHorizontal: 15
  },
  row: {
    flex: 1,
    paddingTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row'
  },
  rowData: {
    flex: 1
  },
  colorPicker: {
    paddingBottom: 8,
    paddingHorizontal: 15
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee'
  },
  bigButton: {
    backgroundColor: DefaultColors.ButtonBackground,
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  bigButtonText: {
    fontSize: FontSizes.normalButton,
    color: DefaultColors.ButtonText,
    textAlign: 'center'
  }
});

export default withUnstated(CapoSetGoalkeeperNickname, {
  globalData: GlobalDataContainer
});
