// Data/Components/ColorController.js

import { productosDestacados } from "../../Data/catalogo.js";
import { initCarruseles } from "./Carrusel.js"; // si lo necesitas en el futuro

export function actualizarColorProducto(index, nuevoColor) {
  const producto = productosDestacados[index];
  if (!producto) return;

  const nuevasImagenes = producto.colores[nuevoColor];
  if (!nuevasImagenes) {
    console.warn(`Color no encontrado: ${nuevoColor}`);
    return;
  }

  const tarjeta = document.querySelector(`.producto-card[data-index="${index}"]`);
  if (!tarjeta) return;

  const track = tarjeta.querySelector(".detail-img-track");
  const indicadores = tarjeta.querySelector(".carousel-indicators");
  if (!track || !indicadores) return;

  // 1. Activar efecto blur/fade-out
  track.classList.add("cambio-color");

  setTimeout(() => {

    const imgs = track.querySelectorAll("img");

    // 2. Ajustar número de imágenes
    if (nuevasImagenes.length > imgs.length) {
      // Agregar imágenes faltantes
      nuevasImagenes.slice(imgs.length).forEach(src => {
        const img = document.createElement("img");
        img.loading = "lazy";
        img.draggable = false;
        img.style.userSelect = "none";
        track.appendChild(img);
      });
    } else if (nuevasImagenes.length < imgs.length) {
      // Eliminar extras
      [...imgs].slice(nuevasImagenes.length).forEach(img => img.remove());
    }

    // 3. Reemplazar src sin destruir DOM
    [...track.querySelectorAll("img")].forEach((img, i) => {
      img.src = nuevasImagenes[i];
    });

    // 4. Actualizar dots
    indicadores.innerHTML = nuevasImagenes
      .map((_, i) => `<span class="carousel-dot" data-img="${i}"></span>`)
      .join("");
    
    indicadores.querySelector(".carousel-dot")?.classList.add("active");

    // 5. Fade-in suave
    setTimeout(() => {
      track.classList.remove("cambio-color");
      track.classList.add("cambio-color-activo");

      // Reset clase después del fade
      setTimeout(() => {
        track.classList.remove("cambio-color-activo");
      }, 350);

    }, 50);

  }, 200);
}

