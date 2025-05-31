// ================================================== //
// SUILATAM.XYZ - COMMUNITY-FOCUSED INTERACTIONS     //
// ================================================== //

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🚀 SuiLatam - Experiencia cargada', 'color: #4F8EE0; font-size: 18px; font-weight: bold;');
    
    // Initialize core functionality in the correct order
    initNavigation();
    initStats();
    initCreativeHero();
    initCreativeCommunityHero();
    
    // Performance optimized systems - enable only what's needed
    initOptimizedParticleSystem();
    initScrollAnimations();
    initCounterAnimations();
    initCommunityConnections();
});

// ================================================== //
// SUILATAM.XYZ - CREATIVE COMMUNITY HERO            //
// ================================================== //

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🚀 SuiLatam - Nueva experiencia cargada!', 'color: #4F8EE0; font-size: 18px; font-weight: bold;');
    
    // Initialize creative interactions
    initCreativeHero();
    initNavigation();
    
    // Initialize stats with correct values
    initStats();
});

// ================================================== //
// SUILATAM.XYZ - MODERN PLASMA & PARTICLE SYSTEM    //
// ================================================== //

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🔥 SuiLatam - Sistema Plasma Activado!', 'color: #4F8EE0; font-size: 20px; font-weight: bold;');
    
    // Initialize all modern systems
    initCreativeHero();
    initNavigation();
    initStats();
    initModernParticleSystem();
    initCursorTrail();
    initPlasmaInteraction();
    initAdvancedEffects();
});

// ================================================== //
// INITIALIZE STATISTICS                              //
// ================================================== //
function initStats() {
    // First set the values directly in HTML to prevent NaN
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].innerHTML = '2,188';
        statNumbers[1].innerHTML = '14';
        statNumbers[2].innerHTML = '100%';
    }
    
    // Also ensure any counter animations use correct values
    setTimeout(() => {
        const statItems = document.querySelectorAll('.stat-number');
        if (statItems.length >= 3) {
            statItems[0].textContent = '2,188';
            statItems[1].textContent = '14';
            statItems[2].textContent = '100%';
        }
    }, 100);
}

// ================================================== //
// CREATIVE HERO INTERACTIONS                         //
// ================================================== //
function initCreativeHero() {
    const creativeBtn = document.querySelector('.btn-creative-primary');
    if (creativeBtn) {
        creativeBtn.addEventListener('click', () => {
            createLightweightSparkles(creativeBtn);
            showMessage('¡Bienvenido a la familia SuiLatam! 🎉');
        });
    }
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'translateY(-5px) scale(1.03)';
            stat.style.filter = 'drop-shadow(0 5px 10px rgba(79, 142, 224, 0.3))';
        });
        
        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'translateY(0) scale(1)';
            stat.style.filter = 'none';
        });
    });
    
    const communityCircle = document.querySelector('.community-circle');
    if (communityCircle) {
        communityCircle.addEventListener('click', () => {
            communityCircle.style.transform = 'scale(1.1)';
            communityCircle.style.filter = 'brightness(1.2)';
            setTimeout(() => {
                communityCircle.style.transform = 'scale(1)';
                communityCircle.style.filter = 'none';
            }, 300);
        });
    }
}

