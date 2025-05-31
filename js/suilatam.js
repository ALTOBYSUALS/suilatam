// ================================================== //
// SUILATAM.XYZ - DARK THEME INTERACTIONS             //
// ================================================== //

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initGlitchEffects();
    initParticlesBackground();
    
    console.log('%c🔥 SuiLatam cargado exitosamente', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
    console.log('%cBienvenido, builder!', 'color: #a855f7; font-size: 14px;');
});

// ================================================== //
// NAVIGATION                                         //
// ================================================== //
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ================================================== //
// SCROLL ANIMATIONS                                  //
// ================================================== //
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
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const elementsToAnimate = document.querySelectorAll(`
        .feature-card,
        .hero-card,
        .section-header,
        .stat
    `);
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ================================================== //
// COUNTER ANIMATIONS                                 //
// ================================================== //
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const text = counter.textContent;
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = text;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ================================================== //
// GLITCH EFFECTS                                     //
// ================================================== //
function initGlitchEffects() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        if (!text.getAttribute('data-text')) {
            text.setAttribute('data-text', text.textContent);
        }
    });
    
    // Add random glitch effect on hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.classList.add('glitch-text');
            heroTitle.setAttribute('data-text', heroTitle.textContent);
            
            setTimeout(() => {
                heroTitle.classList.remove('glitch-text');
            }, 2000);
        });
    }
}

// ================================================== //
// PARTICLES BACKGROUND                               //
// ================================================== //
function initParticlesBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.3';
    
    hero.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const colors = ['#00d4ff', '#4faaff', '#a855f7'];
    
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
}

// ================================================== //
// BUTTON INTERACTIONS                                //
// ================================================== //
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 0 20px var(--accent-blue)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = 'var(--shadow-glow)';
            }
        });
        
        // Add subtle click effect
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Add ripple style if not already in document
            if (!document.querySelector('style#ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes ripple {
                        to { transform: scale(4); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            button.style.overflow = 'hidden';
            button.style.position = 'relative';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ================================================== //
// CARD HOVER EFFECTS                                 //
// ================================================== //
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.hero-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
            
            if (this.classList.contains('hero-card')) {
                this.style.borderColor = 'var(--accent-blue)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
});

// ================================================== //
// FORM VALIDATION                                    //
// ================================================== //
function initFormValidation() {
    // Will be implemented when forms are added
    const newsletterForms = document.querySelectorAll('form[data-newsletter]');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            if (isValidEmail(email)) {
                showNotification('¡Gracias! Te has suscrito exitosamente.', 'success');
                form.reset();
            } else {
                showNotification('Por favor, ingresa un email válido.', 'error');
            }
        });
    });
}

// ================================================== //
// UTILITY FUNCTIONS                                  //
// ================================================== //
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: 'var(--accent-green)',
        error: '#dc3545',
        info: 'var(--accent-blue)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background: ${colors[type] || colors.info};
        color: var(--bg-primary);
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 0 20px ${colors[type] || colors.info}60;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ================================================== //
// LAZY LOADING FOR IMAGES                           //
// ================================================== //
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// ================================================== //
// EASTER EGG: KONAMI CODE                           //
// ================================================== //
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.keyCode);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.toString() === konamiCode.toString()) {
            // Easter egg activated!
            document.body.style.filter = 'hue-rotate(180deg)';
            
            const message = document.createElement('div');
            message.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--bg-card);
                    border: 2px solid var(--accent-blue);
                    padding: 2rem;
                    border-radius: 8px;
                    z-index: 9999;
                    text-align: center;
                    box-shadow: 0 0 30px var(--accent-blue);
                ">
                    <h3 style="color: var(--accent-blue); margin-bottom: 1rem;">🚀 EASTER EGG DESBLOQUEADO!</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">Encontraste el modo secreto para developers!</p>
                    <div style="font-family: monospace; background: var(--bg-elevated); color: var(--accent-green); padding: 1rem; margin-bottom: 1.5rem; text-align: left; border-radius: 4px;">
                        $ sudo hack_the_planet<br>
                        > Access granted...<br>
                        > Initializing cyberpunk mode...<br>
                        > Complete!
                    </div>
                    <button onclick="this.parentElement.parentElement.remove(); document.body.style.filter = 'none';" 
                            style="padding: 0.75rem 1.5rem; background: var(--accent-blue); color: var(--bg-primary); border: none; border-radius: 4px; cursor: pointer;">
                        Cerrar
                    </button>
                </div>
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                if (message.parentElement) {
                    message.remove();
                    document.body.style.filter = 'none';
                }
            }, 10000);
        }
    });
})();

