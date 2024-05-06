// firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = require("./foody-app-f27a2-firebase-adminsdk-koc46-6e9b11b990.json"); // Replace with your own path

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;
