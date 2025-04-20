document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.createElement('div');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '☰';
    document.querySelector('.navbar').appendChild(mobileMenuButton);
    
    const contactParent = document.querySelector('.contact-parent');
    
    mobileMenuButton.addEventListener('click', function() {
        contactParent.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.contact-parent a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                contactParent.classList.remove('active');
            }
        });
    });

    // Counter animation
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
                    current = target;
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, frameDuration);
        });
    };

    // Intersection Observer for animations
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

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - (window.innerWidth <= 768 ? 60 : 80),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adjust layout on resize
    function handleResize() {
        if (window.innerWidth > 768) {
            contactParent.style.display = 'flex';
            contactParent.classList.remove('active');
        } else {
            contactParent.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
});