import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const UbicacionMapa = () => {
  return (
    <section className="py-8 md:py-16 w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="flex flex-col md:flex-row border-2 border-slate-900 bg-white shadow-xl md:shadow-[10px_10px_0px_0px_rgba(241,245,249,1)] overflow-hidden w-full rounded-2xl md:rounded-none">
        <div className="p-6 md:p-12 md:w-1/3 flex flex-col justify-center bg-white z-10 w-full">
          <span className="text-[#94a8b0] font-bold tracking-widest uppercase text-sm">Ubicación Estratégica</span>
          <h2 className="text-3xl font-black text-slate-900 mt-2 mb-4">El Barrio</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-sm">
            Situado en la esquina de Patagones y Aragón, una zona tranquila de Constitución y de constante crecimiento en Mar del Plata. Conectividad ideal y cercanía a todo lo que necesitas.
          </p>
          <a href="https://maps.google.com/?q=Patagones+1212,+Mar+del+Plata,+Argentina" target="_blank" rel="noopener noreferrer" className="text-center bg-slate-900 text-[#94a8b0] px-6 py-4 text-sm uppercase tracking-widest font-bold hover:bg-slate-800 transition rounded-xl md:rounded-none">Cómo llegar</a>
        </div>
        <div className="w-full md:w-2/3 min-h-[300px] md:min-h-[400px] border-t-2 md:border-t-0 md:border-l-2 border-slate-900 relative bg-slate-100">
          <iframe src="https://www.google.com/maps?q=Patagones+1212,+Mar+del+Plata,+Argentina&output=embed" className="absolute inset-0 w-full h-full" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de ubicación Patagones 1212"></iframe>
        </div>
      </div>
    </section>
  );
};

export default UbicacionMapa;