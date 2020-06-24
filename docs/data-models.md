# Hooligan Hymnal Data Models Guide

This document presents an overview of the data models used by the Hooligan Hymnal platform, and is intended to help admin users populate the Hooligan Hymnal database with confidence. The data models are introduced in the order we think you should become familiar with them.

Please review the project README for a description of the platform and the philosophy behind it.
<https://github.com/Chattahooligans/hooligan-hymnal-app/blob/main/README.md>

## Users

User accounts are required for admin users, which have permissions to use the Hooligan Hymnal admin dashboard. User accounts are NOT required for fans to download and use the app, but may be used in the future for advanced features.

The `users` database collection contains records for these admin users, and each includes various `____Allowed` fields, which are used to grant permissions to that user in the admin dashboard or permission to post to the news feed. Each field is mostly self explanatory, but please note that disabling `feedAllowed` or `pushNotificationsAllowed` take precedence over related permissions in News Feed *Channels*. Channels will be discussed later in this document.

## Songs and Songbooks

**IMPORTANT** It is critical to understand the relationship between Songs and Songbooks in Hooligan Hymnal (which also applies to Players and Rosters).

A *Song* record includes information about a song or chant, like the title and lyrics.
The *Songbook* is an organized list of references to *Song* records.

So, if you want to remove an item from your current Songbook, **remove its reference** from the Songbook. **Do not delete** the Song record, because you won't be able to include it again, unless you create a new Song record and add its reference to the Songbook.

We recommend the *Songs* database collection act as an archive of all of your SG's songs, whether or not they are listed in the current *Songbook*. An added benefit of this approach is that you'll create a historical archive over time.

### Songs

The Songs collection contains records for songs and chants. The `title` and `lyrics` fields are self explanatory, and Hooligan Hymnal includes a few additional concepts. 

* `instructions` (optional) can be used to provide a hint for the context of the song. eg, "sing at minute 69"
* `referenceTitle` (optional) is displayed below the Song title, and can be used to display the name of a tune you've repackaged into a song. 
* `referenceLink` (optional) can be any web link with an example of the song- either a YouTube link to the original tune or a live match recording uploaded to a service like SoundCloud. If referenceLink is populated, a circlular Play button will be displayed in the top right corner of the Song view, and tapping it will open the link in a browser.
* `sheetMusicLink` (optional) can be any web link with sheet music for instrumentalists. In Chattanooga, we put these in a folder on Google Drive. If sheetMusicLink is populated, a treble clef button will be displayed in the top right corner of the Song view, and tapping it will open the link in a browser.
* `legend` (optional) are icons displayed in the bottom left corner of the Song view. In Chattanooga, we use emoji characters like Drum and Scarf in this field (but we intend to revisit the concept entirely)
* `capoSignal` (optional) if your songs are numbered/labeled for capos, you may input those in this field. This data is displayed on the Songbook Table of Contents screen. (I forget why we took it out of the Song view.)

### Songbooks

Some SGs may want to break their song collection up into sections- songs for matches, songs for players, songs for special occasions. A Songbook record contains a `chapters` array to facilitate this, though many SGs that use Hooligan Hymnal will only ever have one chapter in their Songbook. Each chapter includes a `chapterTitle` and an array of `songs`. Each song is a reference to the unique `_id` of an object in the Songs database collection.

NOTE: Currently, Hooligan Hymnal only supports a single Songbook record, which was created for you when the server application was initialized. Our team has ideas   to do more with Songbooks, but we haven't implemented anything else yet.

## Players and Rosters

**IMPORTANT** It is critical to understand the relationship between Players and Rosters in Hooligan Hymnal (which also applies to Songs and Songbooks).

A *Player* record includes information about a player, like their name, position, and photo.
A *Roster* is an organized list of references to *Player* records.

So, if you want to remove an item from your current Roster, **remove its reference** from the Roster. **Do not delete** the Player record, because you won't be able to include it again, unless you create a new Player record and add its reference to the Roster.

We recommend the *Player* database collection act as an archive of all of your club's players, whether or not they are listed in the current *Roster*. An added benefit of this approach is that you'll create a historical archive over time.

### Players

### Rosters

### Foes

## Channels

## Feed Items

### Images

### Attachments

### Notification Engagements

## Push Tokens