// ================================================== //
// ANALYTICS & TRACKING                              //
// ================================================== //
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        trackEvent('button_click', {
            button_text: button.textContent.trim(),
            button_location: button.closest('section')?.id || 'unknown'
        });
    }
});

// ================================================== //
// CONSOLE BRANDING                                   //
// ================================================== //
console.log(`%c
███████╗██╗   ██╗██╗██╗      █████╗ ████████╗ █████╗ ███╗   ███╗
██╔════╝██║   ██║██║██║     ██╔══██╗╚══██╔══╝██╔══██╗████╗ ████║
███████╗██║   ██║██║██║     ███████║   ██║   ███████║██╔████╔██║
╚════██║██║   ██║██║██║     ██╔══██║   ██║   ██╔══██║██║╚██╔╝██║
███████║╚██████╔╝██║███████╗██║  ██║   ██║   ██║  ██║██║ ╚═╝ ██║
╚══════╝ ╚═════╝ ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝
`, 'color: #00d4ff');

console.log(`%c🌎 Comunidad latina en el ecosistema Sui`, 'color: #a855f7; font-size: 14px;');
console.log(`%c✨ Construyamos el futuro financiero juntos`, 'color: #10b981; font-size: 12px;');

// ================================================== //
// ERROR HANDLING                                     //
// ================================================== //
window.addEventListener('error', function(e) {
    console.error('Error en SuiLatam:', e.error);
    // Log to analytics service if needed
});

// ================================================== //
// SERVICE WORKER (for future PWA features)          //
// ================================================== //
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ================================================== //
// WEB3 MODERN EFFECTS                                //
// ================================================== //
function initWeb3Effects() {
    createNodeConnections();
    createFloatingDataBlocks();
    initHoverEffects();
}

// Create node connection effect for Web3 visualization
function createNodeConnections() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        // Create connection container
        const connectionContainer = document.createElement('div');
        connectionContainer.className = 'node-connections';
        connectionContainer.style.position = 'absolute';
        connectionContainer.style.top = '0';
        connectionContainer.style.left = '0';
        connectionContainer.style.width = '100%';
        connectionContainer.style.height = '100%';
        connectionContainer.style.pointerEvents = 'none';
        connectionContainer.style.zIndex = '0';
        connectionContainer.style.opacity = '0.15';
        
        // Create nodes
        const nodeCount = 5 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'node';
            node.style.position = 'absolute';
            node.style.width = '6px';
            node.style.height = '6px';
            node.style.borderRadius = '50%';
            node.style.backgroundColor = getRandomColor();
            
            // Random position
            node.style.left = Math.random() * 90 + 5 + '%';
            node.style.top = Math.random() * 80 + 10 + '%';
            
            // Add glow effect
            node.style.boxShadow = `0 0 10px ${node.style.backgroundColor}`;
            
            connectionContainer.appendChild(node);
        }
        
        // Only add to sections that don't already have it
        if (!section.querySelector('.node-connections')) {
            section.style.position = 'relative';
            section.insertBefore(connectionContainer, section.firstChild);
        }
    });
    
    // Connect nodes with lines
    document.querySelectorAll('.node-connections').forEach(container => {
        const nodes = container.querySelectorAll('.node');
        const nodeArray = Array.from(nodes);
        
        nodeArray.forEach((node, index) => {
            // Connect to 1-3 random nodes
            const connectionCount = 1 + Math.floor(Math.random() * 3);
            
            for (let i = 0; i < connectionCount; i++) {
                const targetIndex = Math.floor(Math.random() * nodeArray.length);
                if (targetIndex !== index) {
                    const line = document.createElement('div');
                    line.className = 'connection-line';
                    line.style.position = 'absolute';
                    line.style.zIndex = '0';
                    line.style.backgroundColor = node.style.backgroundColor;
                    line.style.opacity = '0.6';
                    
                    // Set line dimensions and rotation
                    const x1 = parseFloat(node.style.left);
                    const y1 = parseFloat(node.style.top);
                    const x2 = parseFloat(nodeArray[targetIndex].style.left);
                    const y2 = parseFloat(nodeArray[targetIndex].style.top);
                    
                    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                    
                    line.style.width = `${length}%`;
                    line.style.height = '1px';
                    line.style.left = `${x1}%`;
                    line.style.top = `${y1}%`;
                    line.style.transformOrigin = '0 0';
                    line.style.transform = `rotate(${angle}deg)`;
                    
                    container.appendChild(line);
                }
            }
        });
    });
}

