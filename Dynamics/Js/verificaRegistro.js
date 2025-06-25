const mainForm = document.getElementById("form-registro");

const usuario = document.getElementById("usuario");
const password = document.getElementById("contraseña");
const email = document.getElementById("email");

function setCookie(nombre,datos){
  let valor = encodeURIComponent(JSON.stringify(datos));
  document.cookie = `${nombre}=${valor};max-age=3600`
}

mainForm.addEventListener("submit", (e)=>{
  let cookies = document.cookie;
  cookies = cookies.split(";");
  for(i=0;i<cookies.length;i++){
    let cookie = cookies[i].trim()
    if(cookie.indexOf(usuario.value + "=")===0){
      usuario.value = '';
      break;
    }
  }
  if(usuario.value === ''||password.value === ''|| email.value === ''){
    e.preventDefault();
  } else{
    let datos = {
      nombre: usuario.value.trim(),
      password: password.value.trim(),
      email: email.value.trim()
    }
    setCookie(usuario.value.trim(),datos);
  }
});

