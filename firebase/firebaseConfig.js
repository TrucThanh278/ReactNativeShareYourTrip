import { initializeApp, getApps } from "firebase/app";
import {
	getAuth,
	initializeAuth,
	getReactNativePersistence,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCC4sTKgyGFWBIDhvgkptB-IDhUr1vFZTU",
	authDomain: "chatshareyourtrip.firebaseapp.com",
	databaseURL:
		"https://chatshareyourtrip-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "chatshareyourtrip",
	storageBucket: "chatshareyourtrip.appspot.com",
	messagingSenderId: "356887762747",
	appId: "1:356887762747:android:d183f7fee21f65318a491e",
};

let app;
if (getApps().length === 0) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApps()[0]; // Use the already initialized app
}

// Initialize Auth with persistence
let auth;
try {
	auth = initializeAuth(app, {
		persistence: getReactNativePersistence(AsyncStorage),
	});
} catch (error) {
	if (error.code === "auth/already-initialized") {
		auth = getAuth(app);
	} else {
		throw error;
	}
}

const db = getFirestore(app);
export {
	auth,
	db,
	app,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
};
