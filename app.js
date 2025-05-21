document.addEventListener('DOMContentLoaded', function() {
    // Trigger Hero Section Animations on Load
    const heroElements = document.querySelectorAll('.hero-title, .hero-sud-icon, .web-developer-container, .im-sudharsan1');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, index * 200); // Stagger animations by 200ms
    });

    // Mobile Menu Functionality
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
    document.querySelector('.navbar').appendChild(mobileMenuButton);
    
    const contactParent = document.querySelector('.contact-parent');
    
    mobileMenuButton.addEventListener('click', function() {
        contactParent.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 60;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // Close mobile menu
                if (window.innerWidth <= 768) {
                    contactParent.classList.remove('active');
                }
            }
        });
    });

    // Counter Animation for Stats Section
    const animateCounters = () => {
        const counters = document.querySelectorAll('.count');
        const duration = 1500;
        const frameDuration = 50;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / (duration / frameDuration);
            let current = 0;
            
            const counterInterval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(counterInterval);
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, frameDuration);
        });
    };

    // Intersection Observer for Section Animations
    const sections = document.querySelectorAll('.section-2, .section-3, .section-4, .footer');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('section-3')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Handle Navbar Visibility on Resize
    function handleResize() {
        if (window.innerWidth > 768) {
            contactParent.style.display = 'flex';
            contactParent.classList.remove('active');
        } else {
            contactParent.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});