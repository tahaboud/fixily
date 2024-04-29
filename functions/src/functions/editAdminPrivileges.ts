import * as functions from "firebase-functions";
import { EditAdminPrivilegesParams } from "./types";

export const editAdminPrivileges = (db: FirebaseFirestore.Firestore) =>
  functions.https.onCall(async (data: EditAdminPrivilegesParams, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentications credentials were not provided."
      );
    }
    const senderRef = db.collection("users").doc(context.auth.uid);
    let userIsSuperuser = false;
    try {
      const senderDataSnapshot = await senderRef.get();
      if (senderDataSnapshot.exists) {
        const senderData = senderDataSnapshot.data();
        if (senderData && senderData.isSuperuser) {
          userIsSuperuser = true;
        }
      }
    } catch (error) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User must be a superuser."
      );
    }
    if (!userIsSuperuser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User must be a superuser."
      );
    }
    const userRef = db.collection("users").doc(data.uid);
    userRef
      .get()
      .then((userDataSnapshot) => {
        if (userDataSnapshot.exists) {
          userRef.update({ isAdmin: data.isAdmin });
          return "User updated successfully";
        } else {
          throw new functions.https.HttpsError(
            "not-found",
            "Could not find user data."
          );
        }
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          "unknown",
          "Could not access users doc."
        );
      });
  });
