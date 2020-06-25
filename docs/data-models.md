# Hooligan Hymnal Data Models Guide (super shitty first draft)

This document presents an overview of the data models used by the Hooligan Hymnal platform, and is intended to help admin users populate the Hooligan Hymnal database with confidence. The data models are introduced in the order we think you should become familiar with them.

Please review the project README for a description of the platform and the philosophy behind it.
<https://github.com/Chattahooligans/hooligan-hymnal-app/blob/main/README.md>

## Users

User accounts are required for admin users, which have permissions to use the Hooligan Hymnal admin dashboard. User accounts are NOT required for fans to download and use the app, but may be used in the future for advanced features.

The `users` database collection contains objects for these admin users, and each includes various `____Allowed` fields, which are used to grant permissions to that user in the admin dashboard or permission to post to the news feed. Each field is mostly self explanatory, but please note that disabling `feedAllowed` or `pushNotificationsAllowed` take precedence over related permissions in News Feed _Channels_. Channels will be discussed later in this document.

## Songs and Songbooks

**IMPORTANT** It is critical to understand the relationship between Songs and Songbooks in Hooligan Hymnal (which also applies to Players and Rosters).

A _Song_ record includes information about a song or chant, like the title and lyrics.
The _Songbook_ is an organized list of references to _Song_ records.

So, if you want to remove an item from your current Songbook, **remove its reference** from the Songbook. **Do not delete** the Song record, because you won't be able to include it again, unless you create a new Song record and add its reference to the Songbook.

We recommend the _Songs_ database collection act as an archive of all of your SG's songs, whether or not they are listed in the current _Songbook_. An added benefit of this approach is that you'll create a historical archive over time.

### Songs

The Songs collection contains records for songs and chants. The `title` and `lyrics` fields are self explanatory, and Hooligan Hymnal includes a few additional concepts.

- `instructions` (optional) can be used to provide a hint for the context of the song. eg, "sing at minute 69"
- `referenceTitle` (optional) is displayed below the Song title, and can be used to display the name of a tune you've repackaged into a song.
- `referenceLink` (optional) can be any web link with an example of the song- either a YouTube link to the original tune or a live match recording uploaded to a service like SoundCloud. If referenceLink is populated, a circlular Play button will be displayed in the top right corner of the Song view, and tapping it will open the link in a browser.
- `sheetMusicLink` (optional) can be any web link with sheet music for instrumentalists. In Chattanooga, we put these in a folder on Google Drive. If sheetMusicLink is populated, a treble clef button will be displayed in the top right corner of the Song view, and tapping it will open the link in a browser.
- `legend` (optional) are icons displayed in the bottom left corner of the Song view. In Chattanooga, we use emoji characters like Drum and Scarf in this field (but we intend to revisit the concept entirely)
- `capoSignal` (optional) if your songs are numbered/labeled for capos, you may input those in this field. This data is displayed on the Songbook Table of Contents screen. (I forget why we took it out of the Song view.)

### Songbooks

Some SGs may want to break their song collection up into sections- songs for matches, songs for players, songs for special occasions. A Songbook object contains a `chapters` array to facilitate this, though many SGs that use Hooligan Hymnal will only ever have one chapter in their Songbook. Each chapter includes a `chapterTitle` and an array of `songs`. Each song is a reference to the unique `_id` of an object in the Songs database collection. `hint` is a copy of the song title, and makes it easier to see what's going on when looking directly at the database.

NOTE: Currently, Hooligan Hymnal only supports a single Songbook object, which was created for you when the server application was initialized. Our team has ideas to do more with Songbooks, but we haven't implemented anything else yet.

## Players and Rosters

**IMPORTANT** It is critical to understand the relationship between Players and Rosters in Hooligan Hymnal (which also applies to Songs and Songbooks).

A _Player_ record includes information about a player, like their name, position, and photo.
A _Roster_ is an organized list of references to _Player_ records.

So, if you want to remove an item from your current Roster, **remove its reference** from the Roster. **Do not delete** the Player record, because you won't be able to include it again, unless you create a new Player record and add its reference to the Roster.

We recommend the _Player_ database collection act as an archive of all of your club's players, whether or not they are listed in the current _Roster_. An added benefit of this approach is that you'll create a historical archive over time.

### Players

