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

import de from './de.json';
import en from './en.json';
import es from './es.json';
import pt from './pt.json';

export const Translations = { de, en, es, pt };
export const DefaultLocale = 'en';