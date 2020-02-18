//configure internationalization
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
//import files
import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
//default to English
i18n.defaultLocale = 'en';
//get user's current locale
i18n.locale = Localization.locale;
//if not found in the current locale, fallback to English
i18n.fallbacks = true;
i18n.translations = { de, en, es, pt };
//future: when app returns from backgroud on Android,
//check `await Localization.getLocalizationAsync();` to update locale

const isRTL = Localization.isRTL;
//const isRTL = true;

function getLocalizedBio(bio) {
    //if bio is only a string, return that string
    if(typeof(bio) === "string") return bio;
    //otherwise, see if the current locale is in there.
    var currentLocale = i18n.currentLocale();
    var defaultLocale = i18n.defaultLocale;
    var shortLocale = currentLocale.substring(0,2);
    if(currentLocale in bio) {
        return bio[currentLocale];
    } else if (shortLocale in bio) { 
        return bio[shortLocale];
    }
    else if(defaultLocale in bio) {
        return bio[defaultLocale];
    } else {
        //well, that's weird
        console.log("getLocalizedBio couldn't find a sensible thing to return");
        return "";
    }
}

function getLocalizedText(text) {
    //if bio is only a string, return that string
    if(typeof(text) === "string") return text;
    //otherwise, see if the current locale is in there.
    var currentLocale = i18n.currentLocale();
    var defaultLocale = i18n.defaultLocale;
    var shortLocale = currentLocale.substring(0,2);
    if(currentLocale in text) {
        return text[currentLocale];
    } else if (shortLocale in text) { 
        return text[shortLocale];
    } else if(defaultLocale in text) {
        return text[defaultLocale];
    } else if(text.length > 0) {
        return text[0];
    } else {
        //well, that's weird
        console.log("getLocalizedText couldn't find a sensible thing to return");
        return "Cannot parse " + JSON.stringify(text);
    }
}

//for things like the twitter list, we want to reverse element alignment
//if the user is using an rtl language
function getFlexDirection() {
    if(isRTL) {
        return "row-reverse"
    } else {
        return "row"
    }
}

//we want the drawer menu to pop out of the right for RTL languages
//if the user is using an rtl language
function getDrawerPosition() {
    if(isRTL) {
        return "right"
    } else {
        return "left"
    }
}

//for text areas that we align or default to the left in English, we invert that for rtl
function getRTLTextAlign() {
    if(isRTL) {
        return "right"
    } else {
        return "left"
    }
}

//this only applies on iOS. on Android, writing direction is determined solely by the language.
//if we get a mixed-language string this ensures iOS does the right thing
function getWritingDirection() {
    if(isRTL) {
        return "rtl"
    } else {
        return "ltr"
    }
}

i18n.getLocalizedBio = getLocalizedBio;
i18n.getLocalizedText = getLocalizedText;
i18n.getFlexDirection = getFlexDirection;
i18n.getDrawerPosition = getDrawerPosition;
i18n.getRTLTextAlign = getRTLTextAlign;
i18n.getWritingDirection = getWritingDirection;
export default i18n;