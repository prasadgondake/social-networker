import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB4EwiJqAaJUdWlNgvCwWfkeNsyGj8_Hqs",
  authDomain: "social-networker-cd791.firebaseapp.com",
  projectId: "social-networker-cd791",
  storageBucket: "social-networker-cd791.appspot.com",
  messagingSenderId: "116929534217",
  appId: "1:116929534217:web:7cfe33b3ecdfc4f25fdbd8",
  measurementId: "G-DT438LT3ZQ"
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)

export { app , fireDb }