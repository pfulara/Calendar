import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    // firebase config here...
};

firebase.initializeApp(firebaseConfig);

export default firebase;