# Server Environment Variables Guide

The Hooligan Hymnal platform includes a single project that acts as the data server and admin dashboard. This document describes the environment variables required to configure the Hooligan Hymnal server components, and may be used as a companion document for the main [Deployment Guide](_deployment.md).

The official repository is <https://github.com/Chattahooligans/hooligan-hymnal-server>

## Summary

In the heroku dashboard, find the environment variables in the Settings tab for the app, and then in the Config Vars section. The environment variables are presented in alphabetical order there, so we do the same in this document. Begin your server config by creating blank variables with the following names:

- CLOUDINARY_URL
- EXPO_EXPERIENCE
- ENV
- INPUT_LANGUAGE
- MAIL_HOST
- MAIL_PORT
- MAIL_USER
- MAIL_PASS
- MONGO_URI
- PORT
- REFRESH_TOKEN_EXPIRES
- SECRET_KEY
- SITE_NAME
- TOKEN_EXPIRES

## Environment Variables Dictionary

### CLOUDINARY_URL

`cloudinary://[API Key]:[API Secret]@[Cloud name]`

Log into your SG's Cloudinary account that was created while going through the steps in the Hooligan Hymnal Deployment Guide and go to the Dashboard. Find the "Account Details" panel near the top of the screen and the "API Environment Variable" section. Click "Copy to clipboard." Everything **after** the equals sign is the value for this environment variable in Heroku.

### EXPO_EXPERIENCE

`@{owner}/{slug}`

This variable is a filter that protects push notifications in the mobile app. It uses your Expo account and app name (with an @-sign at the start and a forward-slash as a separator), and should match the `owner` and `slug` values in the `.expo` section of `app.json` for your mobile app exactly.

### ENV

This environment variable describes the execution environment and has no spaces. We recommend something like `sg-hymnal-server-production`.

### INPUT_LANGUAGE

`["en"]` or other language codes, each in quotes, separated by commas

For multi-language deployments, INPUT_LANGUAGE currently affects the langauges that player biographies can be composed in. It may be used in other parts of the platform in the future.

The values for INPUT_LANGUAGE are exposed via the endpoint `/api/i18n-settings` and can be fetched with an HTTP GET request.

### MAIL ENV VARIABLES

The `MAIL_*` environment variables are used when resetting account passwords, and are:

- MAIL_HOST=smtp.gmail.com
- MAIL_PORT=587
- MAIL_USER=
- MAIL_PASS=

Our recommended solution is to use the Google Account created for the project, enabling two factor authenticaion, and following the instructions at <https://support.google.com/a/answer/176600?hl=en>. Look for the "Use the Gmail SMTP Server" section.

### MONGO_URI

This is the connection string to your database. After logging into your SG's MongoDB Cloud account, select the project for your production database from the dropdown in the top left, the Clusters option in the side menu, and find the "CONNECT" button in the main view on the page. Click it, and a wizard menu will pop up. Select the 2nd option "Connect your application", and use "Node.js" and "2.2.12 or later" as Driver options. You will need to replace elements of this string with your db account password (not the same as your MongoDB Cloud service account) and database name before setting the env variable in Heroku.

TODO: Better instructions as necessary. We'll learn this from the first SG to go through and improve things.

### PORT

PORT can be blank for the production environment. For groups who want to the Hooligan Hymnal Server application on their own hardware or service, or those doing local development and modification, input the binding port here.

### REFRESH_TOKEN_EXPIRES

Used for web token encryption. Accepts formats "1h" to "30d", "1d" is default.

### SECRET_KEY

This environment variable is a random string of characters used to sign user tokens/sessions. It can be anything. Try something from <https://randomkeygen.com/>

### SITE_NAME

The SITE_NAME environment variable sets the text displayed at the top of the Hooligan Hymnal admin dashboard. We recommend something like "[Your SG's app name] Admin".

The default is "Hooligan Hymnal Server"

### TOKEN_EXPIRES

Used for web token encryption. Accepts formats "1h" to "30d", "1d" is default.
