import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { DrawerItems, NavigationActions, SafeAreaView, StackNavigator } from 'react-navigation';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Layout } from '../constants';
import { Palette, Settings, Skin } from '../config/Settings';
import i18n from '../../i18n';

const CustomDrawer = props => (
  <View style={styles.container}>
    <View style={styles.drawerHeader}>
      <Image
        source={Skin.Drawer_HeroBackground}
        style={styles.backgroundImage}
      />
      <View style={[StyleSheet.absoluteFill, styles.imageOverlay]} />
      <View style={[StyleSheet.absoluteFill, styles.logoContainer]}>
        <Image
          source={Skin.Drawer_HeroOverlay}
          style={styles.logoImage}
        />
      </View>
    </View>
    <ScrollView>
      <DrawerItems
        {...props}
        activeBackgroundColor="rgba(255,255,255,0.1)"
        labelStyle={{ color: 'white', textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}
        onItemPress={({ route, focused }) => {
          if (route.routeName === 'CapoHome') {
            if (props.globalData.state.unlocked === true) {
              props.navigation.navigate('CapoHome');
            } else {
              props.navigation.navigate('CapoLogin');
            }
          } else {
            props.onItemPress({ route });
            console.log("nav keys")
            Object.keys(props).forEach((key) => {
              if (key != 'globalData')
                console.log("KEY " + key)
              console.log(props[key])
            })
          }
        }}
      />
      {Settings.RefereeCards_Show &&
        <View style={styles.cardContainer}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => { props.navigation.navigate("YellowCard") }}>
            <View style={[styles.card, { backgroundColor: Palette.YellowCard }]}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { props.navigation.navigate("RedCard") }}>
            <View style={[styles.card, { backgroundColor: Palette.RedCard }]}></View>
          </TouchableOpacity>
        </View>
      }
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    height: 140 + Layout.notchHeight,
    width: '100%',
    resizeMode: 'cover'
  },
  card: {
    margin: 5,
    width: 20,
    height: 30,
    borderRadius: 5
  },
  cardContainer: {
    flex: 1,
    flexDirection: i18n.getFlexDirection(),
    marginRight: 5,
    marginBottom: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  imageOverlay: {
    backgroundColor: 'rgba(3, 46, 85, 0.57)'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Layout.notchHeight + 20
  },
  logoImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain'
  }
});

export default withUnstated(CustomDrawer, { globalData: GlobalDataContainer });