// ================================================== //
// LIGHTWEIGHT SPARKLE EFFECT                         //
// ================================================== //
function createLightweightSparkles(element) {
    const rect = element.getBoundingClientRect();
    const totalSparkles = window.innerWidth < 768 ? 6 : 10;
    
    for (let i = 0; i < totalSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: linear-gradient(45deg, #00d4ff, #a855f7);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            box-shadow: 0 0 5px currentColor;
        `;
        
        document.body.appendChild(sparkle);
        
        const angle = (i / totalSparkles) * Math.PI * 2;
        const distance = 60 + Math.random() * 30;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        sparkle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1
            },
            { 
                transform: `translate(${endX}px, ${endY}px) scale(0)`, 
                opacity: 0
            }
        ], {
            duration: 600 + Math.random() * 300,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}

// ================================================== //
// MESSAGE SYSTEM                                     //
// ================================================== //
function showMessage(text) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, #4F8EE0, #a855f7);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
    `;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        message.style.transform = 'translateX(100%)';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// ================================================== //
// NAVIGATION                                         //
// ================================================== //
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
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
}

// ================================================== //
// CREATIVE COMMUNITY HERO                            //
// ================================================== //
function initCreativeCommunityHero() {
    // Create community circles
    createCommunityCircles();
    
    // Create blobs
    createCommunityBlobs();
    
    // Update subtitle with community focus
    updateCommunitySubtitle();
    
    // Add 3D tilt effect to visual container
    addTiltEffect();
    
    // Update stat labels
    updateStatLabels();
}

function createCommunityCircles() {
    const container = document.querySelector('.hero-background');
    if (!container) return;
    
    const circlesContainer = document.createElement('div');
    circlesContainer.className = 'community-circles';
    
    // Create 3 main circles
    for (let i = 1; i <= 3; i++) {
        const circle = document.createElement('div');
        circle.className = `community-circle circle-${i}`;
        circlesContainer.appendChild(circle);
    }
    
    container.appendChild(circlesContainer);
}

function createCommunityBlobs() {
    const container = document.querySelector('.hero-background');
    if (!container) return;
    
    const blobsContainer = document.createElement('div');
    blobsContainer.className = 'community-blobs';
    
    // Create 2 main blobs
    for (let i = 1; i <= 2; i++) {
        const blob = document.createElement('div');
        blob.className = `community-blob blob-${i}`;
        blobsContainer.appendChild(blob);
    }
    
    container.appendChild(blobsContainer);
}

function updateCommunitySubtitle() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    subtitle.innerHTML = subtitle.innerHTML.replace(
        'comunidad latina', 
        '<span class="community-highlight">comunidad latina</span>'
    );
}

function addTiltEffect() {
    const container = document.querySelector('.visual-container');
    if (!container) return;
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 8;
        const rotateX = ((centerY - y) / centerY) * 5;
        
        container.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    container.addEventListener('mouseleave', () => {
        container.style.transform = 'rotateY(10deg) rotateX(5deg)';
    });
}

function updateStatLabels() {
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels.forEach(label => {
        if (label.textContent.includes('Miembros')) {
            label.setAttribute('data-original', label.textContent);
            label.setAttribute('data-community', 'Familias');
        }
    });
    
    // Add hover event to switch labels
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        const label = stat.querySelector('.stat-label');
        if (!label) return;
        
        stat.addEventListener('mouseenter', () => {
            if (label.getAttribute('data-community')) {
                label.textContent = label.getAttribute('data-community');
            }
        });
        
        stat.addEventListener('mouseleave', () => {
            if (label.getAttribute('data-original')) {
                label.textContent = label.getAttribute('data-original');
            }
        });
    });
}

// ================================================== //
// MINIMALISTIC PARTICLE SYSTEM                       //
// ================================================== //
function initMinimalisticParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    
    container.appendChild(canvas);
    
    let particles = [];
    let mouse = { x: null, y: null, radius: 80 };
    
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Recreate particles on resize
        createParticles();
    }
    
    // Minimalistic community particle
    class CommunityParticle {
        constructor(x, y) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.color = '#4F8EE0';
            this.opacity = Math.random() * 0.2 + 0.1;
            this.speed = Math.random() * 0.2 + 0.1;
            this.directionX = Math.random() * 0.4 - 0.2;
            this.directionY = Math.random() * 0.4 - 0.2;
            this.communityLinks = [];
        }
        
        update() {
            // Slow, gentle movement
            this.x += this.directionX;
            this.y += this.directionY;
            
            // Wrap around edges
            if (this.x < 0 || this.x > canvas.width) this.directionX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.directionY *= -1;
            
            // Mouse interaction
            if (mouse.x != null && mouse.y != null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance || 0;
                    const directionY = dy / distance || 0;
                    
                    this.x += directionX * force * 2;
                    this.y += directionY * force * 2;
                }
            }
            
            // Find connections - representing community links
            this.communityLinks = [];
            for (let i = 0; i < particles.length; i++) {
                const dx = this.x - particles[i].x;
                const dy = this.y - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100 && this !== particles[i]) {
                    this.communityLinks.push({
                        x: particles[i].x,
                        y: particles[i].y,
                        size: particles[i].size,
                        opacity: (100 - distance) / 100 * 0.15
                    });
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(79, 142, 224, ${this.opacity})`;
            ctx.fill();
            
            // Draw connections (community links)
            this.communityLinks.forEach(link => {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(link.x, link.y);
                ctx.strokeStyle = `rgba(79, 142, 224, ${link.opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            });
        }
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.min(40, Math.floor(canvas.width * canvas.height / 15000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new CommunityParticle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Mouse interaction
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Start animation
    animate();
}

// ================================================== //
// COMMUNITY CONNECTIONS                              //
// ================================================== //
function initCommunityConnections() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const connectionsContainer = document.createElement('div');
    connectionsContainer.className = 'community-connections';
    heroSection.appendChild(connectionsContainer);
    
    // Update stats to show "familias" instead of "miembros"
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels.forEach(label => {
        if (label.textContent.toLowerCase().includes('miembros')) {
            label.setAttribute('data-hover', 'Familias');
        }
    });
}

