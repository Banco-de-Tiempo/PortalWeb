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



/*
$("#verificar").on("click", function(){
    
});
*/

//Preparar las condiciones para mostrar los datos en la tabla
const tabla = document.querySelector('#list_verificar tbody');


check_status();


//Funcion de ver las personas no verificadas
function check_status(){
    const db = getDatabase();
    const starCountRef = ref(db, 'Users/');

    var encontrado = new Boolean(false);
    
    //Vaciar la tabla
    tabla.innerHTML = "";
    //Iniciar la busqueda por nombre
    onValue(starCountRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const status = "No verificado";
            //alert(childData.name);
            //Buscar el usuario con el estatus de verificación
            if (status == childData.status){
                const uid = childSnapshot.key;
                //alert("Encontrado");
                //alert(childData.name);
                encontrado = true;
            
                //Agregar los valores en la tabla
                var row =  `<tr>
                                <td>${childSnapshot.key}</td>
                                <td>${childData.name}</td>
                                <td>${childData.age}</td>
                                <td>${childData.phone}</td>
                                <td><button value='${childSnapshot.key}' class='btn_verificar' type='button'>Ver archivos</button><td>
                                
                            </tr>
                            
                `;
                //4 de 9 columnas, falta documentos 
                
                //Mostrarlo en la tabla
                tabla.innerHTML += row;
            }
        });
        if (encontrado == false) {
            alert("Todos los usuarios están verificados");
        }

    
    }, {
        onlyOnce: true
    });
}

function verArch(){
    console.log("Has dado click");
}

/*
$(".btn_verificar").click( function(){
    console.log("Has dado click 1");
    verArch();
});
*/





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