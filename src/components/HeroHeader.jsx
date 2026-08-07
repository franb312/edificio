import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAN_SPEED = 240; // px/seg mientras se mantiene el cursor (o se mantiene tocada) una flecha

const HeroHeader = () => {
const panXRef = useRef(0);
const directionRef = useRef(0);
const rafRef = useRef(null);
const lastTsRef = useRef(null);
const [scrollY, setScrollY] = useState(0);
const [isLoaded, setIsLoaded] = useState(false);
const [panX, setPanX] = useState(0);
const [arrowsDiscovered, setArrowsDiscovered] = useState(false);

useEffect(() => {
// Dispara la animación de entrada al montar
setIsLoaded(true);
const manejarScroll = () => {
if (window.scrollY < window.innerHeight) {
setScrollY(window.scrollY);
}
};
window.addEventListener("scroll", manejarScroll, { passive: true });
return () => window.removeEventListener("scroll", manejarScroll);
}, []);

// Paneo continuo e infinito (loop real tipo 360°) mientras se mantiene presionada una de las flechas
// de borde -- igual en mobile (touch) que en desktop (mouse). Se usa background-repeat en vez de
// <img> para que el recorrido nunca "choque" contra un borde: al tapizar la panorámica, correr el
// fondo más allá de su ancho simplemente vuelve a mostrar el inicio.
useEffect(() => {
const step = (ts) => {
if (lastTsRef.current == null) lastTsRef.current = ts;
const deltaSeg = (ts - lastTsRef.current) / 1000;
lastTsRef.current = ts;
if (directionRef.current !== 0) {
panXRef.current += directionRef.current * PAN_SPEED * deltaSeg;
setPanX(panXRef.current);
}
rafRef.current = requestAnimationFrame(step);
};
rafRef.current = requestAnimationFrame(step);
return () => {
cancelAnimationFrame(rafRef.current);
lastTsRef.current = null;
};
}, []);

const nudgeTimeoutRef = useRef(null);

const startPan = useCallback((direccion) => {
if (nudgeTimeoutRef.current) {
clearTimeout(nudgeTimeoutRef.current);
nudgeTimeoutRef.current = null;
}
directionRef.current = direccion;
// Ya interactuó al menos una vez: dejamos de llamar la atención con el pulso.
setArrowsDiscovered(true);
}, []);
const stopPan = useCallback(() => { directionRef.current = 0; }, []);

// Click/tap corto en la flecha: en vez de tener que mantener presionado para que se mueva
// (mouse en desktop) o simplemente no tener control (drift automático que teníamos antes en
// mobile), un tap "empuja" la vista un tramo fijo. Funciona igual con mouse que con touch.
const nudgePan = useCallback((direccion) => {
startPan(direccion);
nudgeTimeoutRef.current = setTimeout(() => {
stopPan();
nudgeTimeoutRef.current = null;
}, 700);
}, [startPan, stopPan]);

return (
<header className="relative h-[85vh] w-full overflow-hidden flex flex-col items-center justify-center bg-slate-900">
{/* Fondo panorámico con efecto Parallax vertical + paneo lateral infinito, controlado por el
usuario con las flechas de los bordes (mantener presionado con mouse, o tocar en mobile) */}
<div
className="absolute inset-x-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none overflow-hidden"
style={{ transform: `translate3d(0, ${scrollY * 0.35}px, 0)` }}
>
<div
className="absolute inset-0 opacity-80"
style={{
backgroundImage: "url('/panoramica.vistas.jpg')",
backgroundRepeat: 'repeat-x',
backgroundSize: 'auto 100%',
backgroundPositionX: `${panX}px`,
backgroundPositionY: 'center',
}}
/>
</div>

{/* Flechas de paneo: siempre visibles y grandes, no dependen de descubrir un hover invisible.
Fondo tipo vidrio (transparente, no rompe la estética) en vez de un círculo blanco sólido.
El pulso de atención se apaga solo la primera vez que el usuario interactúa con alguna de
las dos. Funcionan manteniendo el cursor encima (paneo continuo, desktop) y con un simple
tap/click (empuja la vista un tramo fijo, funciona igual en mobile que en desktop). */}
<button
type="button"
aria-label="Ver hacia la izquierda"
onMouseEnter={() => startPan(1)}
onMouseLeave={stopPan}
onClick={() => nudgePan(1)}
className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/40 shadow-lg shadow-black/20 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
>
{!arrowsDiscovered && (
<span className="absolute inset-0 rounded-full bg-white/40 animate-ping pointer-events-none" />
)}
<ChevronLeft className="relative w-8 h-8 md:w-9 md:h-9 text-white drop-shadow-md" strokeWidth={2.5} />
</button>
<button
type="button"
aria-label="Ver hacia la derecha"
onMouseEnter={() => startPan(-1)}
onMouseLeave={stopPan}
onClick={() => nudgePan(-1)}
className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/40 shadow-lg shadow-black/20 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
>
{!arrowsDiscovered && (
<span className="absolute inset-0 rounded-full bg-white/40 animate-ping pointer-events-none" />
)}
<ChevronRight className="relative w-8 h-8 md:w-9 md:h-9 text-white drop-shadow-md" strokeWidth={2.5} />
</button>

{/* Overlays y Degradados (Mejorando el contraste del fondo) */}
<div className="absolute inset-0 z-10 bg-slate-900/40 mix-blend-multiply" />
<div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
{/* Contenido Principal */}
{/* pointer-events-none: es solo contenido decorativo, no debe tapar las flechas de paneo de los bordes */}
<div
className={`relative z-20 mx-auto max-w-7xl px-6 flex flex-col items-center text-center text-white -mt-40 md:-mt-56 w-full pointer-events-none transition-all duration-1000 ease-out transform ${
isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
}`}
style={{
transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
opacity: Math.max(0, 1 - scrollY / 350) // Fade-out más suave
}}
>
<span
className="text-[#94a8b0] font-bold tracking-widest uppercase text-sm md:text-base"
style={{ fontFamily: "'Montserrat', sans-serif" }}
>
Edificio
</span>

<h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-6xl drop-shadow-xl">
PATAGONES <span className="text-[#94a8b0]">1212</span>
</h1>
</div>

{/* Logo Pioneros (reemplaza al indicador "Descubrir"): sin placa. invert+screen van directo en la img,
sin un div/a contenedor posicionado en el medio, porque eso arma su propio stacking context y
aísla el mix-blend-mode del fondo real (se veía como una caja negra sólida en vez de transparentarse).
El <a> queda sin position/z-index/opacity propios para no crear ese stacking context: todo eso vive
en la img, que sí está posicionada de forma absoluta contra el header. */}
<a
href="https://pioneros-hub.vercel.app/"
target="_blank"
rel="noopener noreferrer"
aria-label="Ir al sitio de Grupo Pioneros"
>
<img
src="/logopioneros.webp"
alt="Grupo Pioneros"
decoding="async"
className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 h-6 md:h-7 w-auto invert mix-blend-screen select-none transition-opacity duration-300"
style={{ opacity: Math.max(0, 0.9 - scrollY / 150) }}
/>
</a>

</header>
);
};

export default HeroHeader;
