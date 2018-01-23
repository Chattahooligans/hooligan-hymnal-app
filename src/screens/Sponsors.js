import React from 'react';
import { Image, SectionList, StyleSheet, View, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { WebBrowser } from 'expo';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import { Layout, Colors } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import _ from 'lodash';

import SponsorData from '../data/sponsors.json';
const SponsorsByLevelUnsorted = _.groupBy(SponsorData, data => data.level);
const SponsorsByLevel = [
  { title: 'Diamond', data: SponsorsByLevelUnsorted['Diamond'] },
  { title: 'Gold', data: SponsorsByLevelUnsorted['Gold'] },
  { title: 'Silver', data: SponsorsByLevelUnsorted['Silver'] },
  { title: 'Bronze', data: SponsorsByLevelUnsorted['Bronze'] },
  { title: 'Community', data: SponsorsByLevelUnsorted['Community'] },
];

function getLogoURL(sponsor) {
  if (sponsor.logo.startsWith('/img')) {
    return `http://nodevember.org${sponsor.logo}`;
  } else {
    return sponsor.logo;
  }
}

class SponsorRow extends React.Component {
  render() {
    const { item: sponsor } = this.props;

    return (
      <RectButton
        onPress={this._handlePress}
        activeOpacity={0.05}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View style={styles.row}>
          <View
            style={[
              styles.rowData,
              {
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: sponsor.description ? 15 : 5,
                marginTop: 10,
              },
            ]}
          >
            <FadeIn placeholderStyle={{borderRadius: 3}}>
              <Image
                source={{ uri: getLogoURL(sponsor) }}
                style={{
                  width: Layout.window.width / 2,
                  height: 80,
                  borderRadius: 0,
                  resizeMode: 'contain',
                }}
              />
            </FadeIn>
          </View>
          {sponsor.description ? (
            <View style={styles.rowData}>
              <RegularText style={{ marginBottom: 10 }}>
                {sponsor.description}
              </RegularText>
            </View>
          ) : null}
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    WebBrowser.openBrowserAsync(this.props.item.url);
  };
}

export default class Sponsors extends React.Component {
  static navigationOptions = {
    title: 'Sponsors',
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
          sections={SponsorsByLevel}
          renderSectionHeader={this._renderSectionHeader}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
          initialNumToRender={4}
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
    return <SponsorRow item={item} />;
  };
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
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
