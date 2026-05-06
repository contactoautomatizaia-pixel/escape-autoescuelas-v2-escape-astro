import { useState, useEffect } from "react";

const slides = [
  { src: "/assets/local.webp",         alt: "Fachada del local en Carrer Jaime Gómez Orts, 18 · Elx", label: "FACHADA" },
  { src: "/assets/entrada.webp",       alt: "Entrada y recepción de Escape Autoescuelas",            label: "RECEPCIÓN" },
  { src: "/assets/despacho.webp",      alt: "Oficina y zona de matrícula",                           label: "OFICINA" },
  { src: "/assets/coche-blanco.webp", alt: "Volkswagen Golf blanco de Escape Autoescuelas",         label: "FLOTA - COCHE PRINCIPAL" },
  { src: "/assets/coche-negro.webp",  alt: "Seat Ibiza negro de Escape Autoescuelas",               label: "FLOTA - COCHE SECUNDARIO" },
];

export default function Carrusel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3000);
    return () => clearInterval(t);
  }, [paused, prefersReducedMotion]);

  const go = (i) => setIdx(((i % slides.length) + slides.length) % slides.length);

  return (
    <section style={{ padding: "80px 56px" }} data-c="section">
      <div className="escape-reveal" style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", color: "var(--escape-red)", marginBottom: 16 }}>
          {String.fromCharCode(9679)} EL LOCAL
        </div>
        <h2
          style={{ fontFamily: "var(--font-display)", fontSize: 96, lineHeight: 0.95, letterSpacing: "-0.045em" }}
          data-c="section-title"
        >
          Conoce <span className="escape-italic" style={{ color: "var(--escape-red)" }}>nuestro espacio.</span>
        </h2>
      </div>

      <div
        className="carrusel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="carrusel-window">
          <div className="carrusel-track" style={{ transform: "translateX(-" + (idx * 100) + "%)" }}>
            {slides.map((s, i) => (
              <div key={i} className="carrusel-slide">
                {s.src ? (
                  <img src={s.src} alt={s.alt} loading="lazy" width="1200" height="800" />
                ) : (
                  <div className="escape-placeholder" style={{ width: "100%", height: "100%", fontSize: 14 }}>{s.ph}</div>
                )}
                <div style={{ position: "absolute", left: 16, bottom: 16, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(4px)", color: "#fff", padding: "8px 12px", borderRadius: 10, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="carrusel-btn carrusel-btn-prev" onClick={() => go(idx - 1)} aria-label="Anterior">&#8249;</button>
        <button className="carrusel-btn carrusel-btn-next" onClick={() => go(idx + 1)} aria-label="Siguiente">&#8250;</button>

        <div className="carrusel-dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              className={"carrusel-dot" + (i === idx ? " is-active" : "")}
              onClick={() => go(i)}
              aria-label={"Ir a la imagen " + (i + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
