/* === ENHANCED SUILATAM JS v3.0 - ULTRA MODERN INTERACTIONS === */

// Global variables
let mouseX = 0;
let mouseY = 0;
let cursorTrails = [];
let magneticParticles = [];
let animationFrameId = null;
let isReducedMotion = false;

// Initialize all systems
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SuiLatam Ultra Modern System Initializing...');
    
    // Check for reduced motion preference
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isReducedMotion) {
        initCustomCursor();
        initMouseTracking();
        initMagneticParticles();
        initAdvancedScrollEffects();
        initInteractiveOrbs();
        initMorphingElements();
        initAdvancedButtonEffects();
        initHolographicEffects();
        startAnimationLoop();
    }
    
    // Always initialize these
    initSmoothScrolling();
    initAnimatedCounters();
    initScrollAnimations();
    initEasterEggs();
    
    console.log('✨ SuiLatam System Fully Loaded!');
});

/* === CUSTOM CURSOR SYSTEM === */
function initCustomCursor() {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Create cursor trails
    for (let i = 0; i < 8; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        cursorTrails.push({
            element: trail,
            x: 0,
            y: 0,
            delay: i * 2
        });
    }
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update main cursor
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
        
        // Update CSS variables for background effects
        const x = (mouseX / window.innerWidth) * 100;
        const y = (mouseY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', x + '%');
        document.documentElement.style.setProperty('--mouse-y', y + '%');
    });
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .interactive-circle, .stat-card, .feature-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

/* === MOUSE TRACKING & ADVANCED EFFECTS === */
function initMouseTracking() {
    let lastMoveTime = 0;
    const moveThreshold = 16; // ~60fps
    
    document.addEventListener('mousemove', throttle((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create magnetic effect on particles
        updateMagneticField(mouseX, mouseY);
        
        // Update orb positions based on mouse
        updateOrbPositions(mouseX, mouseY);
        
        // Create trail particles
        if (Date.now() - lastMoveTime > 50) {
            createTrailParticle(mouseX, mouseY);
            lastMoveTime = Date.now();
        }
    }, 16));
}

/* === MAGNETIC PARTICLE SYSTEM === */
function initMagneticParticles() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    // Create magnetic field container
    const magneticField = document.createElement('div');
    magneticField.className = 'magnetic-field';
    heroBackground.appendChild(magneticField);
    
    // Generate magnetic particles
    for (let i = 0; i < 30; i++) {
        createMagneticParticle(magneticField);
    }
}

function createMagneticParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'magnetic-particle';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.7 + 0.3;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
    
    magneticParticles.push({
        element: particle,
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        velocity: { x: 0, y: 0 },
        mass: size * 0.5
    });
}

function updateMagneticField(mouseX, mouseY) {
    magneticParticles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.02;
            particle.velocity.x += dx * force;
            particle.velocity.y += dy * force;
        }
        
        // Apply velocity with damping
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.velocity.x *= 0.98;
        particle.velocity.y *= 0.98;
        
        // Return to original position when far from mouse
        if (distance > maxDistance) {
            particle.x += (particle.originalX - particle.x) * 0.02;
            particle.y += (particle.originalY - particle.y) * 0.02;
        }
        
        // Update position
        particle.element.style.transform = `translate(${particle.x - particle.originalX}px, ${particle.y - particle.originalY}px)`;
    });
}

/* === INTERACTIVE ORBS === */
function initInteractiveOrbs() {
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        orb.addEventListener('mouseenter', () => {
            orb.style.transform = `scale(1.3) rotate(${Math.random() * 360}deg)`;
            orb.style.filter = 'blur(0px)';
        });
        
        orb.addEventListener('mouseleave', () => {
            orb.style.transform = '';
            orb.style.filter = '';
        });
    });
}

