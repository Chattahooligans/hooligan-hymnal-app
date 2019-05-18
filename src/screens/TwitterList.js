import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
import { RectButton } from 'react-native-gesture-handler';
import NavigationOptions from '../config/NavigationOptions';
import { HeaderBackButton } from 'react-navigation';
import { FontSizes } from '../constants';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import { Ionicons } from '@expo/vector-icons';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

class TwitterList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Twitter List',
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    state = {
        handles: ''
    }

    componentDidMount() {
        this.setData();
    }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.globalData.state.players &&
      this.props.globalData.state.players) ||
      (!prevProps.globalData.state.roster &&
        this.props.globalData.state.roster)
    ) {
      this.setData();
    }
  }

  setData = () => {
    console.log('setData');

    let handles = '';
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

      if (0 < playerList.length) {
          squads.push({ title: squadChild.squadTitle, data: playerList });
          playerList.forEach(element => {
              if (element.twitter)
                handles += '@'+element.twitter + ' '
          });

          handles += '@ChattanoogaFC @chattahooligan @LosCFCHooligans'
      }
    });

    this.setState({ handles });

    // TODO:
    // line 92
    // fix static navigationOptions.headerTitle = state.rosterTitle (there is a scoping issue here) 
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10, backgroundColor: Palette.Sky }}>
        <View style={{ flex: 1, padding: 5 }}>
          <MediumText style={{backgroundColor: Palette.White, paddingHorizontal: 5, fontSize: 18}}>
            All Together, Now
          </MediumText>
          <RegularText style={{backgroundColor: Palette.White, padding: 5, marginBottom: 1}}>          
          The connection between CFC fans and the team is unique, special, and tangible. 
          Messages of encouragement, love, whatever, truly mean a lot to the players.
          {"\n"}{"\n"}
          You can copy multiple Twitter handles from the box below and paste them into a longer Twitter thread.
          </RegularText>
            <ScrollView style={{flex: 1, padding: 5, backgroundColor: Palette.White}}>
                <RegularText style={{fontSize: 18}} selectable={true}>{this.state.handles}</RegularText>
            </ScrollView>
            <ClipBorderRadius>
                <RectButton
                    style={styles.bigButton}
                    onPress={() => {Linking.openURL('https://twitter.com/intent/tweet?text=');}}
                    underlayColor="#fff"
                >
                    <Ionicons
                        name="logo-twitter"
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
                    <MediumText style={styles.bigButtonText}>Open Twitter App</MediumText>
                </RectButton>
            </ClipBorderRadius>
          </View>
      </View>
    );
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
    bigButton: {
        backgroundColor: DefaultColors.ButtonBackground,
        marginTop: 5,
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

export default withUnstated(TwitterList, { globalData: GlobalDataContainer });