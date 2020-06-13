# Hooligan Hymnal

This document describes deploying the Hooligan Hymnal server and a customized version of the mobile app for your supporters group.

Please review the project README for a description of the platform and the philosophy behind it.

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

The Play store goes by relatively quickly once you pay your $25. Apple does more verification, which again will take more time.

## Designate at least one team member as the Apple uploader

This person only needs to have Transporter installed on a Mac. They do not need to be a developer. They don't need to compile your code. If you have a developer with a Mac, have them do this. If not, you will need to send your Mac uploader the result of `expo build:ios` when you're publishing a new .ipa file, then have them upload it via Transporter to your project. [This guide](https://levelup.gitconnected.com/react-native-how-to-publish-an-expo-app-to-testflight-debug-common-errors-90e427b4b5ea) is very helpful when learning to upload to App Store Connect, including generation of an app-specific password.

## Assets

See our assets document, maintained separately, for a guide to images, photos, and fonts you can prepare for your implementation.

## Slack

The Hooligan Hymnal core team (and, so far, reps for every SG who has a working deployment) use Slack regularly for communication on the future of the project and to answer setup questions. Come hang out with us! DM [@hooliganhymnal](https://twitter.com/hooliganhymnal) for an invitation.

# Deployment  Guide

This section assumes that you have a working development environment and some familiarity with source control concepts, as well as a somewhat-modern smartphone to test your application. While this section won't teach you how to code, our goal is for the instructions to be as accessible as possible. If you're just getting started, we recommend installing the free code editor [Visual Studio Code](https://code.visualstudio.com/), which will direct you to install [git](https://git-scm.com/download) source control on your computer.

## Create Accounts
You should create several accounts in your SG's name to deploy your customized version of Hooligan Hymnal.
* [GitHub](https://github.com/) for cloud source control. Each developer will have their own user account, and creating an [Organization](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams) for your SG is recommended.
* [Expo](https://expo.io/) is based on React Native, and we use Expo services in the application and server.
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is used for cloud data storage.
* [Cloudinary](https://cloudinary.com/) is currently used to store images used in the Roster and News Feed.
* [Heroku](https://www.heroku.com/) is currently the recommended host for the server.
* [Firebase](https://firebase.google.com/) is the service used to manage push notifications for Android devices. 

## Fork the Code

In your SG's github account, fork the code for the [Hooligan Hymnal Server](https://github.com/Chattahooligans/hooligan-hymnal-server), and the [Hooligan Hymnal App](https://github.com/Chattahooligans/hooligan-hymnal-app). This is your starting point for building the app. 

## Create a MongoDB Cluster

Create an account in MongoDB and create a free M0 sandbox cluster. Once the cluster is created, press the "connect" button to begin the process of generating a URI to feed into Heroku. You will use the Node 2.2.1.2+ option to generate the URI. Create a username and STRONG password. Once your URI has been generated, go to the "Network Access" tab in the cluster settings. Change the allowed IP Address to 0.0.0.0/0. MongoDB will also require permission changes to allow access from everywhere. The free tier of cloudDb does not allow for specific IP whitelisting, so you will need to set a VERY strong DB password and set the allowed IPs to 0.0.0.0/0. This will open your DB to access from anywhere in the world, so a secure password is essential.

## Configure the Server

### Environment Variables

To configure environment variables, look at the [server guide](https://github.com/Chattahooligans/hooligan-hymnal-app/blob/master/docs/server.md). It is best to do this before deploying the server. 
### Deploy the Server

To deploy the server, log into Heroku and create a new app. For testing purposes, a free app is sufficient. After deployment, the $7 paid tier will suffice for production. In the "deploy tab" connect to your SG's GitHub accout and select the Hooligan Hymnal Server that you forked to your account. Make sure you do not enable automatic deploys, as breaking changes may be pushed to the master branch frequently. To deploy the server using the command line, please refer to the [Heroku documentation](https://devcenter.heroku.com/articles/heroku-cli).

### Logging In

After configuring the environment variables, restart the dyno of your application in Heroku and wait for the app to reload. You will be able to navigate to the URL provided by Heroku. Generally, this is {your app name}.herokuapp.com. You'll be able to register a new user, who will be the adminstrative user for tthe app. DO THIS IMMEDIATELY, otherwise anyone that happens to find your app URL will be able to register an admin user.

### Initial Data

This stuff may all be in server docs eventually. I just mainly don't want to forget that they need to create an admin account and a default Channel for the feed asap.

## Initialize a Local Code Repository for the Mobile App

TODO instructions
don't forget to backup google-services.json somewhere
npm install lol
oh and install npm and expo cli and so on

## Configure the Mobile App

TODO preamble
(Eventually, the master branch will be generic with generic assets and Chattahooligans will be on our own branch, but not today, suckers!)

### app.json

TODO instructions

### /assets/

refer to assets guide again

### config.js

TODO instructions (pretty well self-documented)
prolly start out by deleting config.js and renaming something like config_example.js

### /locales/

TODO instructions
don't forget to edit manifest.json

## Run and Test the Mobile App

TODO instructions

## Build the Mobile App (for testers? for the store?)









## Customize the application
Fork the Hooligan Hymnal App repository to your github account and create a new branch for your SG. You can make all of your changes to the application in that branch and it will be isolated from the other branches of other SGs. It also makes it much simpler to roll application updates into your deployment. 
A guide to replacing assets in the application can be found in the Assets.md (https://github.com/Chattahooligans/hooligan-hymnal-app/blob/master/docs/assets.md). A standardized naming convention and guide for all image assets will be created soon. Try to keep your image assets as small as possible, it will keep your download size small, and allow the application to load much faster. 

## Testing the application
Using the command line, you can navigate to your local copy of the GitHub repo, and launch a test version of the application using `expo start`. This will generate a QR code you can scan with your phone and test the application in real time. Every time you save changes to the codebase, the application will reload on your phone. This also includes detailed log information on what is causing application crashes.

## Managing Data
Once your Heroku server is up and running, you can use the web interface at {yourAppName}.heroku.com. The very first user created will be the admin user. These usernames/passwords are also the logins for the in-app Capo Dashboards. Modifying permissions of users can be done in the web interface, or in the database manually.

You can add rosters, players, and songs to the application using the web interface. Some management must still be done manually in the database editor, such as organizing songs in the songbooks. 

## Building the Application
Once you are satisified with how the application looks in your test builds, you can create your first build for distribution. To do this, use the command `expo build:ios`. Once that completes with no failures, use the commmand `expo build: android` to build the Android bundles.

### OTA Updates
It is possible to update the application without releasing a completely new build to the App Stores. This could be used to change images in the app, add extra drawer items, etc. To do this, complete your testing using the Expo application, and use the command `expo publish`. This will create new bundles that the user's phone will download and self-update.
