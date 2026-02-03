# Desplegar en Vercel — Paso a paso

## Paso 1: Entrar a Vercel

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión (o creá una cuenta con GitHub/GitLab/Bitbucket).
2. En el dashboard, hacé clic en **“Add New…”** → **“Project”**.

---

## Paso 2: Conectar el repositorio

1. Elegí **“Import Git Repository”**.
2. Si no está conectado, autorizá a Vercel para acceder a tu cuenta de **GitHub** (o GitLab/Bitbucket).
3. Buscá el repo **`webplotcentersj-hash/rally`** o pegá la URL:  
   `https://github.com/webplotcentersj-hash/rally`
4. Hacé clic en **“Import”**.

---

## Paso 3: Configurar el proyecto

1. **Project Name:** dejá el que sugiere Vercel o poné uno (ej: `safari-tras-las-sierras`).
2. **Framework Preset:** Vercel suele detectar **Next.js** solo; no hace falta cambiarlo.
3. **Root Directory:** dejá en blanco si el proyecto está en la raíz del repo.
4. **Build Command:** `npm run build` (por defecto).
5. **Output Directory:** vacío (Next.js lo maneja).
6. **Install Command:** `npm install` (por defecto).

---

## Paso 4: Variables de entorno (opcional)

Si usás variables (por ejemplo URL de la app Safari):

1. En la misma pantalla, expandí **“Environment Variables”**.
2. Agregá las que necesites, por ejemplo:
   - **Name:** `NEXT_PUBLIC_SAFARI_APP_URL`  
     **Value:** `https://safari-ashen.vercel.app`

La base de datos se usa en la app de inscripción (proyecto aparte); esta landing no requiere variables de Supabase.

---

## Paso 5: Deploy

1. Hacé clic en **“Deploy”**.
2. Vercel va a instalar dependencias, hacer el build y desplegar.
3. Cuando termine, te da una URL tipo:  
   `https://safari-tras-las-sierras.vercel.app` (o el nombre que hayas puesto).

---

## Paso 6: Dominio propio (opcional)

1. En el proyecto en Vercel, entrá a **“Settings”** → **“Domains”**.
2. Agregá tu dominio (ej: `safari.tudominio.com` o `tudominio.com`).
3. Seguí las instrucciones para apuntar el DNS (registro CNAME o A) a Vercel.
4. Vercel activa HTTPS automáticamente.

---

## Deploy automático

- Cada **push** a la rama que conectaste (ej: `main`) genera un nuevo deploy.
- Cada **pull request** puede tener una URL de preview para probar antes de mergear.

---

## Resumen

| Paso | Acción |
|------|--------|
| 1 | Entrar a vercel.com y crear proyecto. |
| 2 | Conectar el repo de GitHub/GitLab. |
| 3 | Dejar Next.js detectado, revisar build/install. |
| 4 | (Opcional) Agregar variables de entorno. |
| 5 | Deploy y usar la URL que da Vercel. |
| 6 | (Opcional) Configurar dominio propio. |
