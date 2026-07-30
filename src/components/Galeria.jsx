import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { galeriaData } from '../data/buildingData';

const Galeria = () => {
  const [globalIndex, setGlobalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const thumbnailContainerRef = useRef(null);

  const { albumes, globalImages } = useMemo(() => {
    const filtrarPorKeyword = (cat) => galeriaData.filter(img => {
      const tagExplicito = (img.categoria || img.tipo || '').toLowerCase();
      if (tagExplicito === cat) return true;
      
      const titulo = (img.titulo || '').toLowerCase();
      if (cat === 'exteriores' && (titulo.includes('ext') || titulo.includes('fachada') || titulo.includes('entorno') || titulo.includes('frente'))) return true;
      if (cat === 'interiores' && (titulo.includes('int') || titulo.includes('depto') || titulo.includes('cocina') || titulo.includes('living') || titulo.includes('dormitorio'))) return true;
      if (cat === 'amenities' && (titulo.includes('ame') || titulo.includes('sum') || titulo.includes('terraza') || titulo.includes('parrilla') || titulo.includes('piscina'))) return true;
      return false;
    });

    let ext = filtrarPorKeyword('exteriores').map(img => ({ ...img, categoryName: 'Exteriores', categoryId: 'exteriores' }));
    let int = filtrarPorKeyword('interiores').map(img => ({ ...img, categoryName: 'Interiores', categoryId: 'interiores' }));
    let ame = filtrarPorKeyword('amenities').map(img => ({ ...img, categoryName: 'Amenities', categoryId: 'amenities' }));

    if (ext.length === 0 && int.length === 0 && ame.length === 0) {
      const unTercio = Math.ceil(galeriaData.length / 3);
      ext = galeriaData.slice(0, unTercio).map(img => ({ ...img, categoryName: 'Exteriores', categoryId: 'exteriores' }));
      int = galeriaData.slice(unTercio, unTercio * 2).map(img => ({ ...img, categoryName: 'Interiores', categoryId: 'interiores' }));
      ame = galeriaData.slice(unTercio * 2).map(img => ({ ...img, categoryName: 'Amenities', categoryId: 'amenities' }));
    }

    return {
      albumes: { exteriores: ext, interiores: int, amenities: ame },
      globalImages: [...ext, ...int, ...ame]
    };
  }, []);

  const currentImage = globalImages[globalIndex];

  const nextSlide = useCallback(() => {
    if (globalImages.length <= 1) return;
    setGlobalIndex((prev) => (prev === globalImages.length - 1 ? 0 : prev + 1));
  }, [globalImages.length]);

  const prevSlide = useCallback(() => {
    if (globalImages.length <= 1) return;
    setGlobalIndex((prev) => (prev === 0 ? globalImages.length - 1 : prev - 1));
  }, [globalImages.length]);

  const abrirAlbum = useCallback((categoriaId) => {
    const index = globalImages.findIndex(img => img.categoryId === categoriaId);
    setGlobalIndex(index !== -1 ? index : 0);
    setIsModalOpen(true);
  }, [globalImages]);

  const cerrarAlbum = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') cerrarAlbum();
      if (e.key === 'ArrowRight' && isModalOpen) nextSlide();
      if (e.key === 'ArrowLeft' && isModalOpen) prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, nextSlide, prevSlide, cerrarAlbum]);

  useEffect(() => {
    if (thumbnailContainerRef.current && isModalOpen) {
      const activeThumb = thumbnailContainerRef.current.children[globalIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [globalIndex, isModalOpen]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeRequired = 50;
    if (swipeDistance > minSwipeRequired) nextSlide();
    else if (swipeDistance < -minSwipeRequired) prevSlide();
  }, [nextSlide, prevSlide]);

  const scrollThumbnails = useCallback((direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 250; 
      thumbnailContainerRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const tarjetasAcceso = useMemo(() => [
    { 
      id: 'exteriores', 
      titulo: 'Exteriores', 
      subtitulo: 'Fachada y Entorno', 
      img: albumes.exteriores[0]?.thumbUrl || albumes.exteriores[0]?.imgUrl || '/placeholder-ext.jpg' 
    },
    { 
      id: 'interiores', 
      titulo: 'Interiores', 
      subtitulo: 'Diseño y Confort', 
      img: albumes.interiores[0]?.thumbUrl || albumes.interiores[0]?.imgUrl || '/placeholder-int.jpg' 
    },
    { 
      id: 'amenities', 
      titulo: 'Amenities', 
      subtitulo: 'Espacios Comunes', 
      img: albumes.amenities[0]?.thumbUrl || albumes.amenities[0]?.imgUrl || '/placeholder-ame.jpg' 
    },
  ], [albumes]);

  return (
    <section className="w-full select-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="mb-8 text-center md:text-left">
        <span className="text-[#94a8b0] font-bold tracking-widest uppercase text-sm">
          Galería de fotos
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-1 uppercase tracking-tighter">
          Explorá el proyecto
        </h2>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 md:grid md:grid-cols-3 md:gap-6 md:pb-0 w-full">
        {tarjetasAcceso.map((tarjeta) => (
          <div
            key={tarjeta.id}
            onClick={() => abrirAlbum(tarjeta.id)}
            className="relative h-60 md:h-64 rounded-2xl overflow-hidden shadow-lg group cursor-pointer bg-slate-900 w-[85%] shrink-0 snap-start md:w-full"
          >
            <img
              src={tarjeta.img}
              alt={tarjeta.titulo}
              loading="lazy"         
              decoding="async"
              width="400"
              height="300"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-95 bg-slate-800"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {tarjeta.titulo}
                </h3>
                <p className="text-slate-300 text-xs font-light mt-0.5">
                  {tarjeta.subtitulo}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg md:opacity-0 opacity-100 md:-translate-x-2 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                +
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && globalImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-slate-950 z-[999] flex flex-col justify-between p-2 md:p-4 h-[100dvh] w-screen overflow-hidden transition-opacity duration-300"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header del Modal */}
          <div className="flex-none flex justify-between items-center w-full relative z-[1000] px-2 pt-2">
            <div className="text-left text-white select-none pointer-events-none px-2 md:px-4">
              <span className="text-xs text-[#94a8b0] uppercase tracking-widest font-bold drop-shadow-md">
                Álbum {currentImage.categoryName} ({globalIndex + 1} / {globalImages.length})
              </span>
              <h4 className="text-lg md:text-2xl font-bold text-white mt-1 drop-shadow-md">{currentImage.titulo}</h4>
            </div>
            
            <button 
              className="text-white text-3xl font-light hover:text-[#94a8b0] transition-colors p-2 bg-transparent rounded-full cursor-pointer ml-auto drop-shadow-xl hover:scale-110"
              onClick={cerrarAlbum}
            >
              ✕
            </button>
          </div>
          
          {/* Contenedor central principal */}
          <div className="flex items-center justify-center flex-1 min-h-0 w-full my-2 z-[1000]">
            
            <div className="relative h-full max-w-full flex items-center justify-center">
              
              {globalImages.length > 1 && (
                <>
                  <button
                    className="absolute left-1 md:left-2 z-20 text-black drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] flex items-center justify-center rounded-full cursor-pointer bg-transparent active:scale-90 transition-transform p-2 md:p-4 hover:scale-110"
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    aria-label="Imagen anterior"
                  >
                    <span className="text-5xl md:text-7xl font-light pb-1 select-none">‹</span>
                  </button>

                  <button
                    className="absolute right-1 md:right-2 z-20 text-black drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] flex items-center justify-center rounded-full cursor-pointer bg-transparent active:scale-90 transition-transform p-2 md:p-4 hover:scale-110"
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    aria-label="Siguiente imagen"
                  >
                    <span className="text-5xl md:text-7xl font-light pb-1 select-none">›</span>
                  </button>
                </>
              )}
              
              <img 
                src={currentImage.imgUrl} 
                alt={currentImage.titulo} 
                decoding="async"
                fetchpriority="high"
                className="max-w-full h-full object-contain rounded-none shadow-2xl select-none animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              />
              
              {currentImage.descripcion && (
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-300 font-medium max-w-[80%] text-center px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/50 rounded-full py-1.5 backdrop-blur-sm pointer-events-none">
                  {currentImage.descripcion}
                </p>
              )}
            </div>
            
          </div>

          {/* Carrusel Inferior */}
          <div 
            className="flex-none w-full bg-slate-900/50 border border-slate-800/50 p-2 md:p-3 rounded-xl flex items-center gap-2 z-[1000] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors flex-shrink-0 cursor-pointer"
              onClick={() => scrollThumbnails(-1)}
              aria-label="Scroll thumbnails left"
            >
              ‹
            </button>

            <div 
              ref={thumbnailContainerRef}
              className="flex gap-2 md:gap-3 overflow-x-auto snap-x hide-scrollbar items-center px-1 py-1 w-full scroll-smooth"
            >
              {globalImages.map((img, idx) => (
                <div 
                  key={`thumb-${idx}`}
                  onClick={() => setGlobalIndex(idx)}
                  className={`relative shrink-0 cursor-pointer transition-all duration-300 rounded-lg overflow-hidden snap-center
                    ${globalIndex === idx ? 'w-16 h-16 md:w-20 md:h-20 border-2 border-white scale-105 shadow-lg shadow-white/20' : 'w-12 h-12 md:w-16 md:h-16 opacity-40 hover:opacity-100'}
                  `}
                >
                  <img 
                    src={img.thumbUrl || img.imgUrl} 
                    alt={`Preview ${idx}`} 
                    loading="lazy"       
                    decoding="async"
                    width="80" 
                    height="80"
                    className="w-full h-full object-cover bg-slate-900"
                  />
                  {idx > 0 && img.categoryId !== globalImages[idx - 1].categoryId && (
                    <div className="absolute top-0 left-0 w-full bg-black/60 text-[8px] text-white text-center font-bold uppercase py-0.5">
                      {img.categoryName}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors flex-shrink-0 cursor-pointer"
              onClick={() => scrollThumbnails(1)}
              aria-label="Scroll thumbnails right"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;