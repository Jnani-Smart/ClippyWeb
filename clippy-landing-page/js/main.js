// Main JavaScript for Clippy Landing Page
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize smooth scrolling polyfill
    if (window.smoothscrollPolyfill) {
        window.smoothscrollPolyfill.polyfill();
    }
    
    // Initialize all features
    initializeNavigation();
    initializeHeroAnimations();
    initializeScrollAnimations();
    initializeInteractiveCards();
    initializeGallery();
    initializeParticles();
    initializeTheme();
    
    console.log('🚀 Clippy Landing Page Initialized');
}

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.nav-glass');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    // Scroll behavior for navigation
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Add/remove background blur based on scroll
        if (currentScrollY > 100) {
            nav.classList.add('enhanced');
        } else {
            nav.classList.remove('enhanced');
        }
        
        lastScrollY = currentScrollY;
    }, 16));
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavLink(targetId);
            }
        });
    });
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Hero animations
function initializeHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions, .hero-stats');
    const appWindow = document.querySelector('.app-window');
    
    // Animate hero elements on load
    heroElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // App window 3D interaction
    if (appWindow) {
        let mouseX = 0;
        let mouseY = 0;
        let windowRect = appWindow.getBoundingClientRect();
        
        const updateWindowRect = () => {
            windowRect = appWindow.getBoundingClientRect();
        };
        
        window.addEventListener('resize', updateWindowRect);
        
        document.addEventListener('mousemove', throttle((e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            const centerX = windowRect.left + windowRect.width / 2;
            const centerY = windowRect.top + windowRect.height / 2;
            
            const rotateX = (mouseY - centerY) / windowRect.height * 10;
            const rotateY = (centerX - mouseX) / windowRect.width * 15;
            
            appWindow.style.transform = `
                perspective(1000px) 
                rotateX(${Math.max(-15, Math.min(15, rotateX))}deg) 
                rotateY(${Math.max(-20, Math.min(20, rotateY))}deg) 
                translateZ(0)
            `;
        }, 16));
        
        // Reset on mouse leave
        appWindow.addEventListener('mouseleave', () => {
            appWindow.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(10deg)';
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Stagger animations for children
                const children = entry.target.querySelectorAll('.feature-card, .gallery-item, .stat-item');
                children.forEach((child, index) => {
                    child.classList.add('fade-in');
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual elements
    const animateElements = document.querySelectorAll('.feature-card, .gallery-card, .download-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Interactive card effects
function initializeInteractiveCards() {
    const cards = document.querySelectorAll('.feature-card, .gallery-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Mouse move effect for interactive cards
        if (card.classList.contains('interactive-card')) {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.setProperty('--mouse-x', `${x}px`);
                this.style.setProperty('--mouse-y', `${y}px`);
            });
        }
    });
}

// Gallery functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-card');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openImageModal(img.src, img.alt);
            }
        });
    });
}

function openImageModal(src, alt) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-visionos';
    modal.innerHTML = `
        <div class="modal-content">
            <div style="text-align: center;">
                <img src="${src}" alt="${alt}" style="max-width: 100%; border-radius: 16px; margin-bottom: 16px;">
                <p style="color: rgba(255, 255, 255, 0.8); margin: 0;">${alt}</p>
                <button class="btn-glass btn-secondary" style="margin-top: 24px;" onclick="closeModal(this)">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    requestAnimationFrame(() => {
        modal.classList.add('open');
    });
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(this);
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function closeModal(element) {
    const modal = element.closest('.modal-visionos');
    if (modal) {
        modal.classList.remove('open');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Particles system
function initializeParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-bg';
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        particleContainer.appendChild(particle);
    }
    
    heroSection.appendChild(particleContainer);
}

// Theme and visual enhancements
function initializeTheme() {
    // Add theme class to body
    document.body.classList.add('visionos-theme');
    
    // Add loading state removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Handle prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
}

// Button enhancements
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn-glass');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add glow effect on hover
        button.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '0.2';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
}

// Download tracking
function trackDownload(source) {
    // Analytics tracking would go here
    console.log(`Download initiated from: ${source}`);
    
    // Optional: Show download confirmation
    showNotification('Download started! Check your Downloads folder.', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 16px 24px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility functions
function throttle(func, limit) {
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

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    .notification-success {
        border-left: 4px solid #34C759;
    }
    
    .notification-error {
        border-left: 4px solid #FF3B30;
    }
    
    .notification-info {
        border-left: 4px solid #007AFF;
    }
`;
document.head.appendChild(style);

// Initialize button enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', initializeButtons);

// Export functions for global access
window.closeModal = closeModal;
window.trackDownload = trackDownload;
window.showNotification = showNotification;
