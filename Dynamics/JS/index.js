let busquedaInput = document.getElementById("busqueda"); 

/////////////////////////////////////////////////

busquedaInput.addEventListener("input",()=>{ 
    const reproductor = document.getElementById("reproductor");
    reproductor.style.display = "none";
    let listaDeBusqueda  = []; //SE GUARDA LA LISTA DE BUSQUEDAS
    let j = 0;
    const listaBusquedaHtml = document.getElementById("listaBusqueda");
    if(busquedaInput.value.trim() === ""){
        listaBusquedaHtml.innerHTML = '';
        listaBusquedaHtml.style.display = "none"
        return;
    }
    for(i=0;i<baseDatosJSON.artistas.length;i++){ //RECORRE EL ARREGLO ARTISTAS
        let palabra = busquedaInput.value.toUpperCase(); //VUELVE LO QUE INGRESO EL USUARIO EN MAYUSCULAS
        let artista = baseDatosJSON.artistas[i].nombre; 
        artista = artista.toUpperCase(); //VUELVE AL NOMBRE DEL ARTISTA A MAYUS

        if(artista.includes(palabra)){ //SI LA PALABRA QUE INGRESO EL USUARIO ESTA INCLUIDA
            listaDeBusqueda[j] = { //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                nombre: baseDatosJSON.artistas[i].nombre.trim(), //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                id: baseDatosJSON.artistas[i].id, //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                tipo: 0 //Y LE DA UN TIPO (0=ARTISTA,1=ALBUM Y 2=CANCION)
            } 
            j++; //RECORRE EL ARREGLO DE BUSQUEDA
        }
    }
    for(i=0;i<baseDatosJSON.album.length;i++){ //RECORRE EL ARREGLO ARTISTAS
        let palabra = busquedaInput.value.toUpperCase(); //VUELVE LO QUE INGRESO EL USUARIO EN MAYUSCULAS
        let album = baseDatosJSON.album[i].nombre; 
        album = album.toUpperCase(); //VUELVE AL NOMBRE DEL ARTISTA A MAYUS

        if(album.includes(palabra)){ //SI LA PALABRA QUE INGRESO EL USUARIO ESTA INCLUIDA
            listaDeBusqueda[j] = { //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                nombre: baseDatosJSON.album[i].nombre.trim(), //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                id: baseDatosJSON.album[i].id, //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                tipo: 1 //Y LE DA UN TIPO (0=ARTISTA,1=ALBUM Y 2=CANCION)
            } 
            j++; //RECORRE EL ARREGLO DE BUSQUEDA
        }
    }
    for(i=0;i<baseDatosJSON.canciones.length;i++){ //RECORRE EL ARREGLO ARTISTAS
        let palabra = busquedaInput.value.toUpperCase(); //VUELVE LO QUE INGRESO EL USUARIO EN MAYUSCULAS
        let cancion = baseDatosJSON.canciones[i].nombre; 
        cancion = cancion.toUpperCase(); //VUELVE AL NOMBRE DEL ARTISTA A MAYUS

        if(cancion.includes(palabra)){ //SI LA PALABRA QUE INGRESO EL USUARIO ESTA INCLUIDA
            listaDeBusqueda[j] = { //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                nombre: baseDatosJSON.canciones[i].nombre.trim(), //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                id: baseDatosJSON.canciones[i].id, //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                tipo: 2 //Y LE DA UN TIPO (0=ARTISTA,1=ALBUM Y 2=CANCION)
            }
            j++; //RECORRE EL ARREGLO DE BUSQUEDA
        }
    }
    listaDeBusqueda.sort(); //SORTEA POR ORDEN ALFABETICO LA LISTADEBUSQUEDA
    listaDeBusqueda.sort((a,b)=>{ //SORTEA POR LO QUE INGRESO EL USUARIO "SI INGRESA N" => COLOCA LAS N PRIMERO EN EL ARREGLO
        let posA = a.nombre.indexOf(busquedaInput.value); //BUSCA LA POSICION DE X EN A (SI ES N Y LA PALABRA ES NARANJA ES IGUAL A 0)
        let posB = b.nombre.indexOf(busquedaInput.value); //BUSCA LA POSICION DE X EN B (SI ES N Y LA PALABRA ES MANZANA ES IGUAL A 2)
        
        return posA - posB; //SI EL VALOR A ES MENOR QUE EL VALOR B => A VA ANTES QUE B (0 - 2 = -2 como es negativo A va antes que B)
    });
    html ='';
    for(i=0;i<listaDeBusqueda.length;i++){ //recorre el arreglo listaDeBusqueda
        html += `<div class="opcion" onclick="busqueda('${listaDeBusqueda[i].id},${listaDeBusqueda[i].tipo}')"><h1>${listaDeBusqueda[i].nombre}</h1></div>`
    } //se crea un DIV con clase opcion y le añade una funcion onClick con parametos el id y el tipo y dentro el titulo(NOMBRE)
    listaBusquedaHtml.style.display = "block";
    listaBusquedaHtml.innerHTML = html;
});

