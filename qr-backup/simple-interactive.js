// Simple Interactive Hero
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const suiCore = document.querySelector('.sui-core');
  const floatingPills = document.querySelectorAll('.floating-pill');
  const visualContainer = document.querySelector('.visual-container');
  
  // Mouse movement effect
  visualContainer.addEventListener('mousemove', function(e) {
    const rect = visualContainer.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    // Calculate movement percentage
    const xPercent = (x / rect.width - 0.5) * 20; // -10 to 10
    const yPercent = (y / rect.height - 0.5) * 20; // -10 to 10
    
    // Move core slightly
    suiCore.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
    
    // Move floating pills in opposite direction slightly
    floatingPills.forEach(pill => {
      const speed = parseFloat(pill.getAttribute('data-speed') || 1);
      pill.style.transform = `translate(${-xPercent * speed * 0.2}px, ${-yPercent * speed * 0.2}px)`;
    });
  });
  
  // Reset positions when mouse leaves
  visualContainer.addEventListener('mouseleave', function() {
    suiCore.style.transform = 'translate(0, 0)';
    
    floatingPills.forEach(pill => {
      pill.style.transform = 'translate(0, 0)';
    });
  });
  
  // Click effects
  suiCore.addEventListener('click', function() {
    // Pulse animation
    suiCore.classList.add('pulse-effect');
    
    // Create pulse effect with JS
    const pulseEffect = document.createElement('div');
    pulseEffect.classList.add('click-pulse');
    suiCore.appendChild(pulseEffect);
    
    // Remove after animation ends
    setTimeout(() => {
      suiCore.classList.remove('pulse-effect');
      pulseEffect.remove();
    }, 700);
  });
  
  // Floating pill click effects
  floatingPills.forEach(pill => {
    pill.addEventListener('click', function() {
      // Add bounce effect
      pill.classList.add('bounce-effect');
      
      // Trigger glow
      const pillGlow = pill.querySelector('.pill-glow');
      if (pillGlow) {
        pillGlow.style.left = '100%';
        setTimeout(() => {
          pillGlow.style.left = '-100%';
        }, 500);
      }
      
      // Remove effect after animation ends
      setTimeout(() => {
        pill.classList.remove('bounce-effect');
      }, 700);
    });
  });
  
  // Add some CSS for the JS-triggered effects
  const style = document.createElement('style');
  style.textContent = `
    .pulse-effect {
      animation: core-pulse 0.7s ease-out;
    }
    
    .bounce-effect {
      animation: pill-bounce 0.7s ease-out;
    }
    
    .click-pulse {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(79, 142, 224, 0.3);
      z-index: -1;
      animation: click-pulse 0.7s ease-out forwards;
    }
    
    @keyframes core-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    @keyframes pill-bounce {
      0% { transform: translateY(0); }
      30% { transform: translateY(-15px); }
      50% { transform: translateY(-5px); }
      70% { transform: translateY(-10px); }
      100% { transform: translateY(0); }
    }
    
    @keyframes click-pulse {
      0% { 
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
      }
      100% { 
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
}); 