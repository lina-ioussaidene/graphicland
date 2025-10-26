// Initialize feather icons
        feather.replace();
        
        // Initialize Vanta.js background
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xff1a1a,
            backgroundColor: 0x0,
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00
        });
        
        // Scroll animation
        const scrollElements = document.querySelectorAll('.scroll-animate');
        
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };
        
        const displayScrollElement = (element) => {
            element.classList.add('animate-in');
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                }
            });
        };
        
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        
        // Initialize all elements as visible if they're already in view
        document.addEventListener('DOMContentLoaded', () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                }
            });
         // Carousel JS (variable-size slides, centered)
        (function(){
            const track = document.getElementById('tcTrack');
            const viewport = document.getElementById('tcViewport');
            const prev = document.getElementById('tcPrev');
            const next = document.getElementById('tcNext');
            const dotsContainer = document.getElementById('tcDots');
            if (!track || !viewport || !prev || !next || !dotsContainer) return;
            let slides = Array.from(track.children);
            let index = 0;
            let total = slides.length;

            function buildDots() {
                dotsContainer.innerHTML = '';
                for (let i=0;i<total;i++){
                    const d = document.createElement('button');
                    d.className = 'tc-dot';
                    d.setAttribute('aria-label', `Aller au slide ${i+1}`);
                    d.addEventListener('click', ()=> { index = i; update(); });
                    dotsContainer.appendChild(d);
                }
            }

            function update() {
                slides = Array.from(track.children);
                total = slides.length;
                if (!slides[index]) index = 0;

                const viewportWidth = viewport.clientWidth;
                const slide = slides[index];
                const slideLeft = slide.offsetLeft;
                const slideCenter = slideLeft + slide.offsetWidth / 2;
                let translate = slideCenter - viewportWidth / 2;
                const maxTranslate = Math.max(0, track.scrollWidth - viewportWidth);
                if (translate < 0) translate = 0;
                if (translate > maxTranslate) translate = maxTranslate;

                track.style.transform = `translateX(-${translate}px)`;

                Array.from(dotsContainer.children).forEach((d, i) => d.classList.toggle('active', i === index));
            }

            buildDots();
            if (dotsContainer.children[0]) dotsContainer.children[0].classList.add('active');

            prev.addEventListener('click', ()=> { index = (index -1 + total) % total; update(); });
            next.addEventListener('click', ()=> { index = (index +1) % total; update(); });

            document.addEventListener('keydown', (e)=> {
                if (e.key === 'ArrowLeft') prev.click();
                if (e.key === 'ArrowRight') next.click();
            });

            let startX = null, deltaX = 0;
            viewport.addEventListener('pointerdown', (e)=> { startX = e.clientX; viewport.setPointerCapture(e.pointerId); });
            viewport.addEventListener('pointermove', (e)=> { if (startX === null) return; deltaX = e.clientX - startX; });
            viewport.addEventListener('pointerup', ()=> {
                if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0) prev.click(); else next.click();
                }
                startX = null; deltaX = 0;
            });

            window.addEventListener('load', ()=> { slides = Array.from(track.children); total = slides.length; update(); });
            window.addEventListener('resize', ()=> { update(); });

            slides.forEach(slideWrap => {
                const img = slideWrap.querySelector('img');
                if (img && !img.complete) {
                    img.addEventListener('load', () => { update(); });
                }
            });
        })();

            // make sure images load before layout (optional)
            window.addEventListener('load', update);
        })();