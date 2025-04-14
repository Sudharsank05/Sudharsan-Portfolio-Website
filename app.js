// document.addEventListener('DOMContentLoaded', function() {
//     const counters = document.querySelectorAll('.count');
    
//     // Slower animation settings
//     const duration = 1500; // 3 seconds for all counters
//     const frameDuration = 50; // Update every 50ms (20fps)
    
//     counters.forEach(counter => {
//       const start = 0;
//       const target = parseInt(counter.getAttribute('data-target'));
//       const totalFrames = Math.round(duration / frameDuration);
//       const easeOutQuad = t => t*(2-t); // Easing function for smooth deceleration
      
//       let frame = 0;
//       const counterInterval = setInterval(() => {
//         frame++;
        
//         // Calculate current value with easing
//         const progress = easeOutQuad(frame / totalFrames);
//         const current = Math.round(progress * target);
        
//         counter.textContent = current;
        
//         if (frame === totalFrames) {
//           clearInterval(counterInterval);
//           counter.textContent = target + '+';
//         }
//       }, frameDuration);
//     });
//   });



document.addEventListener('DOMContentLoaded', function() {
  // Counter animation with improved easing
  const counters = document.querySelectorAll('.count');
  const duration = 1500;
  const frameDuration = 50;
  
  // Easing functions
  const easingFunctions = {
      easeOutQuad: t => t*(2-t),
      easeOutElastic: t => {
          const p = 0.3;
          return Math.pow(2,-10*t) * Math.sin((t-p/4)*(2*Math.PI)/p) + 1;
      }
  };
  
  counters.forEach(counter => {
      const start = 0;
      const target = parseInt(counter.getAttribute('data-target'));
      const totalFrames = Math.round(duration / frameDuration);
      
      let frame = 0;
      const counterInterval = setInterval(() => {
          frame++;
          
          // Use elastic easing for more playful animation
          const progress = easingFunctions.easeOutElastic(frame / totalFrames);
          const current = Math.round(progress * target);
          
          counter.textContent = current;
          
          if (frame === totalFrames) {
              clearInterval(counterInterval);
              counter.textContent = target + '+';
              
              // Add celebration effect when counter completes
              counter.classList.add('celebrate');
              setTimeout(() => counter.classList.remove('celebrate'), 1000);
          }
      }, frameDuration);
  });
  
  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll('.section-2, .section-3, .section-4');
  
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              
              // Add animation to cards when projects section is visible
              if (entry.target.classList.contains('section-4')) {
                  const cards = document.querySelectorAll('.card-1, .card-2, .card-3');
                  cards.forEach((card, index) => {
                      setTimeout(() => {
                          card.style.opacity = '1';
                          card.style.transform = 'translateY(20px)';
                      }, index * 200);
                  });
              }
          }
      });
  }, observerOptions);
  
  sections.forEach(section => {
      observer.observe(section);
  });
  
  // Hover effect for project cards
//   const projectCards = document.querySelectorAll('.card-1, .card-2, .card-3');
//   projectCards.forEach(card => {
//       card.addEventListener('mousemove', (e) => {
//           const x = e.clientX - card.getBoundingClientRect().left;
//           const y = e.clientY - card.getBoundingClientRect().top;
          
//           const centerX = card.offsetWidth / 2;
//           const centerY = card.offsetHeight / 2;
          
//         //   const angleX = (y - centerY) / 20;
//         //   const angleY = (centerX - x) / 20;
          
//           card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
//       });
      
//       card.addEventListener('mouseleave', () => {
//           card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
//       });
//   });
  
  // Smooth scroll for navigation
  const navLinks = document.querySelectorAll('.home, .projects1, .skills2, .about-me2, .contact2');
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.textContent.toLowerCase().replace(' ', '-');
          const targetSection = document.querySelector(`.${targetId}`);
          
          if (targetSection) {
              window.scrollTo({
                  top: targetSection.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Button ripple effect
  const buttons = document.querySelectorAll('.know-more-dup, .know-more-dup1, .know-more-dup2, .know-more-dup3, .know-more-dup-link');
  buttons.forEach(button => {
      button.addEventListener('click', function(e) {
          const x = e.clientX - e.target.getBoundingClientRect().left;
          const y = e.clientY - e.target.getBoundingClientRect().top;
          
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          this.appendChild(ripple);
          
          setTimeout(() => {
              ripple.remove();
          }, 1000);
      });
  });
});



// section 2
// Skills Section Animation Trigger
const skillsSection = document.querySelector('.section-2');
const skillCards = document.querySelectorAll('.skill-1, .skill-2, .skill-3, .skill-4');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars if using them
            document.querySelectorAll('.skill-progress').forEach(bar => {
                bar.style.width = bar.parentElement.getAttribute('data-level');
            });
            
            // Add hover effects after initial animation
            setTimeout(() => {
                skillCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, 1000);
        }
    });
}, { threshold: 0.1 });

skillObserver.observe(skillsSection);

// Add hover effects to list items
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const items = card.querySelectorAll('.skill-list-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });
});

// navbar click event
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});