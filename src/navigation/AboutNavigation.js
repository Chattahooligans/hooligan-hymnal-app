import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultStackScreenOptions from "./DefaultStackScreenOptions";
import Screens from "../screens";
import i18n from "../i18n";

const AboutStack = createStackNavigator();

// use a flag from Settings to load child components of this navigator- foes or no foes?

export default SongbookNavigation = () => {
  return (
    <AboutStack.Navigator screenOptions={DefaultStackScreenOptions}>
      <AboutStack.Screen name="About" component={Screens.About} />
    </AboutStack.Navigator>
  );
};
