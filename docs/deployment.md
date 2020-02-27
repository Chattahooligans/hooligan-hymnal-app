# Deployment best practices

This guide focuses on the non-coding aspects of deploying the Hooligan Hymnal platform. Much of the advice is technically optional depending on your SG's resources and time investment, but beware of the future impact of cutting corners. This document is based on the successes and failures of previous deployments and the pitfalls discovered in doing so.

# Budget

Before going further, make sure you're aware of the costs involved. At an absolute minimum, you will need:

* $99/year for an Apple developer account to publish to iOS
* $25 one-time fee to register for Google Play
* $7/month for Heroku's basic tier (or equivalent hosting)
* (Varies by state, but ~$50-$500) LLC registration fee for your SG

You will also need access to a Mac to publish your iOS builds, since only their developer tools can handle the upload. Your SG may already have access to some of these things before you've started the project.

# Assets

See [our assets guide](assets.md) for a guide to images and photos you should customize for your implementation

# GET STARTED ON THIS NOW

Don't wait on following this guide until after you've customized Hooligan Hymnal for your SG! All of these steps take time- some of them a surprising amount of it. You don't want to miss your original launch target because of long delays with the App Store, for instance. Start the process immediately and customize the code while you wait on bureaucracies to email you back.

## (Optional) Register an email account specific to your Hooligan Hymnal team

This account will be associated with the Google Play store, App Store, infrastructure hosts, etc. Using a separate account allows your app team to view everything necessary in one place without having to sort through everything else your SG is handling. (You can choose to use your SG's main account if you prefer, but it's much more work to split this out later if you decide to divide up your responsibilities later.)

## (Technically optional) Register your SG as an LLC

When registering accounts with the services listed in this guide, it's best to do so as an organization rather than as an individual. This is both for the individual's sake (not having all of the finances routed through them) as well as the SG's (if your app is registered in the stores under an individual, what will you do if that person needs to walk away?). If you choose not to do this, you will need to publish as an individual to the Play and App stores.

## Acquire a D-U-N-S number

Apple will not recognize your LLC without one. This process takes longer than it should. Do it as soon as you're an LLC.

## Register with the Play and App stores

The Play store goes by relatively quickly once you pay your $25. Apple does more verification, which again will take more time.

## Designate at least one team member as the Apple uploader

This person only needs to have XCode installed on a Mac. They do not need to be a developer. They don't need to compile your code. If you have a developer with a Mac, have them do this. If not, you will need to send your Mac uploader the result of `expo build:ios` when you're publishing a new .ipa file, then have them upload it via XCode to your project. [This guide](https://levelup.gitconnected.com/react-native-how-to-publish-an-expo-app-to-testflight-debug-common-errors-90e427b4b5ea) is very helpful when learning to upload to App Store Connect, including generation of an app-specific password. 

## Gather beta testers

For Android, you only need to have people download the Expo app and then point them to your published Expo project. For iOS, you'll need to add people to App Store Connect as TestFlight users, then send builds uploaded from XCode to them. Gather feedback early. If you use your beta testers to get screenshots for the stores, make sure the TestFlight indicator is not visible in iOS. Apple may reject your metadata for this on the first publish or at any update.

## Deploy servers

You'll need to deploy your server and database early on in order to test. We suggest Heroku and MongoDB Atlas, respectively. As of 2019, the $7/month tier for Heroku is enough to run the hymnal-server project. Our caching layer allows MongoDB Atlas's free tier to function without issue; typical deployments will only use small amounts of data, and the server will only consult the database once every 10 minutes for each type of data even under load. (Heroku's free tier will shut down when inactive and cause dropped requests; it is appropriate for development testing, but not deployment).

## Deploy to Play and App stores

Registering your org to publish on Google Play requires a $25 one-time free, while an Apple Developer account costs $99 annually. Make sure you registered your LLC as stated above. You will need to take screenshots running on each platform for their respective stores. The App Store requires both 6.5" and 5.5" screenshots in order to pubish for iPhone. If you enable `supportsTablet:true` in app.json, you will need to gather screenshots for both iPad geometries as well. (Note: The Chattahooligan's deployment currently supports this, while NGS's Guardbook disables this property, which causes iPad to use a zoomed in version of the iPhone app. No targeted tablet development has occurred yet; if you are in doubt, disable this property for now to save yourself some work with Apple.)

## App/Play Store gotchas

### Don't say "donate"

Neither Apple nor Google are friendly towards in-app uses of the term "donate". Check their respective rules for more information. If you are going to attempt it anyway, the SG org that is registered with the stores must be a 501(c) charity and the donation link must bounce the user out to a browser rather than work from within the app. You WILL be denied either your initial publication or a future update if you try to skirt this, and you may be banned from the platform entirely if you attempt to use Expo OTA updates to circumvent this.

Using a push notification or news feed item to suggest that people go to your website or social media feed for a new campaign is OK, and you may ask users from that secondary location to donate. Directly incorporating "donate" into the messaging or trying to create an in-app payment mechanism for it that doesn't go to a browser is the biggest concern.

### Make sure "TestFlight" isn't visible in iOS screenshots

Using TestFlight makes it easy to beta test your new .ipa file. If it's present in a screenshot, however, Apple may reject your app. Edit the screenshot if needed.

### Advertising Identifier

[This guide](https://segment.com/docs/sources/mobile/ios/quickstart/#step-5-submitting-to-the-app-store) contains the correct questions to use for an Expo app that is being published to the App Store. If you answer this incorrectly, your .ipa will will be rejected and require a new build.

### Don't solely rely on Expo OTA Updates

Expo OTA updates are very convenient. By just running `expo publish`, you can push a new version of the Hymnal to your existing users. However, new users will experience the orignal APK/IPA on first launch. Don't let people have a years-old experience; periodically publish new app bundles so new users can have a good experience.

This is doubly important if you make breaking changes; the Hooligan Hymnal database format may periodically change as we add or enhance new features, and old versions of the Hymnal may not understand the new format. When a breaking change like this occurs, you should update your server at the same time as you upgrade the app.

### Check all emails regularly

Apple in particular sends most emails to both the org account and any individual accounts that were involved in uploading a new build. However, every so often they'll only send an approval email to the main org account, which may cause you days of lost time if you're waiting for one and don't see that final email.

### Communicate any warnings/errors you get to the Hooligan Hymnal team

If you come against a deployment issue that we haven't noted here, it's very important for us to know about it. This can range from additional gotchas (having your screenshots rejected for appearance issues) to code issues (Expo regularly releases new SDK versions, and using an old SDK might prevent an update or new app from being published). 
