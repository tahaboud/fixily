import * as functions from "firebase-functions";

export const deleteUserDetailsTrigger = (db: FirebaseFirestore.Firestore) =>
  functions.auth.user().onDelete((user) => {
    const userRef = db.collection("users").doc(user.uid);
    userRef.delete();
  });
