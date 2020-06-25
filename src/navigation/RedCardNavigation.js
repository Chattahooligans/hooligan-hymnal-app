import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultStackScreenOptions from "./DefaultStackScreenOptions";
import Screens from "../screens";
import { Palette } from "../../config";
import i18n from "../i18n";

const CardStack = createStackNavigator();

// use a flag from Settings to load child components of this navigator- foes or no foes?

export default RedCardNavigation = () => {
  return (
    <CardStack.Navigator screenOptions={DefaultStackScreenOptions}>
      <CardStack.Screen
        name="RedCard"
        options={{
          title: i18n.t("screens.refereecard.titlered"),
          headerStyle: { backgroundColor: Palette.RedCard },
        }}
      >
        {(props) => <Screens.RefereeCard color={Palette.RedCard} />}
      </CardStack.Screen>
    </CardStack.Navigator>
  );
};
