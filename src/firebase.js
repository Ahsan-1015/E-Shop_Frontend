import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2mK1pLVHkfH4d0TmdaJr5UucpTTw_ExY",
  authDomain: "e-shope-dd0f4.firebaseapp.com",
  projectId: "e-shope-dd0f4",
  storageBucket: "e-shope-dd0f4.firebasestorage.app",
  messagingSenderId: "1060824985896",
  appId: "1:1060824985896:web:f3378a1a26d688ce2f201d",
  measurementId: "G-Z2WQEE626P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
