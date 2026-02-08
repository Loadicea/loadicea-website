document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header .nav-container');
    if (!header) return;

    // Check if mobile elements already exist to avoid duplicates
    let hamburger = document.querySelector('.mobile-menu-btn');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-btn';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(hamburger);
    }

    // Create Mobile Menu Overlay if not exists
    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';

        const overlayContent = document.createElement('div');
        overlayContent.className = 'mobile-nav-content';

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-nav-close';
        closeBtn.innerHTML = '<i class="ph ph-x"></i>';
        overlayContent.appendChild(closeBtn);

        // Navigation Links Container
        const mobileList = document.createElement('nav');
        mobileList.className = 'mobile-nav-links';

        // 1. Add "Home" Link Manually (since it's the logo on desktop)
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.textContent = 'Home';
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            homeLink.classList.add('active');
        }
        mobileList.appendChild(homeLink);

        // 2. Clone Desktop Links
        const desktopLinks = document.querySelector('.nav-links');
        if (desktopLinks) {
            Array.from(desktopLinks.querySelectorAll('a')).forEach(link => {
                const clone = link.cloneNode(true);
                // Remove specific desktop-only classes if needed, or keep them
                clone.className = ''; // Reset classes to avoid desktop styles interfering
                if (link.href === window.location.href) {
                    clone.classList.add('active');
                }
                mobileList.appendChild(clone);
            });
        }

        // 3. Add Contact Link
        const contactLink = document.createElement('a');
        contactLink.href = 'contact.html';
        contactLink.textContent = 'Contact';
        if (window.location.pathname.endsWith('contact.html')) {
            contactLink.classList.add('active');
        }
        mobileList.appendChild(contactLink);


        overlayContent.appendChild(mobileList);
        overlay.appendChild(overlayContent);
        document.body.appendChild(overlay);
    }

    // Initial Active State Check
    const currentPath = window.location.pathname.split('/').pop();
    const overlayLinks = overlay.querySelectorAll('a');
    overlayLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Unified Toggle Logic
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    };

    // Check if listeners are already attached to avoid duplication if script runs twice
    if (!hamburger.hasAttribute('data-listener-attached')) {
        hamburger.addEventListener('click', toggleMenu);
        hamburger.setAttribute('data-listener-attached', 'true');
    }

    const closeBtn = overlay.querySelector('.mobile-nav-close');
    if (closeBtn && !closeBtn.hasAttribute('data-listener-attached')) {
        closeBtn.addEventListener('click', toggleMenu);
        closeBtn.setAttribute('data-listener-attached', 'true');
    }

    // Close on Link Click
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});


