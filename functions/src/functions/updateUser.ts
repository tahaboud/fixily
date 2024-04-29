import { auth } from "firebase-admin";
import * as functions from "firebase-functions";
import { DataToUpdate, UpdateUserParams } from "./types";

export const updateUser = (db: FirebaseFirestore.Firestore) =>
  functions.https.onCall(async (data: UpdateUserParams, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentications credentials were not provided."
      );
    }
    if (Object.keys(data).length <= 1) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Please provide new user data."
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
    const dataToUpdate: DataToUpdate = {};
    if (data.disabled !== undefined) {
      dataToUpdate.disabled = data.disabled;
    }
    try {
      await auth().updateUser(data.uid, dataToUpdate);
    } catch (err) {
      throw new functions.https.HttpsError(
        "not-found",
        "User could not be found",
        err
      );
    }
    if (data.isVerified !== undefined) {
      dataToUpdate.isVerified = data.isVerified;
    }
    try {
      const userRef = db.collection("users").doc(data.uid);
      const updateData = dataToUpdate as {
        [key: string]: string | number | boolean;
      };
      await userRef.update(updateData);
    } catch (err) {
      throw new functions.https.HttpsError(
        "unknown",
        "Could not access users doc."
      );
    }
  });