The Players collection contains records for players. Most fields are self explanatory, but note that `flag` can be populated with a flag emoji. The `bio` object can contain a short biography in multiple languages. `thumbnail` appears on the Roster list, and currently only the first item in the `images` array is displayed in the app. (Revisiting the Player profile UI and associated data models is near the top of our to do list.)

### Rosters

Like Songbooks, Rosters contain an organized list of references to the Players database collection using the `_id` field, via an array of `players` in the structure. `hint` is a copy of the player number/name, and makes it easier to see what's going on when looking directly at the database. `rosterTitle` is displayed in the mobile app. To support clubs with multiple rosters (for a women's/men's squad or a different roster for Cup competition), `active` rosters are served to the app and placed in the dropdown selector on the Roster screen, and the first roster where `default` is set is autoomatically selected. Rosters for previous seasons can be kept in the database for historical purposes, but not served to the app, but setting active to false.

### Foes

Foes are an optional feature that allows SGs to make available rosters for opposing teams, and are found in the mobile app by tapping on the Roster feature in the menu.

Objects in the Foes database collection break from the pattern used for Songs/Songbooks and Players/Rosters, and all of the player data is contained in the Foe object. The `competition` field should be used to represent the season and competition of the opposing roster- league play, cup tournaments, and friendlies, as appropriate -and should exactly match for all opponents in that competition. `textColor` should contrast with `backgroundColor` for Foe objects.

Using Foes requires additional configuration in the mobile app. The Foes UI can be toggled on or off in the app by setting `config.js:Settings.Roster_FoesEnabled` to false. `config.js:Settings.RosterFoes_DefaultCompetition` is a string used to set the default competition in the Foes screen. The text much match `competition` exactly.

## News Feed

Hooligan Hymnal's News Feed supplements your SG's existing social media and website efforts (and may one day supplant some of those efforts, as social media algorithms suppress unpaid posts from feeds).

### Channels

Channels are a core concept of the News Feed feature. Your deployment can be a single channel for your SG, or sophisticated groups can split the feed into multiples- a channel for your merch program, your charity arm, and one just for match day announcements. We recommend starting with one channel, and adding more only as needed, rather than starting with several that go unused.

Each channel contains a `users` array that refers to User accounts that are able to post to the News Feed using that channel, and which permissions that user has. As mentioned in the **Users** section of this document, the channel permissions are overridden by those on the User account itself. To spell it out plainly- if you set up a user to post to a Channel and they are unable to, check that `feedAllowed` and `pushNotificationsAllowed` are set correctly on their user account. (Or, you can quickly remove a user's news feed access by toggling the permissions on their user account without having to adjust each channel. This pattern is useful in a scenario where a user's news feed access needs to be revoked quickly.)

### Feed Items

The fields for objects the News Feed are mostly self explanatory. Note that only objects where `active` is true will be served to the mobile app. Setting active to false will hide the feed item from the news feed, but leave it in the database. (Note that we use "feed item" and "post" interchangeably.)

`push` indicates if a News Feed post was sent to users as a push notification. Note that it is possible to post to the news feed without sending a push notification. Don't abuse the push notification functionality and upset your users.

The `images` array for feed items is an ordered list of images that are displayed in the post. Each image contains a `metadata` object with `caption` and `credit` fields. See `config.js:CommonImageCredits` for a convenient way to attribute photographers.

The `attachments` array for feed items is an ordered list of attachments that are displayed in the post. Attachments are a powerful, customizable feature of the Hooligan Hymnal news feed, and...
TODO: ramble about how awesome and revolutionary attachments are

### Push Tokens

The pushtokens collection contains objects for each installation of your Hooligan Hymnal mobile app on a soccer fan's smart device. The objects contain a `pushToken` that is used to send push notifications to users when certain news feed posts are made, and for other features in the future. The collection also contains some metadata about when a user last used the app and their phone platform, though this is anonymous and cannot be used to personally identify a single user for tracking purposes.

### Notification Engagements

For news feed posts that are also sent out as a push notification, Hooligan Hymnal logs when each user taps on the notification. This information is available to admin users who are logged in by tapping the down arrow menu on each news post, and can be used to estimate the type or timing of news posts where users are likely to tap on push notifications- you can use this data to make better posts (and bother your users less).
