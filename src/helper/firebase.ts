import * as admin from "firebase-admin";
import serviceAccount from "../../key.json";

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});
export const db = app.firestore();
