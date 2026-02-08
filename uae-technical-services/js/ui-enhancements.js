// UI Enhancements - Interactive Elements & Animations

// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Stagger children if they have data-stagger
            if (entry.target.hasAttribute('data-stagger')) {
                const children = entry.target.children;
                const delay = parseInt(entry.target.getAttribute('data-stagger-delay')) || 100;

                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * delay);
                });
            }
        }
    });
}, observerOptions);

// Apply reveal animation to sections
document.addEventListener('DOMContentLoaded', () => {
    // Reveal sections on scroll
    const revealElements = document.querySelectorAll('.section, .hero-section, .service-card-enhanced, .value-pillar-card, .property-card, .industry-card-enhanced, .stat-card-enhanced, .process-card');

    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealOnScroll.observe(element);

        // Check if element is already in viewport on load
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('revealed');
        }
    });

    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Animated counter for stats
    animateCounters();

    // Interactive card tilt effect
    initCardTilt();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Add ripple effect to buttons
    initRippleEffect();

    // Magnetic hover effect for CTAs
    initMagneticButtons();

    // Cursor trail effect
    initCursorTrail();
});

// Parallax scrolling effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Animate numbers counting up
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                animateValue(entry.target, 0, target, 2000, suffix);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 3D card tilt effect on mouse move
function initCardTilt() {
    const cards = document.querySelectorAll('.service-card-enhanced, .value-pillar-card, .property-card, .industry-card-enhanced');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Ripple effect on button clicks
function initRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .btn, button, a[class*="button"]');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Magnetic button effect - buttons follow cursor
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.cta-button, .btn-primary');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background: rgba(244, 180, 0, ${0.5 - i * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];

            dot.style.left = x - dot.offsetWidth / 2 + 'px';
            dot.style.top = y - dot.offsetHeight / 2 + 'px';

            x += (parseInt(nextDot.style.left) - x) * 0.3;
            y += (parseInt(nextDot.style.top) - y) * 0.3;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// Floating animation for decorative elements
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('[data-float]');

    floatingElements.forEach((element, index) => {
        const duration = 3 + Math.random() * 2;
        const delay = index * 0.2;

        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Progress bar animation on scroll
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '100%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Initialize all enhancements
initFloatingElements();
initProgressBars();
