"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialization
const firebase = initializeApp(firebaseConfig);

// Analytics
let analytics: any;
isSupported().then((supported: any) => {
  if (supported) {
    analytics = getAnalytics(firebase);
    // process.env.NODE_ENV == "development" &&
    //   console.log("Firebase Analytics initialized");
  } else {
    // process.env.NODE_ENV == "development" &&
    //   console.log("Firebase Analytics not supported in this environment");
  }
});

export { firebase, analytics };