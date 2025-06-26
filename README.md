# Axolofy - Proyecto Web con JavaScript
La página web permite al usuario reproducir canciones a partir de una pseudo-base de datos propia. En este reproductor, el usuario puede escuchar las canciones de su preferencia, crear playlists y guardar su información para acceder a su cuenta en un futuro. 
---
## Tabla de contenidos
- [Características](#Características) 
- [Requisitos](#Requisitos)
- [Instalación](#Instalación)
- [Uso](#Uso)
- [Licencia](#Licencia)
---
## Características
- La página cuenta con 4 apartados: Home, Artistas, Playlist y Créditos, todas localizadas en el sidebar.
- A la hora de reproducir una canción, se despliega el video en el lado derecho.
- Los controles para la reproducción se localizan en la parte inferior de la página, permitiendo al usuario pausar, avanzar y modificar el volumen a su preferencia.
- La página cuenta con un buscador para facilitar la navegación.
- En la esquina superior derecha, al usuario se le permite crear una cuenta propia así como ingresar en caso de ya tener una. 
- En la página "Home", se despliegan los artistas recomendados. 
- En la sección de artistas se encuentran todos los álbumes y artistas con los que contamos en nuestra base de datos.
- En el apartado de playlist el usuario puede crear listas de reproducción y observar aquellas que ya ha creado.
- Finalmente, en el apartado de créditos se visualizan los nombres de los creadores del proyecto, así como del mentor que nos guió en el proceso. 
---
## Requisitos
- Sistema operativo: contar con un sistema operativo, como Linux o Windows. Posteriormente se explica la instalación en cada uno de ellos. 
- XAMPP: contar con el distribuidor de Apache y encender esta función.
- Conexión a internet: para permitir la descarga del repositorio de github, así como el funcionamiento de la página. 
- Navegador / Explorador web: para visualizar la página web (HTML).
---
## Instalación
### Para usuaarios de Windows: 
1. En el navegadaor o explorador web de preferencia de usuario, descargar XAMPP en su página oficial: https://www.apachefriends.org/es/download.html
2. Aceptando los términos necesarios, ejecutar el programa y encender el módulo "Apache". Es fundamental que se mantenga esta opción encendida para el correcto funcionamiento del API.
3. Clonar este repositorio o descargar todas las carpetas en la siguiente ruta C:/xampp/htdocs
   
### Para usuarios de Linux:
1. En la terminal, ejecutar los siguientes comandos para la instalación de XAMPP:
   ```bash
  chmod +x xampp-Linux-x64-5.2.12-0-installer.run
  sudo ./xampp-linux-x64-8.2.12-0-installer.run
  sudo dnf provides libcrypt.so.1
  sudo dnf install Libxcrypt-compat 
  sudo dnf install libnsl
! Es probable que se requiera la contraseña del usuario.
! Las librerías son necesarias para el funcionamiento de XAMPP (distribuidor de Apache)
2. Para activar "Apache", escribir la siguiente línea en la terminal:
 ```bash
sudo rutaEnLaQueSeEncuentraXampp start
3. Clonar este repositorio o descargar todas las carpetas en la ruta en la que se encuentra xampp, en el directorio htdocs. 
---
## Uso
1. Abra el archivo ENP6-CW25-E8/Templates/index.html en el navegador.
2. Cambie la ruta en el navegado localhost/ENP6-CW25-E8/Templates/index.html
3. Si todo funcionó correctamente se debe desplegar la página con las características mencionadas.
4. Interactúe reproduciendo canciones, creando una cuenta, reproduciendo playlists y escuchando a sus artistas preferidos.
5. Para detener la página, basta con cerrar su sesión y quitar la ventana. 
---
## Licencia
Este proyecto está licenciado bajo la Licencia MIT. 
