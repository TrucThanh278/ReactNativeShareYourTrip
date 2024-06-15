// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDfkO4ypfIZPmSktAt90HirTnIQcLsLG6o",
	authDomain: "shareyourtrip-970f2.firebaseapp.com",
	databaseURL: "https://shareyourtrip-970f2-default-rtdb.firebaseio.com",
	projectId: "shareyourtrip-970f2",
	storageBucket: "shareyourtrip-970f2.appspot.com",
	messagingSenderId: "170664531754",
	appId: "1:170664531754:web:192827e0826a97f39c3053",
	measurementId: "G-80Y24RR14N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
