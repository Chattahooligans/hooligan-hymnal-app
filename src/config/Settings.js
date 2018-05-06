/*
    Supporter Group Info
*/

// Web presence config
// "Follow Us" on Home screen

// TODO: Build home screen dynamically based on this websites object

// enum
export const SocialPlatform = 
{
    Twitter: 'Twitter',
    Facebook: 'Facebook',
    Instagram: 'Instagram',
    Web: 'web',
    YouTube: 'YouTube'
}

export const TWITTER_URL = 'https://twitter.com/chattahooligan';
export const FACEBOOK_URL = 'https://www.facebook.com/TheChattahooligans';
export const INSTAGRAM_URL = 'https://instagram.com/thechattahooligans';
export const WEBSITE_URL = 'http://thechattahooligans.com';
export const YOUTUBE_URL = '';
export const SHOP_URL = 'https://squareup.com/store/the-chattahooligans';

// icon: Iconicons name
export const websites = [
    { type: SocialPlatform.Twitter, icon: 'logo-twitter', url: TWITTER_URL },
    { type: SocialPlatform.Facebook, icon: 'logo-facebook', url: FACEBOOK_URL },
    { type: SocialPlatform.Instagram, icon: 'logo-instagram', url: INSTAGRAM_URL },
    { type: SocialPlatform.Web, icon: 'md-browsers', url: WEBSITE_URL },
    { type: SocialPlatform.Web, icon: 'md-cart', url: SHOP_URL }
]

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

export const Skin = 
{
    NavigationBarBackground: Colors.Navy,
    SocialButtons: Colors.Navy
}