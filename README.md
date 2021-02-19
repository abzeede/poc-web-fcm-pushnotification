# Getting Started

A POC of Firebase Cloud Messaging(FCM) with Amazon SNS.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

In the project directory, you can run:

### 1. Setup env

```
REACT_APP_WEB_PUSH_CERTIFICATE_KEY="Project setting > Cloud messaging > Web push cert key pair"
REACT_APP_MESSAGING_SENDER_ID="Project setting > Cloud messaging > Sender ID"
```

### 2. Change `messagingSenderId` in firebase-messaging-sw.js

```
firebase.initializeApp({
  messagingSenderId: "",
});
```

### 3. Add `gcm_sender_id` in public/manifest.json

```
"gcm_sender_id": ""
```

## Run

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
