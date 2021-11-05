//Importar los módulos necesarios del firebase
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

//Credenciales de la cuenta de firebase
/*
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
*/

//Acción del botón SingIn
$("#signinButton").on("click",function(){
  //Tomar los valores del inputs desde
  var email=$("#email").val();
  var pass=$("#pass").val();
  login(email,pass);//Login function

});


function login(email,password){
  const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert("Usuario encontrado");
    window.location.replace("mainadminpage.html");
    console.log(user);
    // ...
  })
  .catch((error) => {
    alert("Usuario no encontrado");
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
