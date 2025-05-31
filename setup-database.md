# 🗄️ CONFIGURAR BASE DE DATOS GRATUITA PARA SUILATAM

## 📋 Opción 1: Supabase (RECOMENDADO - 100% Gratis)

### Paso 1: Crear cuenta Supabase
1. Ve a: https://supabase.com
2. Haz clic en "Start your project"
3. Regístrate con GitHub/Google (gratis)
4. Crea un nuevo proyecto:
   - Nombre: `suilatam-sorteos`
   - Password: (elige una segura)
   - Región: `West US (Oregon)` (más cerca de México)

### Paso 2: Crear tabla de participantes
En el panel de Supabase:
1. Ve a "Table Editor"
2. Crea nueva tabla: `participants`
3. Columnas:
   ```sql
   id: bigint (primary key, auto increment)
   created_at: timestamp (default now())
   name: text
   email: text
   wallet: text
   device: text
   browser: text
   session_id: text
   source: text
   raw_data: jsonb
   ```

### Paso 3: Configurar políticas de seguridad
```sql
-- Permitir insertar nuevos participantes
CREATE POLICY "Enable insert for all users" ON "public"."participants"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- Permitir leer participantes
CREATE POLICY "Enable read access for all users" ON "public"."participants"
AS PERMISSIVE FOR SELECT
TO public
USING (true);
```

### Paso 4: Obtener credenciales
1. Ve a "Settings" → "API"
2. Copia:
   - Project URL
   - Anon/Public Key

---

## 📋 Opción 2: Firebase (Alternativa gratuita)

### Paso 1: Crear proyecto Firebase
1. Ve a: https://console.firebase.google.com
2. "Crear proyecto"
3. Nombre: `suilatam-sorteos`
4. Deshabilitar Google Analytics (opcional)

### Paso 2: Configurar Firestore
1. En el menú: "Firestore Database"
2. "Crear base de datos"
3. Modo: "Empezar en modo de prueba"
4. Ubicación: `us-central1`

### Paso 3: Obtener configuración
1. Configuración del proyecto (⚙️)
2. "Configuración del proyecto"
3. Scroll a "Tus apps" → "Config"
4. Copia el objeto `firebaseConfig`

---

## 📋 Opción 3: MongoDB Atlas (Otra alternativa)

### Paso 1: Crear cuenta
1. Ve a: https://www.mongodb.com/cloud/atlas
2. "Try Free"
3. Crea cuenta

### Paso 2: Crear cluster
1. "Build a Database"
2. Plan: FREE (M0 Sandbox)
3. Proveedor: AWS
4. Región: `us-east-1`

### Paso 3: Configurar acceso
1. Crear usuario de base de datos
2. Permitir acceso desde todas las IPs (0.0.0.0/0)
3. Obtener string de conexión

---

## 🚀 OPCIÓN MÁS SIMPLE: Solo usar Vercel

**Si no quieres configurar base de datos:**

1. Usa solo: `https://suilatam.vercel.app`
2. Los datos se sincronizan perfectamente ahí
3. Para eventos en vivo, solo usa esa URL
4. Los QR codes apuntan a esa URL

**Ventajas:**
- ✅ 0 configuración
- ✅ 0 costo
- ✅ Funciona perfecto
- ✅ Ya está funcionando

**Desventaja:**
- ❌ Los datos locales y Vercel no se sincronizan

---

## 💡 RECOMENDACIÓN FINAL

**Para eventos en vivo:** Usa solo Vercel
**Para desarrollo:** Configura Supabase (15 minutos)

¿Cuál prefieres que configuremos? 