// ================================================== //
// COUNTER ANIMATIONS                                //
// ================================================== //
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    const gentleAnimateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const speed = 50; // Slower for more gentle animation
        const increment = Math.ceil(target / (1000 / speed));
        let currentCount = 0;
        
        const updateCounter = () => {
            currentCount += increment;
            
            if (currentCount >= target) {
                counter.innerText = target;
                if (counter.innerText.includes('%')) {
                    counter.innerText += '%';
                }
                return;
            }
            
            counter.innerText = currentCount;
            setTimeout(updateCounter, speed);
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer for triggering counter animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gentleAnimateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
}

// ================================================== //
// SCROLL ANIMATIONS                                  //
// ================================================== //
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate feature cards within the section
                const cards = entry.target.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 200 * index);
                });
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Initialize feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
}

// ================================================== //
// UTILITY FUNCTIONS                                  //
// ================================================== //
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

// ================================================== //
// MODERN PARTICLE SYSTEM                             //
// ================================================== //
let particleSystem = null;

function initModernParticleSystem() {
    const container = document.querySelector('.modern-particles');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';
    
    container.appendChild(canvas);
    
    let particles = [];
    let mouse = { x: 0, y: 0, radius: 150 };
    let animationId;
    
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        createParticles();
    }
    
    // Advanced Particle Class
    class PlasmaParticle {
        constructor() {
            this.reset();
            this.life = Math.random();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 0.5;
            this.maxSize = this.size;
            this.hue = Math.random() * 60 + 200; // Blue to purple range
            this.saturation = 70 + Math.random() * 30;
            this.lightness = 50 + Math.random() * 30;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.life = 1;
            this.decay = Math.random() * 0.005 + 0.001;
        }
        
        update() {
            // Mouse interaction
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.vx += Math.cos(angle) * force * 0.01;
                this.vy += Math.sin(angle) * force * 0.01;
                this.size = this.maxSize * (1 + force * 0.5);
                this.alpha = Math.min(1, this.alpha + force * 0.1);
            } else {
                this.size += (this.maxSize - this.size) * 0.1;
                this.alpha += (0.3 - this.alpha) * 0.1;
            }
            
            // Movement
            this.x += this.vx;
            this.y += this.vy;
            
            // Velocity dampening
            this.vx *= 0.99;
            this.vy *= 0.99;
            
            // Boundary wrapping
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            // Life cycle
            this.life -= this.decay;
            if (this.life <= 0) {
                this.reset();
            }
            
            // Color shifting
            this.hue += 0.1;
            if (this.hue > 260) this.hue = 200;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha * this.life;
            
            // Create glow effect
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 3
            );
            gradient.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0.8)`);
            gradient.addColorStop(0.5, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0.3)`);
            gradient.addColorStop(1, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Core particle
            ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness + 20}%, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 8000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new PlasmaParticle());
        }
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.15;
                    ctx.strokeStyle = `rgba(79, 142, 224, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }
    
    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
    
    particleSystem = { canvas, ctx, particles, mouse };
}

// ================================================== //
// CURSOR TRAIL SYSTEM                                //
// ================================================== //
function initCursorTrail() {
    const trails = [];
    const maxTrails = 15;
    
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        trails.push({
            element: trail,
            x: x,
            y: y,
            life: 1,
            size: 20
        });
        
        if (trails.length > maxTrails) {
            const oldTrail = trails.shift();
            oldTrail.element.remove();
        }
    }
    
    function updateTrails() {
        trails.forEach((trail, index) => {
            trail.life -= 0.05;
            trail.size *= 0.95;
            
            trail.element.style.opacity = trail.life;
            trail.element.style.transform = `scale(${trail.life})`;
            
            if (trail.life <= 0) {
                trail.element.remove();
                trails.splice(index, 1);
            }
        });
        
        requestAnimationFrame(updateTrails);
    }
    
    let lastMouseTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMouseTime > 50) {
            createTrail(e.clientX, e.clientY);
            lastMouseTime = now;
        }
    });
    
    updateTrails();
}

// ================================================== //
// PLASMA INTERACTION SYSTEM                          //
// ================================================== //
function initPlasmaInteraction() {
    const plasma = document.querySelector('.plasma-container');
    if (!plasma) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        plasma.style.background = `
            radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(79, 142, 224, 0.4) 0%, transparent 50%),
            radial-gradient(circle at ${80 - mouseX * 0.3}% ${20 + mouseY * 0.2}%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
            radial-gradient(circle at ${40 + mouseX * 0.2}% ${80 - mouseY * 0.3}%, rgba(0, 212, 255, 0.25) 0%, transparent 50%),
            radial-gradient(circle at ${90 - mouseX * 0.1}% ${90 - mouseY * 0.1}%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
            radial-gradient(circle at ${10 + mouseX * 0.1}% ${10 + mouseY * 0.1}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)
        `;
    });
}

// ================================================== //
// ADVANCED EFFECTS SYSTEM                            //
// ================================================== //
function initAdvancedEffects() {
    // Glitch effect on hover
    const heroTitle = document.querySelector('.hero-title-creative');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.style.filter = 'hue-rotate(45deg) saturate(1.5)';
            heroTitle.style.textShadow = '2px 0 #ff0000, -2px 0 #00ff00';
            
            setTimeout(() => {
                heroTitle.style.filter = 'none';
                heroTitle.style.textShadow = 'none';
            }, 200);
        });
    }
    
    // Orb interaction
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach(orb => {
        orb.addEventListener('mouseenter', () => {
            orb.style.transform = 'scale(1.5)';
            orb.style.filter = 'blur(1px) brightness(1.5)';
        });
        
        orb.addEventListener('mouseleave', () => {
            orb.style.transform = 'scale(1)';
            orb.style.filter = 'blur(2px)';
        });
    });
    
    // Enhanced button effects
    const creativeBtn = document.querySelector('.btn-creative-primary');
    if (creativeBtn) {
        creativeBtn.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'none';
            creativeBtn.style.boxShadow = '0 0 50px rgba(79, 142, 224, 0.8)';
        });
        
        creativeBtn.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'auto';
            creativeBtn.style.boxShadow = '0 10px 30px rgba(79, 142, 224, 0.4)';
        });
    }
}

// ================================================== //
// OPTIMIZED PARTICLE SYSTEM                          //
// ================================================== //
function initOptimizedParticleSystem() {
    const container = document.querySelector('.modern-particles');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);
    
    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Limit particles based on device capability
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 30;
    const particles = [];
    
    function resizeCanvas() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Recreate particles on resize
        particles.length = 0;
        createParticles();
    }
    
    class OptimizedParticle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 0.5 + 0.1;
            this.directionX = Math.random() * 1 - 0.5;
            this.directionY = Math.random() * 1 - 0.5;
            this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.3})`;
        }
        
        update() {
            this.x += this.directionX * this.speed;
            this.y += this.directionY * this.speed;
            
            if (this.x < 0 || this.x > width) {
                this.directionX *= -1;
            }
            
            if (this.y < 0 || this.y > height) {
                this.directionY *= -1;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new OptimizedParticle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        // Draw connections (only on desktop)
        if (!isMobile) {
            drawOptimizedConnections();
        }
        
        requestAnimationFrame(animate);
    }
    
    function drawOptimizedConnections() {
        // Skip every other particle to improve performance
        for (let i = 0; i < particles.length; i += 2) {
            for (let j = i + 2; j < particles.length; j += 2) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Initialize
    window.addEventListener('resize', throttle(resizeCanvas, 200));
    resizeCanvas();
    createParticles();
    animate();
} 