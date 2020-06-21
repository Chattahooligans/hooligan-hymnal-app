# Hooligan Hymnal

This document describes deploying the Hooligan Hymnal server and a customized version of the mobile app for your supporters group.

Please review the project README for a description of the platform and the philosophy behind it.
https://github.com/Chattahooligans/hooligan-hymnal-app/blob/main/README.md

Hooligan Hymnal uses the Expo SDK and services. Parts of this guide attempt to interpret the official Expo documentation, available at https://docs.expo.io/

# Precursor Considerations and Tasks

This section focuses on the non-coding aspects of deploying the Hooligan Hymnal platform. Much of the advice is technically optional depending on your SG's resources and time investment, but beware of the future impact of cutting corners. This advice is based on the successes and failures of previous deployments and the pitfalls discovered in doing so.

Don't punt these tasks until after you've customized Hooligan Hymnal for your SG! All of these steps take time- some of them a surprising amount of it. You don't want to miss your original launch target because of long delays with the App Store, for instance. Start the process immediately and customize the code while you wait on bureaucracies to email you back.

## Budget

Before going further, make sure you're aware of the costs involved. At an absolute minimum, you will need:

* $99/year for an Apple developer account to publish to iOS
* $25 one-time fee to register for Google Play
* $7/month for Heroku's basic tier (or equivalent hosting)
* (Varies by state, but ~$50-$500) LLC registration fee for your SG

You will also need access to a Mac to publish your iOS builds, since only their developer tools can handle the upload. Your SG may already have access to some of these things before you've started the project.

## (Optional) Register an email account specific to your Hooligan Hymnal team

This account will be associated with the Google Play store, App Store, infrastructure hosts, etc. Using a separate account allows your app team to view everything necessary in one place without having to sort through everything else your SG is handling. (You can choose to use your SG's main account if you prefer, but it's much more work to split this out later if you decide to divide up your responsibilities later.)

## (Technically optional) Register your SG as an LLC

When registering accounts with the services listed in this guide, it's best to do so as an organization rather than as an individual. This is both for the individual's sake (not having all of the finances routed through them) as well as the SG's (if your app is registered in the stores under an individual, what will you do if that person needs to walk away?). If you choose not to do this, you will need to publish as an individual to the Play and App stores.

## Acquire a D-U-N-S number

Apple will not recognize your LLC without one. This process takes longer than it should. Do it as soon as you're an LLC.

## Register with the Play and App stores

The Play store goes by relatively quickly once you pay your $25. Apple does more verification, which again will take more time. More detailed information can be found in the "Create Accounts" section below.

## Designate at least one team member as the Apple uploader

