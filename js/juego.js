let permisoMarcar = false
let tamanoPanel;
let adyacentes = []
let idsMarcados = []
let classMarcada;
let idInterval;

//FUNCIONES 
function rellenarFormUsuario() {
    document.getElementById('nick').value = nick //de sisssionStorage
    document.getElementById('avatarImg').src = avatarImg  //de sisssionStorage
    tamanoPanel = parseInt(tamano)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function pintarPanel() {
    document.getElementById('juego').style.gridTemplateColumns = `repeat(${tamano}, 1fr)`
    document.getElementById('juego').style.gridTemplateRows = `repeat(${tamano}, 1fr)`
    let items = ""
    let color = ['verde', 'rojo']
    let random_int = 0
    //pintar automaticamente
    for (let i = 0; i < parseInt(tamano) * parseInt(tamano); i++) {
        items += `<div class="containerItem"><div id="${i}" class="item ${color[random_int]}"></div></div>`

        //si no lo es el color randm no se actualiza en la siguiente
        if (i % 2 > 0) random_int = getRandomInt(2)
    }
    document.getElementById('juego').innerHTML = items
}

//eventos de juego
function eventosJuego() {
    const items = document.getElementsByClassName('item')
    for (let item of items) {
        item.addEventListener('mousedown', comenzarMarcar)
        item.addEventListener('mouseover', continuaMarcando)
    }
    document.addEventListener('mouseup', terminarMarcar)

    idInterval = setInterval(cuentaTiempo,1000 )

}

function cuentaTiempo() {
    let tmpo = parseInt(document.getElementById('tmpo').value) -1 ;
    document.getElementById('tmpo').value = tmpo

    if(tmpo == 0 ){
        clearInterval(idInterval)
        const items = document.getElementsByClassName('item')
        for (let item of items) {
            item.removeEventListener('mousedown', comenzarMarcar)
            item.removeEventListener('mouseover', continuaMarcando)
        }
        document.removeEventListener('mouseup', terminarMarcar)
        //cuenta atras

        //mostrar pantalla
        document.getElementById('juegoAcabado').classList.add('juegoAcabadoColor')
        document.getElementById('juegoAcabado').style.zIndex = '2'

        document.getElementById('juego').style.zIndex = '1'
        document.getElementById('newGame').addEventListener('click', (e)=> location.reload() )

    }
    
}

function comenzarMarcar(event) {
    let item = event.target
    containerParent = event.target.parentElement;
    if (item.classList.contains('rojo')) {
        classMarcada = 'rojo'
        containerParent.classList.add('rojo')
    }
    else {
        containerParent.classList.add('verde')
        classMarcada = 'verde'
    }
    permisoMarcar = true
    if (!permisoMarcar) permisoMarcar = true


    //Calcular adyacentes
    calcularAdyacentes(parseInt(item.id))
    idsMarcados.push(item.id)
}


function continuaMarcando(event) {
    if (permisoMarcar) {
        let item = event.target
        let idNuevo = parseInt(item.id)
        //Es adyacente y contiene el mismo color que el anterior?
        if (adyacentes.includes(idNuevo) && item.classList.contains(classMarcada)) {

            let containerParent = event.target.parentElement;
            if (item.classList.contains('rojo')) containerParent.classList.add('rojo')
            else containerParent.classList.add('verde')
            
            //guardo los marcados
            idsMarcados.push(parseInt(item.id))
            calcularAdyacentes(parseInt(item.id))

        }
    }
}


function terminarMarcar(event) {
    adyacentes = []
    console.log('hola');
    permisoMarcar = false

    const puntuacionInput = document.getElementById('puntuacion')
    //añadir la puntuacion
    if(idsMarcados.length >1){
        puntuacionInput.value = parseInt(puntuacionInput.value) + idsMarcados.length 
    }

    //Poner random los colores al terminar de seleccionarlos
    for (let i = 0; i < idsMarcados.length; i++) {
        const item_to_delete = document.getElementById(idsMarcados[i])
        item_to_delete.parentElement.classList.remove(classMarcada) //sera rojo o verde

        let color = ['rojo', 'verde']
        let randomInt = getRandomInt(2)

        item_to_delete.classList.remove(classMarcada)
        item_to_delete.classList.add(color[randomInt])
    }
    idsMarcados = [] //volvemos a reiniciar los marcados
    console.log('Finalizar el marcado');
}

//Comprueba si sus casillas adyacentes
function calcularAdyacentes(idMarcado) {
    //Adyacente superior
    if ((idMarcado - tamanoPanel) >= 0) adyacentes.push(idMarcado - tamanoPanel);
    //Adyacente inferior
    if ((idMarcado + tamanoPanel) < (tamanoPanel * tamanoPanel)) adyacentes.push(idMarcado + tamanoPanel);
    //Adyacente izquierda
    if ((idMarcado % tamanoPanel) > 0) adyacentes.push(idMarcado - 1);
    //Adyacente derecha
    if (((idMarcado + 1) % tamanoPanel) > 0) adyacentes.push(idMarcado + 1);
}





//Capturamos Datos Usuario
getUsuario()

//Comprobar Datos
if (!comprobacionDatosUsuario()) location = "index.html"

//rellenamos el form
rellenarFormUsuario()
pintarPanel()
eventosJuego()