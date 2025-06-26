let busquedaInput = document.getElementById("busqueda"); 

/////////////////////////////////////////////////

busquedaInput.addEventListener("input",()=>{ 
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
          listaDeBusqueda[j] =  baseDatosJSON.artistas[i].nombre.trim(); //SE LA ASIGNA A LISTADEBUSQUEDA
          j++; //RECORRE EL ARREGLO DE BUSQUEDA
        }
    }
    for(i=0;i<baseDatosJSON.album.length;i++){ //RECORRE EL ARREGLO ARTISTAS
        let palabra = busquedaInput.value.toUpperCase(); //VUELVE LO QUE INGRESO EL USUARIO EN MAYUSCULAS
        let album = baseDatosJSON.album[i].nombre; 
        album = album.toUpperCase(); //VUELVE AL NOMBRE DEL ARTISTA A MAYUS

        if(album.includes(palabra)){ //SI LA PALABRA QUE INGRESO EL USUARIO ESTA INCLUIDA
            listaDeBusqueda[j] =  baseDatosJSON.album[i].nombre.trim(); //SE LA ASIGNA A LISTADEBUSQUEDA
            j++; //RECORRE EL ARREGLO DE BUSQUEDA
        }
    }
    for(i=0;i<baseDatosJSON.canciones.length;i++){ //RECORRE EL ARREGLO ARTISTAS
        let palabra = busquedaInput.value.toUpperCase(); //VUELVE LO QUE INGRESO EL USUARIO EN MAYUSCULAS
        let cancion = baseDatosJSON.canciones[i].nombre; 
        cancion = cancion.toUpperCase(); //VUELVE AL NOMBRE DEL ARTISTA A MAYUS

        if(cancion.includes(palabra)){ //SI LA PALABRA QUE INGRESO EL USUARIO ESTA INCLUIDA
            listaDeBusqueda[j] =  baseDatosJSON.canciones[i].nombre.trim(); //SE LA ASIGNA A LISTADEBUSQUEDA
            j++; //RECORRE EL ARREGLO DE BUSQUEDA
        }
    }
    listaDeBusqueda.sort(); //SORTEA POR ORDEN ALFABETICO LA LISTADEBUSQUEDA
    listaDeBusqueda.sort((a,b)=>{ //SORTEA POR LO QUE INGRESO EL USUARIO "SI INGRESA N" => COLOCA LAS N PRIMERO EN EL ARREGLO
        let posA = a.indexOf(busquedaInput.value); //BUSCA LA POSICION DE X EN A (SI ES N Y LA PALABRA ES NARANJA ES IGUAL A 0)
        let posB = b.indexOf(busquedaInput.value); //BUSCA LA POSICION DE X EN B (SI ES N Y LA PALABRA ES MANZANA ES IGUAL A 2)
        
        return posA - posB; //SI EL VALOR A ES MENOR QUE EL VALOR B => A VA ANTES QUE B (0 - 2 = -2 como es negativo A va antes que B)
    });
    html ='';
    for(i=0;i<listaDeBusqueda.length;i++){
        html += `<div class="opcion" onclick="busqueda('${listaDeBusqueda[i]}')"><h1>${listaDeBusqueda[i]}</h1></div>`
    }
    listaBusquedaHtml.style.display = "block";
    listaBusquedaHtml.innerHTML = html;
});

let resultadoSeleccionado = null;

