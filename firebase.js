// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs,getDoc, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7JbnCPEkwSh0upu-CnjylZG376d0bwE4",
    authDomain: "todo-list-34c9a.firebaseapp.com",
    projectId: "todo-list-34c9a",
    storageBucket: "todo-list-34c9a.appspot.com",
    messagingSenderId: "296367968961",
    appId: "1:296367968961:web:2da7850e6519b7e3fbfa40",
    measurementId: "G-5K7PQ0VBXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    app,
    db,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    deleteDoc,
    updateDoc
}