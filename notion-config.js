// Configuración de Notion API
const NOTION_CONFIG = {
    // 🔑 REEMPLAZA ESTE TOKEN CON EL TUYO REAL
    // Obtenlo en: https://developers.notion.com
    NOTION_TOKEN: 'secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    
    // ✅ Tu Database ID (ya configurado desde tu URL)
    DATABASE_ID: '2044f6dcc27a8078abdef6b35924abba',
    
    // 🌐 URL base de la API de Notion (no cambiar)
    API_BASE_URL: 'https://api.notion.com/v1',
    
    // 📅 Versión de la API (no cambiar)
    API_VERSION: '2022-06-28',
    
    // Headers para las peticiones
    getHeaders() {
        return {
            'Authorization': `Bearer ${this.NOTION_TOKEN}`,
            'Content-Type': 'application/json',
            'Notion-Version': this.API_VERSION
        };
    },
    
    // 🔍 Verificar si está configurado correctamente
    isConfigured() {
        return this.NOTION_TOKEN && 
               !this.NOTION_TOKEN.includes('XXXXXXX') && 
               this.DATABASE_ID;
    },
    
    // 📊 Información de configuración
    getInfo() {
        return {
            configured: this.isConfigured(),
            databaseId: this.DATABASE_ID,
            hasToken: !this.NOTION_TOKEN.includes('XXXXXXX')
        };
    }
};

// Clase para manejar las operaciones con Notion
class NotionManager {
    constructor() {
        this.config = NOTION_CONFIG;
        
        // Verificar configuración al inicializar
        if (!this.config.isConfigured()) {
            console.warn('⚠️ Notion no está configurado correctamente');
            console.log('📋 Pasos para configurar:');
            console.log('1. Ve a https://developers.notion.com');
            console.log('2. Crea una integración "SuiLatam Sorteo"');
            console.log('3. Copia el token y reemplázalo en notion-config.js');
            console.log('4. Comparte tu base de datos con la integración');
        } else {
            console.log('✅ Notion configurado correctamente');
        }
    }

    // Registrar un nuevo participante
    async registrarParticipante(nombre, email, wallet) {
        try {
            // Verificar configuración
            if (!this.config.isConfigured()) {
                throw new Error('Notion no está configurado. Revisa el token y database ID.');
            }
            
            // Generar ID único para el campo título
            const idUnico = `SUL-${Date.now()}`;
            
            const response = await fetch(`${this.config.API_BASE_URL}/pages`, {
                method: 'POST',
                headers: this.config.getHeaders(),
                body: JSON.stringify({
                    parent: { database_id: this.config.DATABASE_ID },
                    properties: {
                        // Usando la estructura exacta de tu tabla
                        'id': {
                            title: [{ text: { content: idUnico } }]
                        },
                        'nombre': {
                            rich_text: [{ text: { content: nombre } }]
                        },
                        'Correo electrónico': {
                            email: email
                        },
                        'billetera': {
                            rich_text: [{ text: { content: wallet } }]
                        },
                        'Fecha': {
                            date: { start: new Date().toISOString() }
                        }
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'Error desconocido'}`);
            }

            const data = await response.json();
            console.log('✅ Participante registrado:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ Error al registrar:', error);
            return { success: false, error: error.message };
        }
    }

    // Obtener todos los participantes
    async obtenerParticipantes() {
        try {
            // Verificar configuración
            if (!this.config.isConfigured()) {
                throw new Error('Notion no está configurado. Revisa el token y database ID.');
            }
            
            const response = await fetch(`${this.config.API_BASE_URL}/databases/${this.config.DATABASE_ID}/query`, {
                method: 'POST',
                headers: this.config.getHeaders(),
                body: JSON.stringify({
                    sorts: [
                        {
                            property: 'Fecha',
                            direction: 'descending'
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'Error desconocido'}`);
            }

            const data = await response.json();
            
            // Formatear los datos usando la estructura real de tu tabla
            const participantes = data.results.map(page => {
                const props = page.properties;
                return {
                    id: props.id?.title?.[0]?.text?.content || '',
                    nombre: props.nombre?.rich_text?.[0]?.text?.content || '',
                    email: props['Correo electrónico']?.email || '',
                    wallet: props.billetera?.rich_text?.[0]?.text?.content || '',
                    fecha: props.Fecha?.date?.start || ''
                };
            });

            console.log('✅ Participantes obtenidos:', participantes.length);
            return { success: true, participantes };
        } catch (error) {
            console.error('❌ Error al obtener participantes:', error);
            return { success: false, error: error.message };
        }
    }

    // Contar participantes
    async contarParticipantes() {
        const resultado = await this.obtenerParticipantes();
        return resultado.success ? resultado.participantes.length : 0;
    }

    // 🔧 Método para probar la conexión
    async probarConexion() {
        try {
            console.log('🔍 Probando conexión con Notion...');
            const resultado = await this.obtenerParticipantes();
            
            if (resultado.success) {
                console.log('✅ Conexión exitosa con Notion');
                console.log(`📊 Participantes encontrados: ${resultado.participantes.length}`);
                return { success: true, participantes: resultado.participantes.length };
            } else {
                throw new Error(resultado.error);
            }
        } catch (error) {
            console.error('❌ Error de conexión:', error.message);
            return { success: false, error: error.message };
        }
    }
}

// Exportar para uso global
window.NotionManager = NotionManager; 