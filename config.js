import appParams from './app.json';
import i18n from "./i18n";

/*
    Supporter Group Info
*/

// Web presence config
// "Follow Us" on Home screen

// TODO: Build home screen dynamically based on this websites object

// HEY! Don't include a trailing slash / on this url.
// If you do, you're gonna have a bad time because your serer calls will not work
export const HOOLIGAN_HYMNAL_SERVER_ADDRESS = 'https://chattahooligan-hymnal.herokuapp.com'
// dev branch
//export const HOOLIGAN_HYMNAL_SERVER_ADDRESS = 'https://chattahooligan-dev.herokuapp.com'

// URLs
export const TWITTER_URL = 'https://twitter.com/chattahooligan';
export const FACEBOOK_URL = 'https://facebook.com/TheChattahooligans';
export const INSTAGRAM_URL = 'https://instagram.com/thechattahooligans';
export const WEBSITE_URL = 'http://comeandjoin.us';
export const YOUTUBE_URL = '';
export const SHOP_URL = 'https://squareup.com/store/the-chattahooligans';
// PRIDERAISER_URL moved to a different section
export const GOFUNDME_URL = 'https://www.gofundme.com/chattahooligan-youth-soccer-investment';
export const ESP_TWITTER_URL = 'https://twitter.com/LosCFCHooligans';
export const ESP_INSTAGRAM_URL = 'https://instagram.com/loschattahooligans';
export const ESP_WEBSITE_URL = 'http://chattahooligan.com/es';
export const EVENTS_URL = 'https://facebook.com/TheChattahooligans/events/';
export const STANDINGS_URL = 'https://www.nisaofficial.com/standings';
export const INSTRUMENTATION_URL = 'https://drive.google.com/open?id=1dW9z4lh5924mXKtOyhc4dt8_OuAT9UXr';
export const VOLUNTEER_URL = 'http://chattahooligan.com/join/';

// Common Images/Video
export const Images = {
  // Used as a default Channel thumbnail
  LogoAvatar: require('./assets/big-c-icon-android.png'),

  // Appears in the navigation bar when the user scrolls down the feed on Home screen
  Home_NavbarLogo: require('./assets/home-logo.png'),

  // Hero video file that plays on the Home screen
  Home_Video: require('./assets/5MB_video.mp4'),
  // Overlay image over the hero video
  Home_VideoOverlay: require('./assets/home-big-c-logo.png'),
  // Home_VideoOverlay: require('./assets/juanstagram-mono-logotype.png'),

  Drawer_HeroBackground: require('./assets/drawer-hero-background.png'),
  Drawer_HeroOverlay: require('./assets/drawer-hero-logo.png'),

  Songbook_Cover: require('./assets/songbook-front-cover-heebo.png'),
  Songbook_MusicalScore: require('./assets/musical-score.png'),

  // Used as a default Player/Roster thumbnail
  ClubLogo: require('./assets/chattfc_logo.png'),

  GoFundMeColor: require('./assets/gofundme.png'),
  GoFundMeBw: require('./assets/gofundme_bw.png'),

  PrideraiserLogo: require('./assets/prideraiser-logo.png'),
  PrideraiserIcon: require('./assets/prideraiser-icon.png'),

  BadPostcast423: require('./assets/423Soccer.png'),
  BadPostcast109: require('./assets/section109pod.png')
}

// Other link
export const BAD_PODCAST_423_URL = 'https://anchor.fm/423soccerpod';
export const BAD_PODCAST_423_ICON = require('./assets/423Soccer.png');
export const BAD_PODCAST_109_URL = 'https://podcasts.apple.com/us/podcast/the-section-109-podcast/id1476968964';
export const BAD_PODCAST_109_ICON = require('./assets/section109pod.png');
export const REDDIT_CHATTANOOGAFC_URL = 'https://www.reddit.com/r/ChattanoogaFC'

// Prideraiser
export const PRIDERAISER_URL = 'https://chatt.prideraiser.org/';
export const PRIDERAISER_CAMPAIGN_ID = 'aw43AmO';
//export const PRIDERAISER_CAMPAIGN_ID = 'invalid_id_for_testing';