function busqueda(param) {
    param = param.split(",");
    id = param[0]
    id = Number(id)
    const listaBusquedaHtml = document.getElementById("listaBusqueda");
    listaBusquedaHtml.innerHTML = '';
    listaBusquedaHtml.style.display = "none"
    const reproductor = document.getElementById("reproductor");
    isOn = reproductor.style.display === "none";
    reproductor.style.display = isOn ? "block" : "none";


    if(param[1]==="0"){
        const artista = baseDatosJSON.artistas.find(a => a.id === id);
        if (artista) {
            const cancionesArtista = baseDatosJSON.canciones.filter(c => c.id_artista === artista.id);
            result = {
                datos: artista,
                canciones: cancionesArtista
            };
            console.log("Artista", result);
            html ='';
            html = `<div id="player"></div><img id="imgArt" src="${result.datos.url_img}">`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
            }
            reproductor.innerHTML = html;
        }
    }    
    if(param[1]==="1"){
        const album = baseDatosJSON.album.find(a => a.id === id);
        if (album) {
            const cancionesAlbum = baseDatosJSON.canciones.filter(c => c.id_album === album.id);
            result = {
                datos: album,
                canciones: cancionesAlbum
            };
            console.log("Album", result);
            html = `<div id="player"></div><img id="imgArt" src="${result.datos.url_img}">`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
            }
            reproductor.innerHTML = html;
        }
    }
    if(param[1]==="2"){
        const cancion = baseDatosJSON.canciones.find(a=> a.id === id);
        const artista = baseDatosJSON.artistas.find(a => a.id === cancion.id_artista);
        if (artista) {
            const cancionesArtista = baseDatosJSON.canciones.filter(c => c.id_artista === artista.id);
            result = {
                datos: artista,
                canciones: cancionesArtista
            };
            console.log("Artista", result);
            html = `<div id="player"></div><img id="imgArt" src="${result.datos.url_img}">`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
            }
            reproductor.innerHTML = html;
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const homeBtn = document.getElementById("homeBtn");
const artistsBtn = document.getElementById("artistsBtn");
const playlistsBtn = document.getElementById("playlistsBtn");
const creditsBtn = document.getElementById("creditsBtn");
const playlistUniqueBtn= document.getElementById("playlistBtn1");

const sectionHome = document.getElementById("home");
const sectionArtists = document.getElementById("artists");
const sectionPlaylists = document.getElementById("playlist");
const sectionCredits = document.getElementById("credits");
const sectionPlaylist = document.getElementById("playlistUnico");
const footer = document.querySelector('footer'); 

activeColor = "#FDC787"; //DEFINE EL COLOR SI ESTA ACTIVO
normalColor = "#ffff"; //DEFINE EL COLOR SI NO ESTA ACTIVO

function btnActivo(btn){/* Establece el color del boton*/
    homeBtn.style.color = (btn === homeBtn) ? activeColor : normalColor;
    sectionHome.style.display = (btn === homeBtn) ? "flex" : "none"; 
    artistsBtn.style.color = (btn === artistsBtn) ? activeColor : normalColor; 
    sectionArtists.style.display = (btn === artistsBtn) ? "flex" : "none"; 
    playlistsBtn.style.color = (btn === playlistsBtn) ? activeColor : normalColor; 
    sectionPlaylists.style.display = (btn === playlistsBtn) ? "flex" : "none"; 
    creditsBtn.style.color = (btn === creditsBtn) ? activeColor : normalColor;
    sectionCredits.style.display = (btn === creditsBtn) ? "flex" : "none"; 
    footer.style.display = (btn === creditsBtn) ? "none" : "flex";
    playlistUniqueBtn.style.color = (btn===playlistUniqueBtn) ? activeColor : normalColor;
    sectionPlaylist .style.display = (btn === playlistUniqueBtn) ? "flex" : "none";
    /*Si el boton es igual al boton home por ejemplo, si eso devuelve TRUE el color se establece ACTIVECOLOR, si devuelve FALSE el color
    se establece  NORMALCOLOR*/
}

btnActivo(homeBtn); //ESTABLECE HOME CON EL COLOR DE ACTIVO AL INICIO DE LA PAGINA  

homeBtn.addEventListener("click",()=>{ btnActivo(homeBtn)}); //SI HACES CLICK LLAMA A LA FUNCION btnActivo(); y manda como parametro el btn presionado

artistsBtn.addEventListener("click",()=> btnActivo(artistsBtn));

playlistsBtn.addEventListener("click",()=> btnActivo(playlistsBtn));

creditsBtn.addEventListener("click",()=> btnActivo(creditsBtn));

playlistUniqueBtn.addEventListener("click",()=> btnActivo(playlistUniqueBtn));
///////////////////////////////////////////////////////////////////////////////////////

let artistas = document.getElementById("artistas"); //EN EL ARTICULO ARTISTAS

html = '';
for(i=0;i<baseDatosJSON.artistas.length;i++){ //RECORRE LA BASE DE DATOS
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.artistas[i].id},${0}')"><img src="${baseDatosJSON.artistas[i].url_img}"></div>` 
} //CREA UN DIV con clase ARTISTA le asigna una funcion ONCLICK con parametros el id y el tipo  y coloca la imagen del artista

