// Solar Services Page - Interactive Enhancements

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    createScrollProgress();

    // 2. Scroll Reveal Animations
    initScrollReveal();

    // 3. Service Card Enhancements
    enhanceServiceCards();

    // 4. Parallax Effects
    initParallax();

    // 5. Magnetic Buttons
    initMagneticButtons();

    // 6. Ripple Effects
    initRippleEffects();

    // 7. Icon Glow
    initIconGlow();

    console.log('✨ Solar page enhancements loaded!');
});

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #F4B400, #F59E0B, #F4B400);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Scroll Reveal Animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.rich-card, .feature-card-interactive, .stat-badge-interactive, .service-card-enhanced');

    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;

            if (isVisible && !el.classList.contains('revealed')) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.classList.add('revealed');
                }, index * 50);
            }
        });
    };

    // Set initial state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Enhance Service Cards
function enhanceServiceCards() {
    const serviceCards = document.querySelectorAll('.rich-card');

    serviceCards.forEach(card => {
        // Add hover lift effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(10, 25, 47, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });

        // Animate icons on hover
        const icon = card.querySelector('.rich-card-icon i, i.ph-fill, i.ph');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.filter = 'drop-shadow(0 0 12px currentColor)';
                icon.style.transition = 'all 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'none';
            });
        }
    });

    // Enhance feature cards
    const featureCards = document.querySelectorAll('.feature-card-interactive');
    featureCards.forEach(card => {
        const leftBorder = card.querySelector('div[style*="position: absolute"]');

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateX(8px)';
            card.style.boxShadow = '0 8px 24px rgba(10, 25, 47, 0.12)';
            if (leftBorder) {
                leftBorder.style.width = '8px';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateX(0)';
            card.style.boxShadow = '';
            if (leftBorder) {
                leftBorder.style.width = '4px';
            }
        });
    });
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('section > div[style*="position: absolute"]');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxElements.forEach((el, index) => {
            const speed = 0.2 + (index * 0.05);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
            button.style.transition = 'transform 0.2s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Ripple Click Effects
function initRippleEffects() {
    const clickableElements = document.querySelectorAll('.rich-card, .feature-card-interactive, .stat-badge-interactive, .safety-badge');

    clickableElements.forEach(element => {
        element.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(244, 180, 0, 0.3);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Icon Glow Effect
function initIconGlow() {
    const icons = document.querySelectorAll('.ph-fill, .ph');

    icons.forEach(icon => {
        const parent = icon.closest('.rich-card, .feature-card-interactive, .stat-badge-interactive, .hero-stat-badge');
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                icon.style.filter = 'drop-shadow(0 0 8px currentColor)';
                icon.style.transition = 'filter 0.3s ease';
            });

            parent.addEventListener('mouseleave', () => {
                icon.style.filter = 'none';
            });
        }
    });
}

// Add ripple animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(style);