/*
    App Skin
*/

// Chattahooligans palette
export const Palette = {
  Navy: '#002D56',
  Sky: '#A3D8F7',
  White: '#FFFFFF',
  Black: '#000000',
  Prideraiser: '#a55eea',
  YellowCard: '#ffcc00',
  RedCard: '#ff0000'
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

// NOTE: Roboto is a Chattahooligan-brand font.
/*
  You can use your own fonts in Hooligan Hymnal by including files in ./assets/

  Default fonts are included in ./assets/ and the proper config values are...
export const Fonts = {
  Light: { family: 'open-sans-light', file: require('./assets/OpenSans-Light.ttf') },
  Regular: { family: 'open-sans', file: require('./assets/OpenSans-Regular.ttf') },
  Medium: { family: 'open-sans-semibold', file: require('./assets/OpenSans-SemiBold.ttf') },
  Bold: { family: 'open-sans-bold', file: require('./assets/OpenSans-Bold.ttf') },
  Italic: { family: 'open-sans-italic', file: require('./assets/OpenSans-Italic.ttf') },
}

  Font_Light is currently unused in the app.
*/
export const Fonts = {
  Light: { family: 'roboto-light', file: require('./assets/Roboto-Light.ttf') },
  Regular: { family: 'roboto', file: require('./assets/Roboto-Regular.ttf') },
  Medium: { family: 'roboto-medium', file: require('./assets/Roboto-Medium.ttf') },
  Bold: { family: 'roboto-bold', file: require('./assets/Roboto-Bold.ttf') },
  Italic: { family: 'roboto-italic', file: require('./assets/Roboto-Italic.ttf') },
}

export const Skin = {
  Font_Light: Fonts.Light.family,
  Font_Regular: Fonts.Regular.family,
  Font_Medium: Fonts.Medium.family,
  Font_Bold: Fonts.Bold.family,
  Font_Italic: Fonts.Italic.family,
  Font_ParsedText: Fonts.Regular.family,
  Channel_Background: DefaultColors.Secondary,
  Channel_DescriptionLabel: DefaultColors.Primary,
  Channel_LoadMoreActivityIndicator_Android: DefaultColors.Primary,
  Channel_LoadMoreActivityIndicator_iOS: DefaultColors.Primary,
  Channel_NameLabel: DefaultColors.Primary,
  Channel_Refresh_Android: DefaultColors.Secondary,
  Channel_RefreshBackground_Android: DefaultColors.Primary,
  Drawer_HeroBackground: Images.Drawer_HeroBackground,
  Drawer_HeroOverlay: Images.Drawer_HeroOverlay,
  Home_BackgroundColor: DefaultColors.Primary,
  Home_BigButtonsBackground: DefaultColors.ButtonBackground,
  Home_BigButtonsLabel: DefaultColors.ButtonText,
  Home_FindTheMenuLabel: DefaultColors.Primary,
  Home_LoadMoreActivityIndicator_Android: DefaultColors.Secondary,
  Home_LoadMoreActivityIndicator_iOS: Palette.White,
  Home_NavbarLogo: Images.Home_NavbarLogo,
  Home_PostMarginVertical: 6,
  Home_Refresh_Android: DefaultColors.Primary,
  Home_RefreshBackground_Android: DefaultColors.Secondary,
  Home_SocialButtons: DefaultColors.Primary,
  Home_Video: Images.Home_Video,
  Home_VideoOverlay: Images.Home_VideoOverlay,
  HomeVideoPanel_TintColor: DefaultColors.NavigationBarBackground,
  HomeVideoPanel_TintOpacity: 0.8,
  HomeVideoPanel_VersionLabel: DefaultColors.HeaderText,
  Home_Website: Palette.Black,
  ModalLoader_ActivityIndicator: DefaultColors.Primary,
  ModalLoader_Background: DefaultColors.Secondary,
  ModalLoader_Container: "#00000040",
  NotificationEngagementsModal_Container: "#00000040",
  Songbook_Background: Palette.Sky,
  Songbook_Cover: Images.Songbook_Cover,
  Songbook_ToCButtonBackground: DefaultColors.ButtonBackground,
  SingleSong_Background: Palette.Navy,
  Player_Background: Palette.Sky,
  Player_DefaultImage: Images.ClubLogo,
  Player_TopContainerBackground: DefaultColors.NavigationBarBackground,
  Post_DefaultChannelThumbnail: Images.LogoAvatar,
  Post_ChannelLabel: DefaultColors.ColorText,
  Post_FontSize: 17,
  Post_LineHeight: 22,
  Post_LinkColor: "blue",
  Post_TextColor: DefaultColors.Text,
  Post_TimestampLabel: DefaultColors.ColorText,
  PostAttachmentComposePrideraiserMatch_ActivityIndicator: DefaultColors.Primary,
  PrideraiserCampaignSummary_AnalyticsSource: DefaultColors.HeaderText,
  Roster_DefaultThumbnail: Images.ClubLogo,
  Roster_TabBackground: DefaultColors.ButtonBackground,
  Roster_ActiveTabIndicator: DefaultColors.ButtonText,
  Roster_ActiveTabLabel: DefaultColors.ButtonText,
  Roster_InactiveTabLabel: DefaultColors.Secondary,
  Roster_FriendsTabIcon: 'md-heart',
  Roster_FoesTabIcon: 'md-thumbs-down'
};

/*
  This structure is used for web links in the main navigation drawer
*/
export const drawerLinks = [
  { drawerLabel: i18n.t('navigation.events'), url: EVENTS_URL },
  { drawerLabel: i18n.t('navigation.standings'), url: STANDINGS_URL },
  { drawerLabel: i18n.t('navigation.shop'), url: SHOP_URL },
  { drawerLabel: i18n.t('navigation.volunteer'), url: VOLUNTEER_URL },
  { drawerLabel: i18n.t('navigation.instrumentation'), url: INSTRUMENTATION_URL }
]

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
      { image: Images.PrideraiserIcon, url: PRIDERAISER_URL, tintToSkin: false },

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
  },
  {
    header: i18n.t('settings.other'),
    headerColor: DefaultColors.ColorText,
    items: [
      { image: BAD_PODCAST_423_ICON, url: BAD_PODCAST_423_URL, tintToSkin: false },
      { image: BAD_PODCAST_109_ICON, url: BAD_PODCAST_109_URL, tintToSkin: false },
      { icon: 'logo-reddit', url: REDDIT_CHATTANOOGAFC_URL },
    ]
  }
]
// Other/Seasonal
// { icon: 'md-browsers', url: WEBSITE_URL },
// { image: PRIDERAISER_ICON, url: PRIDERAISER_URL },
// { image: GOFUNDME_BW_ICON, url: GOFUNDME_URL, tintToSkin: true }

