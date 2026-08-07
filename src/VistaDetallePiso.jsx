import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { pisosData, unidadesData } from './data/buildingData';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(pointer: fine)");
    const listener = (event) => setIsDesktop(event.matches);
    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, []);

  return isDesktop;
};

const VistaDetallePiso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const [pisoActivoId, setPisoActivoId] = useState(id || '1');
  const [animando, setAnimando] = useState(false);
  const [unidadHovered, setUnidadHovered] = useState(null);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  
  // Modales
  const [imagenModal, setImagenModal] = useState(null);
  const [planoFullscreen, setPlanoFullscreen] = useState(false);
  
  const [pasoRecorrido, setPasoRecorrido] = useState(0);
  const [imagenCargando, setImagenCargando] = useState(true);

  useEffect(() => {
    if (id) setPisoActivoId(id);
  }, [id]);

  const pisoActual = useMemo(() => {
    return pisosData.find(p => p.id === pisoActivoId) || pisosData[0];
  }, [pisoActivoId]);

  const unidadesDelPiso = useMemo(() => {
    return unidadesData.filter(u => u.pisoId === pisoActivoId);
  }, [pisoActivoId]);

  const pisosNavegacion = pisosData;
  const currentIndex = pisosNavegacion.findIndex(p => p.id === pisoActivoId);
  const puedeSubir = currentIndex > 0;
  const puedeBajar = currentIndex < pisosNavegacion.length - 1;

  useEffect(() => {
    const preLoadImage = (src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    };
    if (puedeSubir) {
      preLoadImage(pisosNavegacion[currentIndex - 1].imagenes?.plano);
      preLoadImage(pisosNavegacion[currentIndex - 1].imagenes?.planoIluminado);
    }
    if (puedeBajar) {
      preLoadImage(pisosNavegacion[currentIndex + 1].imagenes?.plano);
      preLoadImage(pisosNavegacion[currentIndex + 1].imagenes?.planoIluminado);
    }
  }, [pisoActivoId, currentIndex, puedeSubir, puedeBajar, pisosNavegacion]);

  // ==========================================
  // AUTO-SCROLL PARA PISOS Y TARJETAS
  // ==========================================
  useEffect(() => {
    const elementoActivo = document.getElementById(`nav-piso-${pisoActivoId}`);
    if (elementoActivo) {
      elementoActivo.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [pisoActivoId]);

  useEffect(() => {
    if (unidadSeleccionada) {
      const elementoTarjeta = document.getElementById(`tarjeta-unidad-${unidadSeleccionada}`);
      if (elementoTarjeta) {
        elementoTarjeta.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [unidadSeleccionada]);
  // ==========================================

  const cambiarPiso = (nuevoId) => {
    if (nuevoId === pisoActivoId) return;
    setAnimando(true);
    setTimeout(() => {
      setPisoActivoId(nuevoId);
      setUnidadSeleccionada(null);
      navigate(`/piso/${nuevoId}`, { replace: true });
      setAnimando(false);
    }, 300);
  };

  const handleSubirPiso = () => { if (puedeSubir) cambiarPiso(pisosNavegacion[currentIndex - 1].id); };
  const handleBajarPiso = () => { if (puedeBajar) cambiarPiso(pisosNavegacion[currentIndex + 1].id); };

  const handleAbrirModal = (imagenDetalle) => {
    setImagenModal(imagenDetalle || 'https://via.placeholder.com/800x800.png?text=Plano+en+preparacion');
    setImagenCargando(true);
    setPasoRecorrido(0);
  };

  const handleInteraccionUnidad = (unidadId, imagenDetalle) => {
    if (unidadSeleccionada === unidadId) {
      handleAbrirModal(imagenDetalle);
    } else {
      setUnidadSeleccionada(unidadId);
    }
  };

  const obtenerSiglaPiso = (nombre) => {
    if (nombre.toLowerCase() === 'entrepiso') return 'EP';
    if (nombre.toLowerCase().includes('piso')) return nombre.replace(/piso\s+/i, '');
    if (nombre.toLowerCase() === 'planta baja') return 'PB';
    return nombre.substring(0, 2).toUpperCase();
  };

  const renderCapasSVG = useMemo(() => {
    const svgBaseClasses = "col-start-1 row-start-1 w-full h-full select-none scale-[1.02] lg:scale-100 transition-transform origin-center object-contain";

    return (
      <div className="relative grid place-items-center w-full h-full overflow-hidden">
        <svg viewBox="0 0 700 880" className={svgBaseClasses} style={{ isolation: 'isolate' }}>
          <defs>
            <clipPath id={`clip-base-${pisoActual.id}`}>
              <rect x="0" y="0" width="700" height="700" />
            </clipPath>
            <clipPath id={`clip-inferior-${pisoActual.id}`}>
              <rect x="0" y="700" width="700" height="180" />
            </clipPath>

            <mask id={`mascara-luces-${pisoActual.id}`}>
              <rect x="0" y="0" width="700" height="880" fill="black" />
              {unidadesDelPiso.map((unidad) => {
                if (!unidad.svgData?.puntos) return null;
                const isSelected = unidadSeleccionada === unidad.id;
                const isHovered = isDesktop && unidadHovered === unidad.id;
                const isLit = (isSelected || isHovered) && unidad.estado === 'Disponible';
                return (
                  <polygon
                    key={`luz-mask-${unidad.id}`}
                    points={unidad.svgData.puntos}
                    fill="white"
                    style={{ opacity: isLit ? 1 : 0, transition: 'opacity 300ms ease-in-out' }}
                  />
                );
              })}
            </mask>
          </defs>

          <image
            href={pisoActual.imagenes?.plano || ''}
            width="700" height="880"
            clipPath={`url(#clip-base-${pisoActual.id})`}
            style={{ mixBlendMode: 'multiply' }}
            preserveAspectRatio="xMidYMid meet"
          />

          <image
            href={pisoActual.imagenes?.planoIluminado || pisoActual.imagenes?.plano || ''}
            width="700" height="880"
            clipPath={`url(#clip-inferior-${pisoActual.id})`}
            style={{ mixBlendMode: 'multiply' }}
            preserveAspectRatio="xMidYMid meet"
          />

          <image
            href={pisoActual.imagenes?.planoIluminado || pisoActual.imagenes?.plano || ''}
            width="700" height="880"
            mask={`url(#mascara-luces-${pisoActual.id})`}
            style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }}
            preserveAspectRatio="xMidYMid meet"
          />

          {unidadesDelPiso.map((unidad) => {
            const { puntos, centroTexto } = unidad.svgData || {};
            if (!puntos) return null;
            const isSelected = unidadSeleccionada === unidad.id;
            const isDisponible = unidad.estado === 'Disponible';
            return (
              <g
                key={unidad.id}
                className={`group/poly ${isDisponible ? 'cursor-pointer' : 'cursor-default'}`}
                onMouseEnter={isDesktop && isDisponible ? () => setUnidadHovered(unidad.id) : undefined}
                onMouseLeave={isDesktop && isDisponible ? () => setUnidadHovered(null) : undefined}
                onClick={isDisponible ? () => handleInteraccionUnidad(unidad.id, unidad.imagenDetalle) : undefined}
              >
                <polygon points={puntos} style={{ strokeWidth: '0' }} className="fill-transparent stroke-transparent" />
                {centroTexto && (
                  <g
                    transform={`translate(${centroTexto.x}, ${centroTexto.y})`}
                    className="transition-opacity duration-300"
                    style={{ opacity: isSelected || (isDesktop && unidadHovered === unidad.id && isDisponible) ? 1 : 0, pointerEvents: 'none' }}
                  >
                    <rect
                      x="-16" y="-10" width="32" height="20" rx="4"
                      style={{ strokeWidth: '1px' }}
                      className={`fill-white/95 shadow-xs transition-all ${isSelected ? 'stroke-slate-900' : 'stroke-slate-200 group-hover/poly:stroke-slate-400'}`}
                    />
                    <text textAnchor="middle" dominantBaseline="central" className="fill-slate-900 font-black text-[9px]">{unidad.unidad}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        <svg viewBox="0 0 700 880" className={`${svgBaseClasses} pointer-events-none z-10 absolute inset-0`}>
          {unidadSeleccionada && (() => {
            const unidadActiva = unidadesDelPiso.find(u => u.id === unidadSeleccionada);
            const centro = unidadActiva?.svgData?.centroTexto;
            if (!centro) return null;

            return (
              <foreignObject
                key="tooltip-activo"
                x={centro.x - 100}
                y={centro.y + 10}
                width="200"
                height="80"
                className="overflow-visible pointer-events-none"
                style={{ transition: 'x 0.3s ease-out, y 0.3s ease-out' }}
              >
                <div className="flex justify-center w-full pt-2 pointer-events-auto">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAbrirModal(unidadActiva.imagenDetalle); }}
                    className="bg-[#122A33] text-white text-[9px] uppercase tracking-widest font-black px-4 py-2 rounded-full shadow-md hover:bg-[#5F747D] transition-all duration-200 flex items-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    Ver Plano
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </foreignObject>
            );
          })()}
        </svg>
      </div>
    );
  }, [pisoActual, unidadesDelPiso, unidadSeleccionada, unidadHovered, isDesktop]);

  return (
    <div
      className="fixed inset-0 w-full overflow-hidden bg-slate-50 font-sans text-slate-900 flex flex-col overscroll-none"
      style={{ height: '100svh', fontFamily: "'Montserrat', sans-serif" }}
    >
      <header className="bg-slate-900 text-white py-2 lg:py-3 px-4 shadow-md shrink-0 z-50 relative">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <button onClick={() => window.history.back()} className="text-slate-400 hover:text-white transition flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            ← Volver
          </button>
          <div className="text-right">
            <span className="text-[#94a8b0] text-[10px] font-black tracking-widest uppercase block">Patagones 1212</span>
            <h1 className="text-base font-bold leading-tight">Detalle de Plantas</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-2 lg:gap-4 px-2 pt-2 lg:p-4 pb-0 lg:pb-4 overflow-hidden relative">
        
        {/* NAVEGADOR DE PISOS */}
        <div className="shrink-0 flex lg:flex-col flex-row items-center justify-center relative lg:h-full min-h-0 w-full lg:w-auto pb-1 lg:pb-0">
          <button
            onClick={handleSubirPiso} disabled={!puedeSubir}
            className={`shrink-0 lg:mb-1 mr-1 lg:mr-0 flex justify-center items-center w-8 h-8 rounded-full transition-all z-10 ${puedeSubir ? 'text-slate-500 hover:bg-slate-200 hover:text-slate-900 cursor-pointer' : 'text-slate-300 opacity-30 cursor-not-allowed'}`}
          >
            <svg className={`w-4 h-4 hidden lg:block ${puedeSubir && !animando ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
            <svg className={`w-4 h-4 lg:hidden ${puedeSubir && !animando ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <aside className="flex-1 min-h-0 min-w-0 overflow-x-auto lg:overflow-y-auto lg:w-16 hide-scrollbar flex lg:flex-col items-center">
            <div className="hidden lg:flex flex-col items-center shrink-0 text-center z-10 bg-slate-50 px-1 pt-1 pb-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pisos</span>
            </div>
            <div className="relative flex lg:flex-col flex-row gap-4 items-center justify-start min-w-[max-content] lg:min-h-[max-content] px-4 py-2 lg:px-0 lg:py-4 mx-auto">
              <div className="absolute top-1/2 left-10 right-10 lg:left-1/2 lg:right-auto lg:top-10 lg:bottom-10 lg:-translate-x-1/2 -translate-y-1/2 lg:translate-y-0 h-0.5 lg:h-auto lg:w-0.5 bg-slate-200 z-0"></div>
              {pisosNavegacion.map((piso) => (
                <div key={piso.id} id={`nav-piso-${piso.id}`} className="relative group flex items-center shrink-0 z-10 bg-slate-50 rounded-full">
                  <button
                    onClick={() => cambiarPiso(piso.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-sm border ${pisoActivoId === piso.id ? 'bg-slate-900 text-white border-slate-900 scale-110 ring-[3px] ring-slate-200 shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200 hover:scale-105'}`}
                  >
                    {obtenerSiglaPiso(piso.nombre)}
                  </button>
                  <span className="absolute left-16 hidden lg:group-hover:inline-block bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap z-50">
                    {piso.nombre}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <button
            onClick={handleBajarPiso} disabled={!puedeBajar}
            className={`shrink-0 lg:mt-1 ml-1 lg:ml-0 flex justify-center items-center w-8 h-8 rounded-full transition-all z-10 ${puedeBajar ? 'text-slate-500 hover:bg-slate-200 hover:text-slate-900 cursor-pointer' : 'text-slate-300 opacity-30 cursor-not-allowed'}`}
          >
            <svg className={`w-4 h-4 hidden lg:block ${puedeBajar && !animando ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animationDirection: "reverse" }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            <svg className={`w-4 h-4 lg:hidden ${puedeBajar && !animando ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7-7"></path></svg>
          </button>
        </div>

        {/* CONTENEDOR CENTRAL Y DERECHO */}
        <div className={`flex-1 min-h-0 flex flex-col lg:flex-row gap-2 lg:gap-4 transition-opacity duration-300 ${animando ? 'opacity-0' : 'opacity-100'} pb-1 lg:pb-0`}>
          
          {/* SECCIÓN PLANO */}
          <section className="flex-1 min-h-0 lg:min-w-0 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
            
            <div className="hidden lg:flex shrink-0 px-4 py-3 border-b border-slate-100 flex-row items-center justify-between gap-3 bg-white z-10">
              <h2 className="text-xl font-black text-slate-900 leading-none truncate pr-2">
                {pisoActual.nombre}
              </h2>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase tracking-widest font-bold whitespace-nowrap shrink-0">
                {pisoActual.tipo}
              </span>
            </div>

            <div className="lg:hidden absolute top-2 left-2 z-20 pointer-events-none">
              <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-slate-200/60 flex flex-col items-start gap-1 w-max">
                <h2 className="text-base font-black text-slate-900 leading-none drop-shadow-sm">
                  {pisoActual.nombre}
                </h2>
                <span className="text-[8px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-widest font-bold border border-slate-200/50">
                  {pisoActual.tipo}
                </span>
              </div>
            </div>

            {/* BOTÓN AMPLIAR AJUSTADO (Más chico y tirado a la derecha) */}
            <button
              onClick={() => setPlanoFullscreen(true)}
              className="lg:hidden absolute bottom-3 right-2 z-30 bg-slate-900 text-white p-2 rounded-full shadow-xl flex items-center justify-center gap-1.5 border border-white/20 active:scale-95 transition-transform"
              aria-label="Ampliar plano"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
              </svg>
            </button>

            <div className="w-full h-full relative bg-white p-2 lg:p-4 flex items-center justify-center overflow-hidden">
              {renderCapasSVG}
            </div>
          </section>

          {/* COLUMNA DERECHA (Tarjetas) */}
          <aside className="shrink-0 h-[105px] lg:h-auto lg:flex-1 lg:flex-none w-full lg:w-[320px] xl:w-[360px] flex flex-col gap-2 lg:gap-4 pb-2 lg:pb-0">
            <div className="hidden lg:block shrink-0 bg-slate-900 text-white p-4 rounded-2xl shadow-sm">
              <p className="text-slate-300 leading-relaxed text-[13px] font-light">{pisoActual.descripcion}</p>
            </div>

            <div className="flex-1 min-h-0 flex flex-col bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="hidden lg:flex shrink-0 px-4 py-2 lg:py-3 border-b border-slate-100 justify-between items-center bg-white z-10">
                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tighter">Unidades</h3>
                <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">{unidadesDelPiso.length}</span>
              </div>
              
              <div className="flex-1 lg:overflow-y-auto overflow-x-auto lg:overflow-x-hidden p-2 lg:p-3 pb-4 lg:pb-3 flex flex-row lg:flex-col items-start lg:items-stretch gap-2 lg:space-y-0 hide-scrollbar bg-slate-50/50 snap-x snap-mandatory lg:snap-none touch-pan-x lg:touch-auto">
                {unidadesDelPiso.map((unidad) => {
                  const isSelected = unidadSeleccionada === unidad.id;
                  const isHovered = unidadHovered === unidad.id;
                  const isDisponible = unidad.estado === 'Disponible';

                  return (
                    <div
                      key={unidad.id}
                      id={`tarjeta-unidad-${unidad.id}`}
                      onMouseEnter={isDesktop && isDisponible ? () => setUnidadHovered(unidad.id) : undefined}
                      onMouseLeave={isDesktop && isDisponible ? () => setUnidadHovered(null) : undefined}
                      onClick={isDisponible ? () => handleInteraccionUnidad(unidad.id, unidad.imagenDetalle) : undefined}
                      className={`
                        shrink-0 transition-all duration-300 ease-in-out rounded-xl border 
                        w-[75vw] max-w-[240px] flex flex-col p-1.5 lg:p-2 snap-center gap-1.5
                        lg:w-full lg:max-w-none lg:snap-align-none
                        ${isDisponible ? 'cursor-pointer' : 'cursor-default'}
                        ${isDisponible && !isSelected ? 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/50 shadow-sm' : ''}
                        ${!isDisponible ? 'border-slate-100 bg-white/40 opacity-60 grayscale-[50%]' : ''}
                        ${isSelected ? 'border-slate-900 ring-2 ring-slate-900 scale-[1.02] bg-white shadow-md opacity-100' : isHovered && isDisponible ? 'ring-2 ring-slate-300 scale-[1.02]' : ''}
                      `}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-md lg:rounded-lg flex items-center justify-center text-white font-black text-[10px] lg:text-xs shrink-0 ${isDisponible ? 'bg-slate-900' : 'bg-slate-400'}`}>
                            {unidad.unidad}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-[10px] lg:text-[11px] leading-tight truncate">{unidad.amb}</p>
                            <p className="text-slate-500 text-[8px] lg:text-[9px] font-bold uppercase tracking-widest mt-0">{unidad.sup}</p>
                          </div>
                        </div>
                        <span className={`text-[7px] lg:text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 lg:px-2 lg:py-1 rounded shrink-0 ${isDisponible ? 'bg-emerald-100 text-emerald-800' : unidad.estado === 'Reservado' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                          {unidad.estado}
                        </span>
                      </div>

                      <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${isSelected ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
                        <div className="pt-1.5 border-t border-slate-200/60 flex flex-row lg:flex-col gap-1.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAbrirModal(unidad.imagenDetalle); }}
                            className="flex-1 w-full bg-[#29414A] hover:bg-[#5F747D] text-[#FFFFFF] text-[9px] lg:text-[10px] font-bold py-1.5 rounded transition-colors tracking-wide flex items-center justify-center gap-1"
                          >
                            <svg className="w-3 h-3 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            Ver plano
                          </button>
                          <a
                            href={`https://wa.me/5492281534629?text=${encodeURIComponent(`Hola, queria consultar por el ${unidad.amb} ${unidad.unidad} del Edificio Patagones`)}`}
                            target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            className="flex-1 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] lg:text-[10px] font-bold py-1.5  rounded transition-colors tracking-wide flex items-center justify-center gap-1 shadow-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16" className="shrink-0">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                 
                            </svg>Consultar
                          </a >
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODAL FULLSCREEN CON ZOOM INTERACTIVO */}
      {planoFullscreen && (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col animate-in fade-in zoom-in-95 duration-200 lg:hidden">
          <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center shadow-md z-10 shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{pisoActual.nombre}</span>
              <span className="text-sm font-medium">Plano Interactivo</span>
            </div>
            <button 
              onClick={() => setPlanoFullscreen(false)} 
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 w-full h-full relative overflow-hidden bg-white">
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={4}
              centerOnInit={true}
              pinch={{ step: 5 }}
              doubleClick={{ disabled: false }}
            >
              <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
                <div className="w-full h-full flex items-center justify-center p-2">
                  {renderCapasSVG}
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-md text-white text-[10px] px-4 py-2 rounded-full pointer-events-none uppercase tracking-widest font-bold">
            Pellizcar para zoom
          </div>
        </div>
      )}

      {/* MODAL DE IMAGEN DE DETALLE */}
      {imagenModal && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 lg:bg-black/80 flex items-center justify-center p-0 lg:p-4 backdrop-blur-sm transition-opacity"
          onClick={() => { setImagenModal(null); setPasoRecorrido(0); }}
        >
          <div className="relative w-full h-full lg:w-[95vw] lg:h-[95vh] lg:max-w-[1600px] bg-slate-900 lg:rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setImagenModal(null); setPasoRecorrido(0); }} className="absolute top-4 right-4 z-50 bg-white hover:bg-slate-100 text-slate-900 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex-1 w-full h-full overflow-hidden flex items-center justify-center relative">
              <img src={imagenModal} alt="Detalle" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </div>
  );
};

export default VistaDetallePiso;