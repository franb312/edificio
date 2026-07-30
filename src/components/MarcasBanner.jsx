import React from 'react';
import { 
  Wind, 
  Thermometer, 
  Flame, 
  AppWindow, 
  WashingMachine, 
  Sun, 
  Cuboid, 
  PanelBottom, 
  Toilet, 
  Layers 
} from 'lucide-react';

export default function MarcasGrid() {
  const caracteristicas = [
    { id: 1, texto: "PRE-INSTALACION DE AC", icono: Wind },
    { id: 2, texto: "CALDERAS DUAL SYSTEM", icono: Thermometer },
    { id: 3, texto: "CALEFACION POR RADIADORES / LOSA RADIANTE", icono: Flame },
    { id: 4, texto: "CARPINTERIAS PVC-DVH", icono: AppWindow },
    { id: 5, texto: "CONEXION PARA LAVARROPAS", icono: WashingMachine },
    { id: 6, texto: "TERRAZAS PRIVADAS CON PARRILLA A GAS", icono: Sun },
    { id: 7, texto: "CIELORRASOS DE HORMIGON VISTO", icono: Cuboid },
    { id: 8, texto: "BARANDAS DE HORMIGON VISTO", icono: PanelBottom },
    { id: 9, texto: "INODOROS LINEA FERRUM", icono: Toilet },
    { id: 10, texto: "PORCELANATOS DE PRIMERA CALIDAD", icono: Layers }
  ];

  return (
    <div 
      /* Reducimos el padding vertical en móvil (py-8) y lo mantenemos en desktop (md:py-16) */
      className="w-full bg-white border-y border-slate-100 py-8 md:py-16 px-4 md:px-8"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Reducimos el margen inferior del título en móvil (mb-6) */}
        <h3 className="text-lg md:text-2xl font-bold text-slate-800 uppercase tracking-wider mb-6 md:mb-12 text-left">
          DEFINICIONES TÉCNICAS
        </h3>
        
        {/* Reducimos el gap vertical y horizontal en móvil (gap-y-6 gap-x-4) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 md:gap-y-12 gap-x-3 md:gap-x-8">
          {caracteristicas.map((item) => {
            const Icono = item.icono;
            return (
              <div 
                key={item.id} 
                className="group flex flex-col items-center text-center transition-all duration-300"
              >
                {/* Achicamos el contenedor del ícono en móvil (w-12 h-12) y su margen (mb-3) */}
                <div className="w-12 h-12 md:w-16 md:h-16 aspect-square flex items-center justify-center bg-slate-50 rounded-xl md:rounded-2xl mb-3 md:mb-5 text-[#94a8b0] group-hover:bg-[#94a8b0]/10 group-hover:text-[#7d8f96] transition-colors">
                  {/* Para que el ícono se adapte, puedes usar clases de Tailwind en lugar del prop size si lo prefieres, pero mantendremos un tamaño sutil */}
                  <Icono className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.2} />
                </div>
                
                {/* Achicamos levemente la fuente en móvil (text-[11px]) para que no rompa en 3 líneas */}
                <span className="text-[11px] md:text-[13px] font-semibold text-slate-600 leading-tight uppercase tracking-tight">
                  {item.texto}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}