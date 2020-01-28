/*
    Supporter Group Info
*/

// Web presence config
// "Follow Us" on Home screen

// TODO: Build home screen dynamically based on this websites object

// HEY! Don't include a trailing slash / on this url. 
// If you do, you're gonna have a bad time because your serer calls will not work
export const HOOLIGAN_HYMNAL_SERVER_ADDRESS = 'https://chattahooligan-hymnal.herokuapp.com'
// news feed dev branch
//export const HOOLIGAN_HYMNAL_SERVER_ADDRESS = 'https://hymnal-serve-news-feed-vf0sbpf.herokuapp.com'

// URLs
export const TWITTER_URL = 'https://twitter.com/chattahooligan';
export const FACEBOOK_URL = 'https://www.facebook.com/TheChattahooligans';
export const INSTAGRAM_URL = 'https://instagram.com/thechattahooligans';
export const WEBSITE_URL = 'http://comeandjoin.us';
export const YOUTUBE_URL = '';
export const SHOP_URL = 'https://squareup.com/store/the-chattahooligans';
export const PRIDERAISER_URL = 'https://chatt.prideraiser.org/';
export const GOFUNDME_URL = 'https://www.gofundme.com/chattahooligan-youth-soccer-investment';
export const ESP_TWITTER_URL = 'https://twitter.com/LosCFCHooligans';
export const ESP_INSTAGRAM_URL = 'https://instagram.com/loschattahooligans';
export const ESP_WEBSITE_URL = 'http://chattahooligan.com/es';
export const EVENTS_URL = 'https://m.facebook.com/TheChattahooligans/events/';
export const INSTRUMENTATION_URL = 'https://drive.google.com/open?id=1dW9z4lh5924mXKtOyhc4dt8_OuAT9UXr';

// Common Images
export const HOME_SCREEN_NAVBAR = require('../../assets/home-logo.png');
//export const HOME_SCREEN_NAVBAR = require('../../assets/home-big-c-logo.png');
export const HOME_SCREEN_VIDEO_OVERLAY = require('../../assets/home-big-c-logo.png');
// like social media icons
export const PRIDERAISER_ICON = require('../../assets/prideraiser.png');
export const GOFUNDME_ICON = require('../../assets/gofundme.png');
export const GOFUNDME_BW_ICON = require('../../assets/gofundme_bw.png');
export const CLUB_LOGO = require('../../assets/chattfc_logo.png');
// used in SongView to link to sheet music
export const MUSICAL_SCORE_ICON = require('../../assets/musical-score.png');
import i18n from "../../i18n"

/*
    App Skin
*/

// Chattahooligans palette
export const Palette = {
  Navy: '#002D56',
  Sky: '#A3D8F7',
  White: '#FFFFFF',
  Black: '#000000',
  Prideraiser: '#a55eea'
};

export const DefaultColors = {
  NavigationBarBackground: Palette.Navy,
  Background: Palette.White,
  ButtonBackground: Palette.Navy,
  ButtonText: Palette.White,
  HeaderBackground: Palette.Navy,
  HeaderText: Palette.White,
  Text: Palette.Black,
  ColorText: Palette.Navy,
  Primary: Palette.Navy,
  Secondary: Palette.Sky
}

