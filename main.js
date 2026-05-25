document.addEventListener('DOMContentLoaded', () => {
    // Revelar elementos al scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // LÓGICA DEL CARRUSEL (Versión 100% infalible)
    const track = document.getElementById('carousel-track');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const dots = document.querySelectorAll('.dot');
    
    if (track) {
        let currentIndex = 0;
        const slides = Array.from(track.children);
        const totalSlides = slides.length;

        function goToSlide(index) {
            currentIndex = index;
            // Forzamos el scroll al slide exacto usando el scrollWidth del padre
            const scrollAmount = track.clientWidth * currentIndex;
            track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            
            // Actualizar dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === currentIndex);
                dot.classList.toggle('bg-white/40', i !== currentIndex);
                dot.classList.toggle('scale-125', i === currentIndex);
            });
        }

        btnNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            goToSlide(currentIndex);
        });

        btnPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goToSlide(i));
        });
    }

    // Formulario
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = "PROCESANDO...";
            setTimeout(() => {
                alert('¡Inscripción enviada!');
                form.reset();
                btn.textContent = "ENVIAR MATRÍCULA";
            }, 2000);
        });
    }
});