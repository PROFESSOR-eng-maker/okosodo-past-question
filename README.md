# Okosodo Past Question

A lightweight, offline-friendly Nigerian CBT practice website for WAEC, NECO, JAMB and general revision.

## Live website
https://professor-eng-maker.github.io/okosodo-past-question/

## Current features
- Multiple-choice practice across Mathematics, English Language, Biology, Chemistry, Physics, Economics, Government and Computer Studies.
- Random question selection, previous/next navigation, answer tracking and timed sessions.
- Automatic scoring with explanations and answer review.
- Local practice history (last 30 attempts), exportable as JSON.
- Saved questions, learner name, progress summary and dark mode.
- Responsive layout and service-worker offline cache.
- Android debug APK build through GitHub Actions.

## Important question-bank note
The built-in bank contains original exam-style revision questions. Exam and year selectors label a practice session; they do not mean questions are verified reproductions of a specific historical WAEC, NECO or JAMB paper. Use the official examination-board links shown inside the app for authentic resources.

## Updating
Changes pushed to the `main` branch update the GitHub Pages site. Web-app changes trigger the Android APK workflow. Users may need to refresh the site. Installed/offline copies should reconnect to the internet and reopen to receive the updated cache.

## Local data and privacy
Learner name, saved questions and practice history are stored in the browser on the user's device. There is currently no online account system or cloud synchronisation.

## Development
The website is a static HTML/CSS/JavaScript app. Android packaging uses Capacitor and GitHub Actions.
