document.addEventListener('DOMContentLoaded', () => {

    // 1. ========= INICIALIZACIÓN DE LENIS (SCROLL SUAVE) =========
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // 2. ========= INTEGRACIÓN DE LENIS Y GSAP SCROLLTRIGGER =========
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 3. ========= LÓGICA DEL CURSOR PERSONALIZADO =========
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .hamburger');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', e => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // 4. ========= MENÚ HAMBURGUESA (RESPONSIVE) =========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Reset menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Header con efecto blur al hacer scroll
    const header = document.querySelector('.header');
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: header
        }
    });

    // 5. ========= CAMBIO DE TEMA (DARK/LIGHT MODE) =========
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

        // Animación de transición con GSAP
        gsap.timeline()
            .to('body', { opacity: 0, duration: 0.2, onComplete: () => {
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            }})
            .to('body', { opacity: 1, duration: 0.2, delay: 0.1 });
    });

    // 6. ========= ANIMACIONES CON GSAP Y SCROLLTRIGGER (RESPONSIVE) =========
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add({
        isDesktop: `(min-width: 769px)`,
        isMobile: `(max-width: 768px)`,
        isReduced: `(prefers-reduced-motion: reduce)`
    }, (context) => {
        let { isDesktop, isMobile, isReduced } = context.conditions;

        if (isReduced) {
            console.log("Animaciones reducidas activadas.");
            gsap.set("[data-anim], .hero-title .char", { opacity: 1, y: 0 });
            return;
        }

        // --- Animación de Carga (Hero Section) ---
        const heroTitle = new SplitType('[data-anim="hero-title"]', { types: 'words, chars' });
        const heroTl = gsap.timeline({ delay: 0.5 });
        heroTl.from(heroTitle.chars, {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: 'power4.out'
        })
        .from('[data-anim="hero-subtitle"]', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, "-=0.6")
        .from('[data-anim="hero-buttons"]', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, "-=0.6");

        // --- Animaciones de Scroll ---
        const sections = gsap.utils.toArray('section');
        sections.forEach(section => {
            const sectionTitle = section.querySelector('[data-anim="section-title"]');
            const projectCards = section.querySelectorAll('[data-anim="project-card"]');
            const contactForm = section.querySelector('[data-anim="contact-form"]');
            const sectionTl = gsap.timeline({
                scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
            });
            if (sectionTitle) sectionTl.from(sectionTitle, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
            if (projectCards.length > 0) {
                sectionTl.from(projectCards, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2 }, "-=0.5");

                // Animar las etiquetas de cada tarjeta con un efecto de 'stagger' anidado
                const tags = gsap.utils.toArray(projectCards).map(card => card.querySelectorAll('.project-tags span'));
                sectionTl.from(tags, { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 }, "-=0.8");
            }
            if (contactForm) sectionTl.from(contactForm, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.5");
        });

        gsap.from('[data-anim="social-icon"]', {
            scrollTrigger: { trigger: '.footer', start: 'top 95%' },
            y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out'
        });

        // --- Animación específica para ESCRITORIO (Parallax) ---
        if (isDesktop) {
            gsap.utils.toArray('.project-image img').forEach(img => {
                gsap.to(img, {
                    yPercent: -15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img.closest('.project-card'),
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.5
                    }
                });
            });
        }

        return () => { // Función de limpieza
            SplitType.revert(heroTitle);
            gsap.utils.toArray(gsap.globalTimeline.getChildren()).forEach(tween => tween.kill());
        };
    });

    // 7. ========= FORMULARIO DE CONTACTO (SIMULACIÓN) =========
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const feedbackEl = submitBtn.querySelector('.submit-feedback');

            // Simulación de envío
            submitBtn.disabled = true;
            submitBtn.style.width = `${submitBtn.offsetWidth}px`; // Mantener ancho
            submitBtn.innerHTML = '<div class="loader"></div>';

            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                `;

                // Añadir clases para la animación de CSS
                const circle = submitBtn.querySelector('.checkmark__circle');
                const check = submitBtn.querySelector('.checkmark__check');
                circle.classList.add('animated');
                check.classList.add('animated');

                // Resetear formulario y botón después de la animación
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.style.width = 'auto';
                    submitBtn.innerHTML = 'Enviar Mensaje <span class="submit-feedback"></span>';
                }, 3000);

            }, 2000);
        });
    }

    // --- Estilos para la simulación del formulario (se inyectan aquí para no saturar el CSS principal) ---
    const formStyles = `
        .loader {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-left-color: #fff;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .checkmark { width: 40px; height: 40px; border-radius: 50%; display: block; stroke-width: 3; stroke: #fff; stroke-miterlimit: 10; margin: 0 auto; }
        .checkmark__circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-linecap: round; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        .checkmark__check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards; }
        .checkmark__circle.animated { animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        .checkmark__check.animated { animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards; }
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = formStyles;
    document.head.appendChild(styleSheet);

});