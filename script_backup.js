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
      // XBOX Scroll Animation - SCROLL CONTROLLED WITH LOCKING
    // Animation behavior: Scroll-locking distance-based control
    // - When section becomes active, scroll is locked
    // - User scrolling controls frames 1-91 progressively
    // - Must complete animation to unlock scroll
    // - 60% of section height = full animation trigger zone
    let xboxFrames = [];
    let currentFrame = 1;
    let isXboxAnimationActive = false;
    let xboxAnimationElement = null;
    let xboxSection = null;
    let scrollLocked = false;
    let animationStartScrollY = 0;
    let animationProgress = 0;
      // Load XBOX frames
    for (let i = 1; i <= 91; i++) {
        xboxFrames.push(`XBOX-Frames/XBOX.5.${i}.jpg`);
    }
    
    // Cup Interactive Animation
    let cupFrames = [];
    let cupAnimationElement = null;
    let cupAnimationInterval = null;
    
    // Load Cup frames
    for (let i = 9655; i <= 9673; i++) {
        cupFrames.push(`Projects-Pictures/Cup-Frames/_MG_${i}.JPG`);
    }    function initializeAnimations() {
        console.log('Initializing animations...');
        xboxAnimationElement = document.getElementById('xbox-animation');
        xboxSection = document.getElementById('scroll-animation');
        cupAnimationElement = document.getElementById('cup-interactive');
        
        console.log('XBOX element found:', !!xboxAnimationElement);
        console.log('XBOX section found:', !!xboxSection);
        console.log('Cup element found:', !!cupAnimationElement);
        
        // Setup XBOX scroll animation
        if (xboxAnimationElement && xboxSection) {
            console.log('Setting up XBOX scroll-controlled animation');
            setupXboxScrollAnimation();
            
            // Set initial frame
            xboxAnimationElement.src = xboxFrames[0];
        }
        
        // Setup Cup hover animation
        if (cupAnimationElement) {
            console.log('Setting up Cup hover animation');
            setupCupHoverAnimation();
        }
        
        // Add scroll event listener for XBOX animation control
        window.addEventListener('scroll', handleXboxScrollControl);
        // Add wheel event listener to capture scroll attempts during lock
        window.addEventListener('wheel', handleScrollLock, { passive: false });
    }
        if (cupAnimationElement) {
            console.log('Setting up Cup hover animation');
            setupCupHoverAnimation();
        }
    }
      function setupXboxScrollAnimation() {
        console.log('Creating intersection observer for XBOX animation');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {                console.log('XBOX intersection:', entry.isIntersecting, 'ratio:', entry.intersectionRatio);
                if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
                    // Element is fully visible, start animation and prevent scroll
                    if (!isXboxAnimationActive) {
                        console.log('Starting XBOX animation');
                        startXboxAnimation();
                    }
                } else if (isXboxAnimationActive) {
                    // Element is no longer fully visible, allow scroll
                    console.log('Stopping XBOX animation');
                    stopXboxAnimation();
                }
            });        }, {
            threshold: 0.8 // Trigger when 80% of element is visible
        });
        
        console.log('Observing element:', xboxAnimationElement.parentElement);
        observer.observe(xboxAnimationElement.parentElement);
    }
      function startXboxAnimation() {
        console.log('XBOX animation started');
        isXboxAnimationActive = true;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        currentFrame = 0;
        const animationInterval = setInterval(() => {
            if (currentFrame < xboxFrames.length) {
                console.log('Playing frame:', currentFrame + 1, 'of', xboxFrames.length);
                xboxAnimationElement.src = xboxFrames[currentFrame];
                currentFrame++;
            } else {
                // Animation complete, allow scrolling
                console.log('XBOX animation complete');
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
        console.log('Setting up Cup hover animation');
        let cupFrameIndex = 0;
        
        cupAnimationElement.addEventListener('mouseenter', () => {
            console.log('Cup hover started');
            cupFrameIndex = 0;
            cupAnimationInterval = setInterval(() => {
                if (cupFrameIndex < cupFrames.length) {
                    console.log('Cup frame:', cupFrameIndex + 1, 'of', cupFrames.length);
                    cupAnimationElement.src = cupFrames[cupFrameIndex];
                    cupFrameIndex++;
                } else {
                    cupFrameIndex = 0; // Loop animation
                }
            }, 150); // Adjust timing as needed
        });
        
        cupAnimationElement.addEventListener('mouseleave', () => {
            console.log('Cup hover ended');
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