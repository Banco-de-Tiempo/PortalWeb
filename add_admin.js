import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";//Importacion firebase
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";//impotacion modulo realtimedatabse
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";//importacion firebase auth

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

//Revisar si esta ingresado
checkauth();


$("#logoutButton").on("click", function(){
  singout();
});

$("#btn_add_admin").on("click", function(){
    var username=$("#username").val();
    var email=$("#email").val();
    var pass=$("#pass").val();
    var confirm_pass=$("#confirm_pass").val();
    if(pass != confirm_pass){
        alert("Contraseñas distintas");
    }
    else{
        register_admin(username, email, pass);
    }
});

//Función para salir de la sesión
function singout(){
  const auth = getAuth();
  signOut(auth).then(() => {
    alert("Sesión cerrada correctamente");
    window.location.replace("index.html");
  }).catch((error) => {
    alert("Error cerrando la sesión");
  });
}

//Función de checar si está ingresado
function checkauth(){
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //const uid = user.uid;
      //alert("Bienvenido de nuevo");
    } else {
      // User is signed out
      alert("Porfavor ingrese sesión");
      window.location.replace("iniciarsesion.html");
    }
  });
}

//Función para registrar un nuevo administrador y escribirlo en la base de datos
function register_admin(username, email, password){
    const auth = getAuth();
    const db = getDatabase();
    //Registrar administrador en database
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const uidX = userCredential.uid;
            alert(uidX);
            uid = uidX.toString();
            alert("Registrado exitosamente");
            alert("uid es: "+ uid);
            //Escribirlo en la base de datos con el rol de administrador
            set(ref(db, 'Users/' + uid),{
                name: username,
                role: "admin"
            })
            alert("Admin registrado exitosamente");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
  });

}