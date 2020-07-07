import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Settings } from "../../config.js";

export function openURL(url) {
  let openedBecauseOfSpecialDomain = false;
  ["facebook.com", "instagram.com", "reddit.com", "twitter.com"].forEach(
    (domain) => {
      if (url.includes(domain)) {
        Linking.openURL(url);
        openedBecauseOfSpecialDomain = true;
      }
    }
  );

  if (!openedBecauseOfSpecialDomain) {
    if (Settings.WebLinks_DefaultTarget === "internal")
      WebBrowser.openBrowserAsync(url);
    else Linking.openURL(url);
  }
}
