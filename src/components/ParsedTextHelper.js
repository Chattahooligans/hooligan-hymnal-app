import { Linking, Platform, StyleSheet } from "react-native";
import { Skin } from "../../config";

/* sample import */
// import { parsePatterns, parsedStyles, renderBoldItalic, onUrlPress, onEmailPress, parsedStyles } from

export const parsePatterns = {
  bold: /(\*)(.*?)\1/,
  italic: /(_)(.*?)\1/,
  hashtag: /\B#(\w*[A-Za-z_\d]+\w*)\b/,
};

export const parsedStyles = StyleSheet.create({
  bold: {
    fontFamily: Skin.Font_Bold,
  },
  hashtag: {
    fontFamily: Skin.Font_Bold,
  },
  italic: {
    fontFamily: Skin.Font_Italic,
  },
  url: {
    color: Skin.Post_LinkColor,
    textDecorationLine: "underline",
  },
});

export function renderBoldItalic(match) {
  return match.slice(1, match.length - 1);
}
export function onUrlPress(url) {
  Linking.openURL(url);
}
export function onEmailPress(email) {
  Linking.openURL("mailto:" + email);
}
