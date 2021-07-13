import firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBT5fcYmt3sVVctzRa5V6X_9CVNDFwnWvE",
    authDomain: "ehsaas-8e9a8.firebaseapp.com",
    projectId: "ehsaas-8e9a8",
    storageBucket: "ehsaas-8e9a8.appspot.com",
    messagingSenderId: "325941889846",
    appId: "1:325941889846:web:c89c615c65bfc8a2ec4197"
};
// Initialize Firebase

const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInStampshots: true });
const storage = firebase.storage();
export { fire, db, storage };