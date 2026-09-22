import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebase_config = JSON.parse(__FIREBASE_CONFIG__);

const serverApp = initializeApp(firebase_config);

// !!! This is imported from `firestore/lite` directory for smaller server imports
export const serverDB = getFirestore(serverApp);