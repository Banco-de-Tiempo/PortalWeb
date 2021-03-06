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

    //Calcular la edad
    var date = new Date();
    var birthday = $("#age").val();
    var startDate = new Date(birthday);
    var newDate = date.getTime() - startDate.getTime();
    var age = Math.floor(newDate / 1000 / 60 / 60 / 24 /365);
    if (isNaN(age)){
        age = "";
    }

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

    //alert(horas);

    var pass=$("#pass").val();
    var confirm_pass=$("#confirm_pass").val();
    if(pass != confirm_pass){
        alert("Contrase??as distintas");
    }
    else{
        register_user(username, email, pass, phone, address, age, job, jobdesc, datejob);
    }
});

//Funci??n para salir de la sesi??n
function singout(){
    const auth = getAuth();
    signOut(auth).then(() => {
        alert("Sesi??n cerrada correctamente");
        window.location.replace("index.html");
    }).catch((error) => {
        alert("Error cerrando la sesi??n");
    });
}

//Funci??n de checar si est?? ingresado
function checkauth(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //alert("Bienvenido de nuevo");
        } else {
        // User is signed out
        alert("Porfavor ingrese sesi??n");
        window.location.replace("iniciarsesion.html");
        }
    });
}

function register_user(username, email, password, phone, address, age, job, jobdesc, datejob){
    const auth = getAuth();
    const db = getDatabase();
    //Registrar administrador en database
    //alert(username);
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
            status: "No Verificado",
            rating: "0",
            totjobs: "0",
            balance: "0",
            jobs: {
                T1: {
                    jobtitle: job,
                    datejob: datejob,
                    jobdesc: jobdesc,
                    horas: "1"
                },
                number: "1"
            },
            documentos: {
                antecedentes_np: " ",
                c_domicilio: " ",
                ine_b: " ",
                ine_f: " "
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