artistas.innerHTML += html;

html = '';
html += `<h1>Artistas</h1>`
for(i=0;i<baseDatosJSON.artistas.length;i++){
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.artistas[i].id},${0}')"><img src="${baseDatosJSON.artistas[i].url_img}"></div>`
} //CREA UN DIV con clase ARTISTA le asigna una funcion ONCLICK con parametros el id y el tipo  y coloca la imagen del artista
html += `<h1>Albumes</h1>`
for(i=0;i<baseDatosJSON.album.length;i++){
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.album[i].id},${1}')" ><img src="${baseDatosJSON.album[i].url_img}"></div>`
} //CREA UN DIV con clase ARTISTA le asigna una funcion ONCLICK con parametros el id y el tipo  y coloca la imagen del album
sectionArtists.innerHTML += html;
//////////////////////////////////////////////////////////////////////////////////////////////////////
function reproduce(param){
    param = param.split(",");
    id = param[0]
    id = Number(id)
    let reproductor = document.getElementById("reproductor");
    isOn = reproductor.style.display === "none";
    reproductor.style.display = isOn ? "block" : "none";

    if(param[1]==="0"){
        const artista = baseDatosJSON.artistas.find(a => a.id === id);
        if (artista) {
            const cancionesArtista = baseDatosJSON.canciones.filter(c => c.id_artista === artista.id);
            result = {
                datos: artista,
                canciones: cancionesArtista
            };
            console.log("Artista", result);
            html = `<div id="player"></div><img id="imgArt" src="${result.datos.url_img}">`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
            }
            reproductor.innerHTML = html;
        }
    } 
    if(param[1]==="1"){
        const album = baseDatosJSON.album.find(a => a.id === id);
        if (album) {
            const cancionesAlbum = baseDatosJSON.canciones.filter(c => c.id_album === album.id);
            result = {
                datos: album,
                canciones: cancionesAlbum
            };
            console.log("Album", result);
            html = `<div id="player"></div><img id="imgArt" src="${result.datos.url_img}">`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
            }
            reproductor.innerHTML = html;
        }
    }
    if(param[1]==="2"){
        const cancion = baseDatosJSON.canciones.find(a=> a.id === id);
        console.log(id)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// REPRODUCIR VIDEOS
////////////////////
let player;
let duration = 0;
let lastVolume;
let previousVolume = 0;
let updateInterval;
const seekBar = document.getElementById("barraTiempo");
const volumeSlider = document.getElementById("volumeSlider");
const playPauseBtn = document.getElementById("pauseBtn");
const muteBtn = document.getElementById("soundBtn");
//Falta hacer que tome cualquier link de la base de datos
const canciones = [""];

//Funcion que toma el link de un video y lo reproduce
function reproduccion(link) {
    const playerContainer = document.getElementById("player");
    const playerImg = document.getElementById("imgArt");

    if (playerImg) {
        playerImg.style.display = "none";
    }
    if (player) {
        cambiarVideo(link);
    } else {
        player = new YT.Player("player", {
            videoId: link,
            playerVars: {
                controls: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
            },
            events: {
                onReady: onPlayerReady,
            },
        });
    }

    playerContainer.style.display = "block";
}

function cambiarVideo(nuevoVideoId) {
    player.loadVideoById(nuevoVideoId); // Cambia el video sin iniciar la reproducción
}

function onYouTubeIframeAPIReady(videoId) {

}
function onPlayerReady(event){
    duration = player.getDuration();
    player.playVideo();

    seekBar.max = duration;
    volumeSlider.value = player.getVolume();
    updateInterval = setInterval(()=>{
        if(player && player.getPlayerState() === YT.PlayerState.PLAYING){
            seekBar.value = player.getCurrentTime();
            currentVolume = player.getVolume();
            if (currentVolume !== previousVolume){
                volumeSlider.value = currentVolume; 
                previousVolume = currentVolume;
            }
        }
    },100)
}

/*BOTONES*/
playPauseBtn.addEventListener("click", () => {
    let state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play">`;
    } else {
        player.playVideo();
        playPauseBtn.innerHTML = `</i><i class="fa-solid fa-pause"></i>`;
    }
});

