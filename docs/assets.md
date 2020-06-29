# Hooligan Hymnal Assets Guide

This document describes the photos, graphics, and fonts that may be used by your supporter group's customized version of the open source Hooligan Hymnal mobile app. It is intended to supplement the instructions found in our [Deployment Guide](_deployment.md), and is spefically targeted to graphic designers or others who are tasked to create or collect these assets, in an effort to avoid overwhelming them with instructions on server setup and app publishing and so on.

We also recommend opening `config-example.js` as a companion to this guide. The file contains additional documentation, descriptions, and examples that aim to make life easier overall.

Please review the project README for a description of the platform and the philosophy behind it.
<https://github.com/Chattahooligans/hooligan-hymnal-app/blob/main/README.md>

tl;dr - You need make some icons and backgrounds and stuff. This guide lists all of them.

# Introduction

Deployments of Hooligan Hymnal can be customized to some degree to match the branding of your SG by using colors and fonts for the application, as well as select images and logo graphics. This guide will list files you and your collaborators should create or collect, along with descriptions of how each is used.

Hooligan Hymnal is an open source project, and your developers may have grander ambitions to alter the application design in mind (we sure hope they share the work back to the project), but this guide discusses a customization with minimal effort.

Most files are named for a generic purpose. `/assets/icon-ios.png` is the app icon used on iOS, `/assets/splash.png` is the splash screen displayed on the initial application load, and so on. These files are referenced in the `config.js` file. You can use these same file names without needing to change the config, or you can set your own file names, and easily edit the config file to match. There may (will) be cases where you need to add files that aren't part of the basic set.

