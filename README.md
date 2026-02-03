# Safari Tras las Sierras - Landing Page

Landing page oficial del Safari Tras las Sierras, una competencia de safari en Valle Fértil, San Juan.

## 🚀 Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Video Hero** - Video de fondo en la sección principal

## 📁 Estructura

```
safari-landing/
├── app/
│   ├── layout.tsx      # Layout principal con metadata
│   ├── page.tsx        # Página principal
│   └── globals.css     # Estilos globales
├── components/
│   ├── Hero.tsx        # Sección hero con video
│   ├── About.tsx       # Sobre el evento
│   ├── Categories.tsx  # Categorías de autos y motos
│   ├── RegistrationInfo.tsx  # Información de inscripción
│   ├── Gallery.tsx     # Galería de imágenes
│   ├── Sponsors.tsx    # Patrocinadores
│   ├── Contact.tsx     # Formulario de contacto
│   └── Footer.tsx      # Footer
└── public/
    ├── hero-video.mp4  # Video principal
    └── logo.png        # Logo del evento
```

## 🎨 Características

- ✅ Video hero de fondo
- ✅ Diseño responsive
- ✅ SEO optimizado
- ✅ Animaciones suaves
- ✅ Formulario de contacto
- ✅ Links a la app de inscripción

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar producción
npm start
```

## 📝 Notas

- El video `hero-video.mp4` debe estar en `/public/`
- Las imágenes de galería y sponsors son placeholders - agregar imágenes reales
- El formulario de contacto necesita configuración del backend
- Los links apuntan a `https://safari-ashen.vercel.app` - actualizar si es necesario

## 🌐 Deploy (solo Vercel)

La landing se despliega en **Vercel** únicamente:

- **Repositorio:** [github.com/webplotcentersj-hash/rally](https://github.com/webplotcentersj-hash/rally)
- Conectá este repo en [vercel.com](https://vercel.com) (Add New → Project → Import Git Repository).
- Dejá que Vercel detecte Next.js; opcionalmente configurá variables de entorno.
- Cada push a `main` genera un deploy automático.

**Guía paso a paso:** ver [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md).

## 📧 Contacto

Para más información: safari@plotcenter.com.ar

---

Desarrollado con ❤️ por **Plot Center** 2026
