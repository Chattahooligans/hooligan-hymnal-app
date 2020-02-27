# Asset Guide

One of the easiest ways to make your installation of Hooligan Hymnal stand out is through tasteful use of your club's colors and choosing the right assets such as SG logos. Beware the trap of making things too busy- adding more color is not necessarily the best route!

## Choose your palette

In `src/config/Settings.js`, there is a Palette that is exported to the rest of the code. By default, this defines colors for navy and sky, which are both used in the Chattahooligan Hymnal. Most of the app uses navy as its primary color, while sky is used as a secondary color in areas like the songbook or the player bios to offer complementary tones. Both colors are defined to be the exact RGB values used in the Chattanooga FC crest and they don't clash when used this way.

By contrast, NGS's Guardbook implementation defines both rouge and gold in the palette, but rouge is used as the primary color while white is chosen as the secondary in almost every UI element. While rouge and gold works for the Detroit City FC crest, using them as primary and accent colors in the UI created a garrish look in Guardbook's alpha builds.

You're free to use different shades or even different colors from your club as needed, of course. Experiment as needed while building your implementation.

## Logos and splash screen

We suggest grabbing a nicely-sized logo for your club (600x600, for instance) and using that as a placeholder on the roster screen when a player doesn't have photos available. We don't use our club's logo in other contexts such as branding the overall app, and neither should you. You'll need a few variants of your SG's logo for that.

First, get the logos that are required by Google and Apple to create your icons in the OS and stores. You'll need 1024x1024 logos for both of these use cases; the iOS version should not use any transparency and should fit into a square, while the Android version is allowed to use transparency and looks best if it does so to fit into a circle. You'll also want a 1024x1024 image to use for a splash screen while the app loads. For examples of these images, look at `big-c-android.png`, `big-c-icon-ios.png`, and `big-c-splash-heebo.png` within the `assets` folder.

You'll also want a image or two of your SG's logo with a completely transparent background. `drawer-hero-logo.png` is used as an overlay for the navigation drawer, while `home-big-c-logo.png` is used as an overlay for the video on the home screen. The Chattahooligans use slightly different variants for these, while NGS uses the same for both. You'll also want an image (`drawer-hero-background.png`) to use at the top of your navigation drawer, and a video (`5MB_Video.mp4`) to use on your home screen to show your SG in action. (Note: While we think that using a video is _great_ for showing curious downloads what your group is capable of, we know that some groups may prefer a photo. PRs to make the home screen accept either one will be accepted.)

Lastly, if you want to change the icon shown in push notifications, override `speakerphone.png`. Some people are afraid of megaphones, and we respect that.

## Player photos

This is not necessary for rollout- Guardbook launched with nothing but club logos for all the players initially, for instance. But if you can get your club to schedule headshots for every player, it's a great way for new fans to connect faces to names and bond with the squad a little faster. These can be stored on any image host. The `players` collection in the database uses a URL stored in the `thumbnail` field to show an image on the roster; the `image` field is used on the player's bio page. You can set these to the same URL if you only have one image per player. Another great option is to store a headshot in `thumbnail` and use an action shot in `image`, if you have them available.

Make sure to get permission from your photographers and attribute images to them! The bio is a great place to attribute an image for an individual player. Your About screen is a good way to include a catch-all attribution if e.g. your club takes headshots for you. Don't get caught with an awkward message asking you to add it after the fact.