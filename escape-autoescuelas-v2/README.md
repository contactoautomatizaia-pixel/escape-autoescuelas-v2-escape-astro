# Handoff: Escape Autoescuelas — Web (Elx, Alicante)

> **v2 — Polish pass (abril 2026)**
> Mejoras aplicadas sobre el bundle original. Ver sección **"Cambios v2"** al final.

## Overview
Web pública para **Escape Autoescuelas**, autoescuela en Elx (Carrer Jaime Gómez Orts, 18 · 03202 Elx · Alicante). El objetivo de la web es captar matrículas (coche y moto), comunicar precios sin letra pequeña, y convertir vía WhatsApp / formulario de contacto.

Incluye:
- **Home** — hero, permisos, stats, proceso, testimonios, equipo, contacto con mapa real de Google Maps.
- **Permisos** — detalle de B / A2 / A1 / AM con todo lo incluido y precios desglosados.
- **Contacto** — info, formulario y mapa.
- **Mobile** — versión mobile (iPhone-frame) de la home.

## About the Design Files
Los archivos de este bundle son **referencias de diseño en HTML+JSX (React via Babel inline)**. Son prototipos de alta fidelidad que muestran el aspecto y comportamiento finales — **no son código de producción para copiar tal cual**.

La tarea es **recrear estos diseños en el entorno del proyecto destino** (Next.js, Astro, Vite + React, WordPress, etc.) usando sus patrones y librerías. Si todavía no hay codebase, recomiendo **Next.js (App Router) + Tailwind CSS** o **Astro + Tailwind** para una web estática rápida y SEO-friendly.

## Fidelity
**High-fidelity (hifi).** Colores, tipografías, spacing, radios y micro-interacciones están finales. Replicar pixel-perfect usando las librerías del proyecto destino. Los textos de copy son finales (en español).

---

## Design Tokens

### Colores
| Token | Hex | Uso |
|---|---|---|
| `--escape-red` | `#C8102E` | Color de marca (logo, CTAs, acentos) |
| `--escape-red-deep` | `#9A0C24` | Hover/pressed del rojo |
| `--escape-red-soft` | `#E63950` | Variante suave |
| `--escape-ink` | `#0A0A0A` | Negro principal (tipografía, fondos oscuros) |
| `--escape-ink-2` | `#1A1A1A` | Negro secundario |
| `--escape-paper` | `#F5F2EC` | Beige cálido — fondo principal de la web |
| `--escape-paper-2` | `#ECE7DD` | Beige más oscuro |
| `--escape-line` | `rgba(10,10,10,0.12)` | Bordes |
| `--escape-line-soft` | `rgba(10,10,10,0.06)` | Bordes muy suaves |
| `--escape-mute` | `#6B6B6B` | Texto secundario |

### Tipografía (Google Fonts)
- **Display** — `Archivo Black` (titulares grandes, números). Fallback: `Anton`, system-ui.
- **Italic display** — usado mediante la clase `.escape-italic`, que aplica `font-style: italic` + `transform: skewX(-8deg)` sobre la display. Imita la "ESCAPE" inclinada del logo.
- **Body** — `Inter` 400/500/600/700/800.
- **Serif (editorial)** — `Fraunces` italic.
- **Mono (etiquetas/coordenadas)** — `JetBrains Mono` 400/500.

Tamaños hero: 88–132px display. Body: 15–20px. Eyebrows mono: 10–12px con `letter-spacing: 0.15em`.

### Spacing
- Padding página: `80px 56px` desktop, `20px` mobile.
- Gap secciones: 64–80px.
- Border radius: 12 (chips/labels), 14 (default), 20 (mobile cards), 28 (cards y mapas grandes), 999 (botones pill).

### Sombras / Bordes
- Cards: `1px solid var(--escape-line)` + `border-radius: 28px`.
- Bordes oscuros: `1px solid rgba(255,255,255,0.06–0.12)`.
- Sombra mobile frame: `0 30px 80px rgba(0,0,0,0.4)`.

---

## Datos reales
- **Dirección**: Carrer Jaime Gómez Orts, 18 · 03202 Elx · Alicante.
- **Teléfono / WhatsApp**: 601 30 23 09.
- **Horario**: L–V 09:00–13:00 / 16:00–20:30. Sábados con cita previa.
- **Instagram**: @escapeautoescuelas.
- **Equipo**: Aitor Sánchez, Juan de Dios Sánchez (ambos profes coche+moto).
- **% aprobados**: 89%* a la primera (con asterisco — el dato exacto debe confirmarse).
- **Permisos**: B, A1, A2, AM.

