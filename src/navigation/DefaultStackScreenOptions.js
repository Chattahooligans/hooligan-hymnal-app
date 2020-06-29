import React from "react";
import { DefaultColors, Skin } from "../../config";
import MenuButton from "../components/MenuButton";

export default DefaultStackScreenOptions = {
  cardStyle: {
    backgroundColor: "#fafafa",
  },
  headerStyle: {
    backgroundColor: DefaultColors.HeaderBackground,
  },
  headerTintColor: DefaultColors.HeaderText,
  headerTitleStyle: {
    fontFamily: Skin.Font_Bold,
  },
  headerLeft: () => <MenuButton />,
};