//volume
volumeSlider.addEventListener("input", ()=>{
    let volume = parseInt(volumeSlider.value, 10);
    player.setVolume(volume);

    if(player.isMuted() && volume >0){
        player.UnMute();
    }
    lastVolume = volume;
    previousVolume = volume;
})

muteBtn.addEventListener("click", () => {
    if (player.isMuted()) {
        player.unMute();
        muteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        volumeSlider.value = lastVolume;
    } else {
        player.mute();
        muteBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    }
});

//duracion
seekBar.addEventListener("input", ()=>{
    let seekTo = seekBar.value;
    player.seekTo(seekTo, true);
});


////////////////////////////////////////////////////////
/*BUSCADOR PLAYLISTS ( AGREGAR CANCIONES)*/

let busquedaCanciones = document.getElementById("can"); 

/////////////////////////////////////////////////

busquedaCanciones.addEventListener("input",()=>{ 
    let listaDeBusqueda  = []; //SE GUARDA LA LISTA DE BUSQUEDAS
    let j = 0;
    const listaBusquedaPlaylists = document.getElementById("listaBusqueda");
    if(busquedaCanciones.value.trim() === ""){
        listaBusquedaPlaylists.innerHTML = '';
        listaBusquedaPlaylists.style.display = "none"
        return;
    }
     /*DESPLIEGA BUSCADOR DE CANCIONES*/
    for(i=0;i<baseDatosJSON.canciones.length;i++){ //RECORRE EL ARREGLO ARTISTAS
        let palabra = busquedaCanciones.value.toUpperCase(); //VUELVE LO QUE INGRESO EL USUARIO EN MAYUSCULAS
        let cancion = baseDatosJSON.canciones[i].nombre; 
        cancion = cancion.toUpperCase(); //VUELVE AL NOMBRE DEL ARTISTA A MAYUS

        if(cancion.includes(palabra)){ //SI LA PALABRA QUE INGRESO EL USUARIO ESTA INCLUIDA
            listaDeBusqueda[j] = { //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                nombre: baseDatosJSON.canciones[i].nombre.trim(), //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                id: baseDatosJSON.canciones[i].id, //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                tipo: 2 //Y LE DA UN TIPO (0=ARTISTA,1=ALBUM Y 2=CANCION)
            }
            j++; //RECORRE EL ARREGLO DE BUSQUEDA
        }
    }
    listaDeBusqueda.sort(); //SORTEA POR ORDEN ALFABETICO LA LISTADEBUSQUEDA
    listaDeBusqueda.sort((a,b)=>{ //SORTEA POR LO QUE INGRESO EL USUARIO "SI INGRESA N" => COLOCA LAS N PRIMERO EN EL ARREGLO
        let posA = a.nombre.indexOf(busquedaCanciones.value); //BUSCA LA POSICION DE X EN A (SI ES N Y LA PALABRA ES NARANJA ES IGUAL A 0)
        let posB = b.nombre.indexOf(busquedaCanciones.value); //BUSCA LA POSICION DE X EN B (SI ES N Y LA PALABRA ES MANZANA ES IGUAL A 2)
        
        return posA - posB; //SI EL VALOR A ES MENOR QUE EL VALOR B => A VA ANTES QUE B (0 - 2 = -2 como es negativo A va antes que B)
    });
    html ='';
    for(i=0;i<listaDeBusqueda.length;i++){ //recorre el arreglo listaDeBusqueda
        html += `<div class="opcion" onclick="busqueda('${listaDeBusqueda[i].id},${listaDeBusqueda[i].tipo}')"><h1>${listaDeBusqueda[i].nombre}</h1></div>`
    } //se crea un DIV con clase opcion y le añade una funcion onClick con parametos el id y el tipo y dentro el titulo(NOMBRE)
    listaBusquedaPlaylists.style.display = "block";
    listaBusquedaPlaylists.innerHTML = html;
});

