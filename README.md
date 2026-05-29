# 🍿 Catálogo Web Cineteca

Una plataforma web estática de alto rendimiento diseñada para la visualización y filtrado de un catálogo de películas y series. Construida sin dependencias de backend, optimizada para cargar de forma instantánea mediante renderizado de datos en formato JSON e imágenes de última generación (WebP).

## 🚀 Características Principales

* **Arquitectura Serverless:** No requiere base de datos activa. Todo el contenido se gestiona a través de un archivo `catalogo.json` local, lo que garantiza una velocidad de carga de 0 milisegundos y cero caídas de servidor.
* **Filtros Dinámicos:** Sistema de categorización en tiempo real con Vanilla JavaScript, permitiendo al usuario filtrar por "Películas", "Series" y múltiples géneros sin recargar la página.
* **Carga Diferida (Pagination):** Motor de renderizado que procesa los títulos en bloques de 20 para evitar la saturación de memoria RAM en dispositivos móviles.
* **Optimización Visual:** Implementación exclusiva del formato `.webp` para las carátulas, reduciendo el peso de la web en un 80% respecto a formatos tradicionales.
* **Sistema de Contacto Integrado:** Función híbrida de interacción en el pie de página que interactúa con la API del portapapeles (`navigator.clipboard`) y el gestor de correo predeterminado del sistema operativo del cliente.

## 🛠️ Tecnologías Utilizadas

* **Estructura:** HTML5 semántico.
* **Estilos:** CSS3 nativo (Flexbox, CSS Grid).
* **Lógica:** Vanilla JavaScript (ES6+).
* **Datos:** JSON (JavaScript Object Notation).
* **Multimedia:** WebP.

## ⚙️ Uso y Mantenimiento

Para agregar nuevos títulos al catálogo, simplemente es necesario añadir un nuevo objeto al archivo `catalogo.json` siguiendo esta estructura, y colocar la imagen correspondiente en el directorio `/caratulas`:

\`\`\`json
{
  "tipo": "pelicula",
  "titulo": "Nombre del Título",
  "genero": "Categoría",
  "imagen": "caratulas/nombre_del_archivo.webp"
}
\`\`\`

---
*Desarrollado por Augusto Loseco.*
