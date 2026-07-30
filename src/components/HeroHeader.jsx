import React, { useState, useEffect, useRef } from 'react';

const HeroHeader = () => {
const videoRef = useRef(null);
const [scrollY, setScrollY] = useState(0);
const [isLoaded, setIsLoaded] = useState(false);

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

return (
<header className="relative h-[85vh] w-full overflow-hidden flex flex-col items-center justify-center bg-slate-900">
{/* Fondo de Video con efecto Parallax (Opacidad y mezcla mantenidas) */}
<div
className="absolute inset-x-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none"
style={{ transform: `translate3d(0, ${scrollY * 0.35}px, 0)` }}
>
<video
ref={videoRef}
autoPlay
muted
loop
playsInline
poster="/poster-drone.webp"
className="w-full h-full object-cover opacity-80"
>
<source src="/dronecomprimidocorto2.webm" type="video/webm" />
</video>
</div>

{/* Overlays y Degradados (Mejorando el contraste del dron) */}
<div className="absolute inset-0 z-10 bg-slate-900/40 mix-blend-multiply" />
<div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
{/* Contenido Principal: Animación fluida pero con TUS estilos originales */}
<div
className={`relative z-20 mx-auto max-w-7xl px-6 text-center text-white mt-12 w-full transition-all duration-1000 ease-out transform ${
isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
}`}
style={{
transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
opacity: Math.max(0, 1 - scrollY / 350) // Fade-out más suave
}}
>
{/* Etiqueta Original Intacta */}
<div
className="mb-4 inline-flex items-start rounded-full bg-[#94a8b0]/20 backdrop-blur-md px-10 py-2.5 text-base md:text-lg font-black uppercase tracking-widest text-[#0A131C] border border-[#94a8b0]/30 shadow-lg leading-none"
style={{ fontFamily: "'Montserrat', sans-serif" }}
>
PATAGONES
<span className="text-[10px] md:text-[11px] font-extrabold ml-1 mt-0.5 tracking-normal opacity-90">
1206
</span>
</div>
{/* Título Original Intacto */}
<h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-7xl drop-shadow-xl mt-4">
Viví con estilo <br />
<span className="text-[#94a8b0]">y comodidad.</span>
</h1>
</div>

{/* Indicador de Scroll adaptado a tus colores */}
<div
className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 transition-opacity duration-300"
style={{ opacity: Math.max(0, 1 - scrollY / 150) }}
>
<span className="text-[#94a8b0] text-[10px] uppercase tracking-[0.3em] font-semibold">Descubrir</span>
<div className="w-[1px] h-12 bg-[#94a8b0]/30 overflow-hidden relative">
<div className="w-full h-1/2 bg-[#94a8b0] absolute top-0 animate-bounce"></div>
</div>
</div>

</header>
);
};

export default HeroHeader; 
