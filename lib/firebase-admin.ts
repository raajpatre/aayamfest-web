import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }

  return value;
}

function getFirebaseAdminApp() {
  if (getApps().length) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert({
      projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
      clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
      privateKey: getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n")
    })
  });
}

export function getFirebaseAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}

export function getFirebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}
