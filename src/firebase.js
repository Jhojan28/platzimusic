import * as firebase from "firebase";
const config = {
    apiKey: "AIzaSyBXrl1BzMDO9cJpnyjiCeUGcY-CXB4qn44",
    authDomain: "platzimusic-f8922.firebaseapp.com",
    databaseURL: "https://platzimusic-f8922.firebaseio.com",
    projectId: "platzimusic-f8922",
    storageBucket: "platzimusic-f8922.appspot.com",
    messagingSenderId: "39699448823"
};
firebase.initializeApp(config);

export const firebaseAuth = firebase.auth()
export const firebaseDatabase= firebase.database()

export default firebase