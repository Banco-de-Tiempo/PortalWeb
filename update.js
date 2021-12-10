import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";//Importacion firebase
import { getDatabase, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";//impotacion modulo realtimedatabse
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

$("#btn_update_user").on("click", function(){
    var username=$("#username").val();
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

    var pronoun=$('#pronoun').val();

    //Trabajo 1
    var job1=$('#job1').val();
    var jobdesc1=$('#jobdesc1').val();
    var datejob1 = "";

    if($('#lunes1').is(':checked')){ datejob1 = datejob1 + "L "; }
    if($('#martes1').is(':checked')){ datejob1 = datejob1 + "M "; }
    if($('#miercoles1').is(':checked')){ datejob1 = datejob1 + "X "; }
    if($('#jueves1').is(':checked')){ datejob1 = datejob1 + "J "; }
    if($('#viernes1').is(':checked')){ datejob1 = datejob1 + "V "; }
    if($('#sabado1').is(':checked')){ datejob1 = datejob1 + "S "; }
    if($('#domingo1').is(':checked')){ datejob1 = datejob1 + "D "; }

    //Trabajo 2
    var job2=$('#job2').val();
    var jobdesc2=$('#jobdesc2').val();
    var datejob2 = "";

    if($('#lunes2').is(':checked')){ datejob2 = datejob2 + "L "; }
    if($('#martes2').is(':checked')){ datejob2 = datejob2 + "M "; }
    if($('#miercoles2').is(':checked')){ datejob2 = datejob2 + "X "; }
    if($('#jueves2').is(':checked')){ datejob2 = datejob2 + "J "; }
    if($('#viernes2').is(':checked')){ datejob2 = datejob2 + "V "; }
    if($('#sabado2').is(':checked')){ datejob2 = datejob2 + "S "; }
    if($('#domingo2').is(':checked')){ datejob2 = datejob2 + "D "; }

    //Trabajo 3
    var job3=$('#job3').val();
    var jobdesc3=$('#jobdesc3').val();
    var datejob3 = "";

    if($('#lunes3').is(':checked')){ datejob3 = datejob3 + "L "; }
    if($('#martes3').is(':checked')){ datejob3 = datejob3 + "M "; }
    if($('#miercoles3').is(':checked')){ datejob3 = datejob3 + "X "; }
    if($('#jueves3').is(':checked')){ datejob3 = datejob3 + "J "; }
    if($('#viernes3').is(':checked')){ datejob3 = datejob3 + "V "; }
    if($('#sabado3').is(':checked')){ datejob3 = datejob3 + "S "; }
    if($('#domingo3').is(':checked')){ datejob3 = datejob3 + "D "; }
    
    update_user(username, phone, address, age, pronoun, job1, jobdesc1, datejob1, job2, jobdesc2, datejob2, job3, jobdesc3, datejob3);
    
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

function update_user(username, phone, address, age, pronoun, job1, jobdesc1, datejob1, job2, jobdesc2, datejob2, job3, jobdesc3, datejob3){
    const db = getDatabase();
    const starCountRef = ref(db, 'Users/');

    var encontrado = new Boolean(false);

    //Iniciar la busqueda por nombre
    onValue(starCountRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            //alert(childData.name);
            //Buscar el usuario con el nombre y el número telefono
            if (username == childData.name){
                const uid = childSnapshot.key;
                //alert(uid);
                encontrado = true;

                update(ref(db, "Users/" + uid), {
                    name: username,
                    role: "user",
                    phone: phone,
                    address: address,
                    age: age,
                    pronoun: pronoun,
                    status: "No Verificado",
                    jobs: {
                        T1: {
                            jobtitle: job1,
                            datejob: datejob1,
                            jobdesc: jobdesc1,
                            horas: "1"
                        },
                        T2: {
                            jobtitle: job2,
                            datejob: datejob2,
                            jobdesc: jobdesc2,
                            horas: "1"
                        },
                        T3: {
                            jobtitle: job3,
                            datejob: datejob3,
                            jobdesc: jobdesc3,
                            horas: "1"
                        },
                        number: "3"
                    }
                }).then(() => {
                    alert("Usuario actualizado exitosamente");
                }).catch((error) => {
                    alert("Error al actualizar el usuario");
                    alert(error);
                });


            }
        });
        if (encontrado == false) {
            alert("Usuario no encontrado o no existe en base de datos");
        }
    }, {
        onlyOnce: true
  });
}