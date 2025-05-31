// === SUPABASE DATA MANAGER ===
// Sistema para sincronizar datos en tiempo real con base de datos

class SupabaseDataManager {
  constructor() {
    // Configuración de Supabase (temporal para desarrollo)
    this.supabaseUrl = 'https://your-project.supabase.co';
    this.supabaseKey = 'your-anon-key';
    this.tableName = 'suilatam_participants';
    this.fallbackToLocalStorage = true;
    
    // Inicializar
    this.init();
  }

  init() {
    // Por ahora usar localStorage como fallback
    // Más tarde conectaremos Supabase real
    console.log('🔄 Inicializando sistema de datos...');
    this.setupSyncTimer();
  }

  // Simular sincronización cross-domain usando localStorage + events
  setupSyncTimer() {
    // Revisar cambios cada 2 segundos
    setInterval(() => {
      this.syncData();
    }, 2000);

    // Escuchar cambios de storage
    window.addEventListener('storage', (e) => {
      if (e.key === 'suilatam_participants') {
        this.triggerDataUpdate();
      }
    });
  }

  // Capturar datos del participante
  async captureParticipant(participantInfo) {
    // Generar ID único
    const participantId = Date.now() + Math.random().toString(36).substring(2);
    
    // Obtener fecha actual
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const participantData = {
      id: participantId,
      timestamp: formattedDate,
      rawTimestamp: now.toISOString(),
      name: participantInfo.name || 'Anónimo',
      email: participantInfo.email || '',
      wallet: participantInfo.wallet || '',
      qrCode: participantInfo.qrCode || participantInfo,
      userAgent: navigator.userAgent,
      device: this.getDeviceType(),
      browser: this.getBrowserInfo(),
      language: navigator.language || 'es-MX',
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      referrer: document.referrer || 'direct',
      sessionId: this.generateSessionId(),
      source: window.location.hostname || 'local'
    };

    try {
      // Guardar en localStorage
      const stored = this.getParticipants();
      stored.push(participantData);
      localStorage.setItem('suilatam_participants', JSON.stringify(stored));
      
      // Disparar evento personalizado para sincronización
      window.dispatchEvent(new CustomEvent('participantAdded', { 
        detail: participantData 
      }));
      
      // Guardar también con timestamp para sync
      localStorage.setItem('suilatam_last_update', Date.now().toString());
      
      console.log('✅ Participante guardado:', participantData);
      this.showSuccessMessage();

      return participantData;
    } catch (error) {
      console.error('❌ Error guardando participante:', error);
      return null;
    }
  }

  // Obtener todos los participantes
  getParticipants() {
    try {
      const data = localStorage.getItem('suilatam_participants');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error obteniendo participantes:', error);
      return [];
    }
  }

  // Sincronizar datos entre pestañas/ventanas
  syncData() {
    const lastUpdate = localStorage.getItem('suilatam_last_update');
    const myLastUpdate = this.lastKnownUpdate || '0';
    
    if (lastUpdate && lastUpdate !== myLastUpdate) {
      this.lastKnownUpdate = lastUpdate;
      this.triggerDataUpdate();
    }
  }

  // Disparar actualización de datos
  triggerDataUpdate() {
    window.dispatchEvent(new CustomEvent('dataUpdated'));
  }

  // Funciones de utilidad
  generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'Móvil';
    }
    return 'Desktop';
  }

  getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName = "Desconocido";
    
    if (ua.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome";
    } else if (ua.match(/firefox|fxios/i)) {
      browserName = "Firefox";
    } else if (ua.match(/safari/i)) {
      browserName = "Safari";
    } else if (ua.match(/opr\//i)) {
      browserName = "Opera";
    } else if (ua.match(/edg/i)) {
      browserName = "Edge";
    }
    
    return browserName;
  }

  // Exportar datos
  exportData(format = 'json') {
    const participants = this.getParticipants();
    
    if (participants.length === 0) {
      alert('No hay participantes registrados aún.');
      return;
    }
    
    switch (format) {
      case 'json':
        this.exportToJSON(participants);
        break;
      case 'csv':
        this.exportToCSV(participants);
        break;
      case 'txt':
        this.exportToTXT(participants);
        break;
      case 'copy':
        this.copyToClipboard(participants);
        break;
    }
  }

  exportToJSON(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    this.downloadBlob(blob, `participantes_suilatam_${this.getFormattedDate()}.json`);
  }

  exportToCSV(data) {
    const headers = ['ID', 'Fecha', 'Nombre', 'Email', 'Wallet', 'Dispositivo', 'Navegador'];
    const csvRows = [
      headers.join(','),
      ...data.map(p => [
        p.id,
        p.timestamp,
        p.name,
        p.email,
        p.wallet,
        p.device,
        p.browser
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    this.downloadBlob(blob, `participantes_suilatam_${this.getFormattedDate()}.csv`);
  }

  exportToTXT(data) {
    let txtContent = `📋 PARTICIPANTES SUILATAM (${data.length})\n`;
    txtContent += `📅 Exportado: ${new Date().toLocaleString()}\n\n`;
    
    data.forEach((p, index) => {
      txtContent += `${index + 1}. ${p.name} - ${p.email}\n`;
      txtContent += `   Wallet: ${p.wallet}\n`;
      txtContent += `   Fecha: ${p.timestamp}\n\n`;
    });
    
    const blob = new Blob([txtContent], {type: 'text/plain;charset=utf-8;'});
    this.downloadBlob(blob, `participantes_suilatam_${this.getFormattedDate()}.txt`);
  }

  copyToClipboard(data) {
    let txtContent = `📋 PARTICIPANTES SUILATAM (${data.length})\n`;
    txtContent += `📅 Exportado: ${new Date().toLocaleString()}\n\n`;
    
    data.forEach((p, index) => {
      txtContent += `${index + 1}. ${p.name} - ${p.email}\n`;
      txtContent += `   Wallet: ${p.wallet.substring(0, 10)}...\n`;
      txtContent += `   Fecha: ${p.timestamp}\n\n`;
    });
    
    navigator.clipboard.writeText(txtContent)
      .then(() => {
        alert('✅ Lista copiada al portapapeles!');
      })
      .catch(err => {
        console.error('Error copiando:', err);
        alert('❌ Error al copiar.');
      });
  }

  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  getFormattedDate() {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
  }

  // Sortear ganador
  drawWinner() {
    const participants = this.getParticipants();
    if (participants.length === 0) {
      alert('No hay participantes para realizar el sorteo.');
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];
    
    return winner;
  }

  // Limpiar datos
  clearAllData() {
    if (confirm('⚠️ ¿Eliminar TODOS los participantes? No se puede deshacer.')) {
      localStorage.removeItem('suilatam_participants');
      localStorage.removeItem('suilatam_last_update');
      this.triggerDataUpdate();
      alert('🗑️ Datos eliminados.');
    }
  }

  showSuccessMessage() {
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
        transform: translateX(100%);
        transition: transform 0.3s ease;
      ">
        <i class="fas fa-check-circle"></i>
        ¡Datos sincronizados! 🎉
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.firstElementChild.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.firstElementChild.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SupabaseDataManager;
} 