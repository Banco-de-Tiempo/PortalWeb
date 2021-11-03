import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";
import { getAuth ,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoPSDdPBSj7IZbIHKc4yfBTszKkfUWwxE",
  authDomain: "banco-de-tiempo-77b4e.firebaseapp.com",
  databaseURL: "https://banco-de-tiempo-77b4e-default-rtdb.firebaseio.com",
  projectId: "banco-de-tiempo-77b4e",
  storageBucket: "banco-de-tiempo-77b4e.appspot.com",
  messagingSenderId: "399972830225",
  appId: "1:399972830225:web:064088a21e1d0cf30eb5b0",
  measurementId: "G-J7Y6ZZT5YJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
$("#signinButton").on("click",function(){

});

 async set(ref(db, 'admin/' +"dfgf" ), {
   username: " tonita",
   email: "tonita",
   profile_picture : "tona"
 });
// writeUserData();

// createUserWithEmailAndPassword(auth, "example@exampled.com", "tona1234")
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
  // function writeUserData() {
  //   const db = getDatabase();
  //   set(ref(db, 'admin/'+'alan'), {
  //     username: "alaan"
  //   });
  // }
