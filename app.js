document.addEventListener('DOMContentLoaded', function() {
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

    // Intersection Observer for sections
    const sections = document.querySelectorAll('.section-2, .section-3, .section-4, .footer');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special case for about section counters
                if (entry.target.classList.contains('section-3')) {
                    animateCounters();
                }
                
                // Unobserve after animation triggers
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll for navigation
    const setupNavigation = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    setupNavigation();

    // Hover effects for skills
    const skills = document.querySelectorAll('.skill-1, .skill-2, .skill-3, .skill-4');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            const items = skill.querySelectorAll('.skill-list-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
        });
    });
});