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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    let uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const db = firebase.firestore();

window.signUp = (event) => {

  event.preventDefault();

  // e.reset()

  let username = document.getElementById("userName").value;
  let email = document.getElementById("emailAddrss").value;
  let password = document.getElementById("Password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      alert("new user is registered")
      let user = userCredential.user;
      console.log("user: ", user)
      window.location = "login.html"
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("firebase signup error: ", error)
    });

}

window.logIn = (event) => {
  event.preventDefault()

  let email = document.getElementById("emailAddrss").value;
  let password = document.getElementById("Password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      alert("successfully logged in")
      console.log("login successfull:", user)
      window.location = "z-app.html"
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("firebase login error: ", errorCode, errorMessage)
    });
}
