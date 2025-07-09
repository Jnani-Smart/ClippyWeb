// Advanced animations for VisionOS-style effects
class VisionOSAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupAdvancedAnimations();
        this.setupMouseTracker();
        this.setupParallaxEffects();
        this.setupMorphingBackgrounds();
        this.setupFloatingElements();
        this.setupTextAnimations();
    }
    
    // Advanced card animations with physics
    setupAdvancedAnimations() {
        const cards = document.querySelectorAll('.feature-card, .gallery-card, .floating-card');
        
        cards.forEach((card, index) => {
            // Add magnetic effect
            this.addMagneticEffect(card);
            
            // Add tilt effect
            this.addTiltEffect(card);
            
            // Add entrance animation with delay
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    }
    
    // Mouse tracker for interactive elements
    setupMouseTracker() {
        const interactiveElements = document.querySelectorAll('.btn-glass, .feature-card, .nav-link');
        
        document.addEventListener('mousemove', (e) => {
            interactiveElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Check if mouse is over element
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const deltaX = x - centerX;
                    const deltaY = y - centerY;
                    
                    element.style.setProperty('--mouse-x', `${x}px`);
                    element.style.setProperty('--mouse-y', `${y}px`);
                    element.style.setProperty('--mouse-delta-x', deltaX);
                    element.style.setProperty('--mouse-delta-y', deltaY);
                }
            });
        });
    }
    
    // Magnetic effect for buttons and cards
    addMagneticEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const intensity = 15;
            const rotateX = deltaY * intensity;
            const rotateY = deltaX * -intensity;
            
            element.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
                translateZ(0)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            element.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    }
    
    // 3D tilt effect
    addTiltEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.transformStyle = 'preserve-3d';
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }
    
    // Parallax scrolling effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-visual, .background-gradient');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    }
    
    // Morphing background effects
    setupMorphingBackgrounds() {
        const morphingElements = document.querySelectorAll('.hero, .features, .download');
        
        morphingElements.forEach((element, index) => {
            const colors = [
                'rgba(0, 122, 255, 0.05)',
                'rgba(88, 86, 214, 0.05)',
                'rgba(52, 199, 89, 0.05)',
                'rgba(255, 149, 0, 0.05)'
            ];
            
            let colorIndex = index % colors.length;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateBackgroundColor(element, colors[colorIndex]);
                        colorIndex = (colorIndex + 1) % colors.length;
                    }
                });
            });
            
            observer.observe(element);
        });
    }
    
    // Animate background color transitions
    animateBackgroundColor(element, targetColor) {
        element.style.transition = 'background-color 2s ease';
        element.style.backgroundColor = targetColor;
    }
    
    // Floating elements animation
    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.feature-icon, .download-icon');
        
        floatingElements.forEach((element, index) => {
            const animation = element.animate([
                { transform: 'translateY(0px) rotate(0deg)' },
                { transform: 'translateY(-10px) rotate(2deg)' },
                { transform: 'translateY(0px) rotate(0deg)' }
            ], {
                duration: 3000 + (index * 500),
                iterations: Infinity,
                easing: 'ease-in-out'
            });
            
            // Pause animation when not in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animation.play();
                    } else {
                        animation.pause();
                    }
                });
            });
            
            observer.observe(element);
        });
    }
    
    // Text reveal animations
    setupTextAnimations() {
        const textElements = document.querySelectorAll('.hero-title, .section-title, .feature-title');
        
        textElements.forEach(element => {
            this.addTextRevealAnimation(element);
        });
    }
    
    // Text reveal effect
    addTextRevealAnimation(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        const words = text.split(' ');
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.overflow = 'hidden';
            
            const letterSpan = document.createElement('span');
            letterSpan.textContent = word + ' ';
            letterSpan.style.display = 'inline-block';
            letterSpan.style.transform = 'translateY(100%)';
            letterSpan.style.transition = `transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
            
            wordSpan.appendChild(letterSpan);
            element.appendChild(wordSpan);
        });
        
        // Trigger animation when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const letters = entry.target.querySelectorAll('span span');
                    letters.forEach(letter => {
                        letter.style.transform = 'translateY(0)';
                    });
                }
            });
        });
        
        observer.observe(element);
    }
    
    // Utility: Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Advanced scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollProgress();
        this.setupSectionTransitions();
        this.setupStaggeredAnimations();
    }
    
    // Scroll progress indicator
    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #007AFF, #5856D6);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }, 16));
    }
    
    // Section transition effects
    setupSectionTransitions() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-active');
                    this.triggerSectionAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Trigger section-specific animations
    triggerSectionAnimation(section) {
        const sectionId = section.id;
        
        switch(sectionId) {
            case 'features':
                this.animateFeatureCards(section);
                break;
            case 'gallery':
                this.animateGalleryItems(section);
                break;
            case 'download':
                this.animateDownloadSection(section);
                break;
        }
    }
    
    // Animate feature cards with stagger
    animateFeatureCards(section) {
        const cards = section.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
            }, index * 150);
        });
    }
    
    // Animate gallery items
    animateGalleryItems(section) {
        const items = section.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0) rotateX(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
    }
    
    // Animate download section
    animateDownloadSection(section) {
        const elements = section.querySelectorAll('.download-icon, .download-title, .download-description, .download-actions');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = 'translateY(0) scale(1)';
                element.style.opacity = '1';
            }, index * 200);
        });
    }
    
    // Staggered animations for lists
    setupStaggeredAnimations() {
        const lists = document.querySelectorAll('.nav-links, .footer-links, .hero-stats');
        
        lists.forEach(list => {
            const items = list.children;
            Array.from(items).forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }
    
    // Utility: Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        this.monitorFrameRate();
        this.optimizeAnimations();
    }
    
    monitorFrameRate() {
        let frames = 0;
        let lastTime = performance.now();
        
        const checkFrameRate = (currentTime) => {
            frames++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                // Reduce animation quality if performance is poor
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                    console.log('🐌 Low performance detected, reducing animation quality');
                } else if (fps > 50) {
                    document.body.classList.remove('low-performance');
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFrameRate);
        };
        
        requestAnimationFrame(checkFrameRate);
    }
    
    optimizeAnimations() {
        // Disable expensive animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('low-end-device');
            console.log('📱 Low-end device detected, optimizing animations');
        }
        
        // Disable animations if battery is low
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2) {
                    document.body.classList.add('low-battery');
                    console.log('🔋 Low battery detected, reducing animations');
                }
            });
        }
    }
}

// Initialize all animation systems
document.addEventListener('DOMContentLoaded', () => {
    new VisionOSAnimations();
    new ScrollAnimations();
    new PerformanceMonitor();
    
    console.log('✨ VisionOS Animations Initialized');
});

// Add performance-based CSS
const performanceStyles = document.createElement('style');
performanceStyles.textContent = `
    .low-performance * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }
    
    .low-end-device .particle-bg,
    .low-battery .particle-bg {
        display: none !important;
    }
    
    .low-end-device .floating-card:hover,
    .low-battery .floating-card:hover {
        transform: none !important;
    }
    
    .section-active {
        animation: sectionFadeIn 1s ease-out;
    }
    
    @keyframes sectionFadeIn {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: cardSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    @keyframes cardSlideUp {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(performanceStyles);
