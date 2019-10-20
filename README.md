# Hooligan Hymnal

- Download [Chattahooligans on the Apple App Store](https://itunes.apple.com/us/app/chattahooligans/id1316372562?mt=8)
- Download [Chattahooligans on Google Play](https://play.google.com/store/apps/details?id=org.chattahooligans.app&hl=en)
- Open Chattahooligans App [with the Expo client](https://expo.io/@chattahooligans/app)

## Get it running on your machine (anybody)

- `yarn global add expo`
- Clone this repo, cd into it, run `yarn`
- `expo start`
- On Android, use the Expo app and scan the QR code from your phone. Alternatively, in another terminal window run `expo ios` and/or `expo android` to open in simulator.
- This will connect to the Chattahooligan server by default. You will need to run [Hymnal Server](https://github.com/Chattahooligans/hymnal-server) and edit the `HYMNAL_ADDRESS` variable in `src/config/server.js` in order to begin testing with your own data.

## Deployment (for project owners)

### Publishing updates (JS only)

First, sign into your org's Expo account. Then run `expo publish` from a terminal. This is more reliable than attempting to publish from the browser dev tools, in our experience.

### Standalone builds

First, sign into your org's Expo account.

- Android: `expo build:android`
- iOS: `expo build:ios`

### `expo start`

Runs the app bundler for testing. You can use the browser to switch between development mode (which shows all warnings) and production mode (which suppresses all warnings, showing only errors).

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
yarn start -- --reset-cache
```

## Customizing App Display Name and Icon

You can edit `app.json` to include [configuration keys](https://docs.expo.io/versions/latest/guides/configuration.html) under the `expo` key.

To change your app's display name, set the `expo.name` key in `app.json` to an appropriate string.

To set an app icon, set the `expo.icon` key in `app.json` to be either a local path or a URL. It's recommended that you use a 512x512 png file with transparency.

## More Stuff

Check out our `docs` directory for information on how to prepare to deploy to the App and Play stores. Look at the [Hymnal Server](https://github.com/Chattahooligans/hymnal-server) repo for the server, which is required to serve data to the app.