import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Layout } from '../constants';
import { Palette, Settings, Skin, NavigationDrawerItems } from '../../config';
import i18n from '../i18n';

function createRouteDrawerItem(item, navigation, index) {
  return (
    <DrawerItem
      key={item.drawerLabel + '-' + index}
      activeTintColor={Skin.NavigationDrawer_LabelActiveTintColor}
      activeBackgroundColor={Skin.NavigationDrawer_LabelActiveBackgroundColor}
      inactiveTintColor={Skin.NavigationDrawer_LabelInactiveTintColor}
      inactiveBackgroundColor={Skin.NavigationDrawer_LabelInactiveBackgroundColor}
      icon={({ focused, color, size }) => (<MaterialCommunityIcons name={item.drawerIcon} color={color} size={size} />)}
      label={item.drawerLabel}
      labelStyle={{ fontFamily: Skin.NavigationDrawer_FontFamily }}
      onPress={() => navigation.navigate(item.routeName)} />
  )
}
function createLinkDrawerItem(item, navigation, index) {
  return (
    <DrawerItem
      key={item.drawerLabel + '-' + index}
      activeTintColor={Skin.NavigationDrawer_LabelActiveTintColor}
      activeBackgroundColor={Skin.NavigationDrawer_LabelActiveBackgroundColor}
      inactiveTintColor={Skin.NavigationDrawer_LabelInactiveTintColor}
      inactiveBackgroundColor={Skin.NavigationDrawer_LabelInactiveBackgroundColor}
      icon={({ focused, color, size }) => (<MaterialCommunityIcons name={item.drawerIcon} color={color} size={size} />)}
      label={({ focused, color }) => (
        <View style={{ flexDirection: i18n.getFlexDirection(), alignItems: 'center' }}>
          <Text style={{ color, fontFamily: Skin.NavigationDrawer_FontFamily, marginRight: 8 }}>{item.drawerLabel}</Text>
          <MaterialCommunityIcons name={'open-in-new'} color={color} size={14} />
        </View>
      )}
      onPress={() => {
        Linking.openURL(item.url)
        navigation.closeDrawer()
      }} />
  )
}
function createNavDrawerItems(items, navigation) {
  let drawerItems = []

  items.forEach((element, index) => {
    if (element.routeName)
      drawerItems.push(createRouteDrawerItem(element, navigation, index))
    if (element.url)
      drawerItems.push(createLinkDrawerItem(element, navigation, index))
  })

  return drawerItems
}


const CustomDrawer = props => {
  // This was some super clever stuff. Leave the code snippet in case we need to revive it later
  /*
  // we want to hide certain routes from showing up in the drawer, because they are accessed through custom buttons
  const hideRoutes = ["About", "Admin", "YellowCard", "RedCard"];
  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routeNames: props.state.routeNames.filter(routeName => !hideRoutes.includes(routeName)),
      routes: props.state.routes.filter(route => !hideRoutes.includes(route.name))
    }
  }
  */

  let drawerItems = createNavDrawerItems(NavigationDrawerItems, props.navigation)

  return (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
        <Image
          source={Skin.NavigationDrawer_HeroBackground}
          style={styles.backgroundImage}
        />
        <View style={[StyleSheet.absoluteFill, styles.imageOverlay]} />
        <View style={[StyleSheet.absoluteFill, styles.logoContainer]}>
          <Image
            source={Skin.NavigationDrawer_HeroOverlay}
            style={styles.logoImage}
          />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/*
          <DrawerItemList
            {...filteredProps}
            activeBackgroundColor="rgba(255,255,255,0.1)"
            activeTintColor='white' inactiveTintColor='white'
            labelStyle={{ color: 'white', textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection(), fontFamily: Skin.NavigationDrawer_FontFamily }}
            onItemPress={({ route, focused }) => {
              if (route.routeName === 'AdminHome') {
                if (props.globalData.state.currentUser) {
                  props.navigation.navigate('AdminHome');
                } else {
                  props.navigation.navigate('AdminLogin');
                }
              } else {
                props.onItemPress({ route });
              }
            }}
          />
        */}
        {drawerItems}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => { props.navigation.navigate("About") }}>
          <MaterialCommunityIcons name={"information"} size={30} color={'white'} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (props.globalData.state.currentUser)
              props.navigation.navigate('AdminHome');
            else
              props.navigation.navigate('Admin');
          }}>
          <MaterialCommunityIcons name={props.globalData.state.currentUser ? "toolbox" : "login"} size={30} color={'white'} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        {Settings.RefereeCards_Show &&
          <View style={styles.cardContainer}>
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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 140 + Layout.notchHeight,
    width: '100%',
    resizeMode: 'cover'
  },
  bottomContainer: {
    flexDirection: i18n.getFlexDirection(),
    borderTopColor: '#222',
    borderTopWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center"
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
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: Skin.NavigationDrawer_BackgroundColor,
  },
  imageOverlay: {
    backgroundColor: Skin.NavigationDrawer_HeroOverlayTintColor,
    opacity: Skin.NavigationDrawer_HeroOverlayTintOpacity
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
