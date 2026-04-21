import React, { useState, useEffect, useRef } from 'react';

// --- 1. COMPONENTE: MAPA DE UBICACIÓN ---
const UbicacionMapa = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Contenedor principal con estilo arquitectónico / plano */}
        <div className="flex flex-col md:flex-row border-2 border-slate-900 bg-white shadow-[10px_10px_0px_0px_rgba(241,245,249,1)] overflow-hidden">
          
          {/* Columna de Información */}
          <div className="p-8 md:p-12 md:w-1/3 flex flex-col justify-center bg-white z-10">
            <span className="text-[#d2df55] font-bold tracking-widest uppercase text-sm">Ubicación Estratégica</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2 mb-4">El Barrio</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
              Situado en la esquina de Patagones y Aragón, una zona tranquila de Constitucion y de constante crecimiento en Mar del Plata. Conectividad ideal y cercanía a todo lo que necesitas.
            </p>
            
            {/* Lista de ventajas */}
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="font-bold text-slate-700 uppercase tracking-wide">Patagones 1206</span>
              </div>
            </div>

            {/* Botón para abrir en la app de Google Maps */}
            <a 
              href="https://maps.google.com/?q=Patagones+1206,+Mar+del+Plata,+Argentina" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-center bg-slate-900 text-[#d2df55] px-6 py-4 text-sm uppercase tracking-widest font-bold hover:bg-slate-800 transition"
            >
              Cómo llegar
            </a>
          </div>
          
          {/* Columna del Mapa (Iframe) */}
          <div className="md:w-2/3 min-h-[400px] border-t-2 md:border-t-0 md:border-l-2 border-slate-900 relative bg-slate-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.452331589507!2d-57.55938882346765!3d-37.9665675444983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d8525b6d51cd%3A0xc619eb60ecb3ea87!2sPatagones%201206%2C%20B7604%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1713500000000!5m2!1ses-419!2sar" 
              className="absolute inset-0 w-full h-full" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación Patagones 1206"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};


// --- 2. LÓGICA DE DATOS Y COMPONENTE: SELECTOR DE EDIFICIO ---

const generarDepartamentos = () => {
  const apts = [];
  for (let piso = 10; piso >= 1; piso--) {
    let unidadesEnEstePiso = [];
    
    // Lógica extraída de la planilla de Excel
    if (piso === 1 || piso === 2) {
      unidadesEnEstePiso = ['A', 'B', 'C', 'D', 'E']; // 5 unidades
    } else if (piso === 3 || piso === 4) {
      unidadesEnEstePiso = ['A', 'B', 'C', 'D']; // 4 unidades
    } else if (piso === 5 || piso === 6) {
      unidadesEnEstePiso = ['A', 'B', 'C']; // 3 unidades
    } else {
      // Pisos 7, 8, 9 y 10
      unidadesEnEstePiso = ['A', 'B']; // 2 unidades
    }
    
    unidadesEnEstePiso.forEach(unidad => {
      apts.push({
        id: `${piso}${unidad}`,
        piso: piso,
        unidad: unidad,
        disponible: Math.random() > 0
      });
    });
  }
  return apts;
};

// Base de datos despues pasar pasar a un archivo
const getDatosUnidad = (unidad, piso) => {
  let amb = "";
  let sup = "";
  
  if (piso === 1 || piso === 2) {
    if (unidad === 'A') { amb = "3 AMBIENTES"; sup = "93.85 m²"; }
    if (unidad === 'B') { amb = "2 AMBIENTES"; sup = "59.60 m²"; }
    if (unidad === 'C') { amb = "1 AMBIENTE"; sup = "30.00 m²"; }
    if (unidad === 'D') { amb = "1 AMBIENTE"; sup = "32.35 m²"; }
    if (unidad === 'E') { amb = "1 AMBIENTE"; sup = "34.60 m²"; }
  } else if (piso === 3 || piso === 4) {
    if (unidad === 'A') { amb = "2 AMBIENTES"; sup = "63.40 m²"; }
    if (unidad === 'B') { amb = "2 AMBIENTES"; sup = "66.30 m²"; }
    if (unidad === 'C') { amb = "2 AMBIENTES"; sup = "60.54 m²"; }
    if (unidad === 'D') { amb = "2 AMBIENTES"; sup = "61.71 m²"; }
  } else if (piso === 5 || piso === 6) {
    if (unidad === 'A') { amb = "3 AMBIENTES"; sup = "88.30 m²"; }
    if (unidad === 'B') { amb = "3 AMBIENTES"; sup = "92.54 m²"; }
    if (unidad === 'C') { amb = "3 AMBIENTES"; sup = "78.13 m²"; }
  } else if (piso === 7 || piso === 8) {
    if (unidad === 'A') { amb = "4 AMBIENTES"; sup = "80.00 m²"; }
    if (unidad === 'B') { amb = "4 AMBIENTES"; sup = "132.45 m²"; }
  } else if (piso >= 9) {
    if (unidad === 'A') { amb = "4 AMBIENTES"; sup = "118.80 m²"; }
    if (unidad === 'B') { amb = "4 AMBIENTES"; sup = "132.35 m²"; }
  }

  // Placeholder dinámico para las unidades
  let imgPlaceholder = `https://placehold.co/800x600/f8fafc/0f172a?text=PLANO+\n${amb}`;
  
  // Si es el 3 ambientes que ya tenemos el plano (A de los pisos 5 o 6)
  if ((piso === 5 || piso === 6) && unidad === 'A') {
    imgPlaceholder = "/public/unidades.patagones.jpg"; 
  }

  return {
    ambientes: amb,
    imgPlaceholder: imgPlaceholder,
    supCubierta: sup,
    supSemi: "Consultar"
  };
};

const SelectorEdificio = () => {
  const [departamentos] = useState(generarDepartamentos());
  const [deptSeleccionado, setDeptSeleccionado] = useState(null);
  const pisos = Array.from({ length: 10 }, (_, i) => 10 - i);

  const manejarSeleccion = (dept) => {
    if (dept.disponible) {
      setDeptSeleccionado(dept);
    }
  };

  // Ancho dinámico por piso según la cantidad de unidades, respetando m2
  const getAnchoUnidad = (piso, unidad) => {
    // En pisos 1 y 2, el A es enorme (3 amb), el B es mediano (2 amb) y el resto pequeños (1 amb)
    if (piso === 1 || piso === 2) {
      if (unidad === 'A') return 'w-[38%]'; 
      if (unidad === 'B') return 'w-[24%]';
      return 'w-[12.66%]'; // Para C, D y E
    }
    
    // El resto de los pisos mantienen su división simétrica
    if (piso === 3 || piso === 4) return 'w-1/4'; 
    if (piso === 5 || piso === 6) return 'w-1/3'; 
    return 'w-1/2'; 
  };

  const datosPlano = deptSeleccionado ? getDatosUnidad(deptSeleccionado.unidad, deptSeleccionado.piso) : null;

  return (
    // Fondo cuadriculado 
    <section className="py-20 rounded-[3rem] my-10 border border-slate-200 flex flex-col lg:flex-row items-start justify-center gap-16 px-8 relative bg-white bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:24px_24px]">
      
      {/* COLUMNA IZQUIERDA:(STICKY ACTIVO) */}
      <div className="flex flex-col items-center lg:sticky lg:top-24 self-start z-20 w-full lg:w-auto relative">
        
        {/* Etiqueta de diseño  Blue-print */}
        <div className="absolute -top-6 -left-6 bg-slate-900 text-[#d2df55] px-4 py-2 text-[10px] font-black tracking-widest uppercase rounded-br-2xl shadow-lg z-30">
          Vista Fachada
        </div>

        <div className="flex relative mt-4">
          
          {/* CONTENEDOR DEL EDIFICIO: Borde arquitectónico grueso, padding interno, diseño modular */}
          <div className="w-72 md:w-[22rem] border-4 border-slate-900 bg-slate-100 relative shadow-[12px_12px_0px_0px_#e2e8f0] p-1.5 rounded-t-md">
            
            {/* quincho */}

            {/* Detalle visual: Techo del edificio */}
            <div className="w-full h-3 bg-slate-300 mb-1.5 border border-slate-400/50 rounded-t-sm"></div>

            

            {pisos.map((piso) => {
              const deptosPiso = departamentos.filter(a => a.piso === piso);
              return (
                <div key={piso} className="flex h-12 md:h-14 w-full relative mb-[2px]">
                  {deptosPiso.map((dept, index) => (
                    <button
                      key={dept.id}
                      onClick={() => manejarSeleccion(dept)}
                      disabled={!dept.disponible}
                      className={`
                        ${getAnchoUnidad(dept.piso, dept.unidad)} h-full relative flex items-center justify-center font-black text-xs transition-all duration-300 outline-none
                        ${index !== deptosPiso.length - 1 ? 'mr-[2px]' : ''} 
                        
                        ${/* Efecto Pop-Out*/ ''}
                        ${dept.disponible 
                          ? 'bg-white text-slate-600 border border-slate-200 hover:bg-[#f4f7e1] hover:text-slate-900 hover:scale-[1.07] hover:z-10 hover:shadow-xl hover:border-[#d2df55] cursor-pointer' 
                          : 'bg-[repeating-linear-gradient(-45deg,transparent,transparent_3px,#e2e8f0_3px,#e2e8f0_4px)] border border-slate-200/50 text-slate-400 cursor-not-allowed opacity-70'}
                        
                        ${/* Estado Activo */ ''}
                        ${deptSeleccionado?.id === dept.id ? '!bg-[#d2df55] !scale-[1.07] z-10 shadow-lg text-slate-900 !border-[#b3bf43]' : ''}
                      `}
                    >
                      <span className={dept.disponible ? 'opacity-100' : 'opacity-50'}>
                        {dept.unidad}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })}

            {/* Planta Baja */}
            <div className="flex h-16 w-full bg-slate-200 items-end justify-center relative mt-1 rounded-b-sm border border-slate-300 overflow-hidden">
               <div className="w-16 h-10 bg-slate-400 border-x-2 border-t-2 border-slate-500 rounded-t-md"></div>
               <span className="absolute top-2 text-[10px] font-black tracking-widest text-slate-500 uppercase">Acceso PB</span>
            </div>

            {/* Subsuelo */}
            <div className="flex h-8 w-full bg-slate-800 items-center justify-center relative mt-1 rounded-sm">
               <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Subsuelo (-1)</span>
            </div>
          </div>

          {/* Números de piso izq */}
          <div className="absolute top-12 -left-14 h-full flex flex-col justify-start text-[10px] font-black text-slate-400 pointer-events-none">
            {pisos.map(p => (
              <div key={p} className="h-12 md:h-14 flex items-center justify-end pr-2 mb-[2px]">
                {p} <span className="w-2 h-px bg-slate-300 ml-1"></span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* COLUMNA DERECHA: Info, Planta y Orientación */}
      <div className="flex flex-col w-full max-w-lg pt-4 lg:pt-16">
        
        {!deptSeleccionado && (
          <div className="bg-slate-50 border border-slate-200 p-8 min-h-[160px] flex flex-col justify-center items-center text-center relative overflow-hidden rounded-xl">
             <p className="text-sm text-slate-500 font-medium max-w-[250px]">Seleccione una unidad para ver sus detalles.</p>
          </div>
        )}

        {deptSeleccionado && datosPlano && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            
            {/* Cabecera */}
            <div className="bg-slate-50 border border-slate-200 p-8 flex flex-col justify-center relative overflow-hidden rounded-xl">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Unidad Seleccionada</span>
              <h3 className="text-5xl font-black text-slate-900 mt-2 mb-1">{deptSeleccionado.id}</h3>
              <p className="text-slate-600 font-medium">
                Piso {deptSeleccionado .piso}
              </p>
            </div>

            {/* Plano Dinámico */}
            <div className="border border-slate-200 bg-white p-6 shadow-sm rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Distribución de Planta</h4>
                <span className="bg-[#f4f7e1] text-slate-800 border border-[#d2df55] px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {datosPlano.ambientes}
                </span>
              </div>
              
              <a 
                href={datosPlano.imgPlaceholder} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative group cursor-zoom-in border border-slate-100 bg-slate-50 p-4 min-h-[300px] flex items-center justify-center rounded-lg"
                title="Ampliar plano"
              >
                <img 
                  src={datosPlano.imgPlaceholder} 
                  alt={`Plano Unidad ${deptSeleccionado.id}`} 
                  className="w-full h-auto max-h-[400px] object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply" 
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center rounded-lg">
                  <span className="bg-white/95 px-3 py-1.5 border border-slate-200 text-[10px] font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-sm rounded-md">
                    Ampliar
                  </span>
                </div>
              </a>
              
              {/* Metros Cuadrados Dinámicos */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div className="border-t border-slate-200 pt-3">
                  <span className="block text-slate-400 font-bold uppercase tracking-wide text-[9px] mb-1">Sup. Cubierta (s/muro)</span>
                  <span className="text-slate-900 font-black text-sm">{datosPlano.supCubierta}</span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <span className="block text-slate-400 font-bold uppercase tracking-wide text-[9px] mb-1">Sup. Semicubierta</span>
                  <span className="text-slate-900 font-black text-sm">{datosPlano.supSemi}</span>
                </div>
              </div>
            </div>

     
            {/* Mini mapa de Orientación - Imagen Fiel */}
            <div className="border border-slate-200 p-6 bg-white relative rounded-xl max-w-sm mx-auto shadow-sm">
            {/* Título */}
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 text-center">
            Ubicación en la Planta
            </h4>
  
              

            {/* Contenedor de la Imagen */}
            <div className="relative w-full aspect-square mt-4 flex items-center justify-center p-4">
              
            
              <img 
                src="/ruta-a-imagen.png" 
                alt="Plano de ubicación de la unidad en el piso" 
                className="max-w-full max-h-full object-contain"
              />

            </div>
            
            
          </div>

          </div>
        )}

      </div>
    </section>
  );
};


// --- 3. COMPONENTE: SELECTOR DE UNIDADES ---

const SelectorUnidades = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('2 ambientes');

  const categorias = [
    { id: 1, nombre: '1 ambiente', disponible: '6 unidades' },
    { id: 2, nombre: '2 ambientes', disponible: '10 unidades'},
    { id: 3, nombre: '3 ambientes', disponible: '8 unidades' },
    { id: 4, nombre: '4 ambientes', disponible: '4 unidades' },
  ];

  return (
    <section id="unidades" className="py-20 bg-white rounded-[3rem] my-10 shadow-sm border border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl mb-8 uppercase tracking-tighter font-bold text-slate-900 text-center md:text-left">
          Disponibilidad
        </h2>
        
        <div className="flex flex-col md:flex-row border-b border-gray-200 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.nombre)}
              className={`flex-1 py-4 px-6 text-left transition-all border-b-2 ${
                categoriaActiva === cat.nombre 
                ? 'border-[#c2ce4b] opacity-100' 
                : 'border-transparent opacity-40 hover:opacity-70'
              }`}
            >
              <span className="block text-xl font-medium uppercase text-slate-900">{cat.nombre}</span>
              <span className="text-xs text-slate-500 uppercase">{cat.disponible} disponibles</span>
            </button>
          ))}
        </div>

        <div className="min-h-[400px] bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-100">
          
        {categoriaActiva === '3 ambientes' && (
            <div className="grid md:grid-cols-2 gap-10 items-center animate-fadeIn">
              <a 
                href="/public/unidades.patagones.jpg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative h-[550px] w-full rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200 flex items-center justify-center p-4 hover:ring-4 hover:ring-[#d2df55]/30 transition-all cursor-zoom-in"
                title="Click para ver el plano en tamaño completo"
              >
                <img 
                  src="/public/unidades.patagones.jpg" 
                  alt="Plano 3 ambientes" 
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center">
                  <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    AMPLIAR PLANO
                  </span>
                </div>
              </a>

              <div className="space-y-4">
                <span className="inline-block bg-[#f4f7e1] text-slate-800 border border-[#d2df55] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Patagones 1206 - Mar del Plata
                </span>
                <h3 className="text-2xl font-bold text-slate-900">3 Ambientes 'A'</h3>
                <p className="text-slate-600 leading-relaxed">
                  Distribución optimizada en formato vertical para aprovechar la luz natural. 
                  Incluye suite principal, living integrado y balcón terraza.
                </p>
                <div className="pt-4">
                  <button className="bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                    Descargar Ficha Técnica
                  </button>
                </div>
              </div>
            </div>
          )}

          {categoriaActiva === '2 ambientes' && (
            <div className="text-center flex flex-col items-center justify-center min-h-[300px] animate-fadeIn">
              
              <p className="text-xl text-slate-700 font-medium max-w-md">
                unidades  de 2 ambientes
              </p>
              <p className="text-slate-500 mt-2">info del depto.</p>
              <button className="mt-6 text-[#9ba52f] font-bold hover:underline flex items-center gap-2">
                Solicitar Ficha Técnica <span>→</span>
              </button>
            </div>
          )}

          {categoriaActiva === '4 ambientes' && (
            <div className="text-center flex flex-col items-center justify-center min-h-[300px] animate-fadeIn">
              
              <p className="text-lg text-slate-500 italic max-w-sm">
                unidades de 4 ambientes
              </p>
              <button className="mt-6 bg-[#d2df55] text-slate-900 px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#c2ce4b] transition">
                Contactar Ventas
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};


// --- 4. COMP PRINCIPAL---

export default function App() {
  const videoRef = useRef(null);
  
  // estado para el scroll
  const [scrollY, setScrollY] = useState(0);

  // Efecto optimizado para escuchar el scroll solo en la parte superior
  useEffect(() => {
    const manejarScroll = () => {
      // Solo calculamos el scroll mientras estamos viendo el header para optimizar rendimiento
      if (window.scrollY < window.innerHeight) {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener("scroll", manejarScroll, { passive: true });
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.warn("Autoplay bloqueado", error);
      });
    }
  }, []);

  return (
    
    <div className="relative flex flex-col w-full max-w-[100%] overflow-x-clip min-h-screen bg-slate-50 text-slate-900 font-sans m-0 p-0">
      
      {/* HEADER ANIMADO */}
      <header className="relative h-[85vh] w-full overflow-hidden flex flex-col items-center justify-center bg-slate-900">
        
        //parallax
        <div 
          className="absolute left-0 right-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none"
          style={{ transform: `translate3d(0, ${scrollY * 0.35}px, 0)` }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/DJI_0148.MP4"
          >
            <source src="/DJI_0148.MP4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 z-10 bg-slate-900/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

        {/* TEXTO CENTRAL ANIMADO: Baja ligeramente y se desvanece al scrollear */}
        <div 
          className="relative z-20 mx-auto max-w-7xl px-6 text-center text-white mt-12"
          style={{ 
            transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
            opacity: Math.max(0, 1 - scrollY / 400)
          }}
        >
          <p className="mb-4 inline-flex rounded-full bg-[#d2df55]/20 backdrop-blur-md px-8 py-2.5 text-sm font-bold uppercase tracking-widest text-[#d2df55] border border-[#d2df55]/30 shadow-lg">
            Patagones 1206
          </p>
          <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-7xl drop-shadow-xl">
            Vivi con estilo <br />
            <span className="text-[#d2df55]">y comodidad.</span>
          </h1>
          <div className="flex flex-col justify-center gap-4 sm:flex-row pointer-events-auto">
            <a href="#unidades" className="rounded-full bg-[#d2df55] px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-[#e4f068] shadow-lg shadow-[#d2df55]/20">
              Ver Disponibilidad
            </a>
            <a href="#contact" className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition hover:bg-white/20">
              Contáctanos
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <SelectorEdificio />
        <SelectorUnidades />
        <UbicacionMapa />  
        {/* SECCIÓN DE CONTACTO */}
        <section id="contact" className="grid gap-12 rounded-[3rem] bg-slate-900 p-8 text-white lg:grid-cols-2 lg:p-16 mt-20 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d2df55] rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold italic">Hablemos de tu próximo hogar.</h2>
            <div className="mt-10 space-y-4 text-slate-300">
              <p className="flex items-center gap-2">
                 mail@mail
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#d2df55]">📞</span> +0000000
              </p>
            </div>
          </div>
          <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#d2df55] transition" placeholder="Nombre completo" />
            <input className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#d2df55] transition" placeholder="Tu Email" />
            <textarea className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#d2df55] transition" rows="3" placeholder="Contanos tu consulta..." />
            <button className="w-full rounded-2xl bg-[#d2df55] py-4 font-bold text-slate-900 hover:bg-[#e4f068] transition shadow-lg shadow-[#d2df55]/10">
              Enviar Mensaje
            </button>
          </form>
        </section>
      </main>

      <footer className="py-10 text-center text-sm text-slate-400 border-t border-slate-200 mt-20">
        <p>© 2026 .</p>
      </footer>
    </div>
  );
}