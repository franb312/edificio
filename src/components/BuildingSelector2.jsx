import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pisosData, unidadesData } from '../data/buildingData'; // Asumimos que los datos están en esta ruta

// Función para detectar si el piso es un área común/amenity basándose en su 'tipo'
const isNonResidentialFloor = (piso) => {
  if (!piso || !piso.tipo) return false;
  
  const tipo = piso.tipo.toLowerCase();
  // Devuelve true si el tipo incluye 'amenit', 'cochera' o 'acceso'
  return tipo.includes('amenit') || tipo.includes('cochera') || tipo.includes('acceso') || tipo.includes('cowork') || tipo.includes('laundry');
};

// Función auxiliar para determinar los colores según el estado y tipo de unidad
const getStatusColor = (estado, isNonResidential) => {
  if (isNonResidential) {
    return 'bg-indigo-100 border-indigo-300 text-indigo-800'; 
  }

  switch (estado?.toLowerCase()) {
    case 'disponible':
      return 'bg-emerald-100 border-emerald-300 text-emerald-800';
    case 'reservado':
      return 'bg-amber-100 border-amber-300 text-amber-800';
    case 'vendido':
      return 'bg-rose-100 border-rose-300 text-rose-800';
    default:
      return 'bg-slate-100 border-slate-200 text-slate-600'; 
  }
};

// Función auxiliar para formatear el texto del Tooltip
const getTooltipText = (unitName, estado, isNonResidential) => {
  if (isNonResidential) return `Espacio: ${unitName}`;

  if (!estado) return `Unidad ${unitName}`;
  const estadoCapitalizado = estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
  return `Unidad ${unitName} - ${estadoCapitalizado}`;
};

