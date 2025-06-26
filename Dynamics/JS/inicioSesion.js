const mainForm = document.getElementById("login");
const usuarioI = document.getElementById("usuario");
const passwordI = document.getElementById("contraseña")

function setCookie(nombre,datos){ //CREA UNA COOKIE (AUN EN TRABAJO)***
  let valor = datos.trim();
  document.cookie = `${nombre}=${valor};`
}

let cookies = document.cookie;
    cookies = cookies.split(";");
    for(i=0;i<cookies.length;i++){ //RECORRE LAS COOKIES
        let cookie = cookies[i].trim();
        if(cookie.indexOf("ACTUAL"+"=")===0){
            console.log("hola")
            window.location.href = "./inicio.html"; //VALOR DE LA COOKIE
        }
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
    const cookieUser = getCookie(usuarioI.value.trim()); //MANDA A LLAMAR A getCookie(); y manda como parametro el USUARIO ingresado por el usuario
    if(cookieUser != null){ //SI NO REGRESA NULL (osea si la encontro)
        let decodedCookie = JSON.parse(decodeURIComponent(cookieUser)); //DECODIFICA EL VALOR y LO TRANSFORMA A UN DICCIONARIO PARA UTILIZARLO
        if(passwordI.value === decodedCookie.password){
            e.preventDefault();
            setCookie("ACTUAL",usuarioI.value)
            window.location.href = "./index.html";
        }
        else{
            e.preventDefault(); //EVITA QUE SE MANDE EL FORMULARIO
            passwordI.value = ''; 
            passwordI.placeholder = "CONTRASEÑA INVALIDA"
            let passwordArt = document.getElementById("password")
            passwordArt.style.borderBlockColor = "red";
            //BORRA EL VALOR DE LA PASSWORD
            //FALTA MOSTRAR O DARLE A SABER AL USUARIO QUE SE EQUIVOCO***
        }
    }else{
        usuarioI.value = '';//BORRA EL VALOR DEL USUARIO
        passwordI.value = '';
        let passwordArt = document.getElementById("password")
        passwordArt.style.borderBlockColor = "red";
        let userArt = document.getElementById("user")
        userArt.style.borderBlockColor = "red";
        usuarioI.placeholder = "USUARIO INVALIDO"
        passwordI.placeholder = "CONTRASEÑA INVALIDA"//BORRA EL VALOR DE LA PASSWORD
        e.preventDefault(); //EVITA QUE SE MANDE EL FORMULARIO
        //FALTA MOSTRAR O DARLE A SABER AL USUARIO QUE SE EQUIVOCO***
    }
});

