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

$("#btn_add_user").on("click", function(){
    var username=$("#username").val();
    var email=$("#email").val();
    var phone=$('#phone').val();
    var address=$('#address').val();
    alert("Calculando la edad");

    var age=$('#age').on('change', edad);

    alert("Termine");

    var pronoun=$('#pronoun').val();
    var job=$('#job').val();
    var jobdesc=$('#jobdesc').val();
    var datejob = "";


    if($('#lunes').is(':checked')){ datejob = datejob + "L "; }
    if($('#martes').is(':checked')){ datejob = datejob + "M "; }
    if($('#miercoles').is(':checked')){ datejob = datejob + "X "; }
    if($('#jueves').is(':checked')){ datejob = datejob + "J "; }
    if($('#viernes').is(':checked')){ datejob = datejob + "V "; }
    if($('#sabado').is(':checked')){ datejob = datejob + "S "; }
    if($('#domingo').is(':checked')){ datejob = datejob + "D "; }

    var pass=$("#pass").val();
    var confirm_pass=$("#confirm_pass").val();
    if(pass != confirm_pass){
        alert("Contraseñas distintas");
    }
    else{
        //register_user(username, email, phone, address, age, pronoun, job, jobdesc, pass);
        register_user(username, email, pass, phone, address, age, pronoun, job, jobdesc, datejob);
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
        //alert("Bienvenido de nuevo");
        } else {
        // User is signed out
        alert("Porfavor ingrese sesión");
        window.location.replace("iniciarsesion.html");
        }
    });
}

function edad(){
    fecha = $(this).val();
    var hoy = new Date();
    var birthday = new Date(fecha);
    var edad = hoy.getFullYear() - birthday.getFullYear();
    var m = hoy.getMonth() - birthday.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < birthday.getDate())) {
        edad--;
    }
    alert("Años");
}

function register_user(username, email, password, phone, address, age, pronoun, job, jobdesc, datejob){
    const auth = getAuth();
    const db = getDatabase();
    //Registrar administrador en database
    alert(username);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const uid = userCredential.user.uid;
        //alert("UID es: " + uid);
        //Escribirlo en la base de datos con el rol de administrador
        set(ref(db, 'Users/' + uid),{
            name: username,
            role: "user",
            phone: phone,
            address: address,
            age: age,
            pronoun: pronoun,
            status: "No verificado",
            rating: "0",
            totjobs: "0",
            totrating: "0",
            jobs: {
                T1: {
                    jobtitle: job,
                    datejob: datejob,
                    jobdesc: jobdesc
                }
            }
        })
        alert("Usuario registrado exitosamente");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
  });
}