const BuildingSelector2 = () => {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [hoveredFloor, setHoveredFloor] = useState(null);
  const [previewedFloor, setPreviewedFloor] = useState(null);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const [hasInteracted, setHasInteracted] = useState(false);
  const [demoFloorIndex, setDemoFloorIndex] = useState(-1);
  
  const navigate = useNavigate();

  // Control de Responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloqueo de Scroll estricto para mobile
  useEffect(() => {
    if (isMobile && previewedFloor) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, previewedFloor]);

  const currentImage = isMobile ? '/Frame 1_result.webp' : '/FOTO PRINCIPAL_result.webp';
  const currentViewBox = isMobile ? "0 0 550 900" : "0 0 1000 558";

  // EFECTO: Animación en Cascada (Demo Mode) para Mobile
  useEffect(() => {
    let interval;
    if (isMobile && !previewedFloor && !hasInteracted && pisosData?.length > 0) {
      interval = setInterval(() => {
        setDemoFloorIndex((prev) => {
          return prev >= pisosData.length - 1 ? 0 : prev + 1;
        });
      }, 800);
    } else {
      setDemoFloorIndex(-1);
    }
    return () => clearInterval(interval);
  }, [isMobile, previewedFloor, hasInteracted]);

  const getDotLabel = (label) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('terraza')) return 'T';
    if (lowerLabel.includes('entrepiso')) return 'EP';
    if (lowerLabel.includes('planta baja') || lowerLabel === 'pb') return 'PB';
    if (lowerLabel.includes('subsuelo') || lowerLabel.includes('cochera')) return 'SS';
    return label.replace(/\D/g, ''); 
  };

  const currentIndex = previewedFloor 
    ? pisosData.findIndex(f => f.id === previewedFloor.id) 
    : -1;

  // Obtener las unidades correspondientes al piso que se está previsualizando
  const currentUnits = previewedFloor && unidadesData
    ? unidadesData.filter(u => u.pisoId === previewedFloor.id)
    : [];

  // Verificamos si el piso actual es residencial o no pasándole el objeto completo
  const isNonResidential = previewedFloor ? isNonResidentialFloor(previewedFloor) : false;

  // Identificar si el piso es PB o Subsuelo
  const isPBorSubsuelo = previewedFloor && (
    previewedFloor.id.toString().toLowerCase() === 'pb' || 
    previewedFloor.id.toString().toLowerCase() === 'ss' || 
    previewedFloor.id.toString().toLowerCase().includes('subsuelo')
  );

  // NUEVO: Identificar si el piso es el Entrepiso (Cowork, SUM, Laundry, Bauleras)
  const isEntrepiso = previewedFloor && (
    previewedFloor.id.toString().toLowerCase() === 'ep' || 
    previewedFloor.id.toString().toLowerCase().includes('entrepiso')
  );

  // Renderizador auxiliar de unidades/amenities agrupados
  const renderFloorUnits = (fontSizeClass, paddingClass) => {
    const tagClass = `bg-indigo-100 border-indigo-300 text-indigo-800 border ${paddingClass} rounded-full ${fontSizeClass} font-bold shadow-sm transition-all`;
    
    if (isEntrepiso) {
      return (
        <>
          <span className={tagClass}>Cowork</span>
          <span className={tagClass}>SUM</span>
          <span className={tagClass}>Laundry</span>
          <span className={tagClass}>Bauleras</span>
        </>
      );
    }

    if (isPBorSubsuelo) {
      return (
        <>
          <span className={tagClass}>Cocheras</span>
          <span className={tagClass}>Bauleras</span>
        </>
      );
    }

    if (currentUnits.length > 0) {
      return currentUnits.map((u) => (
        <span 
          key={u.id || u.unidad} 
          title={getTooltipText(u.unidad, u.estado, isNonResidential)}
          className={`${getStatusColor(u.estado, isNonResidential)} border ${paddingClass} rounded-full ${fontSizeClass} font-bold shadow-sm cursor-help transition-all`}
        >
          {u.unidad}
        </span>
      ));
    }

    return <span className="text-slate-400 text-[11px]">Sin unidades registradas</span>;
  };

  if (selectedFloor) {
    return (
      <div className="p-5 font-inherit w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <button onClick={() => setSelectedFloor(null)} className="px-5 py-2.5 cursor-pointer bg-slate-800 text-white border-none rounded-md">← Volver al Edificio</button>
        <h2 className="text-2xl mt-4 font-bold text-slate-900">Detalle - {selectedFloor.nombre}</h2>
        <div className="w-full h-[500px] bg-slate-200 flex items-center justify-center mt-5 rounded-2xl overflow-hidden">
          {selectedFloor.imagenes?.detalle ? <img src={selectedFloor.imagenes.detalle} alt={selectedFloor.nombre} className="max-w-full h-auto max-h-[70vh] object-contain rounded-lg" /> : <p className="text-slate-500">El plano detallado para este piso aún no está disponible.</p>}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-full transition-all duration-300 ${
        previewedFloor && isMobile 
          ? 'fixed inset-0 z-[100] flex flex-col bg-gradient-to-r from-[#95ACB6] to-[#C5D1DB] rounded-none m-0 overflow-hidden touch-none'
          : 'relative max-w-[1200px] mx-auto my-5 rounded-[2rem] shadow-2xl bg-white overflow-hidden' 
      }`} 
      style={{ fontFamily: "'Montserrat', sans-serif", height: previewedFloor && isMobile ? '100dvh' : 'auto' }}
    >
      
      {/* HEADER MOBILE INMERSIVO */}
      {previewedFloor && isMobile && (
        <div className="absolute top-0 inset-x-0 p-5 flex justify-center items-center z-50 w-full pointer-events-none">
          <span className="text-slate-600 font-bold tracking-widest uppercase text-[10px]">Patagones 1206</span>
          <button 
            onClick={() => setPreviewedFloor(null)} 
            className="absolute right-5 w-8 h-8 rounded-full bg-white/40 text-slate-700 flex items-center justify-center font-bold backdrop-blur-md pointer-events-auto shadow-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* ENVOLTORIO DE IMAGEN Y SVG */}
     <div 
        className={`w-full relative cursor-pointer ${
          previewedFloor && isMobile 
            ? 'w-full flex justify-center overflow-hidden bg-transparent shrink-0' 
            : ''
        }`}
        onClick={() => {
          setHasInteracted(true);
          if (isMobile && !previewedFloor) {
            const defaultFloor = pisosData.find(f => f.id === 'PB') || pisosData[pisosData.length - 1];
            setPreviewedFloor(defaultFloor);
          }
        }}
      >
        <img
          src={currentImage}
          alt="Edificio Render"
          width={isMobile ? 550 : 1000}
          height={isMobile ? 900 : 558}
          decoding="async"
          className={`block select-none ${
            previewedFloor && isMobile
              ? 'w-full h-auto max-h-[70dvh] object-contain object-top'
              : 'w-full h-auto'
          }`}
        />
        
        <svg 
          viewBox={currentViewBox} 
          className="absolute top-0 left-0 w-full h-full z-10" 
          preserveAspectRatio={previewedFloor && isMobile ? "xMidYMin meet" : "xMidYMid meet"} 
        >
          {pisosData.map((floor, index) => {
            const isHovered = hoveredFloor === floor.id;
            const isPreviewed = previewedFloor?.id === floor.id;
            const isDemoActive = demoFloorIndex === index;
            const shouldHighlight = isHovered || isPreviewed || isDemoActive;

            const currentMap = isMobile ? floor.mapaMobile : floor.mapaDesktop;

            return (
              <g key={floor.id}>
                <polygon 
                  points={currentMap.points} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setHasInteracted(true);
                    
                    if (isMobile) {
                      if (!previewedFloor) {
                        const defaultFloor = pisosData.find(f => f.id === 'PB') || pisosData[pisosData.length - 1];
                        setPreviewedFloor(defaultFloor);
                      }
                    } else {
                      setPreviewedFloor(floor);
                    }
                  }} 
                  onMouseEnter={!isMobile ? () => setHoveredFloor(floor.id) : undefined} 
                  onMouseLeave={!isMobile ? () => setHoveredFloor(null) : undefined} 
                  style={{ 
                    fill: shouldHighlight ? 'rgba(73, 161, 196, 0.4)' : 'transparent', 
                    stroke: shouldHighlight ? 'rgba(148, 168, 176, 0.9)' : 'transparent', 
                    strokeWidth: isMobile ? '6' : '2', 
                    cursor: 'pointer', 
                    transition: 'all 0.4s ease-in-out'
                  }} 
                />
                <g 
                  style={{ cursor: 'pointer' }}
                  className="hidden md:block"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHasInteracted(true);
                    
                    if (isMobile) {
                      if (!previewedFloor) {
                        const defaultFloor = pisosData.find(f => f.id === 'PB') || pisosData[pisosData.length - 1];
                        setPreviewedFloor(defaultFloor);
                      }
                    } else {
                      setPreviewedFloor(floor);
                    }
                  }} 
                  onMouseEnter={!isMobile ? () => setHoveredFloor(floor.id) : undefined} 
                  onMouseLeave={!isMobile ? () => setHoveredFloor(null) : undefined}
                >
                  <circle 
                    cx={currentMap.dotX} 
                    cy={currentMap.labelY} 
                    r="16" 
                    fill={shouldHighlight ? "#0F172A" : "#ffffff"} 
                    stroke="#D1D5DB" 
                    strokeWidth="1" 
                    className="shadow-md" 
                    style={{ transition: 'fill 0.3s ease' }} 
                  />
                  <text 
                    x={currentMap.dotX} 
                    y={currentMap.labelY} 
                    fill={shouldHighlight ? "#ffffff" : "#252931"} 
                    fontSize="14" 
                    fontWeight="900" 
                    textAnchor="middle" 
                    dominantBaseline="central" 
                    style={{ pointerEvents: 'none', fontFamily: "'Montserrat', sans-serif", transition: 'fill 0.3s ease' }}
                  >
                    {getDotLabel(floor.nombre)}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {!previewedFloor && isMobile && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/60 backdrop-blur-md text-white/90 px-5 py-2.5 rounded-full text-[9px] font-semibold uppercase tracking-widest shadow-xl pointer-events-none flex items-center gap-2.5 z-20 border border-white/20 transition-opacity duration-500 whitespace-nowrap w-max">
            <span className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)] shrink-0"></span>
            <span>Explorar por piso</span>
          </div>
        )}
      </div>

      {/* DETALLE DEL PISO SELECCIONADO */}
      {previewedFloor && (
        <div 
          className={`bg-white text-center flex flex-col ${
            isMobile 
              ? 'shadow-[0_-4px_25px_rgba(0,0,0,0.06)] flex-1 w-full px-4 py-5 rounded-t-[2rem] overflow-hidden' 
              : 'shadow-[0_-15px_40px_rgba(0,0,0,0.15)] shrink-0 absolute top-1/2 right-6 -translate-y-1/2 h-auto max-w-[340px] w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 border border-white/40 z-[60]' 
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {isMobile ? (
            <>
             <div className="flex items-center justify-between w-full mb-3">
                <button
                  onClick={(e) => { e.stopPropagation(); if (currentIndex > 0) setPreviewedFloor(pisosData[currentIndex - 1]); }}
                  disabled={currentIndex <= 0}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${currentIndex > 0 ? 'bg-slate-100 text-slate-600 active:scale-95 shadow-sm' : 'bg-transparent text-slate-300 opacity-50'}`}
                >
                  <span className="text-2xl font-bold">↑</span>
                </button>

                <div className="text-center flex-1 px-2">
                  <h3 className="m-0 text-[18px] text-slate-900 font-black leading-tight uppercase tracking-tight">
                    {previewedFloor.nombre}
                  </h3>
                  <p className="m-0 text-[10px] text-slate-500 mt-1 uppercase tracking-wide font-medium leading-tight">
                    {previewedFloor.descripcion || (isNonResidential ? 'Espacios Comunes' : 'Consultar disponibilidad')}
                  </p>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); if (currentIndex < pisosData.length - 1) setPreviewedFloor(pisosData[currentIndex + 1]); }}
                  disabled={currentIndex >= pisosData.length - 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${currentIndex < pisosData.length - 1 ? 'bg-slate-100 text-slate-600 active:scale-95 shadow-sm' : 'bg-transparent text-slate-300 opacity-50'}`}
                >
                  <span className="text-2xl font-bold">↓</span>
                </button>
              </div>
              
              {/* MOBILE: UNIDADES / AMENITIES */}
              <div className="flex gap-1.5 justify-center flex-wrap w-full shrink-0 mb-4">
                {renderFloorUnits('text-[10px]', 'px-3 py-1')}
              </div>

              <button 
                onClick={() => navigate(`/piso/${previewedFloor.id}`)}
                className="w-full bg-[#94a8b0] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-[0_4px_15px_rgba(148,168,176,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Ver detalle de la planta
                <span className="text-base leading-none">→</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setPreviewedFloor(null)} 
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold z-20 cursor-pointer transition-colors"
                title="Cerrar detalle"
              >
                ✕
              </button>
              
              <div className="flex items-center justify-between w-full mb-1.5 shrink-0 mt-10">
                <button
                  onClick={(e) => { e.stopPropagation(); if (currentIndex > 0) setPreviewedFloor(pisosData[currentIndex - 1]); }}
                  disabled={currentIndex <= 0}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${currentIndex > 0 ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 cursor-pointer shadow-sm' : 'bg-transparent text-slate-300 cursor-not-allowed opacity-50'}`}
                >
                  <span className="text-2xl font-bold mb-1">‹</span>
                </button>

                <div className="text-center flex-1 px-2">
                  <h3 className="m-0 text-[24px] text-slate-900 font-black leading-tight uppercase tracking-tight">
                    {previewedFloor.nombre}
                  </h3>
                  <p className="m-0 text-[13px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
                    {isNonResidential ? 'Espacios Comunes' : 'Disponibilidad'}
                  </p>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); if (currentIndex < pisosData.length - 1) setPreviewedFloor(pisosData[currentIndex + 1]); }}
                  disabled={currentIndex >= pisosData.length - 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${currentIndex < pisosData.length - 1 ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 cursor-pointer shadow-sm' : 'bg-transparent text-slate-300 cursor-not-allowed opacity-50'}`}
                >
                  <span className="text-2xl font-bold mb-1">›</span>
                </button>
              </div>
              
              {/* IMAGEN DEL PISO (Desktop) */}
              <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[200px] mt-4 mb-2">
                {previewedFloor.imagenes?.axono ? (
                  <img 
                    src={previewedFloor.imagenes.axono} 
                    alt={previewedFloor.nombre} 
                    className="max-w-[280px] h-auto object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105" 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 text-[13px] font-semibold">Imagen en proceso...</span>
                  </div>
                )}
              </div>
              
              {/* DESKTOP: UNIDADES / AMENITIES */}
              <div className="flex gap-1.5 justify-center flex-wrap w-full shrink-0 mt-2 mb-4">
                {renderFloorUnits('text-[12px]', 'px-3.5 py-1.5')}
              </div>

              {/* BOTÓN EXPLORAR EXPLICITO */}
              <button 
                onClick={() => navigate(`/piso/${previewedFloor.id}`)}
                className="w-full bg-[#172B33] hover:bg-[#39515B] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[12px] shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Explorar piso
                <span className="text-base leading-none">→</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BuildingSelector2;