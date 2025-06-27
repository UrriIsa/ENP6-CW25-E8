const cerrarBtn = document.getElementById("cerrar-sesion"); 

function matarCookie(nombre){ 
    document.cookie = `${nombre}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`; //EXPIRA LA COOKIE
}

cerrarBtn.addEventListener("click",()=>{ //EVENTO CLICK EN BOTÓN CERRAR
    matarCookie("ACTUAL"); //MANDA ACTUAL Y BORRA LA COOKIE
    window.location.href = "./index.html" //REDIRIGE EL USUARIO A LA PÁGINA PRINCIPAL
});
