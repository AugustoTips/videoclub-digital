const API_KEY = '50c68c8f6a81c6e8e702533bf55dcf13'; 
const URL_BASE = 'https://api.themoviedb.org/3';
const URL_IMAGEN = 'https://image.tmdb.org/t/p/w500';

let catalogoCompleto = [];
let filtradoActual = [];
let indiceActual = 0;
const CANTIDAD_POR_PAGINA = 20;

const esperar = (milisegundos) => new Promise(resolve => setTimeout(resolve, milisegundos));

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const respuestaJSON = await fetch('catalogo.json');
        catalogoCompleto = await respuestaJSON.json();
        
        catalogoCompleto.reverse();
        filtradoActual = [...catalogoCompleto];
        await mostrarSiguientes();
    } catch (error) {
        console.error("Error al leer JSON:", error);
    }

    document.getElementById('link-inicio').addEventListener('click', (e) => cambiarCategoria(e, 'inicio'));
    document.getElementById('link-peliculas').addEventListener('click', (e) => cambiarCategoria(e, 'pelicula'));
    document.getElementById('link-series').addEventListener('click', (e) => cambiarCategoria(e, 'serie'));
    document.getElementById('btn-cargar-mas').addEventListener('click', mostrarSiguientes);
});

function cambiarCategoria(evento, categoria) {
    evento.preventDefault(); 
    
    document.getElementById('grilla-catalogo').innerHTML = '';
    indiceActual = 0;
    const tituloSeccion = document.getElementById('titulo-seccion');

    if (categoria === 'inicio') {
        filtradoActual = [...catalogoCompleto];
        tituloSeccion.innerText = 'Agregadas Recientemente';
    } else if (categoria === 'pelicula') {
        filtradoActual = catalogoCompleto.filter(item => item.tipo === 'pelicula');
        tituloSeccion.innerText = 'Catálogo de Películas';
    } else if (categoria === 'serie') {
        filtradoActual = catalogoCompleto.filter(item => item.tipo === 'serie');
        tituloSeccion.innerText = 'Catálogo de Series';
    }

    mostrarSiguientes();
}

async function mostrarSiguientes() {
    const contenedor = document.getElementById('grilla-catalogo');
    const btnCargarMas = document.getElementById('btn-cargar-mas');
    
    btnCargarMas.style.display = 'none'; 
    btnCargarMas.innerText = 'Cargando...';

    const limite = Math.min(indiceActual + CANTIDAD_POR_PAGINA, filtradoActual.length);

    for (let i = indiceActual; i < limite; i++) {
        const peli = filtradoActual[i];
        
        try {
            await esperar(150);

            const endpoint = peli.tipo === 'serie' ? 'tv' : 'movie';
            const url = `${URL_BASE}/${endpoint}/${peli.tmdb_id}?api_key=${API_KEY}&language=es-ES`;
            
            const respuestaTMDB = await fetch(url);
            if (!respuestaTMDB.ok) continue;

            const datosTMDB = await respuestaTMDB.json();

            const tituloFinal = peli.tipo === 'serie' ? datosTMDB.name : datosTMDB.title;
            const poster = datosTMDB.poster_path ? URL_IMAGEN + datosTMDB.poster_path : 'https://via.placeholder.com/500x750?text=Sin+Portada';

            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta';
            
            // Aquí quitamos la etiqueta <a> que generaba el enlace
            tarjeta.innerHTML = `
                <img src="${poster}" alt="${tituloFinal}">
                <div class="info-tarjeta">
                    <h3>${tituloFinal}</h3>
                    <p style="font-size: 0.8rem; color: #aaa;">⭐ ${datosTMDB.vote_average ? datosTMDB.vote_average.toFixed(1) : 'N/A'} / 10</p>
                </div>
            `;
            contenedor.appendChild(tarjeta);

        } catch (errorPeli) {
            console.error("Fallo un título individual:", errorPeli);
        }
    }

    indiceActual = limite;

    if (indiceActual < filtradoActual.length) {
        btnCargarMas.style.display = 'inline-block';
        btnCargarMas.innerText = `Cargar más (${filtradoActual.length - indiceActual} restantes)`;
    }
}