import React from 'react';
import { Image, SectionList, StyleSheet, View, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import { Colors } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { getSpeakerAvatarURL } from '../utils';

import KeynotersData from '../data/keynotes.json';
import SpeakersData from '../data/speakers.json';
const SpeakerData = [
  { data: KeynotersData, title: 'Keynotes' },
  { data: SpeakersData, title: 'Speakers' },
];

class SpeakerRow extends React.Component {
  render() {
    const { item: speaker } = this.props;

    return (
      <RectButton
        onPress={this._handlePress}
        activeOpacity={0.05}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View style={styles.row}>
          <View style={styles.rowAvatarContainer}>
            <FadeIn>
              <Image
                source={{ uri: getSpeakerAvatarURL(speaker) }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </FadeIn>
          </View>
          <View style={styles.rowData}>
            <BoldText>{speaker.name}</BoldText>
            {speaker.organization ? (
              <SemiBoldText>{speaker.organization}</SemiBoldText>
            ) : null}
            <RegularText>{speaker.title}</RegularText>
          </View>
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

export default class Speakers extends React.Component {
  static navigationOptions = {
    title: 'Speakers',
    headerStyle: { backgroundColor: Colors.green },
    headerTintColor: 'white',
    headerLeft: <MenuButton />,
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
    },
  };

  render() {
    return (
      <LoadingPlaceholder>
        <SectionList
          renderScrollComponent={props => <ScrollView {...props} />}
          stickySectionHeadersEnabled={true}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          sections={SpeakerData}
          keyExtractor={(item, index) => index}
        />
      </LoadingPlaceholder>
    );
  }

  _renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <RegularText>{section.title}</RegularText>
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return <SpeakerRow item={item} onPress={this._handlePressRow} />;
  };

  _handlePressRow = speaker => {
    this.props.navigation.navigate('Details', { speaker });
  };
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    flexDirection: 'row',
  },
  rowAvatarContainer: {
    paddingVertical: 5,
    paddingRight: 10,
    paddingLeft: 0,
  },
  rowData: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee',
  },
});
