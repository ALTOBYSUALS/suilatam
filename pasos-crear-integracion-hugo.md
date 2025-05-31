# 🔧 Pasos para Crear tu Integración de Notion

## 📋 ANTES DE EMPEZAR:
1. ✅ Agrega los campos "Fecha" (Date) e "ID" (Number) a tu tabla
2. ✅ Tu Database ID ya está configurado: `2044f6dcc27a8078abdef6b35924abba`

## 🔑 PASO 1: Crear Integración

### 1.1 Ve a Notion Developers
1. Abre una nueva pestaña
2. Ve a: https://developers.notion.com
3. Click en "View my integrations" o "My integrations"

### 1.2 Crear nueva integración
1. Click en **"New integration"**
2. **Name**: `SuiLatam Sorteo`
3. **Associated workspace**: Selecciona tu workspace actual
4. **Type**: "Internal integration"
5. Click **"Submit"**

### 1.3 Copiar tu token
1. En la página de tu integración, verás **"Integration Token"**
2. Click en **"Show"** y luego **"Copy"**
3. Se verá algo así: `secret_ABC123XYZ789...`
4. ⚠️ **GUARDA ESTE TOKEN - LO NECESITARÁS EN EL PASO 2**

## 🔗 PASO 2: Compartir tu Base de Datos

### 2.1 Volver a tu tabla de Notion
1. Ve a tu tabla de Notion que ya tienes abierta
2. En la esquina superior derecha, click en **"Compartir"** (Share)

### 2.2 Agregar la integración
1. Click en **"Agregar personas"** (Add people)
2. En el buscador, escribe: **"SuiLatam Sorteo"**
3. Selecciona tu integración (aparecerá con un ícono de bot)
4. Asegúrate que tenga permisos de **"Full access"**
5. Click **"Invitar"** (Invite)

## ⚙️ PASO 3: Configurar el Sistema

### 3.1 Actualizar notion-config.js
En el archivo `notion-config.js`, reemplaza esta línea:
```javascript
NOTION_TOKEN: 'secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
```

Por tu token real:
```javascript
NOTION_TOKEN: 'secret_TU_TOKEN_AQUI',
```

### 3.2 Ejemplo completo:
```javascript
const NOTION_CONFIG = {
    NOTION_TOKEN: 'secret_ABC123XYZ789...',  // TU TOKEN AQUÍ
    DATABASE_ID: '2044f6dcc27a8078abdef6b35924abba',  // YA CONFIGURADO
    // ... resto igual
};
```

## ✅ PASO 4: Probar el Sistema

Una vez configurado, prueba:
- **Registro**: https://suilatam.vercel.app/registro-notion.html
- **Dashboard**: https://suilatam.vercel.app/dashboard-notion.html

## 🎯 RESUMEN:
- ✅ Agregar campos "Fecha" e "ID" a tu tabla
- ✅ Crear integración "SuiLatam Sorteo"
- ✅ Copiar el token
- ✅ Compartir tabla con la integración
- ✅ Pegar token en notion-config.js
- ✅ ¡Probar el sistema! 