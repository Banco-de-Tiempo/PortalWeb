import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";//Importacion firebase
import { getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";//impotacion modulo realtimedatabse
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";//importacion firebase auth

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

$("#logoutButton").on("click",function(){//On click listener
  singout();

});

function singout(){
  const auth = getAuth();
signOut(auth).then(() => {
  alert("Sesion Cerrada Correctamente");
  window.location.href = "index.html";
  //window.location.replace("index.html");
}).catch((error) => {
  alert("Error cerrando la sesion");
});
}