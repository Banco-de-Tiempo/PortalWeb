import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";//Importacion firebase
import { getDatabase, child, ref, get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";//impotacion modulo realtimedatabse
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";//importacion firebase auth

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
const auth = getAuth();
const db = getDatabase();

$("#signinButton").on("click",function(){//On click listener
  var email=$("#email").val();//get email input value from dom
  var pass=$("#pass").val();//get pass input value from dom
  login(email,pass);//Login function
});


function login(email,password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in
      const uid = userCredential.user.uid;
      //alert("Usuario encontrado");
      //window.location.replace("mainadminpage.html");

      const dbRef = ref(getDatabase());
      get(child(dbRef, 'Users/' + uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const role = data.role;
          alert(role);
        }
      }).catch((error) => {
        console.error(error);
        alert(error);
      });
      
    }).catch((error) => {
        alert("Usuario no registrado");
        const errorCode = error.code;
        const errorMessage = error.message;
    });


    /*
    const user = auth.currentUser;
    if (user != null) {
      const role = user.role;
      if(role == 'Admin'){
        alert("Eres admin");
        window.location.replace("mainadminpage.html");
      }
      else{
        alert("No eres admin");
        signOut(auth).then(() => {
          //..
        }).catch((error) => {
          //..
        });
      }
    }
    */
}