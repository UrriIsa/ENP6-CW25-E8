const mainForm = document.getElementById("login");
const usuarioI = document.getElementById("usuario");
const passwordI = document.getElementById("contraseña")

function setCookie(nombre,datos){
  let valor = encodeURIComponent(JSON.stringify(datos));
  document.cookie = `${nombre}=${valor};max-age=3600`
}

function getCookie(nombre){
    let cookies = document.cookie;
    cookies = cookies.split(";");
    for(i=0;i<cookies.length;i++){
        let cookie = cookies[i].trim();
        if(cookie.indexOf(nombre+"=")===0){
            return cookie.slice(nombre.length+1);
        }
    }
    return null;
}

mainForm.addEventListener("submit",(e)=>{
    if(usuarioI.value === ''|| passwordI.value === ''){
        return;
    }
    const cookieUser = getCookie(usuarioI.value);
    if(cookieUser != null){
        let decodedCookie = JSON.parse(decodeURIComponent(cookieUser));
        if(passwordI.value === decodedCookie.password){
            
        }
        else{
            e.preventDefault();
            passwordI.value = '';
        }
    }else{
        usuarioI.value = '';
        passwordI.value = '';
        e.preventDefault();
    }
});

