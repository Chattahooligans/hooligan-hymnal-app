import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultStackScreenOptions from "./DefaultStackScreenOptions";
import Screens from "../screens";
import { Palette } from "../../config";
import i18n from "../i18n";

const CardStack = createStackNavigator();

// use a flag from Settings to load child components of this navigator- foes or no foes?

export default YellowCardNavigation = () => {
  return (
    <CardStack.Navigator screenOptions={DefaultStackScreenOptions}>
      <CardStack.Screen
        name="YellowCard"
        options={{
          title: i18n.t("screens.refereecard.titleyellow"),
          headerStyle: { backgroundColor: Palette.YellowCard },
        }}
      >
        {(props) => <Screens.RefereeCard color={Palette.YellowCard} />}
      </CardStack.Screen>
    </CardStack.Navigator>
  );
};
