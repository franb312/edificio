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
          <a href="https://maps.google.com/?q=Patagones+1206,+Mar+del+Plata,+Argentina" target="_blank" rel="noopener noreferrer" className="text-center bg-slate-900 text-[#94a8b0] px-6 py-4 text-sm uppercase tracking-widest font-bold hover:bg-slate-800 transition rounded-xl md:rounded-none">Cómo llegar</a>
        </div>
        <div className="w-full md:w-2/3 min-h-[300px] md:min-h-[400px] border-t-2 md:border-t-0 md:border-l-2 border-slate-900 relative bg-slate-100">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.452331589507!2d-57.55938882346765!3d-37.9665675444983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d8525b6d51cd%3A0xc619eb60ecb3ea87!2sPatagones%201206%2C%20B7604%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1713500000000!5m2!1ses-419!2sar" className="absolute inset-0 w-full h-full" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de ubicación Patagones 1206"></iframe>
        </div>
      </div>
    </section>
  );
};

export default UbicacionMapa;