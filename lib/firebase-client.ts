"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

function getFirebaseClientConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };

  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Missing ${key} environment variable`);
    }
  }

  return config as {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

export function getFirebaseClientApp() {
  return getApps().length ? getApp() : initializeApp(getFirebaseClientConfig());
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseClientApp());
}

export function getFirebaseClientStorage() {
  return getStorage(getFirebaseClientApp());
}
