# KnowYourRights App

## Overview

KnowYourRights is a cross-platform mobile app built with Expo + Firebase that informs users about their civil rights, provides real-time legal analysis, sends protest alerts, and includes emergency tools to protect and empower individuals in critical moments.

---

## 📦 Features

### 📘 Core Education

* Rights guides by situation (e.g. police stops, protests, immigration)
* Do's and Don'ts with amendment references
* Dynamic content from Firestore
* Full-text search and keyword filtering

### 🧠 Law Analyzer

* Paste laws/news articles → GPT-4o summarizes and flags constitutional impact
* Legal news feed summarized via AI
* Firestore backend for `law_updates` collection

### 📍 Protest Alerts

* User-selected interest categories (e.g. climate, civil rights)
* Location-aware protest notifications via GPS + Firestore data
* Map view with event pins

### 🚨 Emergency Mode

* One-tap emergency activation
* Displays legal rights screen: “I choose to remain silent. I want a lawyer.”
* Begins audio recording (Expo AV)
* Sends live location to trusted contact via Twilio or Firebase SMS

### 🧪 Post-MVP Features

* Quiz-based rights learning modules
* AI Chatbot powered by GPT-4o
* Anonymous, crowdsourced incident/protest reporting
* Legal glossary with plain-language definitions
* Multilingual rights guides (GPT translation + i18n)

---

## 🧰 Tech Stack

### Frontend

* React Native (Expo)
* React Navigation
* React Native Paper or NativeWind (Tailwind CSS)

### Backend

* Firebase Firestore (rights data, user prefs)
* Firebase Auth (optional user login)
* Firebase Cloud Messaging (push alerts)
* Firebase Functions (background tasks like fetching protest data)

### AI

* OpenAI GPT-4o API for:

  * Law summaries
  * Chatbot answers
  * Translation

### Data Sources

* Legal feeds: Congress.gov, GovTrack, ACLU
* Protest feeds: Reddit, Twitter/X, activist sites
* Emergency: GPS (Expo Location) + Messaging (Twilio/SMS)

---

## 🚀 Getting Started

### Prerequisites

* Node.js, npm
* Expo CLI
* Firebase project + API credentials
* OpenAI API key

### 1. Install Project

```bash
npx create-expo-app KnowYourRightsApp
cd KnowYourRightsApp
npm install
```

### 2. Install Dependencies

```bash
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/native-stack
npm install firebase axios dotenv
```

### 3. Set Up Firebase

* Create Firebase project
* Enable Firestore, Auth, and FCM
* Add your config to `firebaseConfig.js`

### 4. Run the App

```bash
npx expo start
```

---

## 🗂️ Suggested Folder Structure

```
src/
  screens/
    HomeScreen.js
    GuideScreen.js
    LawAnalyzer.js
    EmergencyScreen.js
  components/
    GuideCard.js
    SearchBar.js
  services/
    firebaseConfig.js
    lawAnalyzer.js
    protestFetcher.js
  utils/
    constants.js
```

---

## 🛰️ Deployment

* Use Expo EAS Build:

```bash
eas build --platform ios
eas build --platform android
```

* Submit to App Store & Google Play
* Include required permissions explanations and privacy policy

---

## ✅ Project Goals

* Empower people with accessible legal knowledge
* Provide AI-powered law analysis and safety tools
* Deliver alerts that help users act safely and quickly
* Maintain ethical, privacy-first civic tech design

---

## 📝 License

MIT License

---

## 🤝 Contributions

We welcome civic tech contributors! Focus areas:

* Accessibility
* Multilingual content
* Legal accuracy and UX
* Event and protest feed integrations

Fork, create PRs, or file issues on GitHub.

---

## 👤 Maintainer

Created and maintained by **Sumali** © 2025

> **Disclaimer**: This is an educational and informational app. It does not provide legal advice.