// Create floating data blocks (simulating blockchain data)
function createFloatingDataBlocks() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const dataBlocksContainer = document.createElement('div');
    dataBlocksContainer.className = 'floating-data-blocks';
    dataBlocksContainer.style.position = 'absolute';
    dataBlocksContainer.style.top = '0';
    dataBlocksContainer.style.left = '0';
    dataBlocksContainer.style.width = '100%';
    dataBlocksContainer.style.height = '100%';
    dataBlocksContainer.style.pointerEvents = 'none';
    dataBlocksContainer.style.zIndex = '1';
    
    // Create floating data blocks
    const blockCount = 8;
    const blockData = [
        '0x1a2b3c4d5e6f',
        'SUI',
        'Block #1337',
        'TX',
        '0xSUILATAM',
        'Move',
        'Blockchain',
        'LatAm'
    ];
    
    for (let i = 0; i < blockCount; i++) {
        const dataBlock = document.createElement('div');
        dataBlock.className = 'data-block';
        dataBlock.textContent = blockData[i] || `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
        dataBlock.style.position = 'absolute';
        dataBlock.style.padding = '4px 8px';
        dataBlock.style.borderRadius = '4px';
        dataBlock.style.backgroundColor = 'rgba(10, 10, 20, 0.7)';
        dataBlock.style.color = getRandomColor();
        dataBlock.style.border = `1px solid ${dataBlock.style.color}`;
        dataBlock.style.fontSize = '10px';
        dataBlock.style.fontFamily = 'monospace';
        dataBlock.style.boxShadow = `0 0 10px ${dataBlock.style.color}`;
        
        // Random position
        dataBlock.style.left = Math.random() * 80 + 10 + '%';
        dataBlock.style.top = Math.random() * 80 + 10 + '%';
        
        // Animation
        dataBlock.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
        
        dataBlocksContainer.appendChild(dataBlock);
    }
    
    // Add animation keyframes
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(10px, 10px) rotate(2deg); }
            50% { transform: translate(0, 20px) rotate(0deg); }
            75% { transform: translate(-10px, 10px) rotate(-2deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Only add if not already added
    if (!heroSection.querySelector('.floating-data-blocks')) {
        heroSection.style.position = 'relative';
        heroSection.appendChild(dataBlocksContainer);
    }
}

// Add modern hover effects to cards and buttons
function initHoverEffects() {
    // Glow effect on buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
            btn.style.transition = 'all 0.3s ease';
            btn.style.boxShadow = `0 10px 20px rgba(${hexToRgb(getComputedStyle(btn).backgroundColor)}, 0.3)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        });
    });
    
    // 3D tilt effect on feature cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateX = (yPercent - 0.5) * -10;
            const rotateY = (xPercent - 0.5) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

// Helper function to get random colors in web3 palette
function getRandomColor() {
    const colors = [
        '#00d4ff', // Sui blue
        '#a855f7', // Purple
        '#f43f5e', // Pink
        '#3b82f6', // Blue
        '#10b981', // Green
        '#f59e0b'  // Orange
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
    // If it's an rgb value already, extract the numbers
    if (hex.startsWith('rgb')) {
        const rgbValues = hex.match(/\d+/g);
        if (rgbValues && rgbValues.length >= 3) {
            return rgbValues.slice(0, 3).join(', ');
        }
    }
    
    // Otherwise convert hex to rgb
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return `${r}, ${g}, ${b}`;
    }
    return '0, 0, 0';
}

// Initialize the Web3 effects after DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add to the init functions
    initWeb3Effects();
}); 