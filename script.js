

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

const firebaseConfig = {
    apiKey: "AIzaSyBbo3wX9R3m2gHQtsekDpYW5L5e_ryj3L0",
    authDomain: "proyectos-datos-de-formulario.firebaseapp.com",
    projectId: "proyectos-datos-de-formulario",
    storageBucket: "proyectos-datos-de-formulario.appspot.com",
    messagingSenderId: "124620888951",
    appId: "1:124620888951:web:1d86845349cf320aa21f72",
    measurementId: "G-EN827DCLLB"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    // Validar campo NOMBRE

    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }


    // Validar CORREO ELECTRONICO
    let emailEntrada = document.getElementById('email')
    let errorEmail = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validar Mail con patron basico 

    if(!emailPattern.test(emailEntrada.value)){
        errorEmail.textContent = 'Por ingrese un Mail correcto'
        errorEmail.classList.add('error-message')
    }else{
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }

    // Validar la CONTRASEÑA 
    let contraseniaEntrada = document.getElementById('password')
    let errorContrasenia = document.getElementById('passwordError')
    let paternContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
    if(!paternContrasenia.test(contraseniaEntrada.value)){
        errorContrasenia.textContent = 'Por favor ingrese un password mayor a 8 caracteres'
        errorContrasenia.classList.add('error-message')
    }else{
        errorContrasenia.textContent = ''
        errorContrasenia.classList.remove('error-message')
    }


    // Si todos los campos son válidos ENVIAR FORMULARIO

    if(!errorNombre.textContent && !errorEmail.textContent && !errorContrasenia.textContent){
        // backend que reciba la info
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contraseniaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset()
            
        })
        .catch((error) => {
            alert(error)
        });

    }
})