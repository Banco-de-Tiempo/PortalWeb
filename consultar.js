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

$("#btn_consultar").on("click", function(){
    var username=$("#username").val();
    var phone=$('#phone').val();
    alert("Haz dado click");
    $("#list_consulta tbody").remove(); 
    consultar(username, phone);
});

//Funcion de consultar usuario
function consultar(username, phone){
    const db = getDatabase();
    const starCountRef = ref(db, 'Users/');

    var encontrado = new Boolean(false);
    
    onValue(starCountRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            //alert(childData.name);
            if (username == childData.name && phone == childData.phone){
                const uid = childSnapshot.key;
                //alert("Encontrado");
                //alert(childData.name);
                encontrado = true;
                const tot_jobs = parseInt(childData.jobs.number);
                var jobs_title = "";
                var desc = "<td>${'No existe'}</td>";
                for(var i=1; i<= tot_jobs; i++)
                    jobs_title = jobs_title + '<td>${childData.jobs.T'+i+'.jobtitle}</td>';
                if(tot_jobs == 1)
                    jobs_title = jobs_title + desc + desc;
                else if(tot_jobs == 2)
                    jobs_title = jobs_title;
                else
                    jobs_title = desc + desc + desc;

                alert(jobs_title);

                const tabla = document.querySelector('#list_consulta tbody');
                const row = document.createElement('tr');
                row.innerHTML += `
                    <td>${childSnapshot.key}</td>
                    <td>${childData.name}</td>
                    <td>${childData.age}</td>
                    <td>${childData.phone}</td>
                ` + jobs_title + `
                    <td>${childData.balance}</td>
                    <td>${childData.rating}</td>
                    <td>${childData.status}</td>
                    <td>${childData.totjobs}</td>
                `;
                tabla.appendChild(row);
                
            }
        });
        if (encontrado == false) {
            alert("Usuario no encontrado o no existe en base de datos");
        }
    }, {
        onlyOnce: true
    });
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