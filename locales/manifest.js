/*
    /locales/manifest.js

    - Import the finalized [language-code].json files
    - Export them as the Translations object
    - Set the DefaultLocale (as a string)

    For a basic, English-only deployment, this file should only contain:   
    
import en from './en.json';

export const Translations = { en };
export const DefaultLocale = 'en';
*/

import en from "./en.json";
import de from "./de.json";
import es from "./es.json";

export const Translations = { de, en, es };
export const DefaultLocale = "en";