function busqueda(param) {
    param = param.split(",");
    id = param[0]
    id = Number(id)
    const listaBusquedaPlaylists = document.getElementById("listaBusqueda");
    listaBusquedaPlaylists.innerHTML = '';
    listaBusquedaPlaylists.style.display = "none"
    const reproductor = document.getElementById("reproductor");
    isOn = reproductor.style.display === "none";
    reproductor.style.display = isOn ? "block" : "none";

  /*  if(param[1]==="2"){
        const cancion = baseDatosJSON.canciones.find(a=> a.id === id);
        const artista = baseDatosJSON.artistas.find(a => a.id === cancion.id_artista);
        if (artista) {
            const cancionesArtista = baseDatosJSON.canciones.filter(c => c.id_artista === artista.id);
            result = {
                datos: artista,
                canciones: cancionesArtista
            };
            console.log("Artista", result);
            html = `<div id="player"></div><img id="imgArt" src="${result.datos.url_img}">`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
            }
            reproductor.innerHTML = html;
        }
    }*/
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*CREACIÓN DE PLAYLIST*/

/*
const formPlaylist = document.getElementById("formularioPlaylist");
const nombrePlaylist = document.getElementById("nombrePlaylist");
const cancionesPlaylist = document.getElementById("can");

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
    if(nombrePlaylist.value === ''|| cancionesPlaylist.value === ''){
        return; //SI ALGUN VALOR ES '' DEVUELVE LA FUNCION
    }
    const cookieUser = getCookie(.value.trim()); //MANDA A LLAMAR A getCookie(); y manda como parametro el USUARIO ingresado por el usuario
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
});/*



/////////////////////////////////////////////////////////////////////////////////

