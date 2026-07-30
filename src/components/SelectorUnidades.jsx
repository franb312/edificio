import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { unidadesData, categoriasData, imagenGeneralCocheras, imagenGeneralBauleras } from "../data/buildingData";

const SelectorUnidades = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('1 ambiente');
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [miniCarouselIndex, setMiniCarouselIndex] = useState(0);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });

  const planoTouchStartX = useRef(0);
  const planoTouchEndX = useRef(0);
  const pendingPlanoOpen = useRef(false);

  const listTopRef = useRef(null);
  const sectionRef = useRef(null);
  const hasInteracted = useRef(false);

  // Variables para saber si estamos en una vista agrupada (Cocheras o Bauleras)
  const isCocheras = categoriaActiva.toLowerCase() === 'cocheras';
  const isBauleras = categoriaActiva.toLowerCase() === 'bauleras';
  const isAgrupada = isCocheras || isBauleras;

  const descargablesPorTipologia = {
    '1 ambiente': '/planos/completo-1ambiente.pdf',
    '2 ambientes': '/planos/completo-2ambientes.pdf',
    '3 ambientes': '/planos/completo-3ambientes.pdf',
    '4 ambientes': '/planos/completo-4ambientes.pdf',
    'cocheras': '/planos/completo-cocheras.pdf',
    'bauleras': '/planos/completo-bauleras.pdf',
  };

  const getCapacidadBadgeStyle = (capacidad) => {
    if (!capacidad) return '';
    if (capacidad.includes('Vehículos') || capacidad.includes('Autos') || parseInt(capacidad) > 1) {
      return 'bg-[#1D3630] text-[#FFFFFF] border-[#1D3630]';
    }
    return 'bg-[#869C97] text-[#FFFFFF] border-[#869C97]';
  };

  const formatCapacidad = (capacidad) => {
    if (!capacidad) return '';
    const num = parseInt(capacidad);
    const isPlural = num > 1 || (isNaN(num) && /autos|vehículos|vehiculos/i.test(capacidad));
    
    return capacidad
      .replace(/Autos?/gi, isPlural ? 'Vehículos' : 'Vehículo')
      .replace(/Vehículos?/gi, isPlural ? 'Vehículos' : 'Vehículo')
      .replace(/Vehiculo/gi, isPlural ? 'Vehículos' : 'Vehículo');
  };

  const catIndex = categoriasData.findIndex(c => c.nombre === categoriaActiva);
  const hasPrevCat = catIndex > 0;
  const hasNextCat = catIndex < categoriasData.length - 1;

  const cambiarCategoria = (nombreCat) => {
    hasInteracted.current = true;
    setCategoriaActiva(nombreCat);
  };

  const handlePrevCat = () => {
    if (hasPrevCat) cambiarCategoria(categoriasData[catIndex - 1].nombre);
  };

  const handleNextCat = () => {
    if (hasNextCat) cambiarCategoria(categoriasData[catIndex + 1].nombre);
  };

  useEffect(() => {
    if (modalConfig.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalConfig.isOpen]);

  const unidadesFiltradas = useMemo(() => {
    return unidadesData.filter((u) => {
      return (u.amb || '').toLowerCase() === (categoriaActiva || '').toLowerCase();
    });
  }, [categoriaActiva]);

  const unidadesPorPiso = useMemo(() => {
    return unidadesFiltradas.reduce((acc, unidad) => {
      const labelPiso = `Piso ${unidad.pisoId}`;
      if (!acc[labelPiso]) acc[labelPiso] = [];
      acc[labelPiso].push(unidad);
      return acc;
    }, {});
  }, [unidadesFiltradas]);

  const pisosOrdenados = useMemo(() => {
    return Object.keys(unidadesPorPiso).sort((a, b) => {
      const numA = parseInt(a.replace(/^\D+/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/^\D+/g, ''), 10) || 0;
      return numB - numA; 
    });
  }, [unidadesPorPiso]);

  // Resumen Cocheras
  const resumenCocheras = useMemo(() => {
    const cocheras = unidadesData.filter(u => (u.amb || '').toLowerCase() === 'cocheras');
    
    const isDoble = (cap) => cap && (cap.includes('2') || cap.toLowerCase().includes('doble'));
    const isPickUp = (cap) => cap && (cap.toLowerCase().includes('pick up') || cap.toLowerCase().includes('pickup') || cap.toLowerCase().includes('camioneta') || cap.toLowerCase().includes('ancha'));

    return [
      {
        id: 'doble-privada',
        titulo: 'Cochera Doble Exclusiva',
        capacidad: '2 Vehículos',
        isPrivada: true,
        descripcion: 'Espacio amplio para dos vehículos con acceso independiente.',
        disponibles: cocheras.filter(u => isDoble(u.capacidad) && u.isPrivada && u.estado === 'Disponible').length,
      },
      {
        id: 'doble-comun',
        titulo: 'Cochera Doble',
        capacidad: '2 Vehículos',
        isPrivada: false,
        descripcion: 'Espacio continuo para dos vehículos con acceso por rampa común.',
        disponibles: cocheras.filter(u => isDoble(u.capacidad) && !u.isPrivada && u.estado === 'Disponible').length,
      },
      {
        id: 'simple-pickup',
        titulo: 'Cochera Simple (Pick-up)',
        capacidad: '1 Pick-up / Grande',
        isPrivada: false,
        descripcion: 'Espacio extra ancho, ideal para resguardar una pick-up o vehículo de gran porte.',
        disponibles: cocheras.filter(u => !isDoble(u.capacidad) && isPickUp(u.capacidad) && !u.isPrivada && u.estado === 'Disponible').length,
      },
      {
        id: 'simple-comun',
        titulo: 'Cochera Simple',
        capacidad: '1 Vehículo',
        isPrivada: false,
        descripcion: 'Espacio tradicional para un vehículo con acceso por rampa común.',
        disponibles: cocheras.filter(u => !isDoble(u.capacidad) && !isPickUp(u.capacidad) && !u.isPrivada && u.estado === 'Disponible').length,
      }
    ];
  }, []);

  // Resumen Bauleras
  const resumenBauleras = useMemo(() => {
    const bauleras = unidadesData.filter(u => (u.amb || '').toLowerCase() === 'bauleras');
    
    const checkPiso = (unidad, palabrasClave) => {
      const pisoInfo = (unidad.pisoId || unidad.piso || '').toString().toLowerCase();
      return palabrasClave.some(keyword => pisoInfo.includes(keyword));
    };

    return [
      {
        id: 'baulera-subsuelo',
        titulo: 'Baulera Subsuelo',
        capacidad: 'Espacio de Guardado',
        isPrivada: false,
        descripcion: 'Unidad de almacenamiento en el nivel subsuelo.',
        disponibles: bauleras.filter(u => u.estado === 'Disponible' && checkPiso(u, ['subsuelo'])).length,
      },
      {
        id: 'baulera-pb',
        titulo: 'Baulera Planta Baja',
        capacidad: 'Espacio de Guardado',
        isPrivada: false,
        descripcion: 'Unidad de almacenamiento de fácil acceso en planta baja.',
        disponibles: bauleras.filter(u => u.estado === 'Disponible' && checkPiso(u, ['pb', 'planta baja', 'baja'])).length,
      },
      {
        id: 'baulera-entrepiso',
        titulo: 'Baulera Entrepiso',
        capacidad: 'Espacio de Guardado',
        isPrivada: false,
        descripcion: 'Unidad de almacenamiento complementaria en el entrepiso.',
        disponibles: bauleras.filter(u => u.estado === 'Disponible' && checkPiso(u, ['entrepiso'])).length,
      }
    ];
  }, []);

  const galeria = useMemo(() => {
    if (isCocheras) {
      return [{ type: 'planta-general', src: imagenGeneralCocheras, title: 'Planta General' }];
    }
    if (isBauleras) {
      return [{ type: 'planta-general', src: imagenGeneralBauleras, title: 'Planta General' }];
    }

    if (!unidadSeleccionada) return [];
    
    const basePreview = unidadSeleccionada.imagenGif || 'https://placehold.co/800x600/f8fafc/0f172a?text=IMAGEN+UNIDAD';
    const fotosExtra = unidadSeleccionada.imagenesExtra || [];
    const items = [
      { type: 'preview', src: basePreview, title: 'Visualización' },
      ...fotosExtra.map((src, i) => ({ type: `extra-${i}`, src, title: 'Visualización' }))
    ];

    if (unidadSeleccionada.imagenDetalle) {
      items.push({ type: 'plano', src: unidadSeleccionada.imagenDetalle, title: 'Plano Técnico' });
    }
    return items;
  }, [unidadSeleccionada, isCocheras, isBauleras]);

  const currentImg = galeria[miniCarouselIndex] || galeria[0];

  const nextMiniSlide = useCallback(() => {
    if (galeria.length <= 1) return;
    setMiniCarouselIndex((prev) => (prev === galeria.length - 1 ? 0 : prev + 1));
  }, [galeria]);

  const prevMiniSlide = useCallback(() => {
    if (galeria.length <= 1) return;
    setMiniCarouselIndex((prev) => (prev === 0 ? galeria.length - 1 : prev - 1));
  }, [galeria]);

  useEffect(() => {
    if (unidadesFiltradas.length > 0) {
      const primeraDisponible = unidadesFiltradas.find((u) => u.estado === 'Disponible');
      setUnidadSeleccionada(primeraDisponible || unidadesFiltradas[0]);
    } else {
      setUnidadSeleccionada(null);
    }
  }, [categoriaActiva, unidadesFiltradas]);

  useEffect(() => {
    if (isAgrupada) {
      setMiniCarouselIndex(0);
    } else if (unidadSeleccionada) {
      if (pendingPlanoOpen.current) {
         const planoIdx = galeria.findIndex(g => g.type === 'plano');
         setMiniCarouselIndex(planoIdx !== -1 ? planoIdx : 0);
         setModalConfig({ isOpen: true });
         pendingPlanoOpen.current = false;
      } else {
         setMiniCarouselIndex(0);
      }
    }
  }, [unidadSeleccionada, galeria, isAgrupada]);

  useEffect(() => {
    if (!hasInteracted.current) return;

    const activeBtn = document.getElementById(`cat-${categoriaActiva.replace(/\s+/g, '-')}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    if (listTopRef.current) {
      const rect = listTopRef.current.getBoundingClientRect();
      let stickyOffset = 160; 
      if (window.innerWidth < 768) {
        stickyOffset = window.innerWidth + 120; 
      } else if (window.innerWidth < 1024) {
        stickyOffset = 420; 
      }
      if (rect.top < stickyOffset) {
        const absoluteTop = rect.top + window.scrollY;
        window.scrollTo({
          top: absoluteTop - stickyOffset,
          behavior: 'smooth'
        });
      }
    }
  }, [categoriaActiva]);

  const handlePlanoTouchStart = (e) => {
    planoTouchStartX.current = e.targetTouches[0].clientX;
    planoTouchEndX.current = e.targetTouches[0].clientX;
  };

  const handlePlanoTouchMove = (e) => {
    planoTouchEndX.current = e.targetTouches[0].clientX;
  };

  const handlePlanoTouchEnd = () => {
    if (galeria.length <= 1) return;
    const swipeDistance = planoTouchStartX.current - planoTouchEndX.current;
    if (swipeDistance > 50) nextMiniSlide();
    else if (swipeDistance < -50) prevMiniSlide();
  };

  const getEstadoBadge = (estado) => {
    const estadoClean = (estado || '').toLowerCase();
    if (estadoClean === 'disponible') {
      return { texto: 'Disponible', estilos: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
    if (estadoClean === 'reservado') {
      return { texto: 'Reservado', estilos: 'bg-amber-50 text-amber-600 border-amber-200' };
    }
    return { texto: 'Vendido', estilos: 'bg-slate-100 text-slate-400 border-slate-200 line-through' };
  };

  return (
    <section 
      ref={sectionRef} 
      id="unidades" 
      className={`py-12 md:py-20 bg-white rounded-3xl md:rounded-[3rem] shadow-sm border border-slate-100 w-full overflow-clip relative ${modalConfig.isOpen ? 'z-[9999]' : 'isolate z-40'}`} 
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="w-full px-5 md:px-10 mx-auto relative">
        <h2 className="text-3xl mb-4 uppercase tracking-tighter font-bold text-slate-900 text-center md:text-left">
          Explorá por Unidad
        </h2>
        <p className="text-slate-500 mb-6 lg:mb-8 text-center md:text-left text-sm max-w-3xl">
          Seleccioná la tipología. Podés deslizar lateralmente las tarjetas para ver todas las unidades del piso.
        </p>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start w-full relative">

          <div className="order-1 lg:order-2 lg:col-span-4 sticky top-16 lg:top-[140px] z-40 lg:z-20 bg-white pb-2 pt-2 lg:pb-0 lg:pt-0 w-full border-b border-slate-100 lg:border-0 self-start">
            <div className="relative w-full group/mini">
              <div 
                className="w-full aspect-square md:aspect-auto md:h-[280px] lg:h-[350px] overflow-hidden border-[#FFFFFF] bg-[#FFFFFF] p-2 flex items-center justify-center relative touch-pan-y"
                onTouchStart={handlePlanoTouchStart}
                onTouchMove={handlePlanoTouchMove}
                onTouchEnd={handlePlanoTouchEnd}
              >
                {(unidadSeleccionada || isAgrupada) && currentImg ? (
                  <>
                    <img 
                      src={currentImg.src} 
                      alt={isCocheras ? 'Plano General de Cocheras' : isBauleras ? 'Planta General de Bauleras' : `${currentImg.title} de la unidad ${unidadSeleccionada?.unidad}`} 
                      className="w-full h-full object-contain cursor-default select-none"
                    />

                    {miniCarouselIndex === 0 && (
                      <>
                        <div className="absolute top-2.5 left-3 flex flex-col pointer-events-none z-10 text-left animate-in fade-in zoom-in-95 duration-300">
                          <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5 drop-shadow-sm">
                            {isAgrupada ? 'Visualización General' : currentImg.title}
                          </span>
                          <span className="text-base md:text-xl font-black text-slate-900 leading-none mb-1 drop-shadow-sm">
                            {isCocheras ? 'Nivel Cocheras' : isBauleras ? 'Nivel Bauleras' : `Unidad ${unidadSeleccionada.unidad.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}`}
                          </span>
                          {!isAgrupada && (
                            <span className={`text-[8px] md:text-[9px] px-1.5 py-0.5 rounded-full font-bold border inline-block w-fit shadow-xs ${getEstadoBadge(unidadSeleccionada.estado).estilos}`}>
                              {getEstadoBadge(unidadSeleccionada.estado).texto}
                            </span>
                          )}
                        </div>

                        {!isAgrupada && (
                          <div className="absolute bottom-2.5 left-3 flex flex-col pointer-events-none z-10 text-left animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                              <span className="text-[10px] md:text-xs text-slate-700 font-bold tracking-tight leading-tight drop-shadow-sm">
                                {unidadSeleccionada.amb.replace(/ambientes?/gi, 'amb.')}
                              </span>
                              {unidadSeleccionada.isPrivada && (
                                <span className="bg-[#13969C] border border-[#13969C] text-[#FFFFFF] px-1 py-0.5 rounded text-[8px] uppercase tracking-tighter shadow-sm font-bold">
                                  Entrada Privada
                                </span>
                              )}
                              {unidadSeleccionada.capacidad && (
                                <span className={`px-1 py-0.5 rounded text-[8px] uppercase tracking-tighter shadow-sm flex items-center gap-0.5 font-bold border ${getCapacidadBadgeStyle(formatCapacidad(unidadSeleccionada.capacidad))}`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 opacity-70"><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" /><path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
                                  {formatCapacidad(unidadSeleccionada.capacidad)}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] md:text-xs text-slate-700 font-bold tracking-tight leading-tight mt-0.5 drop-shadow-sm">
                              Sup: <b className="text-slate-900">{unidadSeleccionada.sup}</b>
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    <button 
                      onClick={(e) => { e.stopPropagation(); setModalConfig({ isOpen: true }); }}
                      className="absolute bottom-8 right-0 bg-white/95 hover:bg-white text-slate-800 w-9 h-9 rounded-full flex items-center justify-center shadow-sm border border-slate-100 z-20 transition-all cursor-pointer"
                      title="Ampliar imagen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="text-slate-400 text-sm italic">No hay previsualizaciones disponibles</div>
                )}
              </div>

              {galeria.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevMiniSlide(); }}
                    className="flex absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md hover:bg-white/95 text-slate-600 hover:text-slate-900 w-8 md:w-9 h-8 md:h-9 rounded-full items-center justify-center shadow-sm cursor-pointer transition-all border border-slate-200/50 z-30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextMiniSlide(); }}
                    className="flex absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md hover:bg-white/95 text-slate-600 hover:text-slate-900 w-8 md:w-9 h-8 md:h-9 rounded-full items-center justify-center shadow-sm cursor-pointer transition-all border border-slate-200/50 z-30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            <a 
              href={descargablesPorTipologia[categoriaActiva.toLowerCase()] || '#'}
              download
              className="hidden lg:flex items-center justify-center gap-2 w-full bg-slate-950 text-[#E8E6E6] py-3 lg:py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[#29414A] transition shadow-sm cursor-pointer text-center px-2 break-words mt-4"
            >
              Descargar Catálogo de Unidades
            </a>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-12 sticky top-[calc(100vw_+_-1px)] md:top-[360px] lg:top-16 z-30 bg-white shadow-[0_10px_10px_-10px_rgba(0,0,0,0.05)] lg:shadow-none lg:border-b lg:border-gray-200 lg:mb-4 w-full relative">
            
            {hasPrevCat && (
              <button onClick={handlePrevCat} className="md:hidden absolute left-0 top-0 bottom-0 z-10 w-8 flex items-center justify-start pl-0.5 bg-gradient-to-r from-white via-white/80 to-transparent text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
            )}

            <div className="w-full flex flex-row flex-nowrap overflow-x-auto md:overflow-x-hidden snap-x px-0 border-b border-gray-200 pb-2 md:pb-0 gap-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth relative">
              {categoriasData.map((cat) => {
                const enStock = unidadesData.filter(u => 
                  u.amb?.toLowerCase() === cat.nombre.toLowerCase() && u.estado === 'Disponible'
                ).length;

                return (
                  <button
                    key={cat.id}
                    id={`cat-${cat.nombre.replace(/\s+/g, '-')}`}
                    onClick={() => cambiarCategoria(cat.nombre)}
                    className={`snap-start shrink-0 w-[25%] md:w-auto md:flex-1 py-3 md:py-4 px-1 text-center transition-all border-b-2 cursor-pointer flex flex-col items-center justify-center rounded-t-md ${
                      categoriaActiva === cat.nombre ? 'border-[#94a8b0] opacity-100 bg-slate-50/50' : 'border-transparent opacity-40 hover:opacity-70 bg-white'
                    }`}
                  >
                    <span className="block w-full text-[11px] min-[375px]:text-[13px] sm:text-sm md:text-sm lg:text-base font-bold uppercase text-slate-900 leading-tight px-0.5">
                      {cat.nombre.replace(/ambientes?/gi, 'amb.')}
                    </span>
                    <span className="w-full text-[9px] sm:text-[10px] md:text-xs text-slate-500 uppercase block mt-1">
                      {enStock} disp.
                    </span>
                  </button>
                );
              })}
            </div>

            {hasNextCat && (
              <button onClick={handleNextCat} className="md:hidden absolute right-0 top-0 bottom-0 z-10 w-8 flex items-center justify-end pr-0.5 bg-gradient-to-l from-white via-white/80 to-transparent text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            )}
          </div>

          <div className="order-2 lg:hidden p-2 pt-1 pb-3 bg-white w-full relative z-10">
            <a href={descargablesPorTipologia[categoriaActiva.toLowerCase()] || '#'} download className="flex items-center justify-center gap-2 w-full bg-[#122A33] text-[#94a8b0] py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] hover:bg-[#5F747D] transition shadow-sm cursor-pointer text-center px-2 break-words">
              Descargar Catálogo de Unidades
            </a>
          </div>

          <div ref={listTopRef} className="order-3 lg:order-3 lg:col-span-8 w-full pt-6 lg:pt-0 min-h-[50vh]">
            <div key={categoriaActiva} className="animate-in fade-in duration-500 w-full space-y-4 md:space-y-8">
              
              {isCocheras ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                  {resumenCocheras.map((tipo) => {
                    const agotado = tipo.disponibles === 0;
                    const wppMessage = encodeURIComponent(`Hola, quisiera consultar por disponibilidad de una ${tipo.titulo}.`);

                    return (
                      <div key={tipo.id} className={`flex flex-col justify-between h-full lg:min-h-[300px] xl:min-h-[320px] bg-white border rounded-2xl p-4 xl:p-5 shadow-sm transition-all ${agotado ? 'opacity-60 border-slate-200' : 'border-[#94a8b0] hover:shadow-md'}`}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="bg-slate-100 p-2.5 rounded-lg text-slate-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
                            </div>
                            <span className={`text-[10px] px-2 py-1 rounded-full font-bold border text-center ${agotado ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                              {agotado ? 'Agotado' : `${tipo.disponibles} Disponibles`}
                            </span>
                          </div>
                          
                          <h4 className="text-base xl:text-lg font-black text-slate-900 leading-tight mb-2">
                            {tipo.titulo}
                          </h4>
                          <p className="text-xs text-slate-500 mb-4">
                            {tipo.descripcion}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {tipo.isPrivada && <span className="text-[9px] text-[#FFFFFF] bg-[#13969C] rounded px-1.5 py-0.5 font-bold uppercase">Entrada Privada</span>}
                            <span className="text-[9px] bg-[#1D3630] text-[#FFFFFF] rounded px-1.5 py-0.5 font-bold uppercase text-center">
                              {tipo.capacidad}
                            </span>
                          </div>

                          <a 
                            href={`https://wa.me/5491100000000?text=${wppMessage}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm text-[11px] uppercase tracking-wider truncate ${agotado ? 'bg-slate-100 text-slate-400 pointer-events-none' : 'bg-emerald-600 hover:bg-emerald-700 text-[#FFFFFF]'}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="shrink-0">
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                            </svg> Consultar
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : isBauleras ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                  {resumenBauleras.map((tipo) => {
                    const agotado = tipo.disponibles === 0;
                    const wppMessage = encodeURIComponent(`Hola, quisiera consultar por disponibilidad de una ${tipo.titulo}.`);

                    return (
                      <div key={tipo.id} className={`flex flex-col justify-between h-full lg:min-h-[300px] xl:min-h-[320px] bg-white border rounded-2xl p-4 xl:p-5 shadow-sm transition-all ${agotado ? 'opacity-60 border-slate-200' : 'border-[#94a8b0] hover:shadow-md'}`}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="bg-slate-100 p-2.5 rounded-lg text-slate-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                              </svg>
                            </div>
                            <span className={`text-[10px] px-2 py-1 rounded-full font-bold border text-center ${agotado ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                              {agotado ? 'Agotado' : `${tipo.disponibles} Disponibles`}
                            </span>
                          </div>
                          
                          <h4 className="text-base xl:text-lg font-black text-slate-900 leading-tight mb-2">
                            {tipo.titulo}
                          </h4>
                          <p className="text-xs text-slate-500 mb-4">
                            {tipo.descripcion}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            <span className="text-[9px] bg-[#869C97] text-[#FFFFFF] border border-[#869C97] rounded px-1.5 py-0.5 font-bold uppercase text-center">
                              {tipo.capacidad}
                            </span>
                          </div>

                          <a 
                            href={`https://wa.me/5491100000000?text=${wppMessage}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm text-[11px] uppercase tracking-wider truncate ${agotado ? 'bg-slate-100 text-slate-400 pointer-events-none' : 'bg-emerald-600 hover:bg-emerald-700 text-[#FFFFFF]'}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="shrink-0">
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                            </svg> Consultar
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                pisosOrdenados.length > 0 ? (
                  pisosOrdenados.map((pisoLabel) => (
                    <div key={pisoLabel} className="bg-slate-50/40 p-3 md:p-6 rounded-2xl border border-slate-100/80 w-full overflow-hidden">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 md:mb-4 border-b border-slate-200/60 pb-2">
                        {pisoLabel}
                      </h3>
                      
                      <div className="flex flex-row overflow-x-auto snap-x md:grid md:grid-cols-3 gap-3 md:gap-4 w-full items-stretch pb-4 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {unidadesPorPiso[pisoLabel].map((unidad, index, arr) => {
                          const estadoClean = (unidad.estado || '').toLowerCase();
                          const estaDisponible = estadoClean === 'disponible';
                          const estaReservado = estadoClean === 'reservado';
                          const badge = getEstadoBadge(unidad.estado);
                          const esActivo = unidadSeleccionada?.id === unidad.id;

                          const wppMessage = encodeURIComponent(`Hola, quisiera consultar por la unidad ${unidad.unidad} (${unidad.amb}) del ${pisoLabel}.`);

                          let prevUnit = null;
                          for (let i = index - 1; i >= 0; i--) {
                            if (arr[i].estado?.toLowerCase() === 'disponible') {
                              prevUnit = arr[i];
                              break;
                            }
                          }
                          let nextUnit = null;
                          for (let i = index + 1; i < arr.length; i++) {
                            if (arr[i].estado?.toLowerCase() === 'disponible') {
                              nextUnit = arr[i];
                              break;
                            }
                          }

                          return (
                            <div key={unidad.id} id={`unidad-wrap-${unidad.id}`} className="snap-center shrink-0 flex items-center gap-1.5 md:gap-2 h-full min-w-0">
                              {esActivo && prevUnit && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUnidadSeleccionada(prevUnit);
                                    setTimeout(() => {
                                      document.getElementById(`unidad-wrap-${prevUnit.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                    }, 150);
                                  }}
                                  className="md:hidden w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full bg-slate-100 hover:bg-[#94a8b0] hover:text-white text-slate-600 flex items-center justify-center shadow-sm border border-slate-200 transition-all cursor-pointer animate-in fade-in slide-in-from-right-2 z-10"
                                  title="Unidad anterior"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                              )}

                              <div 
                                onClick={(e) => { 
                                  if (estaDisponible) {
                                    setUnidadSeleccionada(unidad); 
                                    setTimeout(() => {
                                      document.getElementById(`unidad-wrap-${unidad.id}`)?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'nearest',
                                        inline: 'center'
                                      });
                                    }, 150);
                                  } 
                                }}
                                className={`flex-1 min-w-0 w-[148px] sm:w-[160px] md:w-full p-2 md:p-3 rounded-xl border transition-all flex flex-col justify-between h-full ${
                                  estaDisponible 
                                    ? esActivo ? 'bg-white border-[#94a8b0] shadow-md ring-1 ring-[#94a8b0]/20 cursor-pointer' : 'bg-white hover:shadow-md border-slate-100 cursor-pointer' 
                                    : estaReservado ? 'opacity-75 bg-amber-50/30 border-amber-100 shadow-none cursor-not-allowed' : 'opacity-50 bg-slate-100/50 border-slate-200 shadow-none cursor-not-allowed'
                                }`}
                              >
                                <div className="flex flex-col w-full">
                                  <div className="flex items-start justify-between w-full gap-1">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-1.5">
                                      <span className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate max-w-[85px] md:max-w-none order-1 md:order-2">
                                        {unidad.amb.replace(/ambientes?/gi, 'amb.')}
                                      </span>
                                      <h4 className="text-[15px] sm:text-base md:text-xl font-black text-slate-900 tracking-tight whitespace-nowrap leading-none order-2 md:order-1 mt-0.5 md:mt-0">
                                        {unidad.unidad.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
                                      </h4>
                                    </div>
                                    <span className={`text-[7px] md:text-[9px] px-1 md:px-1.5 py-0.5 rounded-full font-bold border shrink-0 mr-1 sm:mr-2 md:mr-0 mt-0.5 ${badge.estilos}`}>
                                      {badge.texto}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-1 mt-1.5 md:mt-1">
                                    {unidad.isPrivada && <span className="text-[7px] md:text-[9px] text-[#FFFFFF] bg-[#13969C] border border-[#13969C] rounded px-1.5 py-[1px] w-fit font-bold uppercase tracking-tight truncate">Entrada Privada</span>}
                                    {unidad.capacidad && (
                                      <span className={`text-[7px] md:text-[9px] rounded px-1.5 py-[1px] max-w-full font-bold uppercase tracking-tight truncate flex items-center gap-0.5 border ${getCapacidadBadgeStyle(formatCapacidad(unidad.capacidad))}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 opacity-70 shrink-0"><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" /><path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
                                        <span className="truncate">{formatCapacidad(unidad.capacidad)}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {esActivo && (
                                  <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1.5 w-full animate-in fade-in zoom-in duration-300">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (unidad.imagenDetalle) {
                                          if (unidadSeleccionada?.id === unidad.id) {
                                            const planoIdx = galeria.findIndex(g => g.type === 'plano');
                                            setMiniCarouselIndex(planoIdx !== -1 ? planoIdx : 0);
                                            setModalConfig({ isOpen: true });
                                          } else {
                                            setUnidadSeleccionada(unidad);
                                            pendingPlanoOpen.current = true;
                                          }
                                        }
                                      }}
                                      className="w-full bg-[#29414A] hover:bg-[#5F747D] text-[#FFFFFF] text-[9px] sm:text-[10px] md:text-[11px] py-2 px-2 rounded-lg font-bold transition-colors tracking-wide flex items-center justify-center gap-1.5 shadow-sm"
                                    >
                                      <svg className="w-3 h-3 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                      Ver Plano
                                    </button>

                                     <a 
                                      href={`https://wa.me/5491100000000?text=${wppMessage}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()} 
                                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-[#FFFFFF] text-[9px] sm:text-[10px] md:text-[11px] py-2 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm tracking-wider truncate"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16" className="shrink-0">
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                      </svg> Consultar
                                    </a>
                                  </div>
                                )}
                              </div>

                              {esActivo && nextUnit && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUnidadSeleccionada(nextUnit);
                                    setTimeout(() => {
                                      document.getElementById(`unidad-wrap-${nextUnit.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                    }, 150);
                                  }}
                                  className="md:hidden w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full bg-slate-100 hover:bg-[#94a8b0] hover:text-white text-slate-600 flex items-center justify-center shadow-sm border border-slate-200 transition-all cursor-pointer animate-in fade-in slide-in-from-left-2 z-10"
                                  title="Unidad siguiente"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                              )}

                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 italic w-full">
                    Próximamente se cargará la disponibilidad para esta tipología.
                  </div>
                )
              )}

            </div>
          </div>

        </div>
      </div>

      {modalConfig.isOpen && (unidadSeleccionada || isAgrupada) && currentImg && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setModalConfig({ isOpen: false })}
        >
          {galeria.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevMiniSlide(); }}
                className="hidden md:flex absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/15 text-white/40 hover:text-white/80 w-12 h-12 rounded-full items-center justify-center transition-all z-50 backdrop-blur-sm cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextMiniSlide(); }}
                className="hidden md:flex absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/15 text-white/40 hover:text-white/80 w-12 h-12 rounded-full items-center justify-center transition-all z-50 backdrop-blur-sm cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </>
          )}

          <div 
            className="bg-white rounded-2xl w-[94vw] aspect-[4/5] sm:aspect-square md:h-auto md:w-full md:max-w-xl md:aspect-square flex flex-col relative shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-white border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-slate-900">
                  {isCocheras ? 'Planta General — Nivel Cocheras' : isBauleras ? 'Planta General — Nivel Bauleras' : `${currentImg.title} — Unidad ${unidadSeleccionada?.unidad.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}`}
                </h3>
                
                {!isAgrupada && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                    <p className="text-[10px] md:text-xs text-slate-500">
                      {unidadSeleccionada.amb.replace(/ambientes?/gi, 'amb.')} — Superficie: {unidadSeleccionada.sup}
                    </p>
                    {unidadSeleccionada.isPrivada && (
                      <span className="bg-[#13969C] border border-[#13969C] text-[#FFFFFF] px-1.5 py-[1px] rounded text-[8px] uppercase tracking-tight font-bold">
                        Entrada Privada
                      </span>
                    )}
                    {unidadSeleccionada.capacidad && (
                      <span className={`px-1.5 py-[1px] rounded text-[8px] uppercase tracking-tight font-bold flex items-center gap-0.5 border ${getCapacidadBadgeStyle(formatCapacidad(unidadSeleccionada.capacidad))}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 opacity-70 shrink-0"><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" /><path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
                        {formatCapacidad(unidadSeleccionada.capacidad)}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setModalConfig({ isOpen: false })}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors cursor-pointer shrink-0 ml-2"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-slate-50 flex items-center justify-center p-4 touch-auto relative group">
              {galeria.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevMiniSlide(); }}
                    className="md:hidden flex absolute left-1 top-1/2 -translate-y-1/2 bg-black/5 hover:bg-black/10 text-black/20 hover:text-black/50 w-10 h-10 rounded-full items-center justify-center shadow-none cursor-pointer transition-all z-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextMiniSlide(); }}
                    className="md:hidden flex absolute right-1 top-1/2 -translate-y-1/2 bg-black/5 hover:bg-black/10 text-black/20 hover:text-black/50 w-10 h-10 rounded-full items-center justify-center shadow-none cursor-pointer transition-all z-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </>
              )}

              <img 
                src={currentImg.src} 
                alt={isCocheras ? 'Plano General de Cocheras' : isBauleras ? 'Planta General de Bauleras' : `${currentImg.title} de la unidad ${unidadSeleccionada?.unidad}`}
                className="max-w-full max-h-full object-contain select-none md:rounded-lg shadow-xs"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectorUnidades;