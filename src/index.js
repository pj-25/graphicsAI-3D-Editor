import './style.css';
import Editor from './editor/Editor';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import * as $ from 'jquery';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEFnENDGFAtF55OCixTNXztONEESnV6pY",
    authDomain: "graphicsai.firebaseapp.com",
    databaseURL: "https://graphicsai-default-rtdb.firebaseio.com",
    projectId: "graphicsai",
    storageBucket: "graphicsai.appspot.com",
    messagingSenderId: "502849556607",
    appId: "1:502849556607:web:3cff0de24b310a4a5baf4a",
    measurementId: "G-LC35C3SH5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const viewportCanvas = document.getElementById('webgl');
viewportCanvas.tabIndex = 0;

//create editor
const editor = new Editor(viewportCanvas);

//rendering the editor.viewport
editor.viewport.render();

function signIn(){
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        window.currentUser = result.user;
        $("#offcanvas-img").attr("src", currentUser.photoURL);
        $("#offcanvasNavbarLabel").text(currentUser.email);
        $("#nav-action-btn").text("SignOut").off().on('click', signOutNow)
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}

function signOutNow(){
    signOut(auth).then(() => {
        $("#offcanvas-img").attr("src", "/images/graphicsAI-Icon.png");
        $("#offcanvasNavbarLabel").text("graphicsAI");
        $("#nav-action-btn").text("SignIn").on('click', signIn)
    }).catch((error) => {
        // An error happened.
      });
}

$("#nav-action-btn").on('click', signIn)