This person only needs to have Transporter installed on a Mac. They do not need to be a developer. They don't need to compile your code. If you have a developer with a Mac, have them do this. If not, you will need to send your Mac uploader the result of `expo build:ios` when you're publishing a new .ipa file, then have them upload it via Transporter to your project. [This guide](https://levelup.gitconnected.com/react-native-how-to-publish-an-expo-app-to-testflight-debug-common-errors-90e427b4b5ea) is very helpful when learning to upload to App Store Connect, including generation of an app-specific password.

## Assets

Our [Assets Guide](assets.md) provides a comprehensive description of contents of the assets folder, and has been written in such a way that you should be able to share the file with someone in your SG with design chops to collect or create those assets. If you are fortunate enough have someone to lean on for this task, send them that document now, as it will take them some time.

## Slack

The Hooligan Hymnal core team (and, so far, reps for every SG who has a working deployment) use Slack regularly for communication on the future of the project and to answer setup questions. Come hang out with us! DM [@hooliganhymnal](https://twitter.com/hooliganhymnal) for an invitation.

# Deployment Guide

This section assumes that you have a working development environment and some familiarity with source control concepts, as well as a somewhat-modern smartphone to test your application. While this section won't teach you how to code, our goal is for the instructions to be as accessible as possible. If you're just getting started, we recommend installing the free code editor [Visual Studio Code](https://code.visualstudio.com/), which will direct you to install [git](https://git-scm.com/download) source control on your computer. You will also need to install the [Node.js runtime and "npm" package manager](https://nodejs.org/en/download/).

## Create Accounts

You will need to create several accounts in your SG's name to deploy your customized version of Hooligan Hymnal. For each (excepting a pesonal GitHub account- more on this later), we recommend using the email you created for this project (above) or your SG email.

We recommend saving all of the credentials somewhere that the officers of your SG can access them in case another developer joins and needs to reference them or you need to step back. Also

### GitHub (recommended)

The official code repository for Hooligan Hymnal lives on [GitHub](https://github.com/). Create a personal account if you don't already have one, and creating an [Organization](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams) for your SG is recommended.

### Expo

[Expo](https://expo.io/) is a technology platform based on React Native, and we use Expo services in the application and server.

After you create your SG account, download the Expo client app from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US) and/or [Apple App Store](https://apps.apple.com/us/app/expo-client/id982107779), and log in once it's installed. You'll use this app to test Hooligan Hymnal and see your configuration changes.

### MongoDB Cloud Atlas

[MongoDB Cloud Atlas](https://www.mongodb.com/cloud/atlas) is used for cloud data storage. Name this account after your SG as well.

### Cloudinary

[Cloudinary](https://cloudinary.com/) is currently used to store images used in the Roster and News Feed. It's a paid service, but so far no SG has exceeded the free quota.

Tip: You can get extra quota on your Cloudinary account (and get more usage out of the free tier) by following Cloudinary on Facebook/Twitter. Look on the right-side of the dashboard for more information.

### Google Firebase

[Firebase](https://firebase.google.com/) is the service used to manage push notifications for Android devices. Firebase will use the same Google Account that you use for Google Play.

TODO: `google-services.json`

### Heroku

[Heroku](https://www.heroku.com/) is currently the recommended host for the server.

### Android Developer / Google Play

TODO

### Apple Developer/ Apple App Store

TODO

## Create a Database

Log into MongoDB Cloud Atlas and create a free M0 sandbox cluster. Once the cluster is created, press the "connect" button to begin the process of generating a URI to feed into Heroku. You will use the Node 2.2.1.2+ option to generate the URI. Create a username and STRONG password. Once your URI has been generated, go to the "Network Access" tab in the cluster settings. The free tier of does not allow for specific IP whitelisting, so set the allowed IPs to 0.0.0.0/0. This will open your DB to access from anywhere in the world, so a secure password is essential.

## Fork the Code

From your SG's github account, [fork the code](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) for [Hooligan Hymnal Server](https://github.com/Chattahooligans/hooligan-hymnal-server) and [Hooligan Hymnal App](https://github.com/Chattahooligans/hooligan-hymnal-app). This is your starting point for building the app. 

## Configure the Server

TODO: talk about server

### Environment Variables

To configure environment variables, read the [server guide](server.md). It is best to do this before deploying the server. 

### Deploy the Server

To deploy the server, log into Heroku and create a new app. For testing purposes, a free app is sufficient. After deployment, the $7 paid tier will suffice for production. In the "Deploy" tab connect to your SG's GitHub account and select the Hooligan Hymnal Server that you forked to your account. Make sure you do not enable automatic deploys, as breaking changes may be pushed to the main branch frequently. To deploy the server using the command line, please refer to the [Heroku documentation](https://devcenter.heroku.com/articles/heroku-cli).

### Register an account and Log In

After configuring the environment variables, restart the dyno of your application in Heroku and wait for the app to reload. You will be able to navigate to the URL provided by Heroku. Generally, this is {your app name}.herokuapp.com. The first user created will automatically be an administrator, so we recommend you LOG IN IMMEDIATELY to the Hooligan Hymnal admin dashboard.

## Initialize a Local Code Repository for the Mobile App

You have your accounts created. You have your server set up. Now it's time for the fun part- preparing your customized version of the Hooligan Hymnal smartphone app!

If you didn't install VSCode, git, and Node.js/npm earlier, and log into the Expo client on your phone, do that now.

To get the code on your machine and finish preparing your environment:
* Create a new folder and name it after your GitHub organization. This is where your app and server projects will live.
* Open VSCode and use the "Open folder..." command to open that folder.
* Open a Terminal and [clone your fork of the codebase](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository). This may take a few minutes.
* TODO: git remote add upstream
* In the terminal, run the command `npm install -g expo-cli` to install the Expo command line interface. This will take a few minutes.
* After Expo CLI is installed, run the command `expo login` and input your Expo account credentials.
* In the terminal, run the command `npm install` to download dependency packages. This will take several minutes, but you can continue with the guide while it runs.
* TODO: Where do the Firebase/google-services.json instruction + backup live?

## Configure the Mobile App

Hooligan Hymnal has been designed such that the appearance can be changed and certain features/behaviors affected by making edits to just a few files. You'll need to make edits to app.json and point the configuration file at your server immediately, but the rest of the workflow will be a cycle of making small changes, testing your app, and repeating until you're happy with it and ready to build and publish.

### app.json

**THIS SECTION IS THE MOST IMPORTANT OF THEM ALL. IT IS VERY EASY TO MAKE A MISTAKE THAT WILL RUIN YOUR LIFE FOREVER. DON'T FUCK IT UP.**

The app.json file contains information needed to help turn the code into a working application. It's critical to make sure this file is correct *before* you run `expo publish` or `expo build` for the first time.

Let's walk through some fields that you should pay special attention to.

In the "expo" section:
* `owner` is the Expo account name you registered earlier.
* [once set, never change] `slug` is a unique name for your application on the Expo service. Name it after your app, with dashes instead of spaces.
* `version` is the version of the application. We'll discuss this more later in the section about building the app.
* `primaryColor` is an RGB color code. Change it to the main color of your SG's logo.
* `splash.backgroundColor` is also an RGB color code. Once your application's splash screen is available, set this color to match its background.
In the "android" section:
* [once set, never change] `package` is a unique name for your application on Google Play. See the link at the bottom of this section for more information, or ask for guidance on Hooligan Hymnal Slack.
* `versionCode` is a number that you should increment each time you submit a new build to Google Play. (It's easy to forget this and have to fix it and rebuild.) We'll discuss this more later in the section about building the app.
In the "ios" section:
* [once set, never change] `bundleIdentifier` is a unique name for your application on the Apple App Store. It probably matches the value in `android.package`

Additional information can be found at https://docs.expo.io/workflow/configuration/

### /assets/

The assets folder at the root of the project contains images and fonts that are used in the mobile application. Our [Assets Guide](assets.md) provides a comprehensive description of contents of the assets folder, and has been written in such a way that you should be able to share the file with someone in your SG with design chops to collect or create those assets.

### config.js

The config file contains the vast majority of settings that alter the appearance and behavior of the mobile application. It consists of several sections, and each section has relevant documentation and instructions. If you have questions, don't be too shy to ask in the Hooligan Hymnal Slack workspace. (This way, we can help you AND improve the documentation going forward.)

### /locales/

The locales folder at the root of the project contains the static text in the mobile application. Multiple translations are supported via i18n, for SGs or users who speak languages other than English. You will NEED to change some of the text before publishing your version of the mobile app.

The project includes `example-en.json` as an English-language starting point. Leave this file alone, as future changes to the schema will modify it, and it will be easy to run a diff and see what changed. The example consists of several sections, and each section contains a `_comment` field describing how the text is used. As noted at the top of the file, each section also contains recommendations for which text is safe to leave alone and which text must be customized for your SG.

To edit the text for your app:
* Make a copy of `example-en.json` and name it as `{your language code}.json`.
* If English is not your primary language, translate the text into your preferred language (and please submit a PR back to the project with the example schema in another language!).
* Edit the text inside the file, paying extra attention to the `_comment` recommendations.
* Edit `manifest.js` to set the available translations and default locale. This file contains additional instructions.

## Run and Test the Mobile App

To start testing your mobile app, navigate to your local directory in a command prompt and run the command `npm install`. This will set up the environment and enable you to use the Expo CLI to run a test version of your app. To start a test, use the command `expo start`, which will start a local server and display a QR code for you to scan. Every time you save changes to the codebase, the application will reload on your phone. This also includes detailed log information on what is causing application crashes. We've seen a number of issues while deploying the app already, so any questions you have will be easily answered in the Slack channel. 

## Build the Mobile App for Google Play and Apple App Store

TODO: Discuss app.json changes for version and android.versionCode

Once you are satisifed with the functionality and look of the app in the Expo test interface, you can build your apps and prepare them for publication using `expo build:ios` and `expo build:android`. This will generate an APK and IPA file to upload to the Google Play and Apple App Stores.

It is reccomended to beta test your app outside of the Expo environment, and both the Google Play and Apple App Stores have provisions for beta testing. It is often easier to have your Android beta testers use the Expo app to test your app. Apple will force you to use TestFlight to beta test the application. 

## Publish the Mobile App

TODO instructions (moe is not sure what to add here)

### Publish to Google Play

TODO: add link to instructions or flush this out

To publish the app to the Google Play Store, complete the registration for a developer account and prepare your submission. The steps to complete your submission are relatively straightforward and well documented on the Google Play Store's website. An important thing to note is your content rating, which will be different for each app based on your chants. The Google Play review process takes about a day. 

### Publish to Apple App Store

TODO: discuss advertising ID

Publishing your app on Apple's App Store is also pretty straghtforward. Use Transporter to upload your application to the App Store Connect portal, and build your release inside of the web interface. It is imperative that you don't mention "donate" anywhere in the app otherwise your app will be rejected. It is also important to make sure your screenshots do not include "Testflight" in them. It usually takes 1-3 days for Apple to review your app after you submit it.

## Updating the App

### OTA  ("Over the Air") Updates

TODO: Reinforce app.json changes for version only

You can publish updates to your application without submitting an entirely new APK or IPA to the stores. You can make small changes in the application and push updates to the bundles using `expo publish`. The app will check for and download new bundles at each start and apply them at the next initialization. If you want to see them immediately, force close and restart the app.

### New Builds

TODO: Reinforce app.json changes for version and android.versionCode, explain why new builds are useful vs just OTA