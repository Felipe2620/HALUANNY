import { categorias, productosDestacados } from "../Data/catalogo.js";
import { generarCategorias } from "../Data/Components/Categoria.js";


// === SOLO UN DOMContentLoaded ===
window.addEventListener("DOMContentLoaded", () => {


  // Inserta el navbar EN EL MOMENTO CORRECTO
  import("../Data/Components/Navbar.js").then(({ crearNavbar }) => {
  crearNavbar("#app-navbar"); // <- aquí colocas el ID donde quieres que aparezca
  });

  // ASIGNAR ÍNDICE GLOBAL
  productosDestacados.forEach((p, i) => {
    p.globalIndex = i;
  });

  // RENDER BANNER
  const bannerVideo = document.getElementById("bannerVideo");
  const bannerSource = document.getElementById("bannerSource");

  if (bannerVideo && bannerSource) {
    const basePath = "Assets/IMG/Banner";

    function seleccionarVideo() {
      const ancho = window.innerWidth;
      let srcVideo = "";

      if (ancho >= 1024) srcVideo = `${basePath}/BANNER1.mp4`;
      else if (ancho >= 768) srcVideo = `${basePath}/BANNER1.mp4`;
      else srcVideo = `${basePath}/BANNER2.mp4`;

      if (bannerSource.getAttribute("src") !== srcVideo) {
        bannerSource.setAttribute("src", srcVideo);
        bannerVideo.load();
        bannerVideo.play().catch(() => {});
      }
    }

    seleccionarVideo();
    window.addEventListener("resize", seleccionarVideo);
  }

  // RENDER CATEGORÍAS
  document.querySelector("#categoria-list").innerHTML =
    generarCategorias(categorias);

  // COMPONENTES SECUNDARIOS
  import("../Data/Components/Cardproducto.js").then(({ generarProductoHTML }) => {
    import("../Data/Render/Secciones.js").then(({ renderSecciones }) => {
      const productosPorCategoria = productosDestacados.reduce((acc, prod) => {
        (acc[prod.categoria] ||= []).push(prod);
        return acc;
      }, {});

      renderSecciones(
        categorias,
        productosPorCategoria,
        document.querySelector("#contenedor-secciones")
      );
    });
  });

  import("../Data/Components/Carrusel.js").then(({ initCarruseles }) => {
    initCarruseles();
  });

  // Scroll a secciones
  document.addEventListener("click", (e) => {
    const item = e.target.closest(".category-item");
    if (!item) return;
    const target = item.dataset.target;
    const section = document.querySelector(target);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  });

  // Selección de tallas
  document.addEventListener("click", (e) => {
    if (!e.target.matches(".talla-btn")) return;
    const contenedor = e.target.closest(".tallas-container");
    contenedor.querySelectorAll(".talla-btn").forEach(btn =>
      btn.classList.remove("selected")
    );
    e.target.classList.add("selected");
  });

  // WhatsApp
  import("../Data/Services/WhatsAppService.js").then(({ enviarWhatsApp }) => {
    document.addEventListener("click", (e) => {
      if (!e.target.matches(".cta")) return;
      const tarjeta = e.target.closest(".producto-card");
      const indexGlobal = tarjeta.dataset.index;
      const producto = productosDestacados[indexGlobal];
      const talla =
        tarjeta.querySelector(".talla-btn.selected")?.dataset.talla ||
        "No seleccionada";
      const color =
        tarjeta.querySelector(".color-btn.selected")?.dataset.color ||
        "No seleccionado";

      enviarWhatsApp(producto, talla, color);
    });
  });

  // FOOTER
  import("../Data/Components/Footer.js").then(({ Footer }) => {
    document.querySelector("#app-footer").innerHTML = Footer();
  });
});
