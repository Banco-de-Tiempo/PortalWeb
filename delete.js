import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";//Importacion firebase
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";//impotacion modulo realtimedatabse
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";//importacion firebase auth

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

$("#btn_delete_user").on("click", function(){
    var username=$('#username').val();
    delete_user(username);
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
        //alert("Bienvenido de nuevo");
        } else {
        // User is signed out
        alert("Porfavor ingrese sesión");
        window.location.replace("iniciarsesion.html");
        }
    });
}

//Funcion para eliminar el usuario
function delete_user(username){
    const db = getDatabase();
    const starCountRef = ref(db, 'Users/');

    var encontrado = new Boolean(false);
    
    onValue(starCountRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            //const uid = childSnapshot.key;
            const childData = childSnapshot.val();
            //alert(childData.name);
            if (username == childData.name){
                alert("Encontrado");
                encontrado = true;
                //childData.rating.remove();
            }
        });
        if (encontrado == false) {
            alert("Usuario no encontrado o no existe en base de datos");
        }
    }, {
        onlyOnce: true
    });
}