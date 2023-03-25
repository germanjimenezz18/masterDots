//VARIABLES Y OBJETOS
const nickInput = document.getElementById("nick")
const tamanoSelect = document.getElementById("tamano")
const formEntrada = document.getElementById("formEntrada")
const error = document.getElementById("error")




//FUNCIONES
function comprobarForm(event) {
    if (nickInput.value.match(/(?<!\S)[0-9]/) ) {
        nickInput.focus()
        event.preventDefault()
        error.innerHTML = "El nick no puede comenzar por un numero"
        return false
    }
    else if(tamanoSelect.value == "0"){
        tamanoSelect.focus()
        event.preventDefault()
        error.innerHTML = "size no introducido"
        return false

    }
    return true
    
}

//CARGA DE EVENTOS
formEntrada.addEventListener('submit', comprobarForm)