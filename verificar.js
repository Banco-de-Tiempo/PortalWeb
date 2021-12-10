import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";//Importacion firebase
import { getDatabase, ref, update, onValue, push, child } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";//impotacion modulo realtimedatabse
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
            if (status == childData.status && childSnapshot.key == "GcGvSCAs5LMvOadQnZbaXcrT4422"){
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
                                <td><a href="${childData.documentos.ine_f}">Ver Imágen</a></td>
                                <td><a href="${childData.documentos.ine_b}">Ver Imágen</a></td>
                                <td><a href="${childData.documentos.antecedentes_np}">Ver Imágen</a></td>
                                <td><a href="${childData.documentos.c_domicilio}">Ver Imágen</a></td>

                                <td><button value='${childSnapshot.key}' class='btn_verificar' type='button'>Aceptar</button><td>
                                <td><button value='${childSnapshot.key}' class='btn_verificar_rechazar' type='button'>Rechazar</button><td>
                                
                            </tr>
                `;
                
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
    alert("Favor espere unos segundos");
}

function verArch(){
    alert("Listo, ya puede verificar");
    var variable = document.querySelectorAll(".btn_verificar");
    console.log(variable);
    $(".btn_verificar").click( function(event){
        //console.log(event.currentTarget.attributes.value.value);
        const uid = event.currentTarget.attributes.value.value;
        let reason = prompt("Por favor ingrese la razón");
        //alert(reason);
        update_check(uid, reason);

    });
    $(".btn_verificar_rechazar").click( function(event){
        //console.log(event.currentTarget.attributes.value.value);
        //const uid = event.currentTarget.attributes.value.value;
        //update_check(uid);
        

    });
}

setTimeout(verArch, 20000);

function update_check(uid, reason){
    const db = getDatabase();
    newKey(uid, reason);

    update(ref(db, "Users/" + uid), {
        status: "Verificado",
    }).then(() => {
        alert("Usuario verificado exitosamente");
    }).catch((error) => {
        alert("Error al verificar el usuario");
        alert(error);
    });

}

function newKey(uid, reason) {
    const db = getDatabase();
    const postData = {
        status: "Verificado",
        notification: {
            job: reason,
            status: 0
        }
      };

    const newPostKey = push(child(ref(db), "Users/" + uid + "notification/")).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["Users/" + uid + "/notification/" + newPostKey] = postData;

    return update(ref(db), updates);
}



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