document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MENÚ HAMBURGUESA (Móvil)
    // ==========================================
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (mobileBtn && mobileMenu) {
        const icon = mobileBtn.querySelector("i");
        mobileBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("flex");

            // Cambia el icono entre barras (☰) y X
            if (mobileMenu.classList.contains("flex")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    }

    // ==========================================
    // 2. BOTÓN FLOTANTE WHATSAPP
    // ==========================================
    const waBtn = document.getElementById("btn-whatsapp-flotante");
    
    if (waBtn) {
        window.addEventListener("scroll", () => {
            // El botón aparece tras bajar 150px de scroll
            if (window.scrollY > 150) {
                waBtn.classList.remove("opacity-0", "pointer-events-none", "translate-y-8");
                waBtn.classList.add("opacity-100", "pointer-events-auto", "translate-y-0");
            } else {
                waBtn.classList.add("opacity-0", "pointer-events-none", "translate-y-8");
                waBtn.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
            }
        });
    }

    // ==========================================
    // 3. CARRUSEL PRINCIPAL (Banner Superior)
    // ==========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (slides.length > 0) {
        let currentSlide = 0;

        // Crear puntos de navegación dinámicos
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full bg-white/50 border-2 border-white transition-all duration-300 hover:bg-white ${index === 0 ? 'bg-white' : ''}`;
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        function updateCarousel() {
            slides.forEach(slide => {
                slide.classList.remove('opacity-100');
                slide.classList.add('opacity-0');
            });
            slides[currentSlide].classList.remove('opacity-0');
            slides[currentSlide].classList.add('opacity-100');

            dots.forEach(dot => dot.classList.remove('bg-white'));
            dots[currentSlide].classList.add('bg-white');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }

        // Auto-play Banner Principal
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }, 5000);
    }

    // ==========================================================
    // 4. CARRUSEL 3D DE SERVICIOS (MODIFICADO A 4 TARJETAS)
    // ==========================================================
    const serviceCards = document.querySelectorAll('.service-card');
    const prevServiceBtn = document.getElementById('prev-service');
    const nextServiceBtn = document.getElementById('next-service');
    
    // Ahora validamos que existan 4 tarjetas
    if (serviceCards.length === 4) {
        // Posiciones para 4 tarjetas: una al centro, dos a los lados y una oculta atrás
        let classes = ['prev-card', 'active-card', 'next-card', 'next-card-2'];

        function updateServiceCarousel() {
            serviceCards.forEach((card, index) => {
                // Limpia clases viejas y asigna la nueva posición del array 'classes'
                card.className = 'service-card absolute w-60 md:w-80 h-[20rem] md:h-[26rem] rounded-xl overflow-hidden shadow-2xl cursor-pointer bg-white ' + classes[index];
            });
        }

        // Iniciar posiciones al cargar
        updateServiceCarousel();

        // Botón Siguiente Servicios
        if (nextServiceBtn) {
            nextServiceBtn.addEventListener('click', () => {
                classes.unshift(classes.pop()); // Mueve el array hacia la derecha
                updateServiceCarousel();
            });
        }

        // Botón Anterior Servicios
        if (prevServiceBtn) {
            prevServiceBtn.addEventListener('click', () => {
                classes.push(classes.shift()); // Mueve el array hacia la izquierda
                updateServiceCarousel();
            });
        }
        
        // Clic en tarjeta lateral para centrarla automáticamente
        serviceCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (classes[index] === 'prev-card') {
                    classes.push(classes.shift());
                } else if (classes[index] === 'next-card') {
                    classes.unshift(classes.pop());
                } else if (classes[index] === 'next-card-2') {
                    // Si toca la que está atrás, hace doble movimiento
                    classes.unshift(classes.pop());
                    classes.unshift(classes.pop());
                }
                updateServiceCarousel();
            });
        });

        // --- AUTO-PLAY PARA SERVICIOS (Cada 5 seg) ---
        let autoPlayInterval = setInterval(() => {
            if (nextServiceBtn) nextServiceBtn.click();
        }, 5000);

        // Pausar auto-play si el usuario pone el mouse encima
        const carouselContainer = document.querySelector('.perspective-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
            carouselContainer.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(() => {
                    if (nextServiceBtn) nextServiceBtn.click();
                }, 5000);
            });
        }
    }
});

// Cargar la librería de EmailJS






(function() {
    // Reemplaza "TU_PUBLIC_KEY" con la que te da EmailJS
    emailjs.init("7JVDsYSIATxda5VIx");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    
    btn.innerText = 'Enviando...';
    btn.disabled = true;

    // Estos IDs los sacas de tu panel de EmailJS
    const serviceID = 'service_ivp7uv7';
    const templateID = 'template_1isfdgc';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerText = 'Enviar Mensaje';
            btn.disabled = false;
            status.classList.remove('hidden', 'text-red-500');
            status.classList.add('text-green-600');
            status.innerText = '¡Mensaje enviado con éxito! Nos contactaremos pronto.';
            this.reset(); // Limpia el formulario
        }, (err) => {
            btn.innerText = 'Enviar Mensaje';
            btn.disabled = false;
            status.classList.remove('hidden', 'text-green-600');
            status.classList.add('text-red-500');
            status.innerText = 'Error al enviar: ' + JSON.stringify(err);
        });
});


 AOS.init({
    duration: 1000, // duración animación
    once: true // solo una vez
  });