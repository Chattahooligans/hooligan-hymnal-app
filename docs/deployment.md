# Deployment best practices

This guide focuses on the non-coding aspects of deploying the Hooligan Hymnal platform. Much of the advice is technically optional depending on your SG's resources and time investment, but beware of the future impact of cutting corners. This document is based on both the successes and failures of previous deployments and the pitfalls discovered in doing so.

# GET STARTED ON THIS NOW

Don't wait on following this guide until after you've customized Hooligan Hymnal for your SG! All of these steps take time- some of them a surprising amount of it. You don't want to miss your original launch target because of long delays with the App Store, for instance. Start the process immediately.

# Register an email account specific to your Hooligan Hymnal team

This account will be associated with the Google Play store, App Store, infrastructure hosts, etc. Using a separate account allows your app team to view everything necessary in one place without having to sort through everything else your SG is handling.

# Register your SG as an LLC

When registering accounts with the services listed in this guide, it's best to do so as an organization rather than as an individual. This is both for the individual's sake (not having all of the finances routed through them) as well as the SG's (if your app is registered in the stores under an individual, what will you do if that person needs to walk away?).

# Acquire a D-U-N-S number

Apple will not recognize your LLC without one. This process takes longer than it should. Do it as soon as you're an LLC.

# Register with the Play and App stores

The Play store goes by relatively quickly once you pay your $30. Apple does more verification, which again will take more time.

# Designate at least one team member as the Apple uploader

This person only needs to have XCode installed on a Mac. They do not need to be a developer. They don't need to compile your code. If you have a developer with a Mac, use them. If not, you only need to feed this person the result of `expo build:ios` when you're publishing a new .ipa file, then have them upload it via XCode to your project. (TODO: include the link on how to set up an app-specific password, etc)

# Gather beta testers

For Android, you only need to have people download the Expo app and then point them to your published Expo project. For iOS, you'll need to add people to App Store Connect as TestFlight users, then send builds uploaded from XCode to them. Gather feedback early. If you use your beta testers to get screenshots for the stores, make sure the TestFlight indicator is not visible in iOS. Apple may reject your metadata for this. (They might also let you publish the first time, then only catch the issue when publishing a later update.)

# Deploy servers

You'll need to deploy your server and database early on in order to test. We suggest Heroku and MongoDB Atlas, respectively. As of 2019, the $7/month tier for Heroku is enough to run the hymnal-server project. Our caching layer allows MongoDB Atlas's free tier to function without issue; typical deployments will only use small amounts of data, and the server will only consult the database once every 10 minutes for each type of data even under load. (Heroku's free tier will shut down when inactive and cause dropped requests; it is appropriate for development testing, but not deployment).

# Deploy to Play and App stores

TODO: gotchas and nonsense