const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

//function to get id from amail
function getStringBeforeAt(email) {
  const parts = email.split("@");
  if (parts.length === 2) {
    return parts[0];
  } else {
    return null; // Invalid email format
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getProfile") {
    // Use an object with 'action' property
    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
      )
        .then((res) => res.json())
        .then((res) => {
          sendResponse({
            status: "success",
            user: { email: res.email, image: res.picture },
          });
        })
        .catch(function (error) {
          sendResponse({ status: "error", error: { error: "User not found" } });
        });
    });
    return true; // Add this line to indicate you will use sendResponse asynchronously
  }

  if (message.action === "uploadProductData") {
    // Use an object with 'action' property
    firebase
      .database()
      .ref(`productdata/${getStringBeforeAt(message.id)}/${Date.now()}`)
      .set(message.productData, (error) => {
        if (error) {
          sendResponse({ status: "error" });
        } else {
          sendResponse({
            status: "success",
          });
        }
      });

    return true; // Add this line to indicate you will use sendResponse asynchronously
  }
});
