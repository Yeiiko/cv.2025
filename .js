document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------
  // Efecto Typewriter para el título del header
  // ---------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  const typewriterText = "Yeison Alirio Castañeda Ovalle";
  let typeIndex = 0;
  
  const typeWriter = () => {
    if (typeIndex < typewriterText.length) {
      typewriterElement.textContent += typewriterText.charAt(typeIndex);
      typeIndex++;
      setTimeout(typeWriter, 150); // Velocidad de escritura (ms)
    }
  };
  typeWriter();

  // ---------------------------------------
  // Smooth Scroll para enlaces de navegación
  // ---------------------------------------
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ----------------------------------------------------
  // Intersection Observer para resaltar enlaces y animar secciones
  // ----------------------------------------------------
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // 50% de visibilidad
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Agrega efecto fade-in
        entry.target.classList.add('visible');
        // Resalta el enlace activo
        navLinks.forEach(link => link.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // ----------------------------------------------------
  // Botón "Volver Arriba"
  // ----------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Función para mostrar u ocultar el botón y cambiar el color del header
  const handleScrollEffects = () => {
    // Mostrar/ocultar botón "Volver Arriba"
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    // Cambio dinámico de color del header
    const header = document.querySelector('header');
    header.style.background = window.scrollY > 100 ? '#444' : '#222';
  };

  // ---------------------------------------
  // Throttle para optimizar eventos de scroll
  // ---------------------------------------
  const throttle = (func, delay) => {
    let lastCall = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return func(...args);
    };
  };

  window.addEventListener('scroll', throttle(handleScrollEffects, 100));

  // ----------------------------------------------------
  // Toggle de Tema (Claro/Oscuro)
  // ----------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});

const express = require('express');
const app = express();

// Suponiendo que tus archivos están en la carpeta "public"
app.use(express.static('public'));

// Opcional: para servir index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

