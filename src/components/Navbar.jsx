import React, { useState } from 'react';

export default function Navbar({ isVisible }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md shadow-sm transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between relative z-50 bg-transparent">
        {/* Logo / Nombre del proyecto */}
        <div 
          className="font-black text-slate-800 uppercase tracking-wider text-xl md:text-2xl flex items-start leading-none" 
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          PATAGONES
          <span className="text-[11px] md:text-xs font-extrabold ml-1 mt-0.5 tracking-normal text-slate-600">
            1206
          </span>
        </div>

        {/* Enlaces de Navegación Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#galeria" className="hover:text-slate-900 transition-colors">Galería</a>
          <a href="#edificio" className="hover:text-slate-900 transition-colors">Edificio</a>
          <a href="#unidades" className="hover:text-slate-900 transition-colors">Unidades</a>
          <a href="#mapa" className="hover:text-slate-900 transition-colors">Ubicación</a>
          {/* Nuevo enlace al Brochure (Desktop) */}
          <a 
            href="/brochure.pdf" 
            
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-slate-900 transition-colors"
          >
            Brochure
          </a>
        </div>

        {/* Botón Desktop & Menú Hamburguesa Mobile */}
        <div className="flex items-center gap-4">
          <a 
            href="#contacto"
            className="flex items-center gap-2 px-3 py-2.5 md:px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all duration-300 shadow-md shadow-[#1ea04c]/20 hover:shadow-[#1ea04c]/40"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="hidden md:inline">Contacto</span>
          </a>
          
          {/* Botón Hamburguesa */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none cursor-pointer"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <span className={`block w-6 h-0.5 bg-slate-700 transition-transform duration-300 origin-center ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-700 transition-opacity duration-300 ${menuAbierto ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-700 transition-transform duration-300 origin-center ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Menú desplegable Mobile */}
      <div 
        className={`md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-white/40 shadow-xl transition-all duration-300 overflow-hidden ${
          menuAbierto ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-5 py-6 gap-5 text-base font-medium text-slate-600 bg-transparent">
          <a href="#galeria" onClick={() => setMenuAbierto(false)} className="hover:text-slate-900 active:scale-95 transition-transform">Galería</a>
          <a href="#edificio" onClick={() => setMenuAbierto(false)} className="hover:text-slate-900 active:scale-95 transition-transform">Edificio</a>
          <a href="#unidades" onClick={() => setMenuAbierto(false)} className="hover:text-slate-900 active:scale-95 transition-transform">Unidades</a>
          <a href="#mapa" onClick={() => setMenuAbierto(false)} className="hover:text-slate-900 active:scale-95 transition-transform">Ubicación</a>
          {/* Nuevo enlace al Brochure (Mobile) */}
          <a 
            href="/brochure.pdf" 
            
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => setMenuAbierto(false)} 
            className="hover:text-slate-900 active:scale-95 transition-transform"
          >
            Brochure
          </a>
          
          <a 
            href="#contacto"
            onClick={() => setMenuAbierto(false)}
            className="flex justify-center items-center gap-2 px-5 py-3 bg-[#1ea04c] hover:bg-[#17853e] text-white font-medium rounded-xl transition-all duration-300 shadow-md shadow-[#1ea04c]/20"
          >
            Contacto
          </a>        
        </div>
      </div>
    </nav>
  );
}