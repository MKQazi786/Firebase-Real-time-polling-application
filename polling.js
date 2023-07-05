import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAWTnTjLksOBbx_SDt0MYFT3bsYiVRtXME",
  authDomain: "real-time-polling-application.firebaseapp.com",
  projectId: "real-time-polling-application",
  storageBucket: "real-time-polling-application.appspot.com",
  messagingSenderId: "846385199164",
  appId: "1:846385199164:web:1ed25761ba260fab176b39",
  measurementId: "G-6W9L3V8RRV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

window.signUp = (event) => {

  event.preventDefault();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);


  let username = document.getElementById("userName").value;
  let email = document.getElementById("emailAddrss").value;
  let password = document.getElementById("Password").value;


  firebase.auth().createUserWithEmailAndPassword(username, email, password)
    .then((res) => {
      let user = {
        username: username,
        email: email,
        password: password
      }

      firebase.database().ref(`users/${res.user.uid}`).set(user)
        .then(() => {
          alert("new user is registered")
          window.location = "login.html"
        })

    })
    .catch((err) => {
      console.log("err=>", err)
    })
}

window.logIn = (event) => {
  event.preventDefault()

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  let email = document.getElementById("emailAddrss").value;
  let password = document.getElementById("Password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
    
      firebase.database().ref(`users/$(res.user.uid)`).once('value', (data) => {
        alert("successfully logged in")
        console.log(data.val())
      })
    }

    )
    .catch((err) => {
      console.log('err=>', err)
    });
}
