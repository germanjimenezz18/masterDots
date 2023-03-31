/* GESTION DE DATOS DE USUARIO */
let nick;
let tamano
let geolocalizacionTxt
let avatarImg



function datosUsuario(nick, tamanoSelect, email, avatarContainer) {
    sessionStorage.setItem('nick',nick.value)
    sessionStorage.setItem('tamano',tamanoSelect.value)
    sessionStorage.setItem('email',email.value)
    sessionStorage.setItem('geoloc',geolocalizacionTxt)
    sessionStorage.setItem('avatarImg',avatarContainer.src)

}

function getUsuario() {
    nick = sessionStorage.getItem('nick')
    tamano = sessionStorage.getItem('tamano')
    email = sessionStorage.getItem('email')
    geoloc = sessionStorage.getItem('geoloc')
    avatarImg = sessionStorage.getItem('avatarImg')
    
    
    console.log(`Nick:${nick} , Size:${tamano}, Email:${email}, src: ${avatarImg}`);

}

function datoGeoloc() {
    if(!navigator.geolocation){
        geolocalizacionTxt = "El navegador no es compatible con geolocalizacion"
    }else{
        navigator.geolocation.getCurrentPosition(
            //IF EXITO
                (position) => geolocalizacionTxt = 'Latitud' + position.coords.latitude+ ", Longitud" + position.coords.longitude,
            //IF ERROR
                ()=> {geolocalizacionTxt = "La geolocalizacion no se pudo realizar"
            }

        )
    }
    
}

//sesion storage: se borra cuando cierras pestana o navegador
//localStorage: se mantiene aunque cierres pestana o sesion

function comprobacionDatosUsuario() {
    if (nick == null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario')
        return false
    }
    return true
}





//Local Storage
function historicoUsuario(nick) {
    let historicoStorage = localStorage.getItem('historico')
    let historico
    if(historicoStorage == null){
        historico = []
    }else{
        historico = JSON.parse(historicoStorage)
    }

    let registroUsuario = {
        usuario : nick.value,
        fecha : Date.now()
        }

    historico.push(registroUsuario)
    localStorage.setItem('historico', JSON.stringify(historico))
    
}






