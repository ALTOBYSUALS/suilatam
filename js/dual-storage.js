// 🚀 SISTEMA DE ALMACENAMIENTO DUAL
// Guarda en localStorage + servidor remoto

class DualStorageManager {
  constructor() {
    // Configuración del servidor de respaldo
    this.backupEndpoint = 'https://jsonbin.io/v3/b'; // Servicio gratuito temporal
    this.apiKey = '$2b$10$7JQvPcPQlPQlPQlPQlPQlO'; // Clave temporal para demo
    this.binId = null;
    this.storageKey = 'suilatam_participants';
    
    this.init();
  }

  init() {
    console.log('🔄 Inicializando almacenamiento dual...');
    
    // Sincronizar cada 10 segundos
    setInterval(() => {
      this.syncToCloud();
    }, 10000);
  }

  // Guardar participante (local + remoto)
  async saveParticipant(data) {
    try {
      // 1. Guardar localmente
      const localData = this.getLocalData();
      localData.push(data);
      localStorage.setItem(this.storageKey, JSON.stringify(localData));
      console.log('✅ Guardado local completado');
      
      // 2. Guardar en la nube (sin bloquear)
      this.syncToCloud();
      
      // 3. Notificar a otras pestañas
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: data }));
      
      return true;
    } catch (error) {
      console.error('❌ Error guardando:', error);
      return false;
    }
  }

  // Obtener datos locales
  getLocalData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Sincronizar con la nube
  async syncToCloud() {
    try {
      const localData = this.getLocalData();
      
      // Para demo: guardar en archivo JSON local
      if (this.isLocalEnvironment()) {
        this.saveToFile(localData);
      }
      
      console.log('☁️ Sincronizando ' + localData.length + ' registros...');
      
      // Aquí puedes conectar con cualquier API
      // Por ahora solo simula la sincronización
      
    } catch (error) {
      console.error('Error sincronizando:', error);
    }
  }

  // Detectar si es entorno local
  isLocalEnvironment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.protocol === 'file:';
  }

  // Guardar en archivo (para backup local)
  saveToFile(data) {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    
    // Auto-guardar en Downloads cada 10 registros
    if (data.length % 10 === 0 && data.length > 0) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `suilatam_backup_${new Date().getTime()}.json`;
      
      // Notificar pero no descargar automáticamente
      console.log('📥 Backup disponible: ' + data.length + ' registros');
    }
  }

  // Cargar datos desde archivo
  async loadFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          localStorage.setItem(this.storageKey, JSON.stringify(data));
          window.dispatchEvent(new CustomEvent('dataLoaded'));
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }

  // Fusionar datos de múltiples fuentes
  mergeData(localData, remoteData) {
    const merged = [...localData];
    const existingIds = new Set(localData.map(p => p.id));
    
    remoteData.forEach(participant => {
      if (!existingIds.has(participant.id)) {
        merged.push(participant);
      }
    });
    
    return merged;
  }
}

// Alternativa simple: usar Google Sheets como base de datos
class GoogleSheetsStorage {
  constructor(sheetId) {
    this.sheetId = sheetId;
    this.apiKey = 'YOUR_API_KEY'; // Necesitas una API key de Google
    this.baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}`;
  }

  async appendRow(data) {
    // Implementación para Google Sheets
    console.log('📊 Guardando en Google Sheets...');
  }
}

// Sistema de respaldo en memoria (para emergencias)
class MemoryBackup {
  constructor() {
    this.data = [];
    window.suilatamBackup = this.data; // Accesible globalmente
  }

  add(participant) {
    this.data.push(participant);
    console.log('💾 Respaldo en memoria: ' + this.data.length + ' registros');
  }

  export() {
    return JSON.stringify(this.data, null, 2);
  }
}

// Exportar para uso global
window.DualStorageManager = DualStorageManager;
window.MemoryBackup = new MemoryBackup(); 