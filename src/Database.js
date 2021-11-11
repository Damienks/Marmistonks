import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiS1QVv15p54OmFWl4mMgPTy9E3h1CZsU",
    authDomain: "recipes-box-43433.firebaseapp.com",
    projectId: "recipes-box-43433",
    storageBucket: "recipes-box-43433.appspot.com",
    messagingSenderId: "21200018445",
    appId: "1:21200018445:web:4e3f4ec38cd1a578564944"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app };
export default db;