function updateOrbPositions(mouseX, mouseY) {
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const rect = orb.getBoundingClientRect();
        const orbCenterX = rect.left + rect.width / 2;
        const orbCenterY = rect.top + rect.height / 2;
        
        const dx = mouseX - orbCenterX;
        const dy = mouseY - orbCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
            const moveX = dx * 0.05;
            const moveY = dy * 0.05;
            orb.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + distance * 0.0005})`;
        } else {
            orb.style.transform = '';
        }
    });
}

/* === MORPHING ELEMENTS === */
function initMorphingElements() {
    const interactiveCircle = document.querySelector('.interactive-circle');
    if (!interactiveCircle) return;
    
    let morphAnimation = null;
    
    interactiveCircle.addEventListener('mouseenter', () => {
        if (morphAnimation) clearInterval(morphAnimation);
        
        morphAnimation = setInterval(() => {
            const hue = Math.random() * 360;
            const gradient = `conic-gradient(from ${hue}deg, 
                hsl(${hue}, 70%, 60%), 
                hsl(${(hue + 120) % 360}, 70%, 60%), 
                hsl(${(hue + 240) % 360}, 70%, 60%), 
                hsl(${hue}, 70%, 60%))`;
            interactiveCircle.style.background = gradient;
        }, 100);
    });
    
    interactiveCircle.addEventListener('mouseleave', () => {
        if (morphAnimation) {
            clearInterval(morphAnimation);
            morphAnimation = null;
        }
        interactiveCircle.style.background = '';
    });
    
    // 3D tilt effect
    interactiveCircle.addEventListener('mousemove', (e) => {
        const rect = interactiveCircle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        const rotateX = (deltaY / rect.height) * 20;
        const rotateY = (deltaX / rect.width) * 20;
        
        interactiveCircle.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
}

/* === HOLOGRAPHIC EFFECTS === */
function initHolographicEffects() {
    // Add holographic layer to hero
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const holographicLayer = document.createElement('div');
        holographicLayer.className = 'holographic-layer';
        heroBackground.appendChild(holographicLayer);
    }
    
    // Glitch effect on title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                heroTitle.style.filter = 'hue-rotate(90deg) saturate(2)';
                setTimeout(() => {
                    heroTitle.style.filter = '';
                }, 200);
            }
        }, 2000);
    }
}

/* === ADVANCED SCROLL EFFECTS === */
function initAdvancedScrollEffects() {
    const parallaxElements = [
        { selector: '.orb-1', speed: 0.5 },
        { selector: '.orb-2', speed: 0.3 },
        { selector: '.orb-3', speed: 0.7 },
        { selector: '.orb-4', speed: 0.4 }
    ];
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(({ selector, speed }) => {
            const element = document.querySelector(selector);
            if (element) {
                const yPos = scrollY * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    window.addEventListener('scroll', throttle(updateParallax, 16));
}

/* === TRAIL PARTICLES === */
function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'var(--accent)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9997';
    particle.style.opacity = '0.8';
    
    document.body.appendChild(particle);
    
    // Animate particle
    let opacity = 0.8;
    let scale = 1;
    const interval = setInterval(() => {
        opacity -= 0.05;
        scale += 0.02;
        
        if (opacity <= 0) {
            clearInterval(interval);
            particle.remove();
        } else {
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
        }
    }, 50);
}

/* === ANIMATION LOOP === */
function startAnimationLoop() {
    function animate() {
        // Update cursor trails
        cursorTrails.forEach((trail, index) => {
            const targetX = mouseX - 3;
            const targetY = mouseY - 3;
            
            trail.x += (targetX - trail.x) * (0.3 - index * 0.02);
            trail.y += (targetY - trail.y) * (0.3 - index * 0.02);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            trail.element.style.opacity = 0.7 - index * 0.1;
        });
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
}

/* === SMART SCROLL ANIMATIONS === */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different elements
                if (entry.target.classList.contains('feature-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('interactive');
                    }, 300);
                }
                
                if (entry.target.classList.contains('stat-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('hover-effect');
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.feature-card, .path-step, .community-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

/* === ANIMATED COUNTERS === */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            
            // Format number with commas
            counter.textContent = current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/* === SMOOTH SCROLLING === */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* === ADVANCED BUTTON EFFECTS === */
function initAdvancedButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .community-btn');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            createAdvancedRipple(this, e);
        });
        
        // Magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);
            
            if (distance < maxDistance) {
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Glow pulse on hover
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 50px rgba(79, 142, 224, 0.6)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

function createAdvancedRipple(element, event) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add ripple animation keyframes if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-animation {
                0% {
                    transform: scale(0);
                    opacity: 0.7;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/* === EASTER EGGS === */
function initEasterEggs() {
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            activateSecretMode();
            konamiCode = [];
        }
    });
    
    function activateSecretMode() {
        // Rainbow everything!
        document.body.style.animation = 'rainbow-bg 2s ease-in-out infinite';
        
        // Add rainbow animation
        if (!document.querySelector('#rainbow-styles')) {
            const style = document.createElement('style');
            style.id = 'rainbow-styles';
            style.textContent = `
                @keyframes rainbow-bg {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        showNotification('🌈 ¡Modo Secreto Activado! 🚀', 'success');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
}

/* === NOTIFICATION SYSTEM === */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(79, 142, 224, 0.4);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* === UTILITY FUNCTIONS === */
function throttle(func, wait) {
    let lastTime = 0;
    return function executedFunction(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            func(...args);
            lastTime = now;
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* === PERFORMANCE MONITORING === */
function initPerformanceMonitoring() {
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark('suilatam-start');
        
        window.addEventListener('load', () => {
            performance.mark('suilatam-end');
            performance.measure('suilatam-load', 'suilatam-start', 'suilatam-end');
            
            const measures = performance.getEntriesByType('measure');
            const loadTime = measures.find(m => m.name === 'suilatam-load');
            
            if (loadTime) {
                console.log(`🚀 SuiLatam loaded in ${loadTime.duration.toFixed(2)}ms`);
            }
        });
    }
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});

/* === EXPORT FOR MODULAR USE === */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCustomCursor,
        initMagneticParticles,
        showNotification,
        throttle,
        debounce
    };
} 