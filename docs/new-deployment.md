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
* [Heroku](https://www.heroku.com/ is currently the recommended host for the server.
* TODO Firebase for android notifications

## Fork the Code

TODO instructions, app and server

## Create a MongoDB Cluster

TODO instructions, also

MongoDB will also require permission changes to allow access from everywhere. The free tier of cloudDb does not allow for specific IP whitelisting, so you will need to set a VERY strong DB password and set the allowed IPs to 0.0.0.0/0. This will open your DB to access from anywhere in the world, so a secure password is essential.

## Deploy the Server

TODO instructions, refer to server docs

## Configure the Server

(maybe covered in the section above)

## Initialize a Local Code Repository

TODO instructions
don't forget to backup google-services.json somewhere

## Configure the App

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







## Set Up Environment
Once your accounts are created, you will need to deploy a Heroku server. This includes forking the Hymnal Server repository to your GitHub account, and using your github link to deploy in Heroku. https://github.com/Chattahooligans/hooligan-hymnal-server. It is reccomended that you do not enable automatic deployments, since the master branch is being worked on and new features mught break your client if they havent been updated. Best practice is to create a `production` branch and deploy that at every stable release of the server. 
Set up the environment variables in Heroku. Obtain the Cloudinary URL and MongoDB URI. Instructions for connecting them to the Heroku Server can be found here. https://github.com/Chattahooligans/hooligan-hymnal-app/blob/master/docs/server.md. Once your server is up and running, CREATE THE FIRST USER IMMEDIATELY. The first created user is the superuser in the application, and will have access to change any data in your database. 


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
