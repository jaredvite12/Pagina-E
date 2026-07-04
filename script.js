// Elementos del DOM
const btnMenu = document.getElementById('btn-abrir-menu');
const menuLateral = document.getElementById('menu');
const fondoMenu = document.getElementById('fondo-menu');
const cabecerasAcordeon = document.querySelectorAll('.acordeon-cabecera');

// Función para abrir/cerrar el menú lateral
function alternarMenu() {
  menuLateral.classList.toggle('abierto');
  if (menuLateral.classList.contains('abierto')) {
    fondoMenu.style.display = 'block';
    btnMenu.innerText = 'x';
  } else {
    fondoMenu.style.display = 'none';
    btnMenu.innerText = '=';
  }
}

// Eventos para el menú hamburguesa
btnMenu.addEventListener('click', alternarMenu);
fondoMenu.addEventListener('click', alternarMenu);

// Lógica de los Acordeones (Habitaciones y Salones)
cabecerasAcordeon.forEach(cabecera => {
  cabecera.addEventListener('click', function() {
    const acordeonPadre = this.parentElement;
    acordeonPadre.classList.toggle('abierto');
  });
});

// Lógica para arrastrar el carrusel con el Mouse en PC
const carruseles = document.querySelectorAll('.carrusel-swipe');
carruseles.forEach(carrusel => {
  let isDown = false;
  let startX;
  let scrollLeft;

  carrusel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carrusel.offsetLeft;
    scrollLeft = carrusel.scrollLeft;
    carrusel.style.scrollBehavior = 'auto';
    carrusel.style.scrollSnapType = 'none';
  });

  const soltarMouse = () => {
    if (!isDown) return;
    isDown = false;
    const anchoImagen = carrusel.clientWidth;
    const scrollActual = carrusel.scrollLeft;
    const imagenCercana = Math.round(scrollActual / anchoImagen);
    
    carrusel.style.scrollBehavior = 'smooth';
    carrusel.scrollLeft = imagenCercana * anchoImagen;
    
    setTimeout(() => {
      carrusel.style.scrollSnapType = 'x mandatory';
      carrusel.style.scrollBehavior = '';
    }, 300);
  };

  carrusel.addEventListener('mouseleave', soltarMouse);
  carrusel.addEventListener('mouseup', soltarMouse);

  carrusel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carrusel.offsetLeft;
    const walk = (x - startX); 
    carrusel.scrollLeft = scrollLeft - walk;
  });
});

// Lógica para los botones del Carrusel de Servicios (Inicio)
const carruselServicios = document.getElementById('carrusel-servicios');
const btnIzqServicios = document.getElementById('btn-izq-servicios');
const btnDerServicios = document.getElementById('btn-der-servicios');

if (btnIzqServicios && btnDerServicios && carruselServicios) {
  btnIzqServicios.addEventListener('click', () => {
    carruselServicios.scrollBy({ left: -150, behavior: 'smooth' });
  });
  btnDerServicios.addEventListener('click', () => {
    carruselServicios.scrollBy({ left: 150, behavior: 'smooth' });
  });
}

// Lógica para el Carrusel Automático (Inicio)
const carruselAuto = document.getElementById('carrusel-auto');
if (carruselAuto) {
  setInterval(() => {
    const anchoImagen = carruselAuto.clientWidth;
    const scrollActual = carruselAuto.scrollLeft;
    const maxScroll = carruselAuto.scrollWidth - anchoImagen;
    
    if (scrollActual >= maxScroll - 10) {
      carruselAuto.scrollLeft = 0;
    } else {
      carruselAuto.scrollLeft += anchoImagen;
    }
  }, 3500);
}