import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA9OFfHc0mXshhqgX3kyz5TvvKTrjVgofU",
  authDomain: "tym-camp-platform.firebaseapp.com",
  projectId: "tym-camp-platform",
  storageBucket: "tym-camp-platform.firebasestorage.app",
  messagingSenderId: "858906159209",
  appId: "1:858906159209:web:384c2d03b1e85c07fd5af8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // <-- this line is critical
export { serverTimestamp };
