const mainForm = document.getElementById("form-registro");

const usuario = document.getElementById("usuario");
const verif = document.getElementById("terminos");
const password = document.getElementById("contraseña");
const email = document.getElementById("email");

function setCookie(nombre,datos){ //FUNCION PARA CREAR LA COOKIE
  let valor = encodeURIComponent(JSON.stringify(datos));
  document.cookie = `${nombre}=${valor};max-age=3600` //MAX AGE (AUN EN TRABAJO)**
}

function getCookie(nombre){ //FUNCION PARA VERIFICAR QUE "LA COOKIE EXISTA Y DEVUELVE SU VALOR"
    let cookies = document.cookie;
    cookies = cookies.split(";");
    for(i=0;i<cookies.length;i++){ //RECORRE LAS COOKIES
        let cookie = cookies[i].trim();
        if(cookie.indexOf(nombre+"=")===0){
            usuario.value = ''; //COMO SE ENCONTRO DENTRO DE COOKIES (OSEA YA HAY UNA COOKIE CON ESE USUARIO) LO BORRA
            break;
        }
    }
    return; //SI NO ESTA DENTRO DE COOKIES NO REGRESA NADA
}


mainForm.addEventListener("submit", (e)=>{
  getCookie(usuario.value); //MANDA A LLAMAR A getCookie();
  if(verif.value !== "verif" || verif.value === ''){
    e.preventDefault();
    let verifArt = document.getElementById("veriArt")
    verifArt.style.borderBlockColor = "red"
  }
  if(usuario.value === ''||password.value === ''|| email.value === ''){ //SI X = '' EVITA QUE SE ENVIE EL FORMULARIO
      e.preventDefault(); //FALTA MOSTRAR O DARLE A SABER AL USUARIO QUE SE EQUIVOCO***
      password.value = '';
      email.value = '';
      usuario.placeholder = "USUARIO YA EXISTENTE"
      let userArt = document.getElementById("user");
      userArt.style.borderBlockColor = "red"
  } else{ //SI PASO LOS FILTROS
    let datos = { //CREA DATOS
      nombre: usuario.value.trim(),
      password: password.value.trim(),
      email: email.value.trim()
    }
    setCookie(datos.nombre,datos); //MANDA A LLAMAR A setCookie(); y como parametro manda el nombre del usuario y los datos de este
    e.preventDefault();
    window.location.href = "./login.html";
  }
});