/*
  "Headline" banners on home screen
*/
export const banners = [
]
//{ backgroundColor: Palette.Prideraiser, image: PRIDERAISER_ICON, url: PRIDERAISER_URL, text: "Pledge to Chattanooga Prideraiser", textColor: Palette.White },
// { backgroundColor: Palette.Sky, image: GOFUNDME_BW_ICON, tintColor: Skin.Home_SocialButtons, url: GOFUNDME_URL, text: "Youth Soccer Investment Crowdfunding", textColor: Palette.Black }

/*
  Common Image Credit

  It's likely that photos will come from a select few SG or club photographers. 
  Let's make it easy to credit those people for letting us use their work.
*/
export const commonImageCredit = [
  "Ray Soldano | https://www.facebook.com/RaySoldanoPhotography/",
  "Galen Riley | https://twitter.com/thatgalen",
  "Jeff Underwood | https://www.facebook.com/jeff.underwood.359",
  "Kayja Swanson | https://www.facebook.com/kajsaphotog/",
  "Madonna Fajardo Kemp | https://www.facebook.com/madonna.kemp",
  "Matt Reiter | https://www.facebook.com/mreiterphoto/",
  "Phil Thach | https://www.facebook.com/philthachphoto",
  "Shannon Millsaps | https://www.facebook.com/smillsapsphoto/",
  "Chattanooga Football Club"
]

