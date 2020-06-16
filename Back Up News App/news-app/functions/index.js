const functions = require("firebase-functions");
const admin = require("firebase-admin");
var fetch = require("node-fetch");
admin.initializeApp();

exports.sendFollowerNotification = functions.database
  .ref("/news/{newsId}/")
  .onCreate(async (change, context) => {
    console.log("It is working yeah!!!");

    var messages = [];

    //return the main promise
    return admin
      .database()
      .ref()
      .child("/users")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var expoToken = childSnapshot.val().expoToken;

          messages.push({
            to: expoToken,
            sound: "default",
            body: "New Note Added",
          });
        });
        //firebase.database then() respved a single promise that resolves
        //once all the messages have been resolved
        return Promise.all(messages);
      })
      .then((messages) => {
        console.log(JSON.stringify(messages));
        return fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            host: "exp.host",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messages),
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
  });
