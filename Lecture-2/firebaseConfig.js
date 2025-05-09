// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyATP_tnE9TY18psjTArkHR3IJCSetY-tgo",
	authDomain: "lec-crossplat.firebaseapp.com",
	projectId: "lec-crossplat",
	storageBucket: "lec-crossplat.firebasestorage.app",
	messagingSenderId: "621852502330",
	appId: "1:621852502330:web:18d401f802e20233688803",
	measurementId: "G-0J5MHNQ1DH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage, analytics };
