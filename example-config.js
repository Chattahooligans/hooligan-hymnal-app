// Do not edit these import lines
import appJson from "./app.json";
import i18n from "./src/i18n";
import { Layout } from "./src/constants";

/*
  Hooligan Hymnal

  Copyright 2018-2020 The Chattahooligans, released open source under MIT license

  The latest source code and documentation for this project are located at:
  https://github.com/Chattahooligans/hooligan-hymnal-app
*/

/*
  About this Configuration File

  This configuration file contains several JavaScript objects that alter 
  the appearance of behavior of the Hooligan Hymnal mobile application. 

  Preceeding each object, you'll find documentation with a description of 
  what the object does and guidance on how to configure it.
  
  SGs with non- or novice developers will need patience and dedication to 
  get used to the key:value format and adjust the configuration, but we 
  believe in you! Ask for help on the Hooligan Hymnal Slack channel if 
  you get confused or if something breaks.
*/

/*
  Urls
  
  This structure contains a set of key:value pairs for URLs and links used
  elsewhere in this config file and in the app.

  Excepting Urls.HooliganHymnalServer, they're mostly optional, but you may 
  need to remove lines from the config that reference these links, like in 
  the SocialButtons or Banners structure. You can also add other URLs as 
  necessary.
*/
export const Urls = {
  // production server
  // HEY! Don't include a trailing slash / on this url.
  // If you do, you're gonna have a bad time because your serer calls will not work
  HooliganHymnalServer: "https://EDIT-THIS-URL.herokuapp.com",
  // dev/beta server
  //HooliganHymnalServer: 'https://EDIT-THIS-URL.herokuapp.com',

  // Social media and websites
  Twitter: "https://twitter.com/hooliganhymnal",
  Facebook: "https://facebook.com/",
  Instagram: "https://instagram.com/",
  Website: "http://example.com",
  YouTube: "https://youtube.com",
  Shop: "http://example.com/shop",
  Prideraiser: "https://prideraiser.org/",
  // Look for random characters at the end of your current campaign url (must update for each campaign season)
  PrideraiserCampaignId: "xxxxxxx",
  EsTwitter: "https://twitter.com/hooliganhymmnal",
  EsFacebook: "https://facebook.com/",
  EsInstagram: "https://instagram.com/",
  EsWebsite: "http://example.com/es",
  Events: "http://example.com/shop",
  Standings: "https://www.nisaofficial.com/standings",

  // Add additional Urls (optional)
  /* 
  
    Example (Note: this Podcast example will be expanded on under 
                    the Images and SocialButtons structures in this file)

  Podcast: "https://example.com/podcast",

  */
};

/*
  Images
  
  This structure contains a set of key:value pairs for images used 
  elsewhere in the app. Some are used in multiple places.

  These images are preloaded during app startup, so they don't pop in.

  Feel free to add Images as necessary by adding a key:value pair to this structure. 
  Just maintain the require() syntax and make sure the file names here match what 
  they're called in ./assets/

  The good news is that the build will crash immediately if there is an
  issue with anything in this block.
*/
export const Images = {
  // Used as a default Channel thumbnail
  LogoAvatar: require("./assets/icon-android.png"),

  // Appears in the navigation bar when the user scrolls down the feed on Home screen
  Home_NavbarLogo: require("./assets/home-navbar-logo.png"),

  // Hero video file that plays on the Home screen
  Home_HeroVideo: require("./assets/home-hero-video.mp4"),
  // Overlay image over the hero video
  Home_HeroVideoOverlay: require("./assets/home-hero-video-overlay.png"),
  // Home_HeroVideoOverlay: require('./assets/juanstagram-mono-logotype.png'),

  // Home screen hero image. Loads in directly, no fancy tinting or layers
  //    scaled to fit screen width
  // Note: Set Skin.Home_HeroImage_VersionColor to a contrasting color
  Home_HeroImage: require("./assets/home-hero-image.png"),

  // Background image that appears at the top of the navigation drawer menu
  NavigationDrawer_HeroBackground: require("./assets/drawer-hero-background.png"),
  // Overlay image over the drawer hero background image
  NavigationDrawer_HeroOverlay: require("./assets/drawer-hero-logo.png"),

  // Songbook cover image
  Songbook_Cover: require("./assets/songbook-cover.png"),

  // Used as a default thumbnail for Players and Rosters
  ClubLogo: require("./assets/logo-club.png"),

  // Used for Prideraiser integration
  PrideraiserLogo: require("./assets/prideraiser-logo.png"),
  PrideraiserIcon: require("./assets/prideraiser-icon.png"),

  // Potentially used in Banners and SocialButtons
  GoFundMe: require("./assets/gofundme.png"),

  // Add additional images (optional)
  /* 

    Example (Note: this Podcast example will be expanded on under 
                    the SocialButtons structure in this file)

  Podcast: require("./assets/podcast.png"),

  */
};

