// === CONTEST DATA SYSTEM ===
// Sistema para almacenar datos del concurso/sorteo con LocalStorage

class ContestDataManager {
  constructor() {
    this.storageKey = 'suilatam_participants';
    this.isEnabled = true;
    this.initCounter();
  }

  // Inicializar contador de participantes
  initCounter() {
    // Crear o actualizar el contador en tiempo real si estamos en la página de admin
    if (window.location.pathname.includes('admin-stats.html')) {
      this.updateParticipantCounter();
      
      // Actualizar cada 3 segundos por si hay nuevos participantes
      setInterval(() => {
        this.updateParticipantCounter();
      }, 3000);
    }
  }

  // Capturar datos del participante
  async captureParticipant(participantInfo) {
    // Generar ID único para el participante
    const participantId = Date.now() + Math.random().toString(36).substring(2);
    
    // Obtener fecha actual formateada
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    // Datos del participante
    const participantData = {
      id: participantId,
      timestamp: formattedDate,
      rawTimestamp: now.toISOString(),
      // Datos del formulario o código QR directo
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
      sessionId: this.generateSessionId()
    };

    try {
      // Guardar en localStorage
      const stored = this.getParticipants();
      stored.push(participantData);
      localStorage.setItem(this.storageKey, JSON.stringify(stored));
      
      console.log('✅ Participante guardado localmente:', participantData);
      this.showSuccessMessage();
      
      return participantData;
    } catch (error) {
      console.error('❌ Error guardando participante:', error);
      return null;
    }
  }

  // Obtener todos los participantes
  getParticipants() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Generar ID de sesión único
  generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Detectar tipo de dispositivo
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

  // Obtener información del navegador
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

  // Actualizar contador de participantes
  updateParticipantCounter() {
    const counterElement = document.getElementById('participant-counter');
    if (counterElement) {
      const count = this.getParticipants().length;
      counterElement.textContent = count;
      
      // Actualizar la tabla si existe
      this.updateParticipantsTable();
    }
  }

  // Actualizar tabla de participantes
  updateParticipantsTable() {
    const tableBody = document.getElementById('participants-table-body');
    if (!tableBody) return;
    
    // Obtener participantes y ordenar por más recientes primero
    const participants = this.getParticipants();
    participants.sort((a, b) => new Date(b.rawTimestamp) - new Date(a.rawTimestamp));
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Llenar con datos
    participants.forEach((participant, index) => {
      const row = document.createElement('tr');
      
      // Añadir clases para filas alternadas
      row.className = index % 2 === 0 ? 'even-row' : 'odd-row';
      
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${participant.timestamp}</td>
        <td>${participant.name}</td>
        <td>${participant.email}</td>
        <td>${participant.wallet.substring(0, 10)}...${participant.wallet.substring(participant.wallet.length - 6)}</td>
        <td>${participant.device}</td>
        <td>${participant.browser}</td>
      `;
      
      tableBody.appendChild(row);
    });
  }

  // Exportar a diferentes formatos
  exportData(format = 'json') {
    const participants = this.getParticipants();
    
    // Si no hay participantes, mostrar mensaje
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

  // Exportar a JSON
  exportToJSON(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    this.downloadBlob(blob, `participantes_suilatam_${this.getFormattedDate()}.json`);
  }

  // Exportar a CSV
  exportToCSV(data) {
    // Cabeceras
    const headers = ['ID', 'Fecha', 'Código QR', 'Dispositivo', 'Navegador', 'Idioma'];
    
    // Convertir datos a filas CSV
    const csvRows = [
      headers.join(','), // Cabecera
      ...data.map(p => [
        p.id,
        p.timestamp,
        p.qrCode,
        p.device,
        p.browser,
        p.language
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    this.downloadBlob(blob, `participantes_suilatam_${this.getFormattedDate()}.csv`);
  }

  // Exportar a TXT (para WhatsApp)
  exportToTXT(data) {
    let txtContent = `📋 PARTICIPANTES SUILATAM (${data.length})\n`;
    txtContent += `📅 Exportado: ${new Date().toLocaleString()}\n\n`;
    
    data.forEach((p, index) => {
      txtContent += `${index + 1}. [${p.timestamp}] ${p.qrCode}\n`;
    });
    
    const blob = new Blob([txtContent], {type: 'text/plain;charset=utf-8;'});
    this.downloadBlob(blob, `participantes_suilatam_${this.getFormattedDate()}.txt`);
  }

  // Copiar al portapapeles (ideal para WhatsApp)
  copyToClipboard(data) {
    let txtContent = `📋 PARTICIPANTES SUILATAM (${data.length})\n`;
    txtContent += `📅 Exportado: ${new Date().toLocaleString()}\n\n`;
    
    data.forEach((p, index) => {
      txtContent += `${index + 1}. [${p.timestamp}] ${p.qrCode}\n`;
    });
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(txtContent)
      .then(() => {
        alert('✅ Lista de participantes copiada al portapapeles. ¡Lista para pegar en WhatsApp!');
      })
      .catch(err => {
        console.error('Error copiando al portapapeles:', err);
        alert('❌ Error al copiar. Intenta con otro método de exportación.');
      });
  }

  // Descargar blob
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

  // Obtener fecha formateada para archivos
  getFormattedDate() {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
  }

  // Sortear un ganador aleatorio
  drawWinner() {
    const participants = this.getParticipants();
    if (participants.length === 0) {
      alert('No hay participantes para realizar el sorteo.');
      return null;
    }
    
    // Seleccionar ganador aleatorio
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];
    
    return winner;
  }

  // Limpiar todos los datos de participantes
  clearAllData() {
    if (confirm('⚠️ ¿Estás seguro de eliminar TODOS los participantes? Esta acción no se puede deshacer.')) {
      localStorage.removeItem(this.storageKey);
      alert('🗑️ Todos los datos han sido eliminados.');
      
      // Actualizar contador si estamos en la página de admin
      if (window.location.pathname.includes('admin-stats.html')) {
        this.updateParticipantCounter();
      }
    }
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
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContestDataManager;
} 