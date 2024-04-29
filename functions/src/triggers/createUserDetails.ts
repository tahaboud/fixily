import * as functions from "firebase-functions";

export const createUserDetailsTrigger = (db: FirebaseFirestore.Firestore) =>
  functions.auth.user().onCreate((user) => {
    const userDetails = {
      email: user.email,
      emailVerified: user.emailVerified,
      displayName:
        user.providerData.length !== 0
          ? user.providerData[0].displayName
            ? user.providerData[0].displayName
            : null
          : null,
      phoneNumber: user.phoneNumber,
      photoUrl:
        user.providerData.length !== 0
          ? user.providerData[0].photoURL
            ? user.providerData[0].photoURL
            : null
          : null,
      isSuperuser: false,
      isAdmin: false,
      points: 15,
      isArtisan: false,
      isVerified: false,
      createdAt: user.metadata.creationTime,
      disabled: user.disabled,
    };
    const userRef = db.collection("users").doc(user.uid);
    userRef.set(userDetails);
  });
