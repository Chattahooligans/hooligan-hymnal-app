/*
    Supporter Group Info
*/

// Web presence config
// "Follow Us" on Home screen

// TODO: Build home screen dynamically based on this websites object

// enum
export const SocialPlatform = {
  Twitter: 'Twitter',
  Facebook: 'Facebook',
  Instagram: 'Instagram',
  Web: 'web',
  YouTube: 'YouTube'
};

export const TWITTER_URL = 'https://twitter.com/chattahooligan';
export const FACEBOOK_URL = 'https://www.facebook.com/TheChattahooligans';
export const INSTAGRAM_URL = 'https://instagram.com/thechattahooligans';
export const WEBSITE_URL = 'http://chattahooligan.com';
export const YOUTUBE_URL = '';
export const SHOP_URL = 'https://squareup.com/store/the-chattahooligans';
export const PRIDERAISER_URL =
  'https://cha.prideraiser.org/';
export const GOFUNDME_URL =
  'https://www.gofundme.com/chattahooligan-youth-soccer-investment';
export const ESP_TWITTER_URL = 'https://twitter.com/LosCFCHooligans';
export const ESP_INSTAGRAM_URL = 'https://instagram.com/loschattahooligans';
export const ESP_WEBSITE_URL = 'http://chattahooligan.com/es';

export const PRIDERAISER_ICON = require('../../assets/prideraiser.png');
export const GOFUNDME_ICON = require('../../assets/gofundme.png');

// icon: Iconicons name
export const websites = [
  { type: SocialPlatform.Twitter, icon: 'logo-twitter', url: TWITTER_URL },
  { type: SocialPlatform.Facebook, icon: 'logo-facebook', url: FACEBOOK_URL },
  { type: SocialPlatform.Instagram, icon: 'logo-instagram', url: INSTAGRAM_URL },  
  { type: SocialPlatform.Web, icon: 'md-cart', url: SHOP_URL },
  { type: SocialPlatform.Web, image: GOFUNDME_ICON, url: GOFUNDME_URL }
];

export const esp_websites = [
  { type: SocialPlatform.Twitter, icon: 'logo-twitter', url: ESP_TWITTER_URL },
  { type: SocialPlatform.Instagram, icon: 'logo-instagram', url: ESP_INSTAGRAM_URL },
  { type: SocialPlatform.Web, icon: 'md-browsers', url: ESP_WEBSITE_URL }
];

// { type: SocialPlatform.Web, icon: 'md-browsers', url: WEBSITE_URL },
// { type: SocialPlatform.Web, image: PRIDERAISER_ICON, url: PRIDERAISER_URL },
// { type: SocialPlatform.Web, image: GOFUNDME_ICON, url: GOFUNDME_URL }

/*
    App Skin
*/

// Chattahooligans palette
export const Colors = {
  Navy: '#032E55',
  Sky: '#A5D8F6',
  White: '#FFFFFF',
  Black: '#000000'
};

export const Skin = {
  NavigationBarBackground: Colors.Navy,
  SocialButtons: Colors.Navy
};