function busqueda(nombre) {
    nombre = nombre.trim().toUpperCase();

    const cancion = baseDatosJSON.canciones.find(c => c.nombre.toUpperCase() === nombre);
    if (cancion) {
        resultadoSeleccionado = {
            tipo: "cancion",
            datos: cancion
        };
        console.log("Cancion", resultadoSeleccionado);
        return resultadoSeleccionado;
    }

    const artista = baseDatosJSON.artistas?.find(a => a.nombre.toUpperCase() === nombre);
    if (artista) {
        const cancionesArtista = baseDatosJSON.canciones.filter(c => c.id_artista === artista.id);
        resultadoSeleccionado = {
            tipo: "artista",
            datos: artista,
            canciones: cancionesArtista
        };
        console.log("Artista", resultadoSeleccionado);
        return resultadoSeleccionado;
    }

    // Buscar coincidencia exacta en álbumes
    const album = baseDatosJSON.album?.find(a => a.nombre.toUpperCase() === nombre);
    if (album) {
        const cancionesAlbum = baseDatosJSON.canciones.filter(c => c.id_album === album.id);
        resultadoSeleccionado = {
            tipo: "album",
            datos: album,
            canciones: cancionesAlbum
        };
        console.log("Album", resultadoSeleccionado);
        return resultadoSeleccionado;
    }
    return null;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const homeBtn = document.getElementById("homeBtn");
const artistsBtn = document.getElementById("artistsBtn");
const playlistsBtn = document.getElementById("playlistsBtn");
const creditsBtn = document.getElementById("creditsBtn");

const sectionHome = document.getElementById("home");
const sectionArtists = document.getElementById("artists");
const sectionPlaylists = document.getElementById("playlist");
const sectionCredits = document.getElementById("credits");

activeColor = "#FDC787"; //DEFINE EL COLOR SI ESTA ACTIVO
normalColor = "#ffff"; //DEFINE EL COLOR SI NO ESTA ACTIVO

function btnActivo(btn){/* Establece el color del boton*/
    homeBtn.style.color = (btn === homeBtn) ? activeColor : normalColor;
    sectionHome.style.display = (btn === homeBtn) ? "block" : "none"; 
    artistsBtn.style.color = (btn === artistsBtn) ? activeColor : normalColor; 
    sectionArtists.style.display = (btn === artistsBtn) ? "flex" : "none"; 
    playlistsBtn.style.color = (btn === playlistsBtn) ? activeColor : normalColor; 
    sectionPlaylists.style.display = (btn === playlistsBtn) ? "flex" : "none"; 
    creditsBtn.style.color = (btn === creditsBtn) ? activeColor : normalColor;
    sectionCredits.style.display = (btn === creditsBtn) ? "flex" : "none"; 
    /*Si el boton es igual al boton home por ejemplo, si eso devuelve TRUE el color se establece ACTIVECOLOR, si devuelve FALSE el color
    se establece  NORMALCOLOR*/
}

btnActivo(homeBtn); //ESTABLECE HOME CON EL COLOR DE ACTIVO AL INICIO DE LA PAGINA  

homeBtn.addEventListener("click",()=>{ btnActivo(homeBtn)}); //SI HACES CLICK LLAMA A LA FUNCION btnActivo(); y manda como parametro el btn presionado

artistsBtn.addEventListener("click",()=> btnActivo(artistsBtn));

playlistsBtn.addEventListener("click",()=> btnActivo(playlistsBtn));

creditsBtn.addEventListener("click",()=> btnActivo(creditsBtn));

///////////////////////////////////////////////////////////////////////////////////////

let artistas = document.getElementById("artistas");

html = '';
for(i=0;i<baseDatosJSON.artistas.length;i++){
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.artistas[i].nombre}')"><img src="${baseDatosJSON.artistas[i].url_img}"></div>`
}

artistas.innerHTML += html;

html = '';
html += `<h1>Artistas</h1>`
for(i=0;i<baseDatosJSON.artistas.length;i++){
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.artistas[i].nombre}')"><img src="${baseDatosJSON.artistas[i].url_img}"></div>`
}
html += `<h1>Albumes</h1>`
for(i=0;i<baseDatosJSON.album.length;i++){
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.album[i].nombre}')" ><img src="${baseDatosJSON.album[i].url_img}"></div>`
}
sectionArtists.innerHTML += html;
///////////////////////////////////////////////////////////////////////////////////////////////////
let result
function reproduce(nombre){

    let reproductor = document.getElementById("reproductor")
    isOn = reproductor.style.display === "none";
    reproductor.style.display = isOn ? "block" : "none";

    nombre = nombre.trim().toUpperCase();

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

function cambiarVideo(nuevoVideoId) {
  player.loadVideoById(nuevoVideoId); // Cambia el video sin iniciar la reproducción
  // O usa player.loadVideoById(nuevoVideoId) para iniciar la reproducción
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
//Hay que hacer que no sea necesario que tu escribas el link manulmente
        videoId: "SsYXnH9lzC",
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


// FUNCIÓN PARA MOSTRAR CANCIONES

function mostrarCanciones() {
    // 1. Obtiene el contenedor donde va a mostrarar las canciones
    const contenedor = document.getElementById('canciones-container');

    // 2. Genera el contenido del HTML para cada canción
    let html = '';
    baseDatosJSON.canciones.forEach(cancion => {
        const linkVideo = cancion.link;
        contenedor.innerHTML = `
            <div class="cancion-item">
                <div>
                    <h3>${cancion.nombre}</h3>
                    <p>${cancion.artista}</p>
                <button class="btn-reproducir" onclick = "onYouTubeIframeAPIReady.replace("SsYXnH9lzC", cancion.link")">Reproducir</button>
                console.log = ""
            </div>
        `;
    });

    // 3. Mandar el texto a el contenedor "Canciones-contenedor"
    contenedor.innerHTML = html;
}
