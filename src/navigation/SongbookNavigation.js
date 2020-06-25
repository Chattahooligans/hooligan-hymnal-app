import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DefaultStackScreenOptions from "./DefaultStackScreenOptions";
import Screens from "../screens";
import i18n from "../i18n";

const SongbookStackContainer = createStackNavigator();
const SongbookTabs = createMaterialTopTabNavigator();
//const SongbookTabs = createBottomTabNavigator();
/*
    Notes on implementation:
    MaterialTopTabNavigator lets us swipe from the ToC to the first song (but not back)
        and it's a little slow on the transition from the cover to the ToC while all the tabs 
        un-lazily render (which might be fixable?)
    BottomTabNavigator, iOS style, is a bit faster on initial render, but there's a hitch
        where half the ToC renders before the rest does.

    Both have advantages and tradeoffs. The JSX element below has props for either implementation,
        so just use the one that suits your mood, until a real winner emerges.

    As of release 2.0.0 (the first with this Songbook UI), 
        I chose MaterialTop to give us the swipe gesture to get out of ToC
*/

function SongbookTabsNavigation() {
  return (
    <SongbookTabs.Navigator
      initialRouteName="SongbookContents"
      lazy={false}
      swipeEnabled={true}
      backBehavior="initialRoute"
      tabBar={() => null}
    >
      <SongbookTabs.Screen
        name="SongbookContents"
        tabBarVisible={false}
        component={Screens.SongbookContents}
      />
      <SongbookTabs.Screen
        name="SongbookPages"
        tabBarVisible={false}
        component={Screens.SongbookPages}
      />
    </SongbookTabs.Navigator>
  );
}

export default NewSongbookNavigation = () => {
  return (
    <SongbookStackContainer.Navigator screenOptions={DefaultStackScreenOptions}>
      <SongbookStackContainer.Screen
        name="SongbookCover"
        component={Screens.SongbookCover}
        options={{ headerTitle: i18n.t("screens.songbook.title") }}
      />
      <SongbookStackContainer.Screen
        name="Songbook"
        component={SongbookTabsNavigation}
        options={{ headerTitle: i18n.t("screens.songbook.title") }}
      />
    </SongbookStackContainer.Navigator>
  );
};