// NOTE: Heebo is a Chattahooligan-brand font. 
/* 
  You can use your own fonts in Hooligan Hymnal by including files in /assets/ 
  and editing App.js. Look for Font.loadAsync() to see how fonts are loaded and registered as strings
 
  Default fonts are included in /assets/ and the proper config values are...
  Font_Regular: 'open-sans',
  Font_Medium: 'open-sans-semibold',
  Font_Bold: 'open-sans-bold',
  Font_ParsedText: 'open-sans',

  Font_Light is currently unused in the app.
*/
export const Skin = {
  Font_Light: 'heebo-light',
  Font_Regular: 'heebo',
  Font_Medium: 'heebo-medium',
  Font_Bold: 'heebo-bold',
  Font_ParsedText: 'heebo',
  Home_BackgroundColor: DefaultColors.Primary,
  Home_BigButtonsBackground: DefaultColors.ButtonBackground,
  Home_BigButtonsLabel: DefaultColors.ButtonText,
  Home_FindTheMenuLabel: DefaultColors.Primary,
  Home_LoadMoreActivityIndicator: DefaultColors.Secondary,
  Home_SocialButtons: DefaultColors.Primary,
  Home_Website: Palette.Black,
  Home_PostMarginVertical: 6,
  ModalLoader_ActivityIndicator: DefaultColors.Primary,
  ModalLoader_Background: DefaultColors.Secondary,
  ModalLoader_Container: "#00000040",
  Songbook_Background: Palette.Sky,
  Songbook_ToCButtonBackground: DefaultColors.ButtonBackground,
  SingleSong_Background: Palette.Navy,
  Player_Background: Palette.Sky,
  Player_DefaultImage: CLUB_LOGO,
  Player_TopContainerBackground: DefaultColors.NavigationBarBackground,
  Post_DefaultChannelThumbnail: require('../../assets/big-c-icon-android.png'),
  Post_ChannelTextColor: DefaultColors.ColorText,
  Post_FontSize: 17,
  Post_LineHeight: 22,
  Post_LinkColor: "blue",
  Post_TextColor: DefaultColors.Text,
  Post_TimestampTextColor: DefaultColors.ColorText,
  Roster_DefaultThumbnail: CLUB_LOGO,
  Roster_TabBackground: DefaultColors.ButtonBackground,
  Roster_ActiveTabIndicator: DefaultColors.ButtonText,
  Roster_ActiveTabLabel: DefaultColors.ButtonText,
  Roster_InactiveTabLabel: DefaultColors.Secondary,
  Roster_FriendsTabIcon: 'md-heart',
  Roster_FoesTabIcon: 'md-thumbs-down'
};

/*
  Pass this structure to the config property of components/SocialButtonPanel
*/
// icon: Iconicons name
export const socialButtons = [
  {
    header: i18n.t('settings.socialEN'),
    headerColor: DefaultColors.ColorText,
    items: [
      { icon: 'logo-twitter', url: TWITTER_URL },
      { icon: 'logo-facebook', url: FACEBOOK_URL },
      { icon: 'logo-instagram', url: INSTAGRAM_URL },
      { icon: 'md-cart', url: SHOP_URL },
      { image: PRIDERAISER_ICON, url: PRIDERAISER_URL, tintToSkin: false },
      { image: GOFUNDME_BW_ICON, url: GOFUNDME_URL, tintToSkin: true }
    ]
  },
  {
    header: i18n.t('settings.socialES'),
    headerColor: DefaultColors.ColorText,
    items: [
      { icon: 'logo-twitter', url: ESP_TWITTER_URL },
      { icon: 'logo-instagram', url: ESP_INSTAGRAM_URL },
      { icon: 'md-browsers', url: ESP_WEBSITE_URL }
    ]
  }
]
// Other/Seasonal
// { icon: 'md-browsers', url: WEBSITE_URL },
// { image: PRIDERAISER_ICON, url: PRIDERAISER_URL },
// { image: GOFUNDME_ICON, url: GOFUNDME_URL }

/*
  "Headline" banners on home screen
*/
export const banners = [
]
//{ backgroundColor: Palette.Prideraiser, image: PRIDERAISER_ICON, url: PRIDERAISER_URL, text: "Pledge to Chattanooga Prideraiser", textColor: Palette.White },
// { backgroundColor: Palette.Sky, image: GOFUNDME_BW_ICON, tintColor: Skin.Home_SocialButtons, url: GOFUNDME_URL, text: "Youth Soccer Investment Crowdfunding", textColor: Palette.Black }


/*
  App Feature Flags
*/
// Roster_SortPlayersBy: "default", "number", "name"
//      later- "position" with priority
//      (hopefully this gets deprecated and replaced with something in the UI later)
export const Settings = {
  CapoHome_GKNicknameEnabled: true,
  Home_PostsPerPage: 20,
  Player_ShowSongs: true,
  Roster_SortPlayersBy: "number"
}
