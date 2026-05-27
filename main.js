document.addEventListener('DOMContentLoaded', () => {
    // 1. Revelar elementos al hacer scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // 2. LÓGICA DEL CARRUSEL (Infalible)
    const track = document.getElementById('carousel-track');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const dots = document.querySelectorAll('.dot');
    
    if (track) {
        let currentIndex = 0;
        const totalSlides = track.children.length;

        function goToSlide(index) {
            currentIndex = index;
            // Usamos offsetWidth para mayor precisión
            const scrollAmount = track.offsetWidth * currentIndex;
            track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            
            // Actualizar puntos de navegación
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === currentIndex);
                dot.classList.toggle('bg-white/40', i !== currentIndex);
                dot.classList.toggle('scale-125', i === currentIndex);
            });
        }

        if (btnNext) btnNext.addEventListener('click', () => goToSlide((currentIndex + 1) % totalSlides));
        if (btnPrev) btnPrev.addEventListener('click', () => goToSlide((currentIndex - 1 + totalSlides) % totalSlides));
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goToSlide(i));
        });
    }
// 3. FORMULARIOS (Envío AJAX - Sin redirección)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Detenemos la redirección automática
            const btn = this.querySelector('button[type="submit"]');
            const originalBtnText = btn.textContent;
            
            btn.textContent = "ENVIANDO...";
            btn.disabled = true;

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Mensaje de éxito "God Tier"
                    this.innerHTML = `
                        <div class="text-center py-10">
                            <div class="text-5xl mb-4">✅</div>
                            <h3 class="text-2xl font-black text-slate-900 mb-2">¡Enviado con éxito!</h3>
                            <p class="text-slate-600">Muchas gracias por contactarnos.<br>Nos pondremos en contacto contigo pronto.</p>
                        </div>
                    `;
                } else {
                    throw new Error("Error en el envío");
                }
            } catch (error) {
                alert("Hubo un problema. Por favor intenta de nuevo.");
                btn.textContent = originalBtnText;
                btn.disabled = false;
            }
        });
    });
});
    

// 4. LÓGICA DE PESTAÑAS (Tabs)
function switchTab(tab) {
    const formMatricula = document.getElementById('form-matricula');
    const formContacto = document.getElementById('form-contacto');
    const tabMatricula = document.getElementById('tab-matricula');
    const tabContacto = document.getElementById('tab-contacto');

    if (tab === 'matricula') {
        // Estilos botones
        tabMatricula.className = "flex-1 py-4 text-sm font-bold rounded-xl transition-all duration-300 bg-blue-600 text-white shadow-lg shadow-blue-900/20";
        tabContacto.className = "flex-1 py-4 text-sm font-bold rounded-xl transition-all duration-300 text-slate-400 hover:text-white";
        
        // Mostrar Matricula
        formContacto.classList.add('hidden');
        formMatricula.classList.remove('hidden');
        setTimeout(() => {
            formMatricula.style.opacity = "1";
            formMatricula.style.transform = "scale(1)";
        }, 10);
    } else {
        // Estilos botones
        tabContacto.className = "flex-1 py-4 text-sm font-bold rounded-xl transition-all duration-300 bg-blue-600 text-white shadow-lg shadow-blue-900/20";
        tabMatricula.className = "flex-1 py-4 text-sm font-bold rounded-xl transition-all duration-300 text-slate-400 hover:text-white";
        
        // Mostrar Contacto
        formMatricula.classList.add('hidden');
        formContacto.classList.remove('hidden');
        setTimeout(() => {
            formContacto.style.opacity = "1";
            formContacto.style.transform = "scale(1)";
        }, 10);
    }
}