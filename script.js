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
    }    function initializeAnimations() {
        xboxAnimationElement = document.getElementById('xbox-animation');
        xboxSection = document.getElementById('scroll-animation');
        cupAnimationElement = document.getElementById('cup-interactive');
        
        // Setup XBOX scroll animation
        if (xboxAnimationElement && xboxSection) {
            setupXboxScrollAnimation();
        }
        
        // Setup Cup hover animation
        if (cupAnimationElement) {
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
    }    function checkXboxSectionPosition() {
        if (!xboxSection) return; // Remove isScrollLocked check for upward scroll detection
        
        const rect = xboxSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        
        // Detect scroll direction
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > (window.lastScrollY || 0) ? 1 : -1;
        window.lastScrollY = currentScrollY;
        
        // Keep history of recent scroll directions
        if (!window.scrollDirectionHistory) window.scrollDirectionHistory = [];
        window.scrollDirectionHistory.push(scrollDirection);
        if (window.scrollDirectionHistory.length > 5) {
            window.scrollDirectionHistory.shift();
        }
        
        // Check if consistently scrolling up
        const isScrollingUp = window.scrollDirectionHistory.length >= 3 && 
                             window.scrollDirectionHistory.slice(-3).every(dir => dir === -1);
        
        // More precise center detection - section center must be very close to screen center
        const distance = Math.abs(sectionCenter - screenCenter);
        const isInCenter = distance < 50 && // Tighter tolerance (was 100px)
                          rect.top < screenCenter && // Section started above center
                          rect.bottom > screenCenter && // Section extends below center
                          rect.top > -rect.height * 0.3 && // Section not too far above viewport
                          rect.bottom < windowHeight + rect.height * 0.3; // Section not too far below viewport
          // If scrolling up and entering animation zone, play reverse animation but don't lock
        if (isScrollingUp && isInCenter) {
            if (!isScrollLocked) {
                playReverseAnimation();
            }
            return; // Don't activate lock when scrolling up
        }
        
        // Only activate lock when scrolling down, in center, and not already locked
        if (!isScrollingUp && !isScrollLocked && isInCenter) {
            activateScrollLock();
        }
    }    function activateScrollLock() {
        if (isScrollLocked) return;
        
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
        const sensitivity = 15;
        
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
      function playReverseAnimation() {
        // Play animation in reverse from current frame to frame 1
        let reverseFrame = currentFrame;
        
        const reverseInterval = setInterval(() => {
            reverseFrame--;
            if (reverseFrame >= 1) {
                if (xboxAnimationElement && xboxFrames[reverseFrame - 1]) {
                    xboxAnimationElement.src = xboxFrames[reverseFrame - 1];
                }
            } else {
                clearInterval(reverseInterval);
                currentFrame = 1; // Reset to first frame
            }
        }, 15); // Even faster reverse animation (was 25ms, now 15ms)
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