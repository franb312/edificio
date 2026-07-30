import React from 'react';

export default function Contacto() {
  return (
    <div 
      className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-12 text-center"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          ¿Te interesa conocer más?
        </h2>
        <p className="text-slate-500 text-lg">
          Escribinos directamente por WhatsApp, o mandanos un correo.
        </p>
      </div>

      {/* Contenedor Horizontal (columna en móviles, fila en md+) */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
        
        <a
          href="https://wa.me/549XXXXXXXXX?text=Hola,%20quisiera%20más%20información%20sobre%20el%20Edificio%20Patagones%201206."
          target="_blank"
          rel="noopener noreferrer"
          // Reduje el padding a px-5 py-2.5 y el redondeo a rounded-lg
          className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md shadow-[#1ea04c]/20 hover:shadow-[#1ea04c]/40 hover:-translate-y-0.5 w-full md:w-auto justify-center"
        >
          {/* Reduje el tamaño del icono a w-4 h-4 */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {/* Reduje la fuente a text-sm */}
          <span className="font-semibold text-sm">Contactar por WhatsApp</span>
        </a>

        {/* Divisor (Línea vertical en PC, línea horizontal en móviles) */}
        <div className="hidden md:block w-px h-16 bg-slate-200"></div>
        <div className="md:hidden w-16 h-px bg-slate-200 my-2"></div>

        {/* Email visible y seleccionable */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
          <span className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">
            O escribinos a
          </span>
          <a 
            href="mailto:hola@patagones1206.com" 
            className="text-xl md:text-2xl font-bold text-slate-700 hover:text-[#94a8b0] transition-colors select-all"
          >
            hola@patagones1206.com
          </a>
        </div>

      </div>
    </div>
  );
}