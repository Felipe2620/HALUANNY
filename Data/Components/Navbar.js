export function crearNavbar(selectorDestino = "#app-navbar") {
  // Evitar duplicados
  if (document.querySelector(".hero-navbar")) return;

  const destino = document.querySelector(selectorDestino);
  if (!destino) {
    console.warn("No se encontró el contenedor para insertar el navbar:", selectorDestino);
    return;
  }

  const navbar = document.createElement("nav");
  navbar.classList.add("hero-navbar");
  navbar.id = "heroNavbar";

  navbar.innerHTML = `
    <a href="#metodos-pago">Métodos de Pago</a>
    <a href="#politicas-cambios">Políticas y Condiciones</a>
    <a href="#contacto">Contactos</a>
  `;

  // Insertar manualmente en el contenedor elegido
  destino.appendChild(navbar);

  document.querySelectorAll('.hero-navbar a').forEach(a => {
  const hash = a.getAttribute('href');
  if (hash.startsWith('#')) {
    a.href = window.location.pathname + hash;
  }
  });

}
