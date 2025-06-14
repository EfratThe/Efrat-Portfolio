document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Background Effects System
    let scrollVelocity = 0;
    let lastScrollY = 0;
    let currentSection = 'intro';
    
    // Background color themes for each section
    const sectionThemes = {
        intro: {
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C'],
            bgGradient: 'linear-gradient(135deg, #fafafa 0%, #f0f2f5 100%)',
            particleSpeed: 1
        },
        smartcane: {
            colors: ['#2196F3', '#03DAC6', '#BB86FC', '#6200EE', '#00BCD4'],
            bgGradient: 'linear-gradient(135deg, #fafafa 0%, #e3f2fd 100%)',
            particleSpeed: 1.2
        },
        xbox: {
            colors: ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'],
            bgGradient: 'linear-gradient(135deg, #f0f0f0 0%, #e8f5e8 100%)',
            particleSpeed: 0.8
        },
        bibike: {
            colors: ['#FF5722', '#FF7043', '#FF8A65', '#FFAB40', '#FFC107'],
            bgGradient: 'linear-gradient(135deg, #fafafa 0%, #fff3e0 100%)',
            particleSpeed: 1.1
        },
        modutable: {
            colors: ['#9C27B0', '#E91E63', '#F06292', '#BA68C8', '#CE93D8'],
            bgGradient: 'linear-gradient(135deg, #fafafa 0%, #f3e5f5 100%)',
            particleSpeed: 1.3
        },
        airsip: {
            colors: ['#00BCD4', '#26C6DA', '#4DD0E1', '#80DEEA', '#B2EBF2'],
            bgGradient: 'linear-gradient(135deg, #fafafa 0%, #e0f2f1 100%)',
            particleSpeed: 0.9
        }
    };

    // Enhanced Particle.js Configuration with dynamic responsiveness
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": sectionThemes.intro.colors
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 1,
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
                    "distance": 200,
                    "size": 8,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // Function to update particle colors and behavior
    function updateParticleTheme(theme) {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const pJS = window.pJSDom[0].pJS;
            
            // Update particle colors
            pJS.particles.color.value = theme.colors;
            
            // Update particle speed based on scroll velocity and theme
            const dynamicSpeed = theme.particleSpeed + (scrollVelocity * 0.1);
            pJS.particles.move.speed = Math.min(dynamicSpeed, 5);
            
            // Update particles with new colors
            pJS.particles.array.forEach(particle => {
                const randomColor = theme.colors[Math.floor(Math.random() * theme.colors.length)];
                particle.color.value = randomColor;
                particle.color.rgb = hexToRgb(randomColor);
            });
            
            // Refresh canvas
            pJS.fn.particlesRefresh();
        }
    }

    // Helper function to convert hex to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Function to smoothly transition background gradient
    function updateBackgroundGradient(gradient) {
        document.body.style.transition = 'background 1.5s ease';
        document.body.style.background = gradient;
    }

    // Enhanced scroll detection with section awareness
    function detectCurrentSection() {
        const sections = document.querySelectorAll('.section, .full-screen');
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        
        for (let section of sections) {
            const rect = section.getBoundingClientRect();
            const sectionTop = scrollTop + rect.top;
            const sectionBottom = sectionTop + rect.height;
            const viewportCenter = scrollTop + windowHeight / 2;
            
            if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
                const sectionId = section.id || section.className;
                let newSection = 'intro';
                
                if (sectionId.includes('intro')) newSection = 'intro';
                else if (sectionId.includes('smart-cane')) newSection = 'smartcane';
                else if (sectionId.includes('scroll-animation') || sectionId.includes('xbox')) newSection = 'xbox';
                else if (sectionId.includes('bibike')) newSection = 'bibike';
                else if (sectionId.includes('modutable')) newSection = 'modutable';
                else if (sectionId.includes('airsip') || sectionId.includes('cup')) newSection = 'airsip';
                
                if (newSection !== currentSection) {
                    currentSection = newSection;
                    const theme = sectionThemes[currentSection];
                    updateParticleTheme(theme);
                    updateBackgroundGradient(theme.bgGradient);
                }
                break;
            }
        }
    }

    // Enhanced scroll event with velocity calculation and background effects
    let isScrolling = false;
    
    function handleEnhancedScroll() {
        const currentScrollY = window.scrollY;
        scrollVelocity = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        
        // Detect current section and update theme
        detectCurrentSection();
        
        // Add scroll velocity effect to particles
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const pJS = window.pJSDom[0].pJS;
            const theme = sectionThemes[currentSection];
            const velocityMultiplier = Math.min(scrollVelocity * 0.05, 2);
            pJS.particles.move.speed = theme.particleSpeed + velocityMultiplier;
            
            // Add scroll direction effect
            const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
            pJS.particles.array.forEach(particle => {
                particle.vx += scrollDirection * 0.1;
            });
        }
        
        // Reset scroll velocity after a delay
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            scrollVelocity = 0;
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const pJS = window.pJSDom[0].pJS;
                const theme = sectionThemes[currentSection];
                pJS.particles.move.speed = theme.particleSpeed;
            }
        }, 150);
    }    // Add enhanced scroll listener
    window.addEventListener('scroll', handleEnhancedScroll, { passive: true });

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

    // Enhanced Scroll Reveal System
    function initScrollReveal() {
        // Add scroll-reveal class to text blocks and images
        const textBlocks = document.querySelectorAll('.text-block h2, .text-block h3, .text-block p');
        const images = document.querySelectorAll('.image-block img, .interactive-image');
        
        textBlocks.forEach((element, index) => {
            element.classList.add('scroll-reveal', `delay-${(index % 4) + 1}`);
        });
        
        images.forEach(element => {
            element.classList.add('scroll-reveal');
        });
    }

    // Enhanced scroll reveal observer
    function createScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Add active class to parent section
                    const section = entry.target.closest('.section');
                    if (section) {
                        section.classList.add('active');
                    }
                } else {
                    // Remove active class when out of view
                    const section = entry.target.closest('.section');
                    if (section) {
                        section.classList.remove('active');
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        });

        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(element => {
            observer.observe(element);
        });
    }    // Add subtle parallax effect to images
    function addParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.image-block img');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.1; // Reduced from 0.5 to 0.1
            
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInViewport) {
                    // Calculate relative position within the viewport
                    const elementTop = rect.top;
                    const elementHeight = rect.height;
                    const viewportCenter = window.innerHeight / 2;
                    const distanceFromCenter = elementTop - viewportCenter;
                    
                    // Limit parallax movement to prevent images from leaving containers
                    const maxMovement = 20; // Maximum 20px movement
                    const yPos = Math.max(-maxMovement, Math.min(maxMovement, distanceFromCenter * parallaxSpeed));
                    
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                } else {
                    // Reset transform when out of viewport
                    element.style.transform = `translate3d(0, 0, 0)`;
                }
            });
        }, { passive: true });
    }

    // Initialize enhanced scroll effects
    initScrollReveal();
    createScrollObserver();
    addParallaxEffect();

    // Custom Cursor System
    function initCustomCursor() {
        // Create cursor element
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .interactive-image, .letter, .logo');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Section-based cursor themes
        function updateCursorTheme() {
            cursor.classList.remove('xbox', 'cup');
            
            if (currentSection === 'xbox') {
                cursor.classList.add('xbox');
            } else if (currentSection === 'airsip') {
                cursor.classList.add('cup');
            }
        }

        // Update cursor theme when section changes
        const originalDetectSection = detectCurrentSection;
        detectCurrentSection = function() {
            const previousSection = currentSection;
            originalDetectSection();
            if (previousSection !== currentSection) {
                updateCursorTheme();
            }
        };
    }

    // Initialize custom cursor
    initCustomCursor();

    // Dynamic Scroll Progress Indicator
    function createScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            const fill = progressBar.querySelector('.scroll-progress-fill');
            fill.style.width = scrollPercent + '%';
            
            // Change color based on current section
            fill.className = `scroll-progress-fill ${currentSection}`;
        }, { passive: true });
    }

    // Smooth momentum scrolling enhancement
    function enhanceSmoothScrolling() {
        // Add smooth scroll behavior to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Smooth scroll with easing
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        });
    }

    // Initialize final enhancements
    createScrollProgress();
    enhanceSmoothScrolling();

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