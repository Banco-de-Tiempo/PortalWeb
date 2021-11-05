//Importar los módulos necesarios del firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

//Credenciales de la cuenta de firebase
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

//Acción del botón LogOut
$("#logoutButton").on("click",function(){
  signout();

});

//Función SignOut
function signout(){
  //Llamar la función getAuth
  const auth = getAuth();
  //Realizar SignOut
  signOut(auth).then(() => {
    //Cerrar la sesión exitosamente y regresa a la página de index
    alert("Sesión cerrada exitosamente");
    window.location.replace("index.html");
  }).catch((error) => {
    alert("Error cerrando la sesión");
  });
}
