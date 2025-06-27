const cerrarBtn = document.getElementById("cerrar-sesion");

function matarCookie(nombre){ 
    document.cookie = `${nombre}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}

cerrarBtn.addEventListener("click",()=>{
    matarCookie("ACTUAL");
    window.location.href = "./index.html"
});
