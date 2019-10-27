//configure internationalization
import i18n from 'i18n-js';
//import files
import en from './locales/en.json';
//default to English; if a locale is missing a string,
//read it from English
i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = { en };

function getLocalizedBio(bio) {
    //if bio is only a string, return that string
    console.log("localizing");
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