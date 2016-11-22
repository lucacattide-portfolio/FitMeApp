var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("fitmeapp-442dd-firebase-adminsdk-y0az4-158cc4b210.json"),
  databaseURL: "https://fitmeapp-442dd.firebaseio.com"
});
