//VARIABLES Y OBJETOS
let nickInput;
let tamanoSelect;
let email;
let formEntrada;
let error;
let avatarItems;
let itemImg;
var avatarContainer;



//FUNCIONES
function comprobarForm(event) {
    if (nickInput.value.match(/(?<!\S)[0-9]/)) {
        nickInput.focus()
        event.preventDefault()
        error.innerHTML = "El nick no puede comenzar por un numero"
        return false
    }
    else if (tamanoSelect.value == "0") {
        tamanoSelect.focus()
        event.preventDefault()
        error.innerHTML = "size no introducido"
        return false

    }
    //Informacion es correcta
    datosUsuario(nickInput, tamanoSelect, email,avatarContainer )
    historicoUsuario(nickInput)
    return true

}
function moviendoImg(event) {
    return itemImg = event.target;

}
function cambiarContainer(event) {
    avatarContainer.src = itemImg.src
}


/* Carga de objetos del DOM comprobaciones y eventos del formulario */

function domCargado() {
    nickInput = document.getElementById("nick")
    tamanoSelect = document.getElementById("tamano")
    
    formEntrada = document.getElementById("formEntrada")
    error = document.getElementById("error")
    console.log(tamanoSelect.value);
    email = document.getElementById("email")
    


    //Comprobar si hay error de juego.html
    if (sessionStorage.getItem('error')) {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error')
    }

    formEntrada.addEventListener('submit', comprobarForm)


    //D&D
    avatarItems = document.getElementsByClassName('avatarImgItem')

    for (let item of avatarItems) {
        item.addEventListener('dragstart', moviendoImg)
    }

    //container
    avatarContainer = document.getElementById('avatarImg')

    avatarContainer.addEventListener('dragover',
        (e) => { e.preventDefault() }
    )

    avatarContainer.addEventListener('drop', cambiarContainer)

}


//CARGA DE EVENTOS
document.addEventListener('DOMContentLoaded', domCargado())

//Geolocalizacion
datoGeoloc()