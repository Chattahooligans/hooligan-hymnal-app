# Hooligan Hymnal

Hooligan Hymnal is a free, open source mobile app for soccer supporters groups. It features an auto-updating songbook, a social media-like news feed with push notifications, and more.

## Introduction

From the minds that brought you supporter culture revalations like [Prideraiser.org](https://prideraiser.org) and positioning capos in the back of the section, The Chattahooligans, independent supporters of Chattanooga Football Club, have conceived the future of SG information sharing: Hooligan Hymnal. After rigorous experimentation and seeing our community embrace the technology, we shared it with our Mitten-state frenemies, the Northern Guard Supporters, and are advancing the platform even further.

At long last, we're sharing this revolutionary invention with the world- to improve supporter culture for all of us and to make managing supporters groups less exhausting.

<img src="/docs/readme-screenshots/chattahooligan-hymnal-home.png" width="188" height="333" /> <img src="/docs/readme-screenshots/chattahooligan-hymnal-song.png" width="188" height="333" /> <img src="/docs/readme-screenshots/chattahooligan-hymnal-toc.png" width="188" height="333" /> <img src="/docs/readme-screenshots/chattahooligan-hymnal-roster.png" width="188" height="333" />

## Features

The smartphone application and server are chock full of useful features, each born from necessity and based on the experience of wrangling some of the most sophisticated supporters groups in the game.

### Digital Songbook/Chant Sheet

Always up-to-date, no printing or folding required.

The Hooligan Hymnal songbook can include links to YouTube/Soundcloud, sheet music for brass players, and has an interactive Table of Contents. SGs with large libraries of stadium chants and songs can stay organized by sorting them into chapters.

### Supporter-managed Roster

Opening the app is faster for your fans than having them navigate through a club or league website.

Put some swagger into your deployment with custom bios and photo albums. Include links to players' Instagram and Twitter accounts so fans can give them well wishes on match day.

_Friends and Foes_ will include opponent's roster information right in the app, thanks to a growing collection of league website scrapers.

### [New!] News Feed and Push Notifications

Send a reference to tricky song lyrics to every phone in the section, right before your capos call for it, to learn new material easier. Issue announcements about special events, merch drops, and more. Hooligan Hymnal's News Feed feature will keep your fans informed, without relying on the mercy of social media algorithms to deliver your posts, and without paying for promotion.

Optional _Push Notifications_ deliver posts to fans as soon as they are made.

_Image_ support in News Feed lets admins include photos or graphics that are remotely linked or uploaded to your own hosting service to in posts. Images can have captions and photo credits, and can be displayed in a full screen photo gallery.

The flexible and powerful _Post Attachments_ framework lets you reference a song or player below your post, and it's easy to write custom types. (We will consider PRs of novel post attachment types.)

_Channels_ let admins post with the voice and tone of different functions in your SG. Set up distinct channels for your merch team, your community service program, chapters in other cities, and so on.

### Localization

We are committed to outreach to non-English-speaking communities to bring new fans to the clubs we love. Hooligan Hymnal uses _i18n_ out-of-the box, so non-native speakers can navigate the application interface, and allowing _La Barra_ supporters to publish their own apps as easily as English-speaking SGs.

All UI text lives in a locale file, making it easy for you to adjust the feel of your app deployment.

### [New!] Prideraiser.org Integration

Boost your SG's Prideraiser campaign with a hero banner at the top of the News Feed and a Post Attachment. These are customizable and use live data from the Prideraiser.org API.

### And More

We include links to social media accounts, league standings, fundraising initiatives, and your SG's Prideraiser campaign on the home screen and/or menu. Customize it to fit your needs.

## Roadmap

By sharing the project with soccer supporters groups around the world, we will assemble the greatest minds in the culture as contributors, and our collective work will improve all of our communities. Here's what we are focusing our attention after the 2019 season.

### News Feed Improvements

News Feed has just launched (as of late January 2020), and there is more work to be done before we are happy with the core experience. Next up is pagination of posts/infinite scrolling and adding images to posts. In the future, we'll give users control on which _Channels_ they see posts from.

### Web-based Data Management

Editing raw JSON is getting old, and we need a better way to keep Capo/SG officer features secure. A web-based application to manage all of the Hooligan Hymnal data is currently in development.

### Configuration and Skinning

The platform has made huge strides in configuration and skinning since its early days as a Chattanooga-only project. We will continue progress to make Hooligan Hymnal easy to set up and deploy.

### Events

We have an opportunity to create a presentation for Events that serves SGs in ways that typical apps and services do not. Join our Slack channel- let's solve it together.

### And Beyond

All sorts of wild ideas are being considered: user chant submissions, "_Pip Boy_ Mode" for capos, and a romantic matching service to help supporters find true love (and to turn international players into domestic ones) are a few of the fun ones.

## For Developers

Hooligan Hymnal is a React Native project for Android and iOS devices built using [Expo](https://expo.io) with a Node.js backend.

Review the [`docs`](docs) directory for information on how to configure and customize the app, and to prepare to deploy to Google Play and the App Store. Visit the [hooligan-hymnal-server](https://github.com/Chattahooligans/hooligan-hymnal-server) repo for the server, which is required to serve data to the mobile app and provides a web-based data management tool for admin users and SG leadership.

## Getting Started

Hooligan Hymnal is **not** a turnkey solution for supporters groups who want a mobile app. It a software platform— one that is currently in development with a long roadmap of new features, improved patterns and best practices in the existing codebase, more thorough documentation, and polish to come. SGs should expect a substantial time investment, some monetary expense, and to have their patience tested on the way to rolling out their own version of Hooligan Hymnal.

Expectations set? Here's what to do first:

- Review the [`docs`](docs) folder for guidance on configuration and deployment
- Get in touch. Reach out using your SG account to [@hooliganhymnal](https://twitter.com/hooliganhymnal) or email hooliganhymnal@gmail.com to introduce yourself and request an invite to the project Slack channel.
  - The core team and various SG stakeholders are active on Slack. The conversations there will determine the future of the project and asking for help is welcome, so we encourage every SG who uses Hooligan Hymnal to engage in that community.

#### Acknowledgements

- Originally forked from <https://github.com/nodevember>
