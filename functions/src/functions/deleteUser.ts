import { auth } from "firebase-admin";
import * as functions from "firebase-functions";
import { DeleteUserParams } from "./types";

export const deleteUser = (db: FirebaseFirestore.Firestore) =>
  functions.https.onCall(async (data: DeleteUserParams, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentications credentials were not provided."
      );
    }
    const senderRef = db.collection("users").doc(context.auth.uid);
    let userIsAdmin = false;
    try {
      const senderDataSnapshot = await senderRef.get();
      if (senderDataSnapshot.exists) {
        const senderData = senderDataSnapshot.data();
        if (senderData && senderData.isAdmin) {
          userIsAdmin = true;
        }
      }
    } catch (error) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User must be an admin."
      );
    }
    if (!userIsAdmin) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User must be an admin."
      );
    }
    try {
      await auth().deleteUser(data.uid);
    } catch (err) {
      throw new functions.https.HttpsError(
        "not-found",
        "User could not be found",
        err
      );
    }
    const userRef = db.collection("users").doc(data.uid);
    userRef
      .get()
      .then((userDataSnapshot) => {
        if (userDataSnapshot.exists) {
          userRef.delete();
        }
        return "User deleted successfully";
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          "unknown",
          "Could not access users doc."
        );
      });
  });
