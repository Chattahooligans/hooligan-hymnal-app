import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultStackScreenOptions from "./DefaultStackScreenOptions";
import Screens from "../screens";

const HomeStack = createStackNavigator();

export default HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={DefaultStackScreenOptions}>
      <HomeStack.Screen
        name="Home"
        component={Screens.Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="SinglePost" component={Screens.SinglePost} />
      <HomeStack.Screen name="SingleSong" component={Screens.SingleSong} />
      <HomeStack.Screen
        name="Player"
        component={Screens.Player}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="TwitterList" component={Screens.TwitterList} />
      <HomeStack.Screen name="Channel" component={Screens.Channel} />
    </HomeStack.Navigator>
  );
};
