let catalogoCompleto = [];
let filtradoActual = [];
let indiceActual = 0;
const CANTIDAD_POR_PAGINA = 20;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Lee tu archivo JSON local
        const respuestaJSON = await fetch('catalogo.json');
        catalogoCompleto = await respuestaJSON.json();
        
        // Muestra primero lo último que agregaste a la lista
        catalogoCompleto.reverse();
        filtradoActual = [...catalogoCompleto];
        mostrarSiguientes();
    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
    }

    // Configurar botones del menú principal
    document.getElementById('link-inicio').addEventListener('click', (e) => cambiarCategoria(e, 'inicio'));
    document.getElementById('link-peliculas').addEventListener('click', (e) => cambiarCategoria(e, 'pelicula'));
    document.getElementById('link-series').addEventListener('click', (e) => cambiarCategoria(e, 'serie'));
    
    // Configurar botones de género
    const botonesGenero = document.querySelectorAll('.btn-genero');
    botonesGenero.forEach(boton => {
        boton.addEventListener('click', (e) => filtrarPorGenero(e, boton.dataset.genero));
    });

    document.getElementById('btn-cargar-mas').addEventListener('click', mostrarSiguientes);
});

function cambiarCategoria(evento, categoria) {
    evento.preventDefault(); 
    document.getElementById('grilla-catalogo').innerHTML = '';
    indiceActual = 0;
    const tituloSeccion = document.getElementById('titulo-seccion');
    const submenu = document.getElementById('submenu-generos');

    // Reiniciar los botones de género
    document.querySelectorAll('.btn-genero').forEach(b => b.classList.remove('activo'));
    document.querySelector('.btn-genero[data-genero="Todos"]').classList.add('activo');

    if (categoria === 'inicio') {
        filtradoActual = [...catalogoCompleto];
        tituloSeccion.innerText = 'Agregadas Recientemente';
        submenu.style.display = 'none';
    } else if (categoria === 'pelicula') {
        filtradoActual = catalogoCompleto.filter(item => item.tipo === 'pelicula');
        tituloSeccion.innerText = 'Catálogo de Películas';
        submenu.style.display = 'flex';
    } else if (categoria === 'serie') {
        filtradoActual = catalogoCompleto.filter(item => item.tipo === 'serie');
        tituloSeccion.innerText = 'Catálogo de Series';
        submenu.style.display = 'none';
    }

    mostrarSiguientes();
}

function filtrarPorGenero(evento, generoBuscado) {
    // Marcar el botón activo
    document.querySelectorAll('.btn-genero').forEach(b => b.classList.remove('activo'));
    evento.target.classList.add('activo');

    document.getElementById('grilla-catalogo').innerHTML = '';
    indiceActual = 0;

    let peliculas = catalogoCompleto.filter(item => item.tipo === 'pelicula');

    if (generoBuscado === 'Todos') {
        filtradoActual = peliculas;
    } else {
        filtradoActual = peliculas.filter(item => item.genero && item.genero.includes(generoBuscado));
    }

    mostrarSiguientes();
}

function mostrarSiguientes() {
    const contenedor = document.getElementById('grilla-catalogo');
    const btnCargarMas = document.getElementById('btn-cargar-mas');
    
    btnCargarMas.style.display = 'none'; 

    const limite = Math.min(indiceActual + CANTIDAD_POR_PAGINA, filtradoActual.length);

    for (let i = indiceActual; i < limite; i++) {
        const peli = filtradoActual[i];

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        
        // Aquí carga directamente tu imagen .webp desde la carpeta
        tarjeta.innerHTML = `
            <img src="${peli.imagen}" alt="${peli.titulo}" onerror="this.src='https://via.placeholder.com/500x750?text=Sin+Portada'">
            <div class="info-tarjeta">
                <h3>${peli.titulo}</h3>
                <p style="font-size: 0.85rem; color: #aaa; margin-top: 5px;">${peli.genero}</p>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    }

    indiceActual = limite;

    if (indiceActual < filtradoActual.length) {
        btnCargarMas.style.display = 'inline-block';
        btnCargarMas.innerText = `Cargar más (${filtradoActual.length - indiceActual} restantes)`;
    }
}