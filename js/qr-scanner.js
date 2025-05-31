// === QR SCANNER FUNCTIONALITY ===

class QRScanner {
  constructor() {
    this.html5QrCode = null;
    this.isScanning = false;
    this.elements = {
      reader: document.getElementById('qr-reader'),
      startBtn: document.getElementById('start-scanner'),
      stopBtn: document.getElementById('stop-scanner'),
      status: document.getElementById('qr-status')
    };
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateStatus('info', 'Presiona "Activar Cámara" para comenzar');
  }

  setupEventListeners() {
    this.elements.startBtn.addEventListener('click', () => this.startScanner());
    this.elements.stopBtn.addEventListener('click', () => this.stopScanner());
  }

  async startScanner() {
    try {
      this.updateStatus('scanning', 'Iniciando cámara...');
      this.elements.startBtn.disabled = true;

      // Initialize the QR scanner
      this.html5QrCode = new Html5Qrcode("qr-reader");

      // Get camera devices
      const devices = await Html5Qrcode.getCameras();
      
      if (devices && devices.length > 0) {
        // Use back camera if available, otherwise use first camera
        const cameraId = devices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('environment')
        )?.id || devices[0].id;

        // Start scanning
        await this.html5QrCode.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          this.onScanSuccess.bind(this),
          this.onScanFailure.bind(this)
        );

        this.isScanning = true;
        this.elements.startBtn.style.display = 'none';
        this.elements.stopBtn.style.display = 'inline-flex';
        this.updateStatus('scanning', 'Escaneando... Apunta al código QR');

      } else {
        throw new Error('No se encontraron cámaras disponibles');
      }

    } catch (error) {
      console.error('Error starting scanner:', error);
      this.updateStatus('error', `Error: ${error.message}`);
      this.elements.startBtn.disabled = false;
    }
  }

  async stopScanner() {
    try {
      if (this.html5QrCode && this.isScanning) {
        await this.html5QrCode.stop();
        this.html5QrCode.clear();
        this.html5QrCode = null;
      }
      
      this.isScanning = false;
      this.elements.startBtn.style.display = 'inline-flex';
      this.elements.stopBtn.style.display = 'none';
      this.elements.startBtn.disabled = false;
      this.updateStatus('info', 'Escáner detenido. Presiona "Activar Cámara" para reiniciar');

    } catch (error) {
      console.error('Error stopping scanner:', error);
      this.updateStatus('error', 'Error al detener el escáner');
    }
  }

  onScanSuccess(decodedText, decodedResult) {
    console.log(`Código QR detectado: ${decodedText}`);
    
    // Add success animation
    this.elements.reader.classList.add('qr-success-animation');
    
    this.updateStatus('success', '¡Código QR detectado! Redirigiendo...');
    
    // Stop the scanner
    this.stopScanner();
    
    // Check if it's our special QR code
    if (this.isValidSuiLatamQR(decodedText)) {
      // Redirect to prize page after a short delay
      setTimeout(() => {
        window.location.href = 'premio-secreto.html';
      }, 1500);
    } else {
      // Handle other QR codes or show invalid message
      setTimeout(() => {
        this.updateStatus('error', 'Código QR no válido para SuiLatam');
        this.elements.startBtn.disabled = false;
      }, 2000);
    }
  }

  onScanFailure(error) {
    // This is called continuously while scanning, so we don't want to log every failure
    // console.log(`QR scan failure: ${error}`);
  }

  isValidSuiLatamQR(text) {
    // Define valid QR codes for SuiLatam
    const validCodes = [
      'suilatam-premio-especial',
      'https://suilatam.xyz/premio',
      'SUILATAM_PREMIO_2025',
      'premio-secreto-suilatam'
    ];
    
    return validCodes.some(code => 
      text.toLowerCase().includes(code.toLowerCase())
    );
  }

  updateStatus(type, message) {
    const statusEl = this.elements.status;
    const messageEl = statusEl.querySelector('.status-message span');
    const iconEl = statusEl.querySelector('.status-message i');
    
    // Remove previous status classes
    statusEl.className = 'qr-status';
    
    // Add new status class
    statusEl.classList.add(type);
    
    // Update icon based on status
    const icons = {
      info: 'fas fa-info-circle',
      scanning: 'fas fa-search',
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-triangle'
    };
    
    iconEl.className = icons[type] || 'fas fa-info-circle';
    messageEl.textContent = message;
  }
}

// === NAVIGATION FUNCTIONALITY ===
class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    this.setupScrollEffect();
  }

  setupScrollEffect() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    });
  }
}

// === UTILITIES ===
const Utils = {
  // Check if device has camera
  async hasCameraSupport() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some(device => device.kind === 'videoinput');
    } catch (error) {
      return false;
    }
  },

  // Check if it's a mobile device
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Show notification
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
      <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#4F8EE0',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      zIndex: '10000',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', async () => {
  // Check camera support
  const hasCamera = await Utils.hasCameraSupport();
  
  if (!hasCamera) {
    Utils.showNotification('Tu dispositivo no tiene cámara disponible', 'error');
    document.getElementById('start-scanner').disabled = true;
  }
  
  // Initialize components
  const qrScanner = new QRScanner();
  const navigation = new Navigation();
  
  // Add some helpful tips for mobile users
  if (Utils.isMobile()) {
    Utils.showNotification('Mantén el teléfono estable para mejor escaneo', 'info');
  }
});

// === ERROR HANDLING ===
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  Utils.showNotification('Ocurrió un error inesperado', 'error');
});

// === EXPORT FOR TESTING ===
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QRScanner, Navigation, Utils };
} 