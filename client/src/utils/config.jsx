import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpJI3hOrggbToTbphT_nVUW7sepiiU1EQ",
  authDomain: "socail-media-images.firebaseapp.com",
  projectId: "socail-media-images",
  storageBucket: "socail-media-images.appspot.com",
  messagingSenderId: "212646702500",
  appId: "1:212646702500:web:f3c09881657124d3972531",
  measurementId: "G-EQ30ZRENXE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  app,
  auth,
  storage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
};