/*
  App Feature Flags
*/
export const Settings = {
  // Channels_Enabled: true, false
  //      Some SGs will only ever have one channel
  //      and tapping into a whole hunk of UI will be jarring and confusing to users
  ChannelUI_Enabled: false,

  // Home_HeroContent: "video", "prideraiser", ("image" coming soon)
  //      Hero content on the home screen
  Home_HeroContent: "prideraiser",

  // Home_PostsPerPage: number
  //      Load this many news feed items, then load this many more if the user scrolls to the bottom
  Home_PostsPerPage: 5,

  // Player_ShowSongs: true, false
  //      Some SGs write songs for each player
  //      Toggle a related UI element in the Roster/Player screen
  Player_ShowSongs: true,

  // PostAttach_ShowGKNickname: true, false
  //      This is a longrunning inside joke in Chattanooga
  PostAttach_ShowGKNickname: true,

  // PostAttach_ShowJuanstagram: true, false
  //      This is a longrunning inside joke in Chattanooga
  PostAttach_ShowJuanstagram: true,

  PostAttachmentComposePrideraiserMatch_AnalyticsSourcePrefix: appParams.expo.slug,
  PostAttachmentComposePrideraiserMatch_AnalyticsSourceDateFormat: "YYYY-MM-DD",
  PostAttachmentComposePrideraiserMatch_AnalyticsSourceSuffix: "",

  // PostCreate_UploadImageEnabled: true, false
  //      Some SGs may not want to pay for image hosting, turn the feature off entirely if so
  PostCreate_UploadImageEnabled: true,

  // PostCreate_UploadImageResizeQuality and PostCreate_UploadImageResizeDimensions
  //      These two values determine sizing and JPG compression of images before they are uploaded
  //      This is done client side to save data (and time in a stadium environment)
  //      These values have NOT been optimized yet, so fiddle with them and report your thoughts back to the core team
  PostCreate_UploadImageResizeQuality: 1,
  PostCreate_UploadImageResizeDimensions: { larger: 1216, smaller: 912 },

  Prideraiser_CampaignId: PRIDERAISER_CAMPAIGN_ID,

  // Prideraiser_CampaignCoverParams: string
  //      default: "?w=768&h=200&wm=pr&wmp=br"
  //      Check how this renders on your deployment with your Prideraiser campaign cover photo
  //      You may want to adjust the height param and/or design the cover photo with Hooligan Hymnal in mind
  //      wm=pr&wmp=br add the Prideraiser Logo watermark onto the image. We recommend leaving this alone
  PrideraiserCampaignSummary_CampaignCoverParams: "?w=768&h=300", //432&wm=pr&wmp=bl",

  PrideraiserCampaignSummary_AnalyticsSource: appParams.expo.slug + "-home",

  // RefereeCards_Show: true, false
  //      Show yellow/red card icons in the nav drawer
  RefereeCards_Show: true,

  // Roster_FoesEnabled: true, false
  //      enables tabs in the roster screen to display opponent rosters
  Roster_FoesEnabled: true,

  // Roster_SortPlayersBy: "default", "number", "name"
  //      later- "position" with priority
  //      (hopefully this gets deprecated and replaced with something in the UI later)
  Roster_SortPlayersBy: "number",

  // RosterFoes_DefaultCompetition: string
  //      Matches .competition field of objects from the database foes collection
  //      This field is case sensitive and must match exactly
  RosterFoes_DefaultCompetition: "2020 NISA Spring Showcase",

  // TwitterList_ExtraHandles: string
  //      Extra Twitter handles concatenated after the players on the TwitterList screen
  //      In Chattanooga, we add the club and our SG accounts
  TwitterList_ExtraHandles: "@ChattanoogaFC @chattahooligan @LosCFCHooligans"
}
