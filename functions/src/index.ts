import { deleteUser } from "./functions/deleteUser";
import { editAdminPrivileges } from "./functions/editAdminPrivileges";

import * as admin from "firebase-admin";
import { updateUser } from "./functions/updateUser";
import { createUserDetailsTrigger } from "./triggers/createUserDetails";
import { deleteUserDetailsTrigger } from "./triggers/deleteUserDetails";

const serviceAccount = require("../firebase.admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fixyli-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();

exports.editAdminPrivilegesFn = editAdminPrivileges(db);
exports.deleteUserFn = deleteUser(db);
exports.updateUserFn = updateUser(db);
exports.createUserDetailsTrigger = createUserDetailsTrigger(db);
exports.deleteUserDetailsTrigger = deleteUserDetailsTrigger(db);
