import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import '/buildingMap.css';

// Importación de Componentes
import HeroHeader from './components/HeroHeader';
import Galeria from './components/Galeria';
import BuildingSelector2 from './components/BuildingSelector2';
import Navbar from './components/Navbar';
import Contacto from './components/Contacto';

// Secciones debajo del pliegue: se descargan aparte del bundle principal
const SelectorUnidades = lazy(() => import('./components/SelectorUnidades'));
const UbicacionMapa = lazy(() => import('./components/UbicacionMapa'));
const MarcasBanner = lazy(() => import('./components/MarcasBanner'));

const CargandoSeccion = ({ titulo }) => (
  <div className="w-full h-64 flex flex-col items-center justify-center bg-slate-50 rounded-3xl border border-slate-100 animate-pulse">
    <div className="w-8 h-8 border-4 border-[#94a8b0]/30 border-t-[#94a8b0] rounded-full animate-spin mb-4"></div>
    <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
      Cargando {titulo}...
    </p>
  </div>
);

export default function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  
  // Referencia solo para el edificio ahora
  const edificioRef = useRef(null);

  // Usamos useRef para guardar los estados internamente sin causar re-renders innecesarios en cada pixel que se scrollea
  const isScrolled = useRef(false);
  const isBuildingVisible = useRef(false);

  useEffect(() => {
    // Función que decide si mostrar o no la Navbar
    const updateNavbarVisibility = () => {
      // Se muestra SI el usuario bajó un poco Y NO está viendo el edificio
      setShowNavbar(isScrolled.current && !isBuildingVisible.current);
    };

    // 1. Control del Scroll en el Hero (y resto de la página)
    const handleScroll = () => {
      // Si scrollea más de 50 píxeles hacia abajo, consideramos que "empezó a scrollear"
      const scrolled = window.scrollY > 50; 
      
      if (isScrolled.current !== scrolled) {
        isScrolled.current = scrolled;
        updateNavbarVisibility();
      }
    };

    // Escuchamos el scroll (passive: true mejora mucho el rendimiento)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Control de visibilidad del Edificio
    const observer = new IntersectionObserver(
      ([entry]) => {
        isBuildingVisible.current = entry.isIntersecting;
        updateNavbarVisibility();
      },
      { threshold: 0.1 }
    );

    if (edificioRef.current) observer.observe(edificioRef.current);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (edificioRef.current) observer.disconnect();
    };
  }, []);

  return (
    <div className="relative flex flex-col w-full max-w-full overflow-x-clip min-h-screen bg-white text-slate-900 font-sans m-0 p-0">
      
      {/* Navbar controlada por los dos eventos (Scroll + Observer del Edificio) */}
      <Navbar isVisible={showNavbar} />

      {/* Ya no necesita el ref, el Hero se maneja con el evento de scroll */}
      <div>
        <HeroHeader />
      </div>
      
      <main className="mx-auto w-full max-w-7xl px-5 md:px-8 py-8 md:py-12 flex flex-col gap-6 md:gap-10">
        
        <section id="galeria" className="scroll-mt-24">
          <Galeria />
        </section>

        {/* Acá mantenemos el ref para seguir ocultando la Navbar cuando interactúan con el edificio */}
        <section ref={edificioRef} id="edificio" className="scroll-mt-24">
          <BuildingSelector2 />
        </section>

        <div id="unidades" className="scroll-mt-24">
          <Suspense fallback={<CargandoSeccion titulo="Unidades" />}>
            <SelectorUnidades />
          </Suspense>
        </div>
        <section> 
            <Suspense fallback={<CargandoSeccion titulo="Definiciones Técnicas" />}>
            <MarcasBanner />
            </Suspense>
          </section>

       <div className="flex flex-col gap-0">
          
          <section id="mapa" className="scroll-mt-24">
            <Suspense fallback={<CargandoSeccion titulo="Mapa" />}>
              <UbicacionMapa />  
            </Suspense> 
          </section>

          
          
        </div>

        <section id="contacto" className="scroll-mt-24">
          <Contacto />
        </section>

      </main>
{/* FOOTER ORGANIZADO CON MÁS ESPACIO VERTICAL */}
      <footer className="py-10 md:py-12 border-t border-slate-200 mt-auto w-full text-slate-400 px-6 md:px-12">
        
        {/* Contenedor Principal: Fila en Escritorio, Columna en Móvil */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          
          {/* 1. LOGO DE LA DESARROLLADORA (Izquierda) */}
          <div className="flex items-center justify-start min-w-[150px]">
            <img 
              src="/logopioneros.webp" 
              alt="Logo Pioneros" 
              className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200 grayscale" 
            />
          </div>

          {/* 2. BLOQUE CENTRAL: Copyright y Legales (Centro) */}
          <div className="flex flex-col items-center gap-4 text-center max-w-xl md:max-w-2xl flex-1">
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs md:text-sm">
              <span className="text-slate-500 font-medium">© 2026 Patagones 1206.</span>
              
            </div>
            
            <p className="text-[11px] leading-relaxed text-slate-400/70 px-4">
              Las imágenes, medidas y superficies son aproximadas y de carácter ilustrativo. 
            </p>
          </div>

          {/* 3. ESPACIADOR INVISIBLE (Mantiene el bloque central perfectamente alineado en escritorio) */}
          <div className="hidden md:block min-w-[150px]"></div>

        </div>

      </footer>
    </div>
  );
}