The `config.js` file declares a `Skin` that is used throughout the code, and it refers to several other structures, which are outlined in this overly-simplified illustration. (Though Skin is further customizable if our example config doesn't meet the needs of your SG. Just ask in Slack.)

```
Skin
├── Images
├── Fonts
└── DefaultColors
    └── Palette
```

## Notes on file resolution, and a plea for help

With the advent of high pixel density phone displays, determining the target image height and width is tricky. You want to go big enough to look great on any phone screen, but not so large as to overly-inflate your app download size. And, of course, Apple and Google have their own ever-changing requirements for icon sizes and formats. Our core team is all developer/no designer, so- in general, we've found icons should be 1024x1024px, and logos and graphics should target at least/about 600px wide.

Open source is about sharing, and if you can find or help write a guide, we would very much welcome and be grateful for your contribution.

# Colors

Your SG's app should reflect your SG's brand, and the first step to that is color choice. Though not related to assets, this document is targeted at design-minded individuals, so this section briefly describes configuration of the Palette and using DefaultColors and Skin.

Note: The Hooligan Hymnal core team welcomes contributions and feedback on improving how colors are used in the app.

## Palette

`config.js` defines a Palette that is used to color backgrounds, text, and other UI elements throughout the app. It uses color names as keys and RGB, hex codes, or names as values.
<https://www.w3schools.com/colors/default.asp>

Populate this object with colors used by your SG and club, or complementary shades. Without making modifications to the source code, the app is designed to look nice when using two colors- a Primary and a Secondary, plus or including black and white.
(TODO: rename Secondary to Accent, tracked at <https://github.com/Chattahooligans/hooligan-hymnal-app/issues/121>)

## DefaultColors

The config object DefaultColors sets a baseline of how colors will be used in the app. Text colors should contrast with backgrounds, and so on.

The Skin tends to refer to both Palette and DefaultColors.

# Fonts

If your SG uses a particular typeface in its branding, that can be easily dropped into Hooligan Hymnal and configured for use across the app. If not, the Open Sans typeface is provided as a default, and the internet is full of free and commercial fonts. Check out the Google Fonts library as one place to get started-
<https://fonts.google.com/>

Whatever your choice, please consider including a reference to the license in the credits section of the About screen. (Instruct your developer to do this)

Once you select a typeface (or accept the default), it will be referenced in the config file for your app by the Fonts config object.

# Images

Hooligan Hymnal uses a number of photos, logos, and custom images. This section discusses the base set used in the mobile app, in order of appearance.

## Icons

Default file name(s): `icon-android.png` and `icon-ios.png`

The iOS launcher icon should be a png file sized to exactly 1024x1024 and fill the entire square, with no transparent pixels.
The Android launcher supports adaptive icons, but that effort was not spent in the initial deployment of Hooligan Hymnal. We used a 1024x1024px png, balanced to fit in a circle, with a transparent background.

Note that icons are configured in the file `app.json`, NOT `config.js`

Additional information can be found at <https://docs.expo.io/guides/app-icons/>

## Splash Screen

Default file name(s): `splash.png`

The splash screen is the first thing your users see when launching the app, and is displayed while the app updates and loads.

Note that the splash screen is configured in the file `app.json`, NOT `config.js`

Additional information can be found at <https://docs.expo.io/guides/splash-screens/>

## Home Hero

The Hero component is displayed at the top of the Home / News Feed screen. The component works in three modes, set in the config file.

### Video

Default file name(s): `home-hero-video.mp4` and `home-hero-video-overlay.png`

The default implementation of the hero component is an incredibly low-resolution video with no sound. Target 1-5MB. (Yes, that small and shitty, because it's going to be covered up.) The hero video is displayed under a semitransparent tint and an overlay image- we recommend your SG logo with a transparent background.

The overlay image is displayed at a fixed size and may require some iteration to look adequate on a variety of screen sizes. We recommend starting out by cropping the image tightly to the logo, seeing how it looks, and adding padding as necessary. It may require some fiddling, and I'm sorry about the current approach.(\*TODO: This is much improved, but still suboptimal as of 2.0.0. Tracked at <https://github.com/Chattahooligans/hooligan-hymnal-app/issues/134>)

(\*TODO: The overlay logo implementation is suboptimal as of v2.0.0. Plans for improvement are tracked at <https://github.com/Chattahooligans/hooligan-hymnal-app/issues/134>)

### Image

Default file name(s): `home-hero-image.png`

The home hero component can also be a single image. No tints, no overlays, no complications. You can use a photo, digital graphic, or solid color image, and we suggest a horizontal banner at 768-1024px wide (and as tall as you prefer).

### Prideraiser

The third mode of the Hero component is a panel that requests from the API at <https://prideraiser.org> and loads the campaign cover image. It is configured with an ID in the config file and some URL parameters. You will not be creating a file to package with Hooligan Hymnal, but the third mode is discussed here for complete coverage of the Home Hero component.

Fun fact: Hooligan Hymnal and Prideraiser have the same origin, and the projects now have some integration.

## Home Navigation Bar

Default file name(s): `home-navbar-logo.png`

The Home Hero component fades into a standard looking header/navigation bar as the user scrolls. You can specify a logo that is displayed in that bar.

## Menu Drawer

Default file name(s): `drawer-hero-background.png` and `drawer-hero-overlay.png`

The menu drawer contains an image at the top. Like the Home Hero Video, this image is displayed under semitransparent tint and an overlay logo image with transparent background. You can use a photo, digital graphic, or solid color image.

\*The hero background image is displayed at, and contained to, a fixed height based on `config.js:Skin.NavigationDrawer_HeroBackgroundHeight`. There are two strategies for designing the overlay logo image: Leaving plenty of space around the logo and setting `config.js:Skin.NavigationDrawer_HeroOverlayHeightProportion` to a proportion of or near 1, or cropping tightly around the logo and setting that value to some value much less than 1. It may require some fiddling in the config to look nice, and I'm sorry about the current approach.

(\*TODO: This is much improved, but still suboptimal as of v2.0.0. Tracked at <https://github.com/Chattahooligans/hooligan-hymnal-app/issues/134>)

## Songbook Cover

Default file name(s): `songbook-cover.png`

Hooligan Hymnal began life as a digital replacement for paper chant booklets passed out to supporters. As a nod to this history (and because it takes a couple of seconds to render the songs), the Songbook feature in the mobile app displays a book-like cover image while the songbook is rendered for the first time.

The songbook cover image is displayed on top of a solid color background. We suggest an image at 768-1024px wide (and as tall as you prefer, though the image will be scaled to fit on the screen).

## Club and SG Logos

Default file name(s): `logo-club.png` and `icon-android.png`

The app uses a fallback image on the Player screen for players without photos available, as well as a logo for the Mass Tweet Post Attachment. We use the club logo for these purposes, but not for branding elsewhere in the app.

News Feed supports a feature called Channels for different SG communication functions. Each has an avatar image, displayed in a circle like popular social media platforms. The app requires a fallback image, if a Channel avatar is not specified. Fortunately, you just created an Android launcher icon that would work nicely for such a purpose.

## Notification Icon

Default file name(s): `notification.png`

Hooligan Hymnal supports push notifications. The icon that appears in the tray is 96x96 grayscale with transparency. (The default file doesn't meet this specification, but is used in all Hooligan Hymnal deployments as of June 2020. For shame.)

Additional information can be found at <https://docs.expo.io/workflow/configuration/>

## Other Included Images

The default asset library includes a Prideraiser logo, used in the related features, as well as Prideraiser and GoFundMe icons that can be used in the configurable SocialButtons or Banners panels on the Home / News Feed screen.

## Adding Your Own

The SocialButtons panel on the Home / News Feed screen can use icon-sized images that link to other web resources. (As an example, the Chattahooligans' deployment links to a couple of fan podcasts.) Add more as necessary.

# Creator Credits

Make sure to get permission from photographers and attribute their photos to them! Currently, player bios are a great spot to give credit to an individual player image (Note: the Roster/Player screens are due for a revisit in the not-too-distant future). And the About screen can be used for catch-all attributions for hero images and fonts.

Note: Images uploaded to Posts in the News Feed support credits with each image, and a quick selection of common photographers is available in the config file, with the CommonImageCredits object.

# UI Icons

Hooligan Hymnal uses icons across the app from the MaterialCommunityIcons set, which is included in the expo-vector-icons package. While some of the icons in the admin-only screens are not exposed in the config file, all of the public-facing ones should be. If you want to change an icon away from the default, browse the options at <https://icons.expo.fyi/>
