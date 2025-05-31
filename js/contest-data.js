// === CONTEST DATA SYSTEM ===
// Sistema para almacenar datos del concurso/sorteo

class ContestDataManager {
  constructor() {
    // URL del Google Apps Script (tu lo configurarás)
    this.scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
    this.isEnabled = false; // Cambiar a true cuando tengas la URL
  }

  // Capturar datos del participante
  async captureParticipant(qrData) {
    if (!this.isEnabled) {
      console.log('Contest data system disabled');
      return;
    }

    const participantData = {
      timestamp: new Date().toISOString(),
      qrCode: qrData,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenSize: `${screen.width}x${screen.height}`,
      referrer: document.referrer || 'direct',
      sessionId: this.generateSessionId(),
      ipHash: await this.getIPHash(), // Para evitar duplicados
    };

    try {
      // Enviar a Google Sheets
      const response = await fetch(this.scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(participantData)
      });

      if (response.ok) {
        console.log('✅ Participant data saved successfully');
        this.showSuccessMessage();
      } else {
        throw new Error('Failed to save data');
      }

    } catch (error) {
      console.error('❌ Error saving participant data:', error);
      // Guardar localmente como respaldo
      this.saveLocally(participantData);
    }
  }

  // Generar ID de sesión único
  generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Obtener hash de IP para identificar usuarios únicos
  async getIPHash() {
    try {
      // Usar un servicio gratuito para obtener IP
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      
      // Crear hash simple de la IP
      const ip = data.ip;
      let hash = 0;
      for (let i = 0; i < ip.length; i++) {
        const char = ip.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return 'ip_' + Math.abs(hash).toString(36);
    } catch (error) {
      return 'unknown_' + Date.now();
    }
  }

  // Guardar localmente como respaldo
  saveLocally(data) {
    const stored = JSON.parse(localStorage.getItem('contest_participants') || '[]');
    stored.push(data);
    localStorage.setItem('contest_participants', JSON.stringify(stored));
    console.log('💾 Data saved locally as backup');
  }

  // Obtener datos locales (para respaldo)
  getLocalData() {
    return JSON.parse(localStorage.getItem('contest_participants') || '[]');
  }

  // Mostrar mensaje de éxito
  showSuccessMessage() {
    // Crear notificación
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
        z-index: 10000;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
      ">
        <i class="fas fa-check-circle"></i>
        ¡Registrado en el sorteo! 🎉
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
      notification.firstElementChild.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
      notification.firstElementChild.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  // Configurar URL del script de Google
  setScriptURL(url) {
    this.scriptURL = url;
    this.isEnabled = true;
  }

  // Obtener estadísticas básicas
  getStats() {
    const localData = this.getLocalData();
    return {
      totalParticipants: localData.length,
      uniqueIPs: [...new Set(localData.map(p => p.ipHash))].length,
      lastParticipant: localData[localData.length - 1]?.timestamp,
      devices: this.analyzeDevices(localData)
    };
  }

  // Analizar tipos de dispositivos
  analyzeDevices(data) {
    const devices = { mobile: 0, desktop: 0, tablet: 0 };
    
    data.forEach(participant => {
      const ua = participant.userAgent.toLowerCase();
      if (/mobile|android|iphone/.test(ua)) {
        devices.mobile++;
      } else if (/tablet|ipad/.test(ua)) {
        devices.tablet++;
      } else {
        devices.desktop++;
      }
    });
    
    return devices;
  }
}

// === GOOGLE APPS SCRIPT SETUP INSTRUCTIONS ===
/*
INSTRUCCIONES PARA CONFIGURAR GOOGLE SHEETS:

1. Ve a https://script.google.com
2. Crea un nuevo proyecto
3. Pega este código en Code.gs:

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // ID de tu Google Sheet (crear uno nuevo)
    const sheetId = 'TU_SHEET_ID_AQUI';
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    
    // Si es la primera vez, agregar headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'QR Code',
        'User Agent',
        'Language', 
        'Screen Size',
        'Referrer',
        'Session ID',
        'IP Hash'
      ]);
    }
    
    // Agregar datos del participante
    sheet.appendRow([
      data.timestamp,
      data.qrCode,
      data.userAgent,
      data.language,
      data.screenSize,
      data.referrer,
      data.sessionId,
      data.ipHash
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

4. Implementar como aplicación web
5. Dar permisos de "Anyone can access"
6. Copiar la URL y usarla en setScriptURL()
*/

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContestDataManager;
} 