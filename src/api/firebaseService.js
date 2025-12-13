// src/api/firebaseService.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

let db;

export function initFirebase() {
  if (!db) {
    const firebaseConfig = {
      apiKey: "AIzaSyAx6w8yBzSx3YkngERlbKJePkAp1Vt_cdQ",
  authDomain: "syteos-labs.firebaseapp.com",
  projectId: "syteos-labs",
  storageBucket: "syteos-labs.firebasestorage.app",
  messagingSenderId: "560294573240",
  appId: "1:560294573240:web:ed2d36157ed0f2a0f2704d",
  measurementId: "G-93N37SDV92"
    };
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
}

/**
 * Save a lead to Firestore under collection "leads".
 * Document shape: { name, email, message, source, createdAt }
 */
export async function saveLead({ name, email, message = "", source = "hero-form" }) {
  if (!db) initFirebase();
  if (!name || !email) throw new Error("Name and email are required.");

  const leadsRef = collection(db, "leads");
  const docRef = await addDoc(leadsRef, {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    source,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
