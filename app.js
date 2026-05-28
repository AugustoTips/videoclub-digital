// Cuando consigas la clave, reemplazá el texto de abajo con tu clave real
const API_KEY = '50c68c8f6a81c6e8e702533bf55dcf13'; 
const URL_BASE = 'https://api.themoviedb.org/3';
const URL_IMAGEN = 'https://image.tmdb.org/t/p/w500';

async function cargarPeliculas() {
    const contenedor = document.getElementById('grilla-catalogo');

    try {
        // Leemos tu archivo JSON local
        const respuestaJSON = await fetch('catalogo.json');
        const peliculasLocal = await respuestaJSON.json();

        // Recorremos cada película
        for (let peli of peliculasLocal) {
            
            // Si no tenés la API Key todavía, armamos una tarjeta de prueba genérica
            if (API_KEY === 'TU_CLAVE_API_TMDB_AQUI') {
                const tarjetaPrueba = document.createElement('div');
                tarjetaPrueba.className = 'tarjeta';
                tarjetaPrueba.innerHTML = `
                    <div style="height:300px; background:#333; display:flex; align-items:center; justify-content:center; color:#777; text-align:center; padding:20px;">
                        Falta API Key para<br>ID: ${peli.tmdb_id}
                    </div>
                    <div class="info-tarjeta" style="opacity:1;">
                        <h3>${peli.titulo_interno}</h3>
                        <a href="${peli.link_drive}" target="_blank" class="btn-pedir">Pedir por WhatsApp</a>
                    </div>
                `;
                contenedor.appendChild(tarjetaPrueba);
                continue; // Salta a la siguiente película
            }

            // Si ya tenés la API Key, consultamos a TMDB
            const url = `${URL_BASE}/movie/${peli.tmdb_id}?api_key=${API_KEY}&language=es-ES`;
            const respuestaTMDB = await fetch(url);
            const datosTMDB = await respuestaTMDB.json();

            // Armamos la tarjeta con los datos reales
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta';
            
            tarjeta.innerHTML = `
                <img src="${URL_IMAGEN + datosTMDB.poster_path}" alt="${datosTMDB.title}">
                <div class="info-tarjeta">
                    <h3>${datosTMDB.title}</h3>
                    <p style="font-size: 0.8rem; color: #aaa;">⭐ ${datosTMDB.vote_average.toFixed(1)} / 10</p>
                    <a href="${peli.link_drive}" target="_blank" class="btn-pedir">Pedir enlace</a>
                </div>
            `;
            
            contenedor.appendChild(tarjeta);
        }

    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        contenedor.innerHTML = '<p style="color:red; text-align:center;">Error al cargar las películas. Verificá la consola.</p>';
    }
}

// Ejecutar cuando termine de cargar el HTML
document.addEventListener('DOMContentLoaded', cargarPeliculas);