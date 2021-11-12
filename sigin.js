import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";//Importacion firebase
import { getDatabase, child, ref, get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";//impotacion modulo realtimedatabse
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";//importacion firebase auth

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

$("#signinButton").on("click",function(){//On click listener
  var email=$("#email").val();//get email input value from dom
  var pass=$("#pass").val();//get pass input value from dom
  login(email,pass);//Login function
});

//Funcion de login
function login(email,password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in
      const uid = userCredential.user.uid;
      //alert("Usuario encontrado");
      //window.location.replace("mainadminpage.html");

      const dbRef = ref(getDatabase());
      //Revisar en base de datos si el usuario tiene el rol de admin
      get(child(dbRef, 'Users/' + uid)).then((snapshot) => {
        //Si el usuario está escrito en base de datos
        if (snapshot.exists()) {
          //Tomar todo los valores y leer el role del usuario
          const data = snapshot.val();
          const role = data.role;
          //Comprobar si es admin
          if (role == 'admin'){
            //Redirigir a la página de inicio
            alert("Bienbenido admin");
            window.location.replace("mainadminpage.html");
          } else {
            alert("No eres admin");
          }
        }
      }).catch((error) => {
        console.error(error);
        alert(error);
      });
    //En caso de no estar registrado
    }).catch((error) => {
        alert("Usuario no registrado");
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}