## Files (en este bundle)
- `Home.html`, `Contacto.html`, `Permisos.html`, `Mobile.html` — entrypoints.
- `variant-c.jsx` — componente principal de la home (todo el contenido + secciones).
- `contacto-page.jsx`, `permisos-page.jsx`, `mobile-home.jsx` — páginas individuales.
- `tweaks-panel.jsx`, `ios-frame.jsx` — utilidades de prototipado (no productivas).
- `styles.css` — tokens CSS y utilidades compartidas (clase `.escape-italic`, marquee, animaciones, responsive).
- `assets/` — logo y foto del local.
- `screenshots/` — capturas de cada pantalla.

## Open questions / TODO
- Confirmar **% aprobados real** (en el diseño aparece 89%* con asterisco).
- Conseguir **fotos del equipo** (Aitor y Juan de Dios) — ahora son placeholders.
- Confirmar **año de fundación / "+15 años"** si aplica.

---

## Cambios v2 (polish pass)

### Funcionalidad real
- **Teléfono clickable** en todas partes (`tel:+34601302309`) — header, hero, contacto, footer, mobile, equipo.
- **WhatsApp** con mensaje pre-rellenado (`?text=Hola%2C%20quiero%20info...`).
- **Mapa Google** clickable en Home, Contacto y Mobile (sigue usando el patrón `iframe pointer-events:none` dentro de `<a>`).
- **Formulario de contacto funcional**:
  - Validación real de teléfono español (9 dígitos, opcional +34).
  - Honeypot anti-bots invisible.
  - Estados `idle / sending / success / error` con feedback inline.
  - Checkbox de consentimiento RGPD obligatorio.
  - Por defecto envía vía `mailto:` (zero-backend). Para pasar a producción, define `FORM_ENDPOINT` en `contacto-page.jsx` con tu URL de Formspree/Resend.
- **Menú hamburguesa** funcional en la versión Mobile.

### Animaciones y micro-interacciones
- **Reveal-on-scroll** en cada sección con `IntersectionObserver` + clases `escape-reveal` / `escape-reveal-stagger`.
- **Hero animado** al cargar (fade-up secuencial de eyebrow, título, lead, CTAs, chips).
- **Hover en cards**: lift de -6px / -8px + sombra suave (permisos, proceso, testimonios, equipo, mobile).
- **Botones**: lift + brightness + flecha que se desplaza al hover. Botones de matrícula con `pulse` rojo permanente.
- **Foto del local**: zoom suave (1.06x) al hover.
- **Blobs del hero** flotando lentamente (12-14s).
- **Punto eyebrow** (●) pulsa cada 2s.
- **Nav links** con underline animado al hover.
- **Mapa**: lift de 3px al hover.
- Todo respetando `prefers-reduced-motion: reduce`.

### Responsive
- Sistema de marcadores `data-c="..."` en JSX + `@media` queries en `styles.css`.
- 3 breakpoints: **1200px** (laptop estrecho), **900px** (tablet/mobile), **640px** (mobile pequeño).
- En mobile: nav links se ocultan (queda logo + CTA), grids colapsan a 1 columna, tipografía display escala (132 → 56px), padding se reduce.
- Form de contacto en una columna en mobile.
- Cards de permisos con detalle reorganizan su `aside` debajo en mobile.

### Accesibilidad
- `aria-label` en CTAs no obvios (WhatsApp, llamar, mapa).
- `aria-hidden="true"` en elementos decorativos (puntos, flechas, blobs, ★).
- `aria-labelledby` en hero, `aria-live="polite"` en feedback de form.
- `aria-expanded` en botón de menú mobile.
- `:focus-visible` con outline rojo de 2px en todos los focusables.

### SEO + schema.org
- Meta `description`, `keywords`, `author`, `theme-color` en los 4 HTML.
- Open Graph + Twitter Cards.
- `<link rel="canonical">` en cada página.
- `<link rel="icon">` y `apple-touch-icon` apuntando al logo.
- **JSON-LD `DrivingSchool`** en Home (con dirección, teléfono, geo, horarios).
- **JSON-LD `BreadcrumbList`** en Permisos.
- **JSON-LD `ContactPage`** en Contacto.
- Mobile.html marcado como `noindex` (es preview).

### Código
- Constantes `PHONE_DISPLAY / PHONE_TEL / WHATSAPP_URL / MAPS_URL / MAPS_EMBED` exportadas en `window.ESCAPE_CONTACT` desde `variant-c.jsx` para reutilizar en todas las páginas.
- Hook reusable `useReveal()` exportado en `window.useReveal`.
- Mobile.html ahora también carga `variant-c.jsx` (necesario para usar `ESCAPE_CONTACT`).
- `loading="lazy"` en imágenes y mapas.
- `target="_blank" rel="noopener"` consistente en todos los enlaces externos.

### Cómo conectar el form a producción
1. Crea cuenta en Formspree o Resend.
2. Edita `contacto-page.jsx` línea ~10 y pon tu endpoint:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";
   ```
3. Listo — el componente ya hace `fetch()` con JSON cuando hay endpoint, y cae a `mailto:` cuando está vacío.
