//configure internationalization
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
//import files
import en from './locales/en.json';
//default to English
i18n.defaultLocale = 'en';
//get user's current locale
i18n.locale = Localization.locale;
//if not found in the current locale, fallback to English
i18n.fallbacks = true;
i18n.translations = { en };
//future: check Localization.isRTL
//future: when app returns from backgroud on Android,
//check `await Localization.getLocalizationAsync();` to update locale

function getLocalizedBio(bio) {
    //if bio is only a string, return that string
    if(typeof(bio) === "string") return bio;
    //otherwise, see if the current locale is in there.
    var currentLocale = i18n.currentLocale();
    var defaultLocale = i18n.defaultLocale;
    if(currentLocale in bio) {
        return bio[currentLocale];
    } else if(defaultLocale in bio) {
        return bio[defaultLocale];
    } else {
        //well, that's weird
        console.log("getLocalizedBio couldn't find a sensible thing to return");
        return "";
    }
}

i18n.getLocalizedBio = getLocalizedBio;
export default i18n;