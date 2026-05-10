document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. PRELOADER
    // ==========================================
    const preloader = document.getElementById("magnus-pro-loader");

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("oculto");

            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 600);

        }, 500);
    }

    // ==========================================
    // 2. MENÚ HAMBURGUESA
    // ==========================================
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileBtn && mobileMenu) {
        const icon = mobileBtn.querySelector("i");

        mobileBtn.addEventListener("click", () => {
            const isHidden = mobileMenu.classList.contains("hidden");

            if (isHidden) {
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("flex");

                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-times");
                }
            } else {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("flex");

                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // ==========================================
    // 3. BOTÓN FLOTANTE WHATSAPP
    // ==========================================
    const waBtn = document.getElementById("btn-whatsapp-flotante");

    if (waBtn) {
        window.addEventListener("scroll", () => {
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
    // 4. AOS ANIMACIONES
    // ==========================================
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1200,
            once: true,
            offset: 120,
            easing: "ease-in-out",
            mirror: false
        });
    }

    // ==========================================
    // 5. CARRUSEL PRINCIPAL
    // ==========================================
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    const dotsContainer = document.getElementById("carousel-dots");

    if (slides.length > 0 && dotsContainer) {
        let currentSlide = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = `w-3 h-3 rounded-full bg-white/50 border-2 border-white transition-all duration-300 hover:bg-white ${index === 0 ? "bg-white" : ""}`;

            dot.addEventListener("click", () => {
                currentSlide = index;
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll("button");

        function updateCarousel() {
            slides.forEach(slide => {
                slide.classList.remove("opacity-100");
                slide.classList.add("opacity-0");
            });

            slides[currentSlide].classList.remove("opacity-0");
            slides[currentSlide].classList.add("opacity-100");

            dots.forEach(dot => dot.classList.remove("bg-white"));
            dots[currentSlide].classList.add("bg-white");
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }, 5000);
    }

    // ==========================================
    // 6. CARRUSEL 3D DE SERVICIOS
    // ==========================================
    const serviceCards = document.querySelectorAll(".service-card");
    const prevServiceBtn = document.getElementById("prev-service");
    const nextServiceBtn = document.getElementById("next-service");

    if (serviceCards.length === 4) {
        let classes = ["prev-card", "active-card", "next-card", "next-card-2"];

        function updateServiceCarousel() {
            serviceCards.forEach((card, index) => {
                card.className = "service-card absolute w-60 md:w-80 h-[20rem] md:h-[26rem] rounded-xl overflow-hidden shadow-2xl cursor-pointer bg-white " + classes[index];
            });
        }

        updateServiceCarousel();

        if (nextServiceBtn) {
            nextServiceBtn.addEventListener("click", () => {
                classes.unshift(classes.pop());
                updateServiceCarousel();
            });
        }

        if (prevServiceBtn) {
            prevServiceBtn.addEventListener("click", () => {
                classes.push(classes.shift());
                updateServiceCarousel();
            });
        }

        serviceCards.forEach((card, index) => {
            card.addEventListener("click", () => {
                if (classes[index] === "prev-card") {
                    classes.push(classes.shift());
                } else if (classes[index] === "next-card") {
                    classes.unshift(classes.pop());
                } else if (classes[index] === "next-card-2") {
                    classes.unshift(classes.pop());
                    classes.unshift(classes.pop());
                }

                updateServiceCarousel();
            });
        });

        let autoPlayInterval = setInterval(() => {
            if (nextServiceBtn) nextServiceBtn.click();
        }, 5000);

        const carouselContainer = document.querySelector(".perspective-container");

        if (carouselContainer) {
            carouselContainer.addEventListener("mouseenter", () => {
                clearInterval(autoPlayInterval);
            });

            carouselContainer.addEventListener("mouseleave", () => {
                autoPlayInterval = setInterval(() => {
                    if (nextServiceBtn) nextServiceBtn.click();
                }, 5000);
            });
        }
    }

    // ==========================================
    // 7. FORMULARIO CONTACTO CON EMAILJS
    // Solo se ejecuta si existe contact-form
    // ==========================================
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        if (typeof emailjs === "undefined") {
            console.warn("EmailJS no está cargado en esta página.");
            return;
        }

        emailjs.init("7JVDsYSIATxda5VIx");

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const btn = document.getElementById("submit-btn");
            const status = document.getElementById("form-status");

            if (!btn || !status) {
                console.warn("Faltan elementos del formulario.");
                return;
            }

            btn.innerText = "Enviando...";
            btn.disabled = true;

            const serviceID = "service_ivp7uv7";
            const templateID = "template_1isfdgc";

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.innerText = "Enviar Mensaje";
                    btn.disabled = false;

                    status.classList.remove("hidden", "text-red-500");
                    status.classList.add("text-green-600");
                    status.innerText = "¡Mensaje enviado con éxito! Nos contactaremos pronto.";

                    this.reset();
                }, (err) => {
                    btn.innerText = "Enviar Mensaje";
                    btn.disabled = false;

                    status.classList.remove("hidden", "text-green-600");
                    status.classList.add("text-red-500");
                    status.innerText = "Error al enviar: " + JSON.stringify(err);
                });
        });
    }
});