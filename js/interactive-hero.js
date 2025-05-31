// === ULTRA MODERN INTERACTIVE HERO ===
class InteractiveHero {
  constructor() {
    this.canvas = document.getElementById('interactiveCanvas');
    this.centralLogo = document.getElementById('centralLogo');
    this.particleSystem = document.getElementById('particleSystem');
    this.cards = document.querySelectorAll('.card');
    this.mousePosition = { x: 0, y: 0 };
    this.particles = [];
    this.maxParticles = 50;
    
    this.init();
  }

  init() {
    if (!this.canvas) return;
    
    this.setupEventListeners();
    this.createParticles();
    this.createConnectionLines();
    this.animateParticles();
    this.setupCardInteractions();
    this.setupMagneticEffect();
  }

  setupEventListeners() {
    // Mouse movement tracking
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosition.x = e.clientX - rect.left;
      this.mousePosition.y = e.clientY - rect.top;
      
      this.updateParticlesPosition();
      this.updateMagneticField();
      this.updateConnectionLines();
    });

    // Mouse leave event
    this.canvas.addEventListener('mouseleave', () => {
      this.resetInteractions();
    });

    // Central logo interactions
    this.centralLogo.addEventListener('mouseenter', () => {
      this.activateMagneticField();
    });

    this.centralLogo.addEventListener('mouseleave', () => {
      this.deactivateMagneticField();
    });

    this.centralLogo.addEventListener('click', () => {
      this.triggerLogoAnimation();
    });
  }

  createParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const x = Math.random() * 400;
    const y = Math.random() * 400;
    const size = Math.random() * 3 + 2;
    const opacity = Math.random() * 0.8 + 0.2;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = opacity;
    
    // Random color from palette
    const colors = ['#4F8EE0', '#a855f7', '#00d4ff'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    this.particleSystem.appendChild(particle);
    this.particles.push({
      element: particle,
      x: x,
      y: y,
      originalX: x,
      originalY: y,
      size: size,
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      }
    });
  }

  animateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      
      // Boundary check
      if (particle.x < 0 || particle.x > 400) particle.velocity.x *= -1;
      if (particle.y < 0 || particle.y > 400) particle.velocity.y *= -1;
      
      // Apply position
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
    });
    
    requestAnimationFrame(() => this.animateParticles());
  }

  updateParticlesPosition() {
    this.particles.forEach(particle => {
      const distance = this.getDistance(
        particle.x, particle.y,
        this.mousePosition.x, this.mousePosition.y
      );
      
      // Magnetic attraction effect
      if (distance < 100) {
        const force = (100 - distance) / 100;
        const angle = Math.atan2(
          this.mousePosition.y - particle.y,
          this.mousePosition.x - particle.x
        );
        
        particle.velocity.x += Math.cos(angle) * force * 0.02;
        particle.velocity.y += Math.sin(angle) * force * 0.02;
        
        // Limit velocity
        particle.velocity.x = Math.max(-2, Math.min(2, particle.velocity.x));
        particle.velocity.y = Math.max(-2, Math.min(2, particle.velocity.y));
        
        // Glow effect
        particle.element.style.boxShadow = `0 0 ${force * 20}px rgba(79, 142, 224, ${force})`;
      } else {
        // Return to normal
        particle.element.style.boxShadow = 'none';
      }
    });
  }

  createConnectionLines() {
    const svg = this.canvas.querySelector('.lines-svg');
    const lineGroup = svg.querySelector('.line-group');
    
    // Create connection lines between cards and center
    this.cards.forEach((card, index) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      line.classList.add('connection-line');
      line.setAttribute('id', `line-${index}`);
      lineGroup.appendChild(line);
    });
  }

  updateConnectionLines() {
    const centerX = 200;
    const centerY = 200;
    
    this.cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const canvasRect = this.canvas.getBoundingClientRect();
      
      const cardX = rect.left - canvasRect.left + rect.width / 2;
      const cardY = rect.top - canvasRect.top + rect.height / 2;
      
      // Calculate mouse influence
      const mouseDistance = this.getDistance(
        this.mousePosition.x, this.mousePosition.y,
        cardX, cardY
      );
      
      let controlX = (centerX + cardX) / 2;
      let controlY = (centerY + cardY) / 2;
      
      // Bend line towards mouse if nearby
      if (mouseDistance < 80) {
        const influence = (80 - mouseDistance) / 80;
        controlX += (this.mousePosition.x - controlX) * influence * 0.3;
        controlY += (this.mousePosition.y - controlY) * influence * 0.3;
      }
      
      const pathData = `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${cardX} ${cardY}`;
      
      const line = document.getElementById(`line-${index}`);
      if (line) {
        line.setAttribute('d', pathData);
        line.style.opacity = mouseDistance < 80 ? 0.8 : 0.3;
      }
    });
  }

  setupCardInteractions() {
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateY(20deg) rotateX(10deg) scale(1.1)';
        this.createCardParticles(card);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) rotateY(15deg) rotateX(5deg) scale(1)';
      });

      card.addEventListener('click', () => {
        this.triggerCardAnimation(card);
      });
    });
  }

  createCardParticles(card) {
    const rect = card.getBoundingClientRect();
    const canvasRect = this.canvas.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.background = '#4F8EE0';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      const startX = rect.left - canvasRect.left + rect.width / 2;
      const startY = rect.top - canvasRect.top + rect.height / 2;
      
      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';
      
      this.canvas.appendChild(particle);
      
      // Animate particle
      const angle = (Math.PI * 2 * i) / 5;
      const distance = 30;
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;
      
      particle.animate([
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        },
        {
          transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 800,
        easing: 'ease-out'
      }).onfinish = () => {
        particle.remove();
      };
    }
  }

  setupMagneticEffect() {
    // Add magnetic field visualization
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.centralLogo.getBoundingClientRect();
      const canvasRect = this.canvas.getBoundingClientRect();
      
      const logoX = rect.left - canvasRect.left + rect.width / 2;
      const logoY = rect.top - canvasRect.top + rect.height / 2;
      
      const distance = this.getDistance(
        this.mousePosition.x, this.mousePosition.y,
        logoX, logoY
      );
      
      if (distance < 100) {
        const magneticField = this.centralLogo.querySelector('.magnetic-field');
        if (magneticField) {
          const intensity = (100 - distance) / 100;
          magneticField.style.opacity = intensity * 0.6;
          magneticField.style.transform = `translate(-50%, -50%) scale(${1 + intensity * 0.2})`;
        }
      }
    });
  }

  updateMagneticField() {
    const rect = this.centralLogo.getBoundingClientRect();
    const canvasRect = this.canvas.getBoundingClientRect();
    
    const logoX = rect.left - canvasRect.left + rect.width / 2;
    const logoY = rect.top - canvasRect.top + rect.height / 2;
    
    const distance = this.getDistance(
      this.mousePosition.x, this.mousePosition.y,
      logoX, logoY
    );
    
    // Update logo container based on mouse proximity
    if (distance < 80) {
      const influence = (80 - distance) / 80;
      const logoContainer = this.centralLogo.querySelector('.logo-container');
      if (logoContainer) {
        logoContainer.style.transform = `scale(${1 + influence * 0.1}) translate(${(this.mousePosition.x - logoX) * influence * 0.1}px, ${(this.mousePosition.y - logoY) * influence * 0.1}px)`;
      }
    }
  }

  activateMagneticField() {
    const magneticField = this.centralLogo.querySelector('.magnetic-field');
    if (magneticField) {
      magneticField.style.opacity = '1';
    }
  }

  deactivateMagneticField() {
    const magneticField = this.centralLogo.querySelector('.magnetic-field');
    if (magneticField) {
      magneticField.style.opacity = '0';
    }
  }

  triggerLogoAnimation() {
    const logoContainer = this.centralLogo.querySelector('.logo-container');
    const rings = this.centralLogo.querySelectorAll('.ring');
    
    // Logo pulse animation
    logoContainer.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' }
    ], {
      duration: 600,
      easing: 'ease-out'
    });
    
    // Ring burst effect
    rings.forEach((ring, index) => {
      ring.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.6 },
        { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.6 }
      ], {
        duration: 1000,
        delay: index * 100,
        easing: 'ease-out'
      });
    });
    
    // Create explosion particles
    this.createExplosionEffect();
  }

  triggerCardAnimation(card) {
    // Card flip animation
    card.animate([
      { transform: 'translateY(-15px) rotateY(20deg) rotateX(10deg) scale(1.1)' },
      { transform: 'translateY(-15px) rotateY(200deg) rotateX(10deg) scale(1.1)' },
      { transform: 'translateY(-15px) rotateY(360deg) rotateX(10deg) scale(1.1)' }
    ], {
      duration: 800,
      easing: 'ease-in-out'
    });
  }

  createExplosionEffect() {
    const centerX = 200;
    const centerY = 200;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      
      this.canvas.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / 20;
      const distance = 60 + Math.random() * 40;
      const endX = centerX + Math.cos(angle) * distance;
      const endY = centerY + Math.sin(angle) * distance;
      
      particle.animate([
        {
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1
        },
        {
          transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 1200,
        easing: 'ease-out'
      }).onfinish = () => {
        particle.remove();
      };
    }
  }

  resetInteractions() {
    // Reset all interactive elements
    const logoContainer = this.centralLogo.querySelector('.logo-container');
    if (logoContainer) {
      logoContainer.style.transform = 'scale(1)';
    }
    
    const magneticField = this.centralLogo.querySelector('.magnetic-field');
    if (magneticField) {
      magneticField.style.opacity = '0';
    }
    
    // Reset particles
    this.particles.forEach(particle => {
      particle.element.style.boxShadow = 'none';
    });
  }

  getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveHero();
});

// Performance optimizations for mobile
if (window.innerWidth <= 768) {
  // Reduce particle count on mobile
  InteractiveHero.prototype.maxParticles = 20;
  
  // Disable some heavy effects on mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .particle-system {
        display: none;
      }
      .connection-lines {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
} 