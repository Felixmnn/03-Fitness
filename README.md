# <img src="./assets/icon.png" alt="App Icon" style="height:40px;width:40px;vertical-align:middle;margin-left:8px;" /> 03-Fitness

> **Note:** This project is no longer actively maintained. You can use it for UI inspiration or as a starting point for your own fitness tracking app.

03-Fitness is an app for tracking your workouts.  
You can create, execute, and review workouts, distinguishing between warmup and normal sets. After each workout, an SVG visualization shows which muscles you trained. The home screen displays ongoing workouts and statistics about your recent activity (week/month).

## Features

- Create and manage custom workouts
- Execute workouts with warmup/normal set distinction
- SVG muscle map after each workout
- Home screen with statistics and ongoing workout info
- View past workouts in a summarized or detailed view
- Optional Appwrite login for cloud sync (see limitations below)
- Works offline with Async Storage if you skip login

## Screenshots

- **Home Screen:** Statistics about recent workouts  
  ![Home Screen](./bild1)

- **Create Workout & Overview:** Create new workouts and see your list  
  ![Create Workout](./bild2)

- **Past Workouts Overview:** View all previous workouts in a list  
  ![Past Workouts](./bild3)

- **Workout Details:** Detailed view of a specific past workout  
  ![Workout Details](./bild4)

- **Appwrite Login:** Login screen for Appwrite cloud sync  
  ![Appwrite Login](./bild5)

<!--
Example for adding more screenshots:
- ./bild6 - Example of the settings screen
-->

## Limitations & Self-Hosting

The Appwrite database used in the script is currently **disabled** due to new policy restrictions (only 2 projects allowed on the free plan).  
**Self-hosting** is easy: just create the required collections in your own Appwrite instance.

The app also works without Appwrite:  
Simply choose "I don't want to sign in" at login. The app will use Async Storage for local data.  
**Note:** Without Appwrite, data cannot be transferred between devices (import/export features are not implemented yet).

## Getting Started

To run or test the project locally:

```bash
npm install
npx expo start -w
```

To build an APK for Android:

```bash
eas build -p android --profile production
```

**[⬇️ Download latest APK](./03-fitness-latest.apk)** <!-- Place your built APK as 03-fitness-latest.apk in the same folder -->

---
