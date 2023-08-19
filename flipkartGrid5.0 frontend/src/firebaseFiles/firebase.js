import firebase from "firebase";
import "firebase/database";
import { Client, Storage } from "appwrite";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("");
const imageStorage = new Storage(client);

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

export { auth, provider, imageStorage, database };
