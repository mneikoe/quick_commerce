import admin from "firebase-admin";

import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };


import config from "../config.js";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.BUCKET_NAME,
});
const bucket = admin.storage().bucket();
export default bucket;
