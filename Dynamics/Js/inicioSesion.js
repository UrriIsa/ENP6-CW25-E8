const mainForm = document.getElementById("login");
const usuarioI = document.getElementById("usuario");
const passwordI = document.getElementById("contraseña")

function setCookie(nombre,datos){ //CREA UNA COOKIE (AUN EN TRABAJO)***
  let valor = encodeURIComponent(JSON.stringify(datos));
  document.cookie = `${nombre}=${valor};max-age=3600`
}

function getCookie(nombre){ //FUNCION PARA VERIFICAR QUE "LA COOKIE EXISTA Y DEVUELVE SU VALOR"
    let cookies = document.cookie;
    cookies = cookies.split(";");
    for(i=0;i<cookies.length;i++){ //RECORRE LAS COOKIES
        let cookie = cookies[i].trim();
        if(cookie.indexOf(nombre+"=")===0){
            return cookie.slice(nombre.length+1); //VALOR DE LA COOKIE
        }
    }
    return null;
}

mainForm.addEventListener("submit",(e)=>{
    if(usuarioI.value === ''|| passwordI.value === ''){
        return; //SI ALGUN VALOR ES '' DEVUELVE LA FUNCION
    }
    const cookieUser = getCookie(usuarioI.value); //MANDA A LLAMAR A getCookie(); y manda como parametro el USUARIO ingresado por el usuario
    if(cookieUser != null){ //SI NO REGRESA NULL (osea si la encontro)
        let decodedCookie = JSON.parse(decodeURIComponent(cookieUser)); //DECODIFICA EL VALOR y LO TRANSFORMA A UN DICCIONARIO PARA UTILIZARLO
        if(passwordI.value === decodedCookie.password){
            //AUN EN TRABAJO***
        }
        else{
            e.preventDefault(); //EVITA QUE SE MANDE EL FORMULARIO
            passwordI.value = ''; //BORRA EL VALOR DE LA PASSWORD
            //FALTA MOSTRAR O DARLE A SABER AL USUARIO QUE SE EQUIVOCO***
        }
    }else{
        usuarioI.value = '';//BORRA EL VALOR DEL USUARIO
        passwordI.value = '';//BORRA EL VALOR DE LA PASSWORD
        e.preventDefault(); //EVITA QUE SE MANDE EL FORMULARIO
        //FALTA MOSTRAR O DARLE A SABER AL USUARIO QUE SE EQUIVOCO***
    }
});

