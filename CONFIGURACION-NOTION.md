# 🎯 Configuración Sistema de Registro con Notion

## 📋 Paso 1: Crear Base de Datos en Notion

### 1.1 Crear la página
1. Ve a [notion.so](https://notion.so) 
2. Crear una nueva página
3. Título: "SuiLatam Sorteo - Participantes"

### 1.2 Agregar base de datos
1. En la página, escribe `/database` y selecciona "Table - Full page"
2. Configura las siguientes columnas:

| Nombre de Columna | Tipo | Configuración |
|-------------------|------|---------------|
| **Nombre** | Title | Campo principal |
| **Email** | Email | Validación automática |
| **Wallet** | Text | Para direcciones SUI |
| **Fecha** | Date | Con hora |
| **ID** | Number | Único |

### 1.3 Obtener Database ID
1. Abre tu base de datos en Notion
2. Copia la URL, se ve así: `https://notion.so/username/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. El **Database ID** son los 32 caracteres después del último `/`

## 🔑 Paso 2: Crear Integración

### 2.1 Crear integración
1. Ve a [developers.notion.com](https://developers.notion.com)
2. Click en "New integration"
3. Nombre: "SuiLatam Sorteo"
4. Workspace: Selecciona tu workspace
5. Click "Submit"

### 2.2 Obtener token
1. Copia el **Integration Token** (empieza con `secret_`)
2. ⚠️ **GUARDA ESTE TOKEN DE FORMA SEGURA**

### 2.3 Compartir base de datos
1. Ve a tu base de datos en Notion
2. Click en "Share" (arriba derecha)
3. Click en "Add people"
4. Busca el nombre de tu integración "SuiLatam Sorteo"
5. Selecciónala y dale permisos de "Full access"

## ⚙️ Paso 3: Configurar el Sistema

### 3.1 Editar notion-config.js
Abre el archivo `notion-config.js` y reemplaza:

```javascript
// Reemplaza con tu token de integración
NOTION_TOKEN: 'secret_TU_TOKEN_AQUI',

// Reemplaza con el ID de tu base de datos  
DATABASE_ID: 'TU_DATABASE_ID_AQUI',
```

### 3.2 Ejemplo de configuración
```javascript
const NOTION_CONFIG = {
    NOTION_TOKEN: 'secret_ABC123XYZ789...',
    DATABASE_ID: '12345678abcd1234abcd1234abcd1234',
    // ... resto de la configuración
};
```

## 🚀 Paso 4: Probar el Sistema

### 4.1 Iniciar servidor local
```bash
python3 -m http.server 8000
```

### 4.2 Abrir en navegador
- **Registro**: http://localhost:8000/registro-notion.html
- **Dashboard**: http://localhost:8000/dashboard-notion.html

### 4.3 Verificar funcionalidad
1. En registro-notion.html:
   - Debe mostrar "Notion Online" arriba derecha
   - Prueba registrar un participante de prueba

2. En dashboard-notion.html:
   - Debe cargar los participantes
   - Estadísticas deben actualizarse
   - Funciones de exportar y sorteo deben funcionar

## 🔧 Paso 5: Resolución de Problemas

### Error de CORS
Si ves errores de CORS, es normal al probar localmente. Despliega en Vercel:

```bash
# Si tienes Vercel CLI instalado
vercel --prod

# O súbelo a GitHub y conecta con Vercel
```

### Error de autenticación
- Verifica que el token sea correcto
- Asegúrate de que la integración tenga acceso a la base de datos
- El token debe empezar con `secret_`

### Error de base de datos
- Verifica que el Database ID sea correcto (32 caracteres)
- Las columnas deben tener exactamente los nombres especificados
- La base de datos debe estar compartida con la integración

## 📱 Paso 6: URLs Finales

Una vez configurado y desplegado:

- **Registro**: https://tu-proyecto.vercel.app/registro-notion.html
- **Dashboard**: https://tu-proyecto.vercel.app/dashboard-notion.html

## ✅ Ventajas del Sistema con Notion

✨ **Sincronización en tiempo real**: Los datos se guardan directamente en Notion
✨ **Acceso universal**: Funciona desde cualquier dispositivo/dominio  
✨ **Respaldo automático**: Notion guarda todo automáticamente
✨ **Interface amigable**: Puedes ver/editar datos directamente en Notion
✨ **Exportación nativa**: Notion permite exportar en múltiples formatos

## 🎯 Notas Importantes

- El token de Notion **NUNCA** debe compartirse públicamente
- La base de datos debe tener exactamente las columnas especificadas
- Para eventos con muchos participantes, considera los límites de la API de Notion
- El sistema auto-actualiza cada 30 segundos en el dashboard

¡Listo! Tu sistema de registro con Notion está configurado y funcionando 🚀 