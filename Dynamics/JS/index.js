let busquedaInput = document.getElementById("busqueda"); 

/////////////////////////////////////////////////
let cont = 0;
busquedaInput.addEventListener("input",()=>{ 
    const reproductor = document.getElementById("reproductor");
    reproductor.style.display = "none";
    cont = 0;
    if(player){
        player.destroy();
        player=null;
    }
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
    const reproductor = document.getElementById("reproductor"); 
    isOn = reproductor.style.display === "none";
    reproductor.style.display = isOn ? "block" : "none"; //MUESTRA EL REPRODUCTOR
    cont++;
    if(cont === 2){ //DETECCION PARA EVITAR QUE DESTRUYA EL REPRODUCTOR EN MOMENTOS EQUIVOCADOS
        cont = 0;
        player.destroy(); //SI "PICAS POR SEGUNDA VEZ" DESTRUYE EL REPRODUCTOR
        player=null;
        return;
    }
    param = param.split(","); //DIVIDE LOS PARAMETROS
    id = param[0] 
    id = Number(id) //VUELE NUMERO AL ID
    const listaBusquedaHtml = document.getElementById("listaBusqueda"); 
    listaBusquedaHtml.innerHTML = '';
    listaBusquedaHtml.style.display = "none" //APAGA BUSQUEDA


    if(param[1]==="0"){ //SI EL TIPO ES 0 == ARTISTA
        const artista = baseDatosJSON.artistas.find(a => a.id === id); /*DEVUELVE EL PRIMER ELEMENTO QUE CUMPLE CON UNA CONDICION
         (EN ESTE CASO DENTRO DE LA BASE DE DATOS EN ARTISTAS BUSCA EL ID QUE COINCIDA CON EL ID ENVIADO)*/
        if (artista) {
            const cancionesArtista = baseDatosJSON.canciones.filter(c => c.id_artista === artista.id); /*IGUAL QUE ARRIBA PERO ESTE DEVUELVE TODOS LOS ELEMENTOS QUE COINCIDAN
             (EN ESTE CASO DENTRO DE LA BASE DE DATOS EN ARTISTAS BUSCA EL ID_ARTISTA QUE COINCIDA CON EL ARTISTA.ID ENVIADO)*/
            result = { //HACEMOS UN OBJETO
                datos: artista, //GUARDAMOS EN DATOS LA INFORMACION DEL ARTISTA/EL ELEMENTO QUE REGRESO FIND
                canciones: cancionesArtista //GUARDAMOS EN DATOS LAS CANCIONES RELACIONADAS CON EL ARTISTA/ LO QUE REGRESO FILTER
            };
            console.log("Artista", result);
            html =''; 
            html = `<div id="player"><img id="imgArt" src="${result.datos.url_img}"></div>`; //DENTRO DEL REPRODUCTOR ENVIA LA IMAGEN DEL ARTISTA
            html += `<h1>${result.datos.nombre}</h1>`; //MANDA SU NOMBRE
            for(i = 0; i< result.canciones.length;i++){ //RECORRE EL ARREGLO DE LAS CANCIONES
                html += `<p class="textCancion" onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`/*
                AÑADE UN PARRAFOR CON CLASE TEXTCANCION Y LE AÑADE UNA FUNCION ONCLICK QUE MANDA A LLAMAR A REPRODUCCION con un parametro que manda el link de la canción
                y dentro del parrafo pone el nombre del artista */
            }
            reproductor.innerHTML = html; //LO MANDA AL HTML
        }
    }    
    if(param[1]==="1"){ //SI EL TIPO ES 1 == ALBUM
        const album = baseDatosJSON.album.find(a => a.id === id);/*DEVUELVE EL PRIMER ELEMENTO QUE CUMPLE CON UNA CONDICION
         (EN ESTE CASO DENTRO DE LA BASE DE DATOS EN ALBUM BUSCA EL ID QUE COINCIDA CON EL ID ENVIADO)*/
        if (album) {
            const cancionesAlbum = baseDatosJSON.canciones.filter(c => c.id_album === album.id);/*IGUAL QUE ARRIBA PERO ESTE DEVUELVE TODOS LOS ELEMENTOS QUE COINCIDAN
             (EN ESTE CASO DENTRO DE LA BASE DE DATOS EN CANCIONES BUSCA EL ID_ALBUM QUE COINCIDA CON EL ALBUM.ID ENVIADO)*/
            result = {
                datos: album,
                canciones: cancionesAlbum
            };
            console.log("Album", result);
            html = `<div id="player"><img id="imgArt" src="${result.datos.url_img}"></div>`; //DENTRO DEL REPRODUCTOR ENVIA LA IMAGEN DEL ARTISTA
            html += `<h1>${result.datos.nombre}</h1>`; //MANDA SU NOMBRE
            for(i = 0; i< result.canciones.length;i++){ //RECORRE EL ARREGLO DE LAS CANCIONES
                html += `<p class="textCancion" onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`/*
                AÑADE UN PARRAFOR CON CLASE TEXTCANCION Y LE AÑADE UNA FUNCION ONCLICK QUE MANDA A LLAMAR A REPRODUCCION con un parametro que manda el link de la canción
                y dentro del parrafo pone el nombre del artista */
            }
            reproductor.innerHTML = html; //LO MANDA AL HTML
        }
    }
    if(param[1]==="2"){ //SI EL TIPO ES 2 == CANCIÓN
        const cancion = baseDatosJSON.canciones.find(a=> a.id === id); /*DEVUELVE EL PRIMER ELEMENTO QUE CUMPLE CON UNA CONDICION
         (EN ESTE CASO DENTRO DE LA BASE DE DATOS EN CANCIONES BUSCA EL ID QUE COINCIDA CON EL ID ENVIADO)*/
        const artista = baseDatosJSON.artistas.find(a => a.id === cancion.id_artista); //CON LA CANCION ENCONTRADA HACE LO MISMO PERO COMPARANDO EL ID ARTISTA EN LA BASE DE DATOS EN ARTISTA
        //MISMA FUNCION QUE IF(PARAM[0]==="0")
        if (artista) {
            const cancionesArtista = baseDatosJSON.canciones.filter(c => c.id_artista === artista.id);
            result = {
                datos: artista,
                canciones: cancionesArtista
            };
            console.log("Artista", result);
            html = `<div id="player"><img id="imgArt" src="${result.datos.url_img}"></div>`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p class="textCancion" onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
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
    sectionPlaylist.style.display = "none";
    /*Si el boton es igual al boton home por ejemplo, si eso devuelve TRUE el color se establece ACTIVECOLOR, si devuelve FALSE el color
    se establece  NORMALCOLOR, MISMA FUNCIONALIDAD PERO TAMBIEN LO MUESTRA O NO*/
}

btnActivo(homeBtn); //ESTABLECE HOME CON EL COLOR DE ACTIVO AL INICIO DE LA PAGINA  

homeBtn.addEventListener("click",()=>{ btnActivo(homeBtn)}); //SI HACES CLICK LLAMA A LA FUNCION btnActivo(); y manda como parametro el btn presionado

artistsBtn.addEventListener("click",()=> btnActivo(artistsBtn));

playlistsBtn.addEventListener("click",()=> btnActivo(playlistsBtn));

creditsBtn.addEventListener("click",()=> btnActivo(creditsBtn));

///////////////////////////////////////////////////////////////////////////////////////
//APARTADO HOME
let artistas = document.getElementById("artistas"); //EN EL ARTICULO ARTISTAS

html = '';
for(i=0;i<baseDatosJSON.artistas.length;i++){ //RECORRE LA BASE DE DATOS
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.artistas[i].id},${0}')"><img src="${baseDatosJSON.artistas[i].url_img}"></div>` 
} //CREA UN DIV con clase ARTISTA le asigna una funcion ONCLICK con parametros el id y el tipo  y coloca la imagen del artista

artistas.innerHTML += html;
/////////////////////////////////////////////////////////////
//APARTADO ARTISTAS
html = '';
html += `<h1 class="artistTXT">Artistas</h1>`
html += `<div class="artist-Container">`
for(i=0;i<baseDatosJSON.artistas.length;i++){
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.artistas[i].id},${0}')"><img src="${baseDatosJSON.artistas[i].url_img}"></div>`
} 
html += `</div>`
//CREA UN DIV con clase ARTISTA le asigna una funcion ONCLICK con parametros el id y el tipo  y coloca la imagen del artista
html += `<h1 class="artistTXT">Albumes</h1>`
html += `<div class="artist-Container">`
for(i=0;i<baseDatosJSON.album.length;i++){
    html+= `<div class="artista" onclick ="reproduce('${baseDatosJSON.album[i].id},${1}')" ><img src="${baseDatosJSON.album[i].url_img}"></div>`
} //CREA UN DIV con clase ARTISTA le asigna una funcion ONCLICK con parametros el id y el tipo  y coloca la imagen del album
html += `</div></div>`
sectionArtists.innerHTML += html;
//////////////////////////////////////////////////////////////////////////////////////////////////////
function reproduce(param){ //FUNCION REPRODUCE (SIMILAR A BUSQUEDA();)
    const reproductor = document.getElementById("reproductor");
    isOn = reproductor.style.display === "none";
    reproductor.style.display = isOn ? "block" : "none";
    cont++;
    if(cont === 2){ //DETECCION PARA EVITAR QUE DESTRUYA EL REPRODUCTOR EN MOMENTOS EQUIVOCADOS
        cont = 0; 
        player.destroy();  //SI "PICAS POR SEGUNDA VEZ" DESTRUYE EL REPRODUCTOR
        player=null;
        return;
    }
    param = param.split(",");
    id = param[0]
    id = Number(id)
    //MISMA FUNCIONALIDAD QUE BUSQUEDA();
    if(param[1]==="0"){
        const artista = baseDatosJSON.artistas.find(a => a.id === id);
        if (artista) {
            const cancionesArtista = baseDatosJSON.canciones.filter(c => c.id_artista === artista.id);
            result = {
                datos: artista,
                canciones: cancionesArtista
            };
            console.log("Artista", result);
            html = `<div id="player"><img id="imgArt" src="${result.datos.url_img}"></div>`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p class="textCancion"onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
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
            html = `<div id="player"><img id="imgArt" src="${result.datos.url_img}"></div>`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p  class="textCancion" onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
            }
            html += `</div>`
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
            html = `<div id="player"><img id="imgArt" src="${result.datos.url_img}"></div>`;
            html += `<h1>${result.datos.nombre}</h1>`;
            for(i = 0; i< result.canciones.length;i++){
                html += `<p class="textCancion" onclick="reproduccion('${result.canciones[i].link}')">${result.canciones[i].nombre}</p>`
            }
            reproductor.innerHTML = html;
        }
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



///////////////////////////////////////////////////////////////////////////////////////////////////

let playlistCreada = [];
let playlistsGuardadas = [];

const listaCanciones = document.getElementById("can");
const listaBusquedaCanciones = document.getElementById("listaCanciones");

//Buscador
listaCanciones.addEventListener("input", () => {
    let listaDeBusqueda = []; //SE GUARDA LA LISTA DE BUSQUEDAS
    let j = 0;

    if (listaCanciones.value.trim() === "") { 
        listaBusquedaCanciones.innerHTML = '';
        listaBusquedaCanciones.style.display = "none";
        return;
    }

    for (let i = 0; i < baseDatosJSON.canciones.length; i++) { //RECORRE EL ARREGLO CANCIONES
        let palabra = listaCanciones.value.toUpperCase(); //VUELVE LO QUE INGRESO EL USUARIO EN MAYUSCULAS
        let cancion = baseDatosJSON.canciones[i].nombre.toUpperCase();

        if (cancion.includes(palabra)) { //SI LA PALABRA QUE INGRESO EL USUARIO ESTA INCLUIDA
            listaDeBusqueda[j] = { //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                nombre: baseDatosJSON.canciones[i].nombre.trim(), //SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                id: baseDatosJSON.canciones[i].id,//SE CREA UN NUEVO OBJETO EN EL ARREGLO DE BUSQUEDA
                tipo: 2 //Y LE DA UN TIPO (0=ARTISTA,1=ALBUM Y 2=CANCION)
            }
            j++;
        }
    }

    listaDeBusqueda.sort((a, b) => a.nombre.localeCompare(b.nombre));
    listaDeBusqueda.sort((a, b) => {
        let posA = a.nombre.indexOf(listaCanciones.value);//BUSCA LA POSICION DE X EN A (SI ES N Y LA PALABRA ES NARANJA ES IGUAL A 0)
        let posB = b.nombre.indexOf(listaCanciones.value);//BUSCA LA POSICION DE X EN B (SI ES N Y LA PALABRA ES MANZANA ES IGUAL A 2)
        return posA - posB;//SI EL VALOR A ES MENOR QUE EL VALOR B => A VA ANTES QUE B (0 - 2 = -2 como es negativo A va antes que B)
    });

    let html = '';
    for (let i = 0; i < listaDeBusqueda.length; i++) { //recorre el arreglo listaDeBusqueda
        html += `<div class="opcion" onclick="agregarCancion(${listaDeBusqueda[i].id})">
                    <h1>${listaDeBusqueda[i].nombre}</h1>
                 </div>`;
    }//se crea un DIV con clase opcion y le añade una funcion onClick con parametos el id y el tipo y dentro el titulo(NOMBRE)
    listaBusquedaCanciones.style.display = "block";
    listaBusquedaCanciones.innerHTML = html;
});

const AlertNombre = document.getElementById("mensajeAlertNombre");
const AlertCancion = document.getElementById("mensajeAlertCancion");
const CorrectCancion = document.getElementById("mensajeCorrectCancion");
const Alert = document.getElementById("mensajeAlert");
const Submit = document.getElementById("mensajeSubmit");


// Función para agregar canción a playlist nueva
function agregarCancion(id) {
    const cancion = baseDatosJSON.canciones.find(c => c.id === id);
    
    
    if (playlistCreada.some(c => c.id === id)) {   //Some es un método array que recorre los elementos del array, retorna true si al menos uno cumple la condicion y false si ninguno la cumple
        AlertCancion.innerHTML = "La canción  ya está agregada."; //Se muestra el texto...
        return;
    }
    playlistCreada.push(cancion);  //Push es un método array que agrega un elemento al final de la lista 
    CorrectCancion.innerHTML = "Canción añadida a la playlist."; //Se muestra el texto...
}

// Crear playlist al enviar formulario
let formulario = document.getElementById("formularioPlaylist");
formulario.addEventListener('submit', function (e) {
    e.preventDefault(); //Metodo que evita que el navegador ejecute la acción por defecto de un evento
    const nombrePlaylist = document.getElementById('nombrePlaylist').value.trim(); //Trim elimina los espacios de enfrente y atrás
    if (nombrePlaylist === "") { //Si no hay nombre muestra mensaje...
        AlertNombre.innerHTML = "Escribe un nombre para la playlist."; 
        return;
    }
    if (playlistCreada.length === 0) { //Si no hay canciones agregadas muestra mensaje...
        Alert.innerHTML = "Agrega al menos una canción antes de crear la playlist."; 
        return;
    }

    playlistsGuardadas.push({  //Añade a playlist guardadas las playlists
        nombre: nombrePlaylist,
        canciones: [...playlistCreada] //Los tres puntos es el operador spread que copia todas las canciones en un nuevo array
    });

    playlistCreada = []; //Reinicia el array
    this.reset();  //Reestablece el formulario

    actualizarVistaListasPlaylists(); //Muestra mensaje de éxito
    Submit.innerHTML = "Playlist creada correctamente."; 
});

const grupo= document.querySelector('#playlistsCreadas'); // Para mostrar playlists guardadas

// Función para actualizar el listado de playlists
function actualizarVistaListasPlaylists() {
    grupo.innerHTML = '<h3>Playlists Guardadas</h3>';
    playlistsGuardadas.forEach((pl, index) => { //Para cada playlist guardada con su indice...
        const btn = document.createElement('button');
        btn.className = 'playlist';
        btn.innerText = pl.nombre; //Crea un boton con nombre de lo que el usuario coloco al llenar el formulario
        btn.onclick = () => mostrarPlaylist(index); //Al dar click en el boton se muestra la playlist
        grupo.appendChild(btn); //Agrega el boton al contenedor grupo 
    });
}

// Función para mostrar canciones de la playlist seleccionada
function mostrarPlaylist(index) {
    const playlist = playlistsGuardadas[index];
    const seccionPlaylist = document.getElementById("playlist");
    const seccionPlaylistUnico = document.getElementById("playlistUnico");
    seccionPlaylistUnico.style.display = "block"; //Se muestra la seccionPlaylistUnico 
    seccionPlaylist.style.display = "none"; //Se esconde la seccionPlaylist


    document.getElementById('nombrePlaylistSeleccionada').innerText = playlist.nombre; //Cambia el texto al nombre de la playlist

    const contenedor = document.querySelector('#playlistUnico .canciones'); //Busca dentro de  playlistUnico  la clase canciones
    contenedor.innerHTML = ''; //Borra el contenido que esté dentro de canciones

    playlist.canciones.forEach(c => {
        const div = document.createElement('div'); //Crea un nuevo div
        div.className = 'individual'; //Le asigna la clase individual al div
        div.innerHTML = ` 
            <img src="https://img.youtube.com/vi/${c.link}/default.jpg" alt="${c.nombre}" /> 
            <p onclick="reproduce('${c.id},${2}')">${c.nombre}<br><span>${c.artista}</span></p>
        `;
        contenedor.appendChild(div); //Añade el div al contenedor principal para que se muestre
    });

}
