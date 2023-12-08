# Travel Snap

Follow these steps to run an Expo React Native App:

## 1. Installation

Firstly, make sure you have Node.js (which comes with npm) installed on your machine. If you don't have Node.js installed, you can download it from [here](https://nodejs.org/). Once you have Node.js installed, install Expo CLI command line utility by running:

```bash
npm install -g expo-cli
```

You also need to install the EAS CLI command line utility by running:

```bash
npm install -g eas-cli
```

## 2. Login into Expo account

You need to login to Expo CLI by running:

```bash
npx expo login
```

after this you need to login to EAS CLI by running:

```bash
npx eas login
```

with following credentials:

- email: `travelsnapdev@gmail.com`
- password: `TravelSnap`

## 3. Navigate to the project folder

```bash
cd rn-travel-snap
```

## 4. Install dependencies

```bash
npm install
```

## 5. Start the development server

```bash
npm start
```

## 6. Run the app on your phone

- Install the Expo app on your [iOS](https://itunes.com/apps/exponent) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) phone
- Connect your phone to the same wireless network as your computer
- Log in to Expo using the account mentioned previously
- Scan the QR code displayed in your terminal from the Expo app to run the project on your phone

## 7. Run the app on your computer

- Android

  - Install [Android Studio](https://developer.android.com/studio)
  - Install the Android SDK
  - Configure the ANDROID_HOME environment variable
  - Add the Android SDK to your PATH environment variable
  - Create a virtual device in Android Studio
  - Run the virtual device

```bash
Press the "a" key in your terminal to run the app on the Android virtual device
```

- iOS Simulator

  - Install [Xcode](https://developer.apple.com/xcode/)
  - Run the simulator

```bash
Press the "i" key in your terminal to run the app on the iOS simulator
```

- Web

  - Open the browser

```bash
Press the "w" key in your terminal to run the app on the web
```

## Features

- Photo Feed: A user can view all uploaded photos.
- Photo Upload: Users can upload photos to a public feed
- Profile Page: A user can view their profile with their uploaded photos
- Authentication: A user can signup to create an account and login to access the app
