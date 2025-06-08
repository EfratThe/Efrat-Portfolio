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

    // XBOX Scroll Animation - Hijack Version
    let xboxFrames = [];
    let currentFrame = 1; // Start at frame 1
    let isScrollLocked = false;
    let xboxAnimationElement = null;
    let scrollAccumulator = 0;
    let xboxSection = null;
    
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
    }
      function initializeAnimations() {
        console.log('Initializing animations...');
        xboxAnimationElement = document.getElementById('xbox-animation');
        xboxSection = document.getElementById('scroll-animation');
        cupAnimationElement = document.getElementById('cup-interactive');
        
        console.log('XBOX elements found:', {
            xboxAnimationElement: !!xboxAnimationElement,
            xboxSection: !!xboxSection
        });
        
        // Setup XBOX scroll animation
        if (xboxAnimationElement && xboxSection) {
            console.log('Setting up XBOX scroll animation');
            setupXboxScrollAnimation();
        }
        
        // Setup Cup hover animation
        if (cupAnimationElement) {
            console.log('Setting up Cup hover animation');
            setupCupHoverAnimation();
        }
    }
    
    function setupXboxScrollAnimation() {
        // Monitor scroll to detect when XBOX section is in center
        window.addEventListener('scroll', checkXboxSectionPosition);
        
        // Add scroll hijacking listeners
        window.addEventListener('wheel', handleScrollInput, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        
        // Escape key to release lock if user gets stuck
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isScrollLocked) {
                releaseScrollLock();
            }
        });
    }
      function checkXboxSectionPosition() {
        if (!xboxSection || isScrollLocked) return;
        
        const rect = xboxSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        
        // Debug output (remove after testing)
        const distance = Math.abs(sectionCenter - screenCenter);
        if (distance < 200) { // Only log when getting close
            console.log('XBOX section position:', {
                sectionCenter,
                screenCenter,
                distance,
                shouldActivate: distance < 100
            });
        }
        
        // Check if section center is near screen center (within 100px tolerance)
        if (Math.abs(sectionCenter - screenCenter) < 100 && rect.top <= screenCenter && rect.bottom >= screenCenter) {
            console.log('Activating scroll lock!');
            activateScrollLock();
        }
    }
      function activateScrollLock() {
        if (isScrollLocked) return;
        
        console.log('🔒 SCROLL LOCK ACTIVATED');
        isScrollLocked = true;
        document.body.style.overflow = 'hidden';
        scrollAccumulator = 0;
        currentFrame = 1;
        updateXboxFrame();
        
        // Visual indicator that scroll is locked
        xboxSection.style.position = 'relative';
        xboxSection.style.zIndex = '1000';
    }
    
    function releaseScrollLock() {
        isScrollLocked = false;
        document.body.style.overflow = 'auto';
        xboxSection.style.position = '';
        xboxSection.style.zIndex = '';
        scrollAccumulator = 0;
    }
    
    let touchStartY = 0;
    
    function handleTouchStart(e) {
        if (!isScrollLocked) return;
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e) {
        if (!isScrollLocked) return;
        
        e.preventDefault();
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        touchStartY = touchY;
        
        processScrollInput(deltaY);
    }
    
    function handleScrollInput(e) {
        if (!isScrollLocked) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        // Use deltaY for scroll direction and magnitude
        processScrollInput(e.deltaY);
        
        return false;
    }
    
    function processScrollInput(deltaY) {
        // Accumulate scroll input
        scrollAccumulator += deltaY;
        
        // Adjust sensitivity - higher number = more scroll needed per frame
        const sensitivity = 30;
        
        if (Math.abs(scrollAccumulator) >= sensitivity) {
            const direction = scrollAccumulator > 0 ? 1 : -1;
            const frameChange = Math.floor(Math.abs(scrollAccumulator) / sensitivity);
            
            // Update current frame
            currentFrame += direction * frameChange;
            
            // Keep frame within bounds
            currentFrame = Math.max(1, Math.min(91, currentFrame));
            
            // Reset accumulator
            scrollAccumulator = scrollAccumulator % sensitivity;
            
            // Update the displayed frame
            updateXboxFrame();
            
            // Check if animation is complete
            if (currentFrame >= 91) {
                // Allow a bit more scroll to release the lock
                if (deltaY > 0) {
                    setTimeout(() => {
                        releaseScrollLock();
                        // Continue normal scroll
                        window.scrollBy(0, deltaY);
                    }, 200);
                }
            }
        }
    }
    
    function updateXboxFrame() {
        if (xboxAnimationElement && xboxFrames[currentFrame - 1]) {
            xboxAnimationElement.src = xboxFrames[currentFrame - 1];
        }
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