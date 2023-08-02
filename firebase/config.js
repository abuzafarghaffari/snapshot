
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore ,serverTimestamp } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDGXpWj8rKE2GF6ITOPROaJconDk2IEu-U",
  authDomain: "firegram-93fd0.firebaseapp.com",
  projectId: "firegram-93fd0",
  storageBucket: "firegram-93fd0.appspot.com",
  messagingSenderId: "987528343193",
  appId: "1:987528343193:web:7b9a28265b6f9609f99208",
  
};


const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp(); 



export {projectStorage,projectFirestore,timestamp };