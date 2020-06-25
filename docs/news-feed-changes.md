Do this stuff before you upgrade from Hooligan Hymnal 1.6.1 to 1.7

# users collection

add .feedAllowed to your users who will post to the feed
This isn't checked for yet, but that code change is imminent

# rosters collection

Roster documents have a few new properties. They are optional now, but may be required in the future.

.defaultImage and .defaultThumbnail
These override Settings.Skin.Player_DefaultImage and Settings.Skin.Roster_DefaultThumbnail, respectively. I use them for a second roster for CFC Academy.

I oughta go in and rename these two keys to make more sense in the near future.

.showPlayerSongs (false/true) performs the same function as Settings.Settings.Player_ShowSongs

# channels collection

Channels are the "voice" used by an admin to post to the feed. It is required to set up at least one, else ain't nothing gonna work. I added the base record with Postman and then went in and set up users, because that's the order these things were conceived. Here's an example:

{

"\_id": SOME_ID,

// This appears on every post
"name":"Northern Guard Supporters (are shit)",

// locale may be used in the future
"defaultLocale":"en",

// a Channel screen, like a Twitter profile screen, is on the way. Put something in here, probably that matches your Twitter bio to start
"description":"",

// Linking to an externally hosted image for now
"avatarUrl":"https://pbs.twimg.com/profile_images/1145681269268910081/Fz-u2SU4_400x400.jpg",

// At some point, we'll let users follow or hide Channels, and use this property as an initial setting. Set this to true for your main SG channel, and maybe to false for like NGS Flint or Guardbook Devs or whatever
"follow":true,

// not sure the state of the server right now, but setting a channel's .active property to false will eventually remove all posts from that channel from the feed, if you need to censor things in a hurry
// it also will prevent anyone from posting to the channel
"active":true,

// an array of user IDs with various permissions. We use canCreate and canPush already, with canEdit and canDelete coming in the future
// I just set this stuff up inside mongo cloud atlas
"users":[
{"_id":"5dbcff12e0354c001588ff99","canCreate":true,"canEdit":true,"canDelete":true,"canPush":true}
]
}

# seed the feed

Make one post from your SG channel before you advertise to your users, something like "Welcome to The Guardbook," so your home screen isn't empty to start
