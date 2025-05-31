// === QR SCANNER FUNCTIONALITY ===

class QRScanner {
  constructor() {
    this.html5QrCode = null;
    this.isScanning = false;
    this.contestDataManager = new ContestDataManager();
    this.scannedQRData = null;
    this.elements = {
      reader: document.getElementById('qr-reader'),
      startBtn: document.getElementById('start-scanner'),
      stopBtn: document.getElementById('stop-scanner'),
      status: document.getElementById('qr-status'),
      registrationForm: document.getElementById('registration-form'),
      participantForm: document.getElementById('participant-form'),
      cancelBtn: document.getElementById('cancel-registration')
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
    this.elements.participantForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    this.elements.cancelBtn.addEventListener('click', () => this.hideRegistrationForm());
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

  async onScanSuccess(decodedText, decodedResult) {
    console.log(`Código QR detectado: ${decodedText}`);
    
    // Add success animation
    this.elements.reader.classList.add('qr-success-animation');
    
    this.updateStatus('success', '¡Código QR detectado! Procesando...');
    
    // Stop the scanner
    this.stopScanner();
    
    // Check if it's our special QR code
    if (this.isValidSuiLatamQR(decodedText)) {
      // Store the QR data for later use
      this.scannedQRData = decodedText;
      
      // Show registration form instead of redirecting immediately
      setTimeout(() => {
        this.showRegistrationForm();
      }, 1000);
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

  showRegistrationForm() {
    // Hide scanner interface
    this.elements.reader.style.display = 'none';
    this.elements.startBtn.style.display = 'none';
    this.elements.stopBtn.style.display = 'none';
    this.elements.status.style.display = 'none';
    
    // Show registration form
    this.elements.registrationForm.style.display = 'block';
    
    // Focus on first input
    const firstInput = this.elements.participantForm.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 300);
    }
  }

  hideRegistrationForm() {
    // Show scanner interface again
    this.elements.reader.style.display = 'block';
    this.elements.startBtn.style.display = 'inline-flex';
    this.elements.status.style.display = 'block';
    
    // Hide registration form
    this.elements.registrationForm.style.display = 'none';
    
    // Reset form
    this.elements.participantForm.reset();
    this.scannedQRData = null;
    
    // Reset status
    this.updateStatus('info', 'Presiona "Activar Cámara" para comenzar');
    this.elements.startBtn.disabled = false;
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const participantData = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      wallet: formData.get('wallet').trim(),
      qrCode: this.scannedQRData
    };
    
    // Validate form data
    if (!this.validateParticipantData(participantData)) {
      return;
    }
    
    try {
      // Disable submit button
      const submitBtn = event.target.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
      
      // Save participant data
      await this.contestDataManager.captureParticipant(participantData);
      
      // Show success message
      this.showSuccessMessage();
      
      // Redirect to prize page after delay
      setTimeout(() => {
        window.location.href = 'premio-secreto.html';
      }, 3000);
      
    } catch (error) {
      console.error('Error registering participant:', error);
      alert('Error al registrar participante. Por favor intenta de nuevo.');
      
      // Re-enable submit button
      const submitBtn = event.target.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Registrarme en el Sorteo';
    }
  }

  validateParticipantData(data) {
    // Validate name
    if (!data.name || data.name.length < 2) {
      alert('Por favor ingresa un nombre válido');
      return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      alert('Por favor ingresa un correo electrónico válido');
      return false;
    }
    
    // Validate wallet address (basic Sui wallet format)
    if (!data.wallet || !data.wallet.startsWith('0x') || data.wallet.length < 10) {
      alert('Por favor ingresa una dirección de billetera Sui válida (debe comenzar con 0x)');
      return false;
    }
    
    return true;
  }

  showSuccessMessage() {
    // Hide form
    this.elements.registrationForm.style.display = 'none';
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <div class="success-content">
        <div class="success-icon">
          <i class="fas fa-trophy"></i>
        </div>
        <h2>¡Registrado Exitosamente!</h2>
        <p>Ya estás participando en el sorteo de SuiLatam</p>
        <div class="success-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <span>Redirigiendo a tu premio...</span>
        </div>
      </div>
    `;
    
    // Insert success message
    const container = document.querySelector('.qr-container');
    container.appendChild(successMessage);
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