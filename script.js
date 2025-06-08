document.addEventListener('DOMContentLoaded', () => {
    // Particle.js Configuration for subtle colorful particles without connecting lines
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 40, // Reduced number of particles
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": ["#FF6B6B", "#4ECDC4", "#FFE66D", "#1A535C", "#FF9F1C"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.3, // Reduced opacity to make less apparent
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3, // Reduced size
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "size_min": 0.5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false // No connecting lines
            },
            "move": {
                "enable": true,
                "speed": 1, // Slower movement
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "bubble": {
                    "distance": 150,
                    "size": 5,
                    "duration": 2,
                    "opacity": 0.6,
                    "speed": 3
                },
                "push": {
                    "particles_nb": 3
                }
            }
        },
        "retina_detect": true
    });

    // Logo Animation
    const letters = document.querySelectorAll('.letter');
    let hasTriggeredOnLoad = false;
    
    function triggerAnimation() {
        letters.forEach(letter => {
            letter.classList.remove('hop');
            // Force reflow
            letter.offsetHeight;
            letter.classList.add('hop');
        });
        
        // Remove the hop class after animation completes
        setTimeout(() => {
            letters.forEach(letter => {
                letter.classList.remove('hop');
            });
        }, 1000);
    }
    
    // Trigger animation on page load with slight delay
    setTimeout(() => {
        if (!hasTriggeredOnLoad) {
            triggerAnimation();
            hasTriggeredOnLoad = true;
        }
    }, 500);
    
    // Handle Fade-in Header
    const header = document.getElementById('main-header');
    const introSection = document.getElementById('intro');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const introHeight = introSection.offsetHeight;
        
        // Show header after scrolling past 80% of intro section
        if (scrollPosition > introHeight * 0.8) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
        
        // Trigger logo animation when scrolling back to top
        if (scrollPosition < 100 && scrollPosition > 0 && window.prevScrollY > 100) {
            triggerAnimation();
        }
        
        window.prevScrollY = scrollPosition;
    });
    
    // Initialize previous scroll position
    window.prevScrollY = window.scrollY;
    
    // Smooth scroll for navigation links with jump effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add jump effect with easing
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });    });
  
    // Initialize animations
    initializeAnimations();
    
    // XBOX Scroll Animation
    let xboxFrames = [];
    let currentFrame = 0;
    let isXboxAnimationActive = false;
    let xboxAnimationElement = null;
    
    // Load XBOX frames
    for (let i = 1; i <= 91; i++) {
        xboxFrames.push(`Projects-Pictures/XBOX-Frames/XBOX.5.${i}.jpg`);
    }
    
    // Cup Interactive Animation
    let cupFrames = [];
    let cupAnimationElement = null;
    let cupAnimationInterval = null;
    
    // Load Cup frames
    for (let i = 9655; i <= 9673; i++) {
        cupFrames.push(`Projects-Pictures/Cup-Frames/_MG_${i}.JPG`);
    }
    
    function initializeAnimations() {
        xboxAnimationElement = document.getElementById('xbox-animation');
        cupAnimationElement = document.getElementById('cup-interactive');
        
        // Setup XBOX scroll animation
        if (xboxAnimationElement) {
            setupXboxScrollAnimation();
        }
        
        // Setup Cup hover animation
        if (cupAnimationElement) {
            setupCupHoverAnimation();
        }
    }
    
    function setupXboxScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
                    // Element is fully visible, start animation and prevent scroll
                    if (!isXboxAnimationActive) {
                        startXboxAnimation();
                    }
                } else if (isXboxAnimationActive) {
                    // Element is no longer fully visible, allow scroll
                    stopXboxAnimation();
                }
            });
        }, {
            threshold: 0.95 // Trigger when 95% of element is visible
        });
        
        observer.observe(xboxAnimationElement.parentElement);
    }
    
    function startXboxAnimation() {
        isXboxAnimationActive = true;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        currentFrame = 0;
        const animationInterval = setInterval(() => {
            if (currentFrame < xboxFrames.length) {
                xboxAnimationElement.src = xboxFrames[currentFrame];
                currentFrame++;
            } else {
                // Animation complete, allow scrolling
                clearInterval(animationInterval);
                stopXboxAnimation();
            }
        }, 100); // Adjust timing as needed
    }
    
    function stopXboxAnimation() {
        isXboxAnimationActive = false;
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    function setupCupHoverAnimation() {
        let cupFrameIndex = 0;
        
        cupAnimationElement.addEventListener('mouseenter', () => {
            cupFrameIndex = 0;
            cupAnimationInterval = setInterval(() => {
                if (cupFrameIndex < cupFrames.length) {
                    cupAnimationElement.src = cupFrames[cupFrameIndex];
                    cupFrameIndex++;
                } else {
                    cupFrameIndex = 0; // Loop animation
                }
            }, 150); // Adjust timing as needed
        });
        
        cupAnimationElement.addEventListener('mouseleave', () => {
            if (cupAnimationInterval) {
                clearInterval(cupAnimationInterval);
                cupAnimationInterval = null;
            }
            // Return to original Cup.png
            cupAnimationElement.src = 'Projects-Pictures/Cup.png';
        });
    }    
    // Initialize animations
    initializeAnimations();
});