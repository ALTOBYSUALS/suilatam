// Configuración de Notion API
const NOTION_CONFIG = {
    // Reemplaza con tu token de integración
    NOTION_TOKEN: 'secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    
    // Reemplaza con el ID de tu base de datos
    DATABASE_ID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    
    // URL base de la API de Notion
    API_BASE_URL: 'https://api.notion.com/v1',
    
    // Headers para las peticiones
    getHeaders() {
        return {
            'Authorization': `Bearer ${this.NOTION_TOKEN}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
        };
    }
};

// Clase para manejar las operaciones con Notion
class NotionManager {
    constructor() {
        this.config = NOTION_CONFIG;
    }

    // Registrar un nuevo participante
    async registrarParticipante(nombre, email, wallet) {
        try {
            const response = await fetch(`${this.config.API_BASE_URL}/pages`, {
                method: 'POST',
                headers: this.config.getHeaders(),
                body: JSON.stringify({
                    parent: { database_id: this.config.DATABASE_ID },
                    properties: {
                        'Nombre': {
                            title: [{ text: { content: nombre } }]
                        },
                        'Email': {
                            email: email
                        },
                        'Wallet': {
                            rich_text: [{ text: { content: wallet } }]
                        },
                        'Fecha': {
                            date: { start: new Date().toISOString() }
                        },
                        'ID': {
                            number: Date.now()
                        }
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
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
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            
            // Formatear los datos
            const participantes = data.results.map(page => {
                const props = page.properties;
                return {
                    id: props.ID?.number || 0,
                    nombre: props.Nombre?.title?.[0]?.text?.content || '',
                    email: props.Email?.email || '',
                    wallet: props.Wallet?.rich_text?.[0]?.text?.content || '',
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
}

// Exportar para uso global
window.NotionManager = NotionManager; 