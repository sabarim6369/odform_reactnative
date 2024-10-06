import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'
const firebaseConfig={
    apiKey: "AIzaSyBNCDoPI4mevaGanzZzveP7P-3hFY2frNs",
    authDomain: "odformproject.firebaseapp.com",
    projectId: "odformproject",
    storageBucket: "odformproject.appspot.com",
    messagingSenderId: "550703314979",
    appId: "1:550703314979:web:f93fd729b215e0412c9996",
    measurementId: "G-40V1LQXXK4"
}   

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };