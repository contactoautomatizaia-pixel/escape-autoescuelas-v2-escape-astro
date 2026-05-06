# Escape Autoescuelas — Proyecto Astro v2

## ✅ Build verificado: 3 páginas, 0 errores

## 📁 Antes de empezar: copia las imágenes
Copia la carpeta `assets/` de tu proyecto anterior dentro de `public/`:
```
escape-autoescuelas-v2/assets/  →  escape-astro/public/assets/
```
Archivos necesarios: local.jpg, entrada.jpg, despacho.jpg, aitor.jpg, juan.jpg, logo.jpeg

## 🚀 Comandos
```bash
npm install          # instalar dependencias (solo la primera vez)
npm run dev          # servidor local en http://localhost:4321
npm run build        # genera la carpeta dist/ lista para subir
npm run preview      # previsualizar el build antes de subir
```

## 📦 Deploy en Netlify
1. Conecta este repositorio en Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
(ya configurado en netlify.toml)

## ⚡ Acciones pendientes (por orden de impacto)

### 1. Formspree — conectar el formulario (20 min)
- Ve a https://formspree.io → crea cuenta gratis → New Form
- Copia tu URL (ej: https://formspree.io/f/xxxxxxx)
- Abre `src/components/ContactForm.jsx` línea 8
- Pega la URL en: `const FORM_ENDPOINT = "TU_URL_AQUI";`

### 2. Elfsight — verifica tu widget de reseñas (5 min)
- Entra en https://app.elfsight.com
- Confirma que el ID `612dd2a2-bc07-4d72-900d-5aaf79aced2c` es el tuyo
- Si no, cópialo de tu widget y actualiza `src/components/Resenas.astro`

### 3. Google Analytics 4 (15 min)
- Crea propiedad en https://analytics.google.com
- Copia el snippet `<script>` de GA4
- Pégalo en `src/layouts/Layout.astro` dentro del `<head>`

### 4. Favicon profesional (10 min)
- Sube `public/assets/logo.jpeg` a https://realfavicongenerator.net
- Descarga el ZIP → descomprime en `public/`
- Reemplaza el snippet de favicon en `src/layouts/Layout.astro`

## 📄 Páginas generadas
- `/` → Inicio (Hero, Permisos, Stats, Proceso, Teoría, Carrusel, Reseñas, FAQ, Contacto)
- `/permisos` → Detalle de todos los permisos con precios
- `/contacto` → Formulario + mapa + equipo

## 🔧 Estructura del proyecto
```
src/
  layouts/Layout.astro       ← head, meta, scripts globales
  pages/
    index.astro              ← página de inicio
    permisos.astro           ← página de precios
    contacto.astro           ← página de contacto
  components/
    Nav.astro / Footer.astro
    Hero.astro / Strip.astro
    PermisosCards.astro / Stats.astro / Proceso.astro
    TeoriaMetodo.astro / Equipo.astro / Resenas.astro
    ContactoSection.astro
    Carrusel.jsx  ← React (interactivo)
    Faq.jsx       ← React (interactivo)
    ContactForm.jsx ← React (interactivo)
public/
  styles.css / cookies-banner.js / robots.txt / sitemap.xml
  assets/ ← (copia aquí tus imágenes)
  legal/  ← páginas legales HTML
```
