import React from 'react';
import {
  Platform,
  Image,
  Linking,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Ionicons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import NavigationOptions from '../config/NavigationOptions';
import { NavigationActions } from 'react-navigation';

import { BoldText, MediumText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import Players from '../data/players.json';
import Squads from '../data/roster.json';

import { Colors, FontSizes, Layout } from '../constants';
import Constants from 'expo-constants';

import { find, propEq } from 'ramda';
import { Palette, Skin } from '../config/Settings';

let rosterData = [];
Squads.squads.forEach(squadChild => {
  let playerList = [];

  //console.log(squadChild.squad_title);
  squadChild.players.forEach(playerChild => {
    try {
      let player = Players.filter(player => player._id === playerChild._id)[0];
      //console.log(player._id + " " + player.name);
      
      playerList.push(player);
    } catch (err) {
      console.log(playerChild._id + ' not found in players database');
    }
  });

  if (0 < playerList.length)
    rosterData.push({ title: squadChild.squad_title, data: playerList });
});

class PlayerRow extends React.Component {
  render() {
    const { item: player } = this.props;

    let thumbnail = Skin.Roster_DefaultThumbnail;
    if (player.thumbnail)
      thumbnail = {uri: player.thumbnail};

    let twitterDisplay;
    if (player.twitter) {
      twitterDisplay = <TouchableOpacity
          style={{justifyContent: 'flex-start', alignContent: 'center'}}
          key={player.twitter}
          onPress={() => {
            //WebBrowser.openBrowserAsync('http://twitter.com/' + player.twitter);
            Linking.openURL('https://twitter.com/intent/tweet?text=@' + player.twitter + '+');
          }}
        >
          <Ionicons
            name={'logo-twitter'}
            size={30}
            style={{
              color: Palette.Sky,
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: 'transparent'
            }}
          />
        </TouchableOpacity>    
    }

    return (
      <View style={styles.row}>
        <RectButton
          onPress={this._handlePress}
          activeOpacity={0.05}
          style={{ flex: 1 }}
        >
          <View style={{flexDirection: 'row'}}>
            <View style={styles.rowAvatarContainer}>
              <FadeIn>
                <Image
                  source={thumbnail}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </FadeIn>
            </View>
            <View style={styles.rowData}>
              <View
                style={{ width: 25, alignItems: 'flex-end', paddingRight: 5 }}
              >
                <BoldText>{player.squadNumber}</BoldText>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <MediumText>{player.name}</MediumText>
                <RegularText>{player.position}</RegularText>
                <RegularText>{player.flag}</RegularText>
              </View>
            </View>
          </View>
        </RectButton>
        {twitterDisplay}
      </View>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

class Roster extends React.Component {
  static navigationOptions = {
    headerTitle: "Roster",
    ...NavigationOptions
  };
  
  state = {
    rosterTitle: "Roster",
    squads: []
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.globalData.state.players &&
      this.props.globalData.state.players
    ) {
      this.setData();
    }
  }

  setData = () => {
    console.log('setData');

    let rosterTitle = this.props.globalData.state.roster.rosterTitle;
    let squads = [];
    let players = this.props.globalData.state.players;
    
    this.props.globalData.state.roster.squads.forEach(squadChild => {
      let playerList = [];

      //console.log(squadChild.squad_title);
      squadChild.players.forEach(playerChild => {
        try {
          let player = players.filter(player => player._id === playerChild._id)[0];
          //console.log(player._id + " " + player.name);

          playerList.push(player);
        } catch (err) {
          console.log(playerChild._id + ' not found in players database');
        }
      });

      if (0 < playerList.length)
        squads.push({ title: squadChild.squadTitle, data: playerList });
    });

    this.setState({ rosterTitle, squads });

    // TODO:
    // line 92
    // fix static navigationOptions.headerTitle = state.rosterTitle (there is a scoping issue here) 
  }

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <SectionList style={styles.container}
            renderScrollComponent={props => <ScrollView {...props} />}
            stickySectionHeadersEnabled={true}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            sections={this.state.squads}
            keyExtractor={(item, index) => index}
          />
          <RectButton
            style={styles.twitterListButtonStyle}
            onPress={this._handlePressTwitterListButton}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-list"
              size={23}
              style={{
                color: '#fff',
                marginTop: 3,
                marginBottom: 3,
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: 'transparent'
              }}
            />
            <RegularText style={styles.twitterListButtonText}>
              Twitter List
            </RegularText>
          </RectButton>
        </View>
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
    return <PlayerRow item={item} onPress={this._handlePressRow} />;
  };

  _handlePressRow = player => {
    // console.log('player click', player.name);
    this.props.navigation.navigate('Player', { player });
  };

  _handlePressTwitterListButton = () => {
    this.props.navigation.navigate('TwitterList');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%'
  },
  row: {
    flex: 1,
    paddingTop: 10,
    padding: 10,
    backgroundColor: Palette.White,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row'
  },
  rowAvatarContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  rowData: {
    flex: 1,
    flexDirection: 'row'
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee'
  },
  twitterListButtonStyle: {
    backgroundColor: Skin.Songbook_ToCButtonBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 0,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  twitterListButtonText: {
    fontSize: FontSizes.normalButton,
    color: '#fff',
    textAlign: 'center'
  }
});

export default withUnstated(Roster, { globalData: GlobalDataContainer });