/*
  Common Image Credits
  
  It's likely that photos will come from a select few SG or club 
  photographers. We make it easy to credit those people for letting us use
  their work.

  This structure contains an array of strings used for this feature. The 
  structure is required, but does not need to be populated. Here is what
  it looks like empty.
  export const CommonImageCredits = []

  Feel free to add or remove lines as necessary
*/
export const CommonImageCredits = [
  "Photographer Name | http://example.com/SomebodyPhotography",
];

/*
    App Skin
*/

/*
  Palette

  This structure contains a set of key:value pairs for colors used across
  the app. It feeds into the DefaultColors/Skin structures below, and is 
  rarely referenced directly.

  Feel free to add or remove lines as necessary to suit your needs.
*/
export const Palette = {
  Navy: "#002D56",
  Sky: "#A3D8F7",
  White: "#FFFFFF",
  Black: "#000000",

  // Leave these three alone unless you know you want to change them/don't need them
  Prideraiser: "#a55eea",
  YellowCard: "#ffcc00",
  RedCard: "#ff0000",
};

/*
  DefaultColors

  This structure contains a set of key:value pairs for colors used across
  the app. It feeds into the Skin structure below, and is occasionally 
  referenced directly.
  (We'll eventually clean up most direct DefaultColors references.)

  You can use color data here, or reference the Palette structure, above.

  Feel free to add or remove lines as necessary to suit your needs.
*/
export const DefaultColors = {
  Background: Palette.White,
  ButtonBackground: Palette.Navy,
  ButtonText: Palette.White,
  HeaderBackground: Palette.Navy,
  HeaderText: Palette.White,
  BlackText: Palette.Black,
  ColorText: Palette.Navy,
  Primary: Palette.Navy,
  Secondary: Palette.Sky,
};

/*
  Fonts

  This structure contains a set of key:value pairs for fonts used across
  the app. You can use your own brand fonts in Hooligan Hymnal by 
  including the files in ./assets/ and creating the appropriate font map.
  The value here is an object with properties .family and .file

  .family is TODO

  Default fonts are included in ./assets/ and the proper config values are...
export const Fonts = {
  Light: { family: 'open-sans-light', file: require('./assets/OpenSans-Light.ttf') },
  Regular: { family: 'open-sans', file: require('./assets/OpenSans-Regular.ttf') },
  Medium: { family: 'open-sans-semibold', file: require('./assets/OpenSans-SemiBold.ttf') },
  Bold: { family: 'open-sans-bold', file: require('./assets/OpenSans-Bold.ttf') },
  Italic: { family: 'open-sans-italic', file: require('./assets/OpenSans-Italic.ttf') }
}

  Font_Light is currently unused in the app, but is included for coverage
*/
export const Fonts = {
  Light: {
    family: "open-sans-light",
    file: require("./assets/OpenSans-Light.ttf"),
  },
  Regular: {
    family: "open-sans",
    file: require("./assets/OpenSans-Regular.ttf"),
  },
  Medium: {
    family: "open-sans-semibold",
    file: require("./assets/OpenSans-SemiBold.ttf"),
  },
  Bold: {
    family: "open-sans-bold",
    file: require("./assets/OpenSans-Bold.ttf"),
  },
  Italic: {
    family: "open-sans-italic",
    file: require("./assets/OpenSans-Italic.ttf"),
  },
};

/*
  Skin

  This structure contains a set of key:value pairs which alter the 
  appearance of the app. It's always in flux.
*/
export const Skin = {
  About_BackgroundColor: DefaultColors.Secondary,
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
  Home_BackgroundColor: DefaultColors.Primary,
  Home_BigButtonsBackground: DefaultColors.ButtonBackground,
  Home_BigButtonsLabel: DefaultColors.ButtonText,
  Home_FindTheMenuLabel: DefaultColors.Primary,
  Home_HeroImage: Images.Home_HeroImage,
  Home_HeroImage_VersionColor: DefaultColors.HeaderText,
  Home_LoadMoreActivityIndicator_Android: DefaultColors.Secondary,
  Home_LoadMoreActivityIndicator_iOS: Palette.White,
  Home_NavbarLogo: Images.Home_NavbarLogo,
  Home_PostMarginVertical: 10,
  Home_Refresh_Android: DefaultColors.Primary,
  Home_RefreshBackground_Android: DefaultColors.Secondary,
  Home_SocialButtons: DefaultColors.Primary,
  Home_HeroVideo: Images.Home_HeroVideo,
  Home_HeroVideoOverlay: Images.Home_HeroVideoOverlay,
  HomeVideoPanel_TintColor: DefaultColors.HeaderBackground,
  HomeVideoPanel_TintOpacity: 0.8,
  HomeVideoPanel_VersionLabel: DefaultColors.HeaderText,
  Home_Website: DefaultColors.BlackText,
  Icon_Roster: "account-group",
  Icon_Songbook: "book-open-variant",
  ModalLoader_ActivityIndicator: DefaultColors.Primary,
  ModalLoader_Background: DefaultColors.Secondary,
  ModalLoader_Container: "#00000040",
  ModalLoader_LabelColor: DefaultColors.Primary,
  NavigationDrawer_BackgroundColor: "#333333",
  NavigationDrawer_HeroBackground: Images.NavigationDrawer_HeroBackground,
  NavigationDrawer_HeroBackgroundHeight: 140 + Layout.notchHeight,
  NavigationDrawer_HeroOverlay: Images.NavigationDrawer_HeroOverlay,
  NavigationDrawer_HeroOverlayHeightProportion: 1,
  NavigationDrawer_HeroTintColor: DefaultColors.HeaderBackground,
  NavigationDrawer_HeroTintOpacity: 0.8,
  NavigationDrawer_LabelActiveBackgroundColor: DefaultColors.Primary,
  NavigationDrawer_LabelActiveTintColor: Palette.White,
  NavigationDrawer_LabelActiveBackgroundColor: "transparent",
  NavigationDrawer_LabelInactiveTintColor: Palette.White,
  NavigationDrawer_FontFamily: Fonts.Bold.family,
  NotificationEngagementsModal_Container: "#00000040",
  SongbookContents_ButtonBackground: DefaultColors.ButtonBackground,
  SongbookCover_ActivityIndicatorColor: DefaultColors.Primary,
  SongbookCover_Background: DefaultColors.Secondary,
  SongbookCover_DefaultImage: Images.Songbook_Cover,
  SongbookPages_Background: DefaultColors.Secondary,
  SingleSong_Background: DefaultColors.Primary,
  Player_Background: DefaultColors.Secondary,
  Player_DefaultImage: Images.ClubLogo,
  Player_TopContainerBackground: DefaultColors.HeaderBackground,
  Post_DefaultChannelThumbnail: Images.LogoAvatar,
  Post_ChannelLabel: DefaultColors.ColorText,
  Post_CollapseTextExpandFirstInFeed: true,
  Post_CollapseTextNumberOfLines: Number.MAX_SAFE_INTEGER, // set to Number.MAX_SAFE_INTEGER to never collapse text
  Post_CollapseTextRatio: 0, // set to 0 to disable text collapse based on screen ratio
  Post_CollapseTextShowHide: true,
  Post_ContainerMarginHorizontal: 0,
  Post_FontSize: 17,
  Post_HeaderContainerPaddingTop: 12,
  Post_HeaderContainerPaddingHorizontal: 16,
  Post_LineHeight: 22,
  Post_LinkColor: "blue",
  Post_NotificationColor: DefaultColors.Secondary,
  Post_TextColor: DefaultColors.BlackText,
  Post_TextPaddingTop: 6,
  Post_TextPaddingBottom: 12,
  Post_TextPaddingHorizontal: 16,
  Post_TimestampLabel: DefaultColors.ColorText,
  PostAttachmentComposePrideraiserMatch_ActivityIndicator:
    DefaultColors.Primary,
  PostAttachmentMassTweet_TwitterColor: DefaultColors.Secondary,
  PostAttachmentMultiTweet_TwitterColor: DefaultColors.Secondary,
  PostAttachmentPlayer_InstagramColor: DefaultColors.Secondary,
  PostAttachmentPlayer_TwitterColor: DefaultColors.Secondary,
  PrideraiserCampaignSummary_VersionColor: DefaultColors.HeaderText,
  Roster_DefaultThumbnail: Images.ClubLogo,
  Roster_TabBackground: DefaultColors.ButtonBackground,
  Roster_ActiveTabIndicator: DefaultColors.ButtonText,
  Roster_ActiveTabLabel: DefaultColors.ButtonText,
  Roster_InactiveTabLabel: DefaultColors.Secondary,
  Roster_FriendsTabIcon: "heart",
  Roster_FoesTabIcon: "thumb-down",
  RosterTeam_TwitterColor: DefaultColors.Secondary,
  SongView_TitleColor: DefaultColors.Primary,
  SongView_ReferenceColor: DefaultColors.Primary,
  SongView_InstructionsColor: "#AAAAAA",
  SongView_LyricsColor: DefaultColors.Primary,
  StatusBar_BackgroundColor: DefaultColors.Primary,
  StatusBar_BarStyle: "default",
  TwitterList_BackgroundColor: DefaultColors.Secondary,
};

/*
  NavigationDrawerItems

  This structure contains an array of objects used for the main navigation
  drawer menu. Each object has a .drawerLabel, .drawerIcon, and EITHER a
  .routeName or .url property.

  Valid routeName values are: Home, Songbook, Roster, About, Admin,
    YellowCard, RedCard.
  These will be added as major features are added to the app.

  .url can be used to open external links from the drawer

  We currently use the MaterialCommunityIcons set, searchable at:
  https://icons.expo.fyi/

  Feel free to add or remove lines as necessary.
*/
export const NavigationDrawerItems = [
  {
    drawerLabel: i18n.t("navigation.home"),
    drawerIcon: "newspaper",
    routeName: "Home",
  },
  {
    drawerLabel: i18n.t("navigation.songbook"),
    drawerIcon: Skin.Icon_Songbook,
    routeName: "Songbook",
  },
  {
    drawerLabel: i18n.t("navigation.roster"),
    drawerIcon: Skin.Icon_Roster,
    routeName: "Roster",
  },
  {
    drawerLabel: i18n.t("navigation.links.events"),
    drawerIcon: "calendar",
    url: Urls.Events,
  },
  {
    drawerLabel: i18n.t("navigation.links.standings"),
    drawerIcon: "menu-swap",
    url: Urls.Standings,
  },
];

/*
  Banners

  This structure contains an array of objects used for "Headline"
  banners pinned to the top of the Home screen.

  Banners live in the config file, not the server (yet). So, changes to 
  this structrure need to be rolled out with application updates.

  The structure is required, but does not need to be populated. Here is
  what it looks like empty.
  export const Banners = []

  Feel free to add or remove lines as necessary.
*/
export const Banners = [];
// { backgroundColor: Palette.Prideraiser, image: Images.PrideraiserIcon, url: Urls.Prideraiser, text: "Pledge to Chattanooga Prideraiser", textColor: Palette.White },
// { backgroundColor: Palette.Sky, image: Images.GoFundMe, tintColor: Skin.Home_SocialButtons, url: Urls.GoFundMe, text: "Youth Soccer Investment Crowdfunding", textColor: Palette.Black }

/*
  SocialButtons

  This structure contains an array of objects used for social media and
  web links on the Home screen.

  The structure is required, but does not need to be populated. Here is
  what it looks like empty.
  export const SocialButtons = []

  Each array element is an object with a header, headerColor, and an 
  array of items. The elements in items have the following properties:
  - url: a reference to the Urls structure in this file (recommended) 
          or web address
  AND some image or icon, defined as:
  - icon: an icon name from the MaterialCommunityIcons* set

  OR

  - image: a reference to the Images structure in this file (recommended)
           or other image
  - tintToSkin: tint the image the same color as Skin.Home_SocialButtons
                (optional)

  Continuing the Podcast example introduced with the Urls and Images 
  structures in this file, adding an item for a pocast would look like:
  { url: Urls.Podcast, image: Images.Podcast }

  *The MaterialCommunityIcons set is searchable at: 
  https://icons.expo.fyi/
*/
export const SocialButtons = [
  {
    header: i18n.t("settings.socialEN"),
    headerColor: DefaultColors.ColorText,
    items: [
      { url: Urls.Twitter, icon: "twitter" },
      { url: Urls.Facebook, icon: "facebook" },
      { url: Urls.Instagram, icon: "instagram" },
      { url: Urls.Shop, icon: "shopping" },
      {
        url: Urls.Prideraiser,
        image: Images.PrideraiserIcon,
        tintToSkin: false,
      },
    ],
  },
  {
    header: i18n.t("settings.socialES"),
    headerColor: DefaultColors.ColorText,
    items: [
      { url: Urls.EsTwitter, icon: "twitter" },
      { url: Urls.EsInstagram, icon: "instagram" },
      { url: Urls.EsWebsite, icon: "link" },
    ],
  },
];
// Other/Seasonal
// { url: Urls.Website, icon: 'link' },
// { url: Urls.Prideraiser, image: Images.PrideraiserIcon },
// { url: Urls.GoFundMe, image: Images.GoFundMe, tintToSkin: true }

/*
  App Feature Flags
*/
export const Settings = {
  // Channels_Enabled: true, false
  //      Some SGs will only ever have one channel
  //      and tapping into a whole hunk of UI will be jarring and confusing to users
  //
  //      This feature isn't fully implemented yet, so leave it set to false
  ChannelUI_Enabled: false,

  // Home_HeroContent: "video", "image", "prideraiser"
  //      Hero content on the home screen
  Home_HeroContent: "video",

  // Home_PostsPerPage: number
  //      Load this many news feed items, then load this many more if the user scrolls to the bottom
  Home_PostsPerPage: 5,

  // Player_ShowSongs: true, false
  //      Some SGs write songs for each player
  //      Toggle a related UI element in the Roster/Player screen
  Player_ShowSongs: false,

  // PostAttach_ShowGKNickname: true, false
  //      This is a longrunning inside joke in Chattanooga
  PostAttach_ShowGKNickname: false,

  // PostAttach_ShowJuanstagram: true, false
  //      This is a longrunning inside joke in Chattanooga
  PostAttach_ShowJuanstagram: false,

  PostAttachmentComposePrideraiserMatch_AnalyticsSourcePrefix:
    appJson.expo.slug,
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

  Prideraiser_CampaignId: Urls.PrideraiserCampaignId,

  // Prideraiser_CampaignCoverParams: string
  //      default: "?w=768&h=200&wm=pr&wmp=br"
  //      Check how this renders on your deployment with your Prideraiser campaign cover photo
  //      You may want to adjust the height param and/or design the cover photo with Hooligan Hymnal in mind
  //      wm=pr&wmp=br add the Prideraiser Logo watermark onto the image. We recommend leaving this alone
  PrideraiserCampaignSummary_CampaignCoverParams: "?w=768&h=432&wm=pr&wmp=bl",

  PrideraiserCampaignSummary_AnalyticsSource: appJson.expo.slug + "-home",

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

  // TwitterList_AppendHandles: string
  //      Extra Twitter handles concatenated after the players on the TwitterList screen
  //      Each account should be seperated by a space
  //      In Chattanooga, we append the club and our SG accounts. You can choose to pass.
  TwitterList_AppendHandles: "",

  // WebLinks_DefaultTarget: "internal", "external"
  //      Sets whether web links open in an in-app internal browser or external to the OS
  WebLinks_DefaultTarget: "internal",
};
