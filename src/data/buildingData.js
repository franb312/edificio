export const galeriaData = [
  {
    id: 'ext-1',
    imgUrl: '/ext1_result2.webp',
    thumbUrl:'/ext1thumb.webp',
    titulo: 'Fachada',
   
    categoria: 'Exterior'
  },
  {
    id: 'ext-2',
    imgUrl: '/ext2result2.webp',
    thumbUrl:'/ext2thumb.webp',
    titulo: 'Fachada',
    
    categoria: 'Exterior'
  },
  {
    id: 'ext-3',
    imgUrl: '/ext3tresult2.webp',
    thumbUrl:'/ext3thumb.webp',
    titulo: 'Fachada',
    
    categoria: 'Exterior',
  },
  {
    id: 'ext-4',
    imgUrl: '/ext4result2.webp',
    thumbUrl:'/ext4thum.webp',
    titulo: 'Fachada',
   
    categoria: 'Exterior'
  },
  {
    id: 'ext-5',
    imgUrl: '/ext5result2.webp',
    thumbUrl:'/ext5thumb.webp',
    titulo: 'Fachada',
    
    categoria: 'Exterior'
  },
  {
    id: 'int-1',
    imgUrl: '/int1_result2.webp',
    thumbUrl:'/int1thumb.webp',
    titulo: 'Interior',
    
    categoria: 'Interior'
  },
  {
    id: 'int-2',
    imgUrl: '/int2_result2.webp',
    thumbUrl:'/int2thumb.webp',
    titulo: 'Interior',
    
    categoria: 'Interior'
  },
  {
    id: 'int-3',
    imgUrl: '/int3_result2.webp',
    thumbUrl:'/int3thumb.webp',
    titulo: 'Interior',
    
    categoria: 'Interior'
  },
  {
    id: 'int-4',
    imgUrl: '/int4_result2.webp',
    thumbUrl:'/int4humb.webp',
    titulo: 'Interior',
   
    categoria: 'Interior'
  },
  {
    id: 'int-5',
    imgUrl: '/int5_result2.webp',
    thumbUrl:'/int5thumb.webp',
    titulo: 'Interior',
    
    categoria: 'Interior'
  },
  {
    id: 'int-6',
    imgUrl: '/int6_result2.webp',
    thumbUrl:'/int6thumb.webp',
    titulo: 'Interior',
    
    categoria: 'Interior'
  },
  {
    id: 'Amen-1',
    imgUrl: '/amen1_result2.webp',
    thumbUrl:'/amen1thumb.webp',
    titulo: 'Amenities',
    
    categoria: 'Interior'
  },
  {
    id: 'Amen-2',
    imgUrl: '/amen2_result2.webp',
    thumbUrl:'/amen2thumb.webp',
    titulo: 'Amenities',
    
    categoria: 'Interior'
  },
  {
    id: 'Amen-3',
    imgUrl: '/amen3_result2.webp',
    thumbUrl:'/amen3thumb.webp',
    titulo: 'Amenities',
    
    categoria: 'Interior'
  },
  {
    id: 'Amen-4',
    imgUrl: '/amen4_result2.webp',
    thumbUrl:'/amen4thumb.webp',
    titulo: 'Amenities',
    
    categoria: 'Interior'
  },
  {
    id: 'Amen-5',
    imgUrl: '/amen5_result2.webp',
    thumbUrl:'/amen5thumb.webp',
    titulo: 'Amenities',
    
    categoria: 'Interior'
  }
];

// Datos de tipologias para selector de unidades
export const categoriasData = [
  { id: 1, nombre: '1 ambiente', disponible: '6 unidades' },
  { id: 2, nombre: '2 ambientes', disponible: '10 unidades' },
  { id: 3, nombre: '3 ambientes', disponible: '8 unidades' },
  { id: 4, nombre: '4 ambientes', disponible: '4 unidades' },
  { id: 5, nombre: 'Cocheras', disponible: '20 unidades' },
  { id: 6, nombre: 'Bauleras', disponible: '20 unidades' }
];

export const unidadesData = [
 // PISO 9 
  { id: '9A', pisoId: '9', unidad: '9A', estado: 'Disponible', amb: '4 AMBIENTES', sup: '118.80 m²', svgData: { puntos: "23,277 109,212  162,259 307,151  263,111  352,45 535,211 472,256 459,245 442,256 407,225 293,310  311,327  293,341 301,349 187,433 ", centroTexto: { x: 294, y: 225 } }, imagenDetalle: '/P 7-8-9 . 4 AMB Acomp.webp' , imagenGif:'P.8.9.10.2comp.webp'},
  { id: '9B', pisoId: '9', unidad: '9B', estado: 'Disponible', amb: '4 AMBIENTES', sup: '132.35 m²', svgData: { puntos: "187,432 302,347 329,374 424,302 405,284 458,245 471,256 537,207 699,357 601,428 541,366 392,475 458,536 360,602 ", centroTexto: { x: 451, y: 370 } } , imagenDetalle: '/P 7-8-9 . 4 AMB Bcomp.webp', imagenGif:'P.8.9.10.1comp.webp'},

 // PISO 8 
  { id: '8A', pisoId: '8', unidad: '8A', estado: 'Disponible', amb: '4 AMBIENTES', sup: '118.80 m²', svgData: { puntos: "23,277 109,212  162,259 307,151  263,111  352,45 535,211 472,256 459,245 442,256 407,225 293,310  311,327  293,341 301,349 187,433 ", centroTexto: { x: 294, y: 225 } }, imagenDetalle: '/P 7-8-9 . 4 AMB Acomp.webp', imagenGif:'P.8.9.10.2comp.webp' },
  { id: '8B', pisoId: '8', unidad: '8B', estado: 'Disponible', amb: '4 AMBIENTES', sup: '132.35 m²', svgData: { puntos: "187,432 302,347 329,374 424,302 405,284 458,245 471,256 537,207 699,357 601,428 541,366 392,475 458,536 360,602 ", centroTexto: { x: 451, y: 370 } } , imagenDetalle: '/P 7-8-9 . 4 AMB Bcomp.webp', imagenGif:'P.8.9.10.1comp.webp'},
 
  // PISO 7 
  { id: '7A', pisoId: '7', unidad: '7A', estado: 'Disponible', amb: '4 AMBIENTES', sup: '118.80 m²', svgData: { puntos: "23,277 109,212  162,259 307,151  263,111  352,45 535,211 472,256 459,245 442,256 407,225 293,310  311,327  293,341 301,349 187,433 ", centroTexto: { x: 294, y: 225 } }, imagenDetalle: '/P 7-8-9 . 4 AMB Acomp.webp' , imagenGif:'P.8.9.10.2comp.webp'},
  { id: '7B', pisoId: '7', unidad: '7B', estado: 'Disponible', amb: '4 AMBIENTES', sup: '132.35 m²', svgData: { puntos: "187,432 302,347 329,374 424,302 405,284 458,245 471,256 537,207 699,357 601,428 541,366 392,475 458,536 360,602 ", centroTexto: { x: 451, y: 370 } } , imagenDetalle: '/P 7-8-9 . 4 AMB Bcomp.webp', imagenGif:'P.8.9.10.1comp.webp'},
 
 // PISO 6
  { id: '6A', pisoId: '6', unidad: '6A', estado: 'Disponible', amb: '3 AMBIENTES', sup: '88.30 m²', svgData: { puntos: "21,275 108,211 162,259 319,142 375,194 364,201 399,232 292,310 314,330 296,342 301,348 186,433 ", centroTexto: { x: 239, y: 272 } }, imagenDetalle:'/P 5-6 . 3 AMB Acomp.webp' , imagenGif:'P.6.7.3comp.webp'},
  { id: '6B', pisoId: '6', unidad: '6B', estado: 'Disponible',    amb: '3 AMBIENTES', sup: '92.54 m²', svgData: { puntos: "188,430 301,347 328,373 445,286 478,317 494,305 551,359 396,475 459,539 365,606 ", centroTexto: { x: 381, y: 414 } } , imagenDetalle:'/P 5-6 . 3 AMB Bcomp.webp', imagenGif:'P.6.7.1comp.webp'},
  { id: '6C', pisoId: '6', unidad: '6C', estado: 'Disponible', amb: '3 AMBIENTES', sup: '78.13 m²', svgData: { puntos: "265,92 348,31 694,357 605,425 550,357 493,304 477,315 443,287 432,295 418,275 443,256 443,257 408,224 397,231 365,201 376,193", centroTexto: { x: 483, y: 214 } } , imagenDetalle:'/P 5-6 . 3 AMB Ccomp.webp', imagenGif:'P.6.7.2comp.webp'},
  
  // PISO 5
  { id: '5A', pisoId: '5', unidad: '5A', estado: 'Disponible', amb: '3 AMBIENTES', sup: '88.30 m²', svgData: { puntos: "21,275 108,211 162,259 319,142 375,194 364,201 399,232 292,310 314,330 296,342 301,348 186,433 ", centroTexto: { x: 239, y: 272 } }, imagenDetalle:'/P 5-6 . 3 AMB Acomp.webp' , imagenGif:'P.6.7.3comp.webp'},
  { id: '5B', pisoId: '5', unidad: '5B', estado: 'Disponible',    amb: '3 AMBIENTES', sup: '92.54 m²', svgData: { puntos: "188,430 301,347 328,373 445,286 478,317 494,305 551,359 396,475 459,539 365,606 ", centroTexto: { x: 381, y: 414 } } , imagenDetalle:'/P 5-6 . 3 AMB Bcomp.webp', imagenGif:'P.6.7.1comp.webp'},
  { id: '5C', pisoId: '5', unidad: '5C', estado: 'Disponible', amb: '3 AMBIENTES', sup: '78.13 m²', svgData: { puntos: "265,92 348,31 694,357 605,425 550,357 493,304 477,315 443,287 432,295 418,275 443,256 443,257 408,224 397,231 365,201 376,193", centroTexto: { x: 483, y: 214 } } , imagenDetalle:'/P 5-6 . 3 AMB Ccomp.webp', imagenGif:'P.6.7.2comp.webp'},
  
  // PISO 4
  { id: '4A', pisoId: '4', unidad: '4A', estado: 'Disponible', amb: '2 AMBIENTES', sup: '67.72 m²', svgData: { puntos: "22,274 110,207 166,258 245,198 334,281 296,308 311,322 285,339 298,351 187,430 ", centroTexto: { x: 216, y: 293 } } , imagenDetalle:'/P 3-4 . 2 AMB Acomp.webp', imagenGif:'P.4.5.1comp.webp'},
  { id: '4B', pisoId: '4', unidad: '4B', estado: 'Disponible', amb: '2 AMBIENTES', sup: '71.35 m²', svgData: { puntos: "189,430 304,345 332,372 385,330 480,419 400,479 459,534 362,606 ", centroTexto: { x: 352, y: 442 } }, imagenDetalle:'/P 3-4 . 2 AMB Bcomp.webp' , imagenGif:'P.4.5.2comp.webp'},
  { id: '4C', pisoId: '4', unidad: '4C', estado: 'Disponible', amb: '2 AMBIENTES', sup: '64.62 m²', svgData: { puntos: "386,330 480,258 455,234 516,190 696,361 607,427 544,367 474,417 ", centroTexto: { x: 515, y: 306 } }, imagenDetalle:'/P 3-4 . 2 AMB Ccomp.webp' , imagenGif:'P.4.5.3comp.webp'},
  { id: '4D', pisoId: '4', unidad: '4D', estado: 'Disponible', amb: '2 AMBIENTES', sup: '66.52 m²', svgData: { puntos: "332,280 245,198 319,143 267,95 349,35 513,190 453,234 466,248 448,258 411,222", centroTexto: { x: 371, y: 174 } } , imagenDetalle:'/P 3-4 . 2 AMB Dcomp.webp', imagenGif:'P.4.5.4comp.webp'},

  // PISO 3
  { id: '3A', pisoId: '3', unidad: '3A', estado: 'Disponible', amb: '2 AMBIENTES', sup: '67.72 m²', svgData: { puntos: "22,274 110,207 166,258 245,198 334,281 296,308 311,322 285,339 298,351 187,430 ", centroTexto: { x: 216, y: 293 } } , imagenDetalle:'/P 3-4 . 2 AMB Acomp.webp', imagenGif:'P.4.5.1comp.webp'},
  { id: '3B', pisoId: '3', unidad: '3B', estado: 'Disponible', amb: '2 AMBIENTES', sup: '71.35 m²', svgData: { puntos: "189,430 304,345 332,372 385,330 480,419 400,479 459,534 362,606 ", centroTexto: { x: 352, y: 442 } } , imagenDetalle:'/P 3-4 . 2 AMB Bcomp.webp', imagenGif:'P.4.5.2comp.webp'},
  { id: '3C', pisoId: '3', unidad: '3C', estado: 'Disponible', amb: '2 AMBIENTES', sup: '64.62 m²', svgData: { puntos: "386,330 480,258 455,234 516,190 696,361 607,427 544,367 474,417 ", centroTexto: { x: 515, y: 306 } }, imagenDetalle:'/P 3-4 . 2 AMB Ccomp.webp' , imagenGif:'P.4.5.3comp.webp'},
  { id: '3D', pisoId: '3', unidad: '3D', estado: 'Disponible', amb: '2 AMBIENTES', sup: '66.52 m²', svgData: { puntos: "332,280 245,198 319,143 267,95 349,35 513,190 453,234 466,248 448,258 411,222", centroTexto: { x: 371, y: 174 } } , imagenDetalle:'/P 3-4 . 2 AMB Dcomp.webp', imagenGif:'P.4.5.4comp.webp'},

  // PISO 2
 { id: '2A', pisoId: '2', unidad: '2A', estado: 'Disponible',    amb: '3 AMBIENTES', sup: '93.85 m²', svgData: { puntos: "24,278 109,213 163,260 319,144 406,226 291,310 311,328 291,342 298,348 188,432 ", centroTexto: { x: 259, y: 260 } } , imagenDetalle:'/P 1-2 . 3 AMBcomp.webp', imagenGif:'P.2.3.0comp.webp'}, 
  { id: '2B', pisoId: '2', unidad: '2B', estado: 'Disponible', amb: '2 AMBIENTES', sup: '59.60 m²', svgData: { puntos: "189,432 300,348 327,375 354,352 396,392 422,372 473,422 393,480 456,534 359,606", centroTexto: { x: 347, y: 439 } }, imagenDetalle:'/P 1-2 . 2 AMBcomp.webp' , imagenGif:'P.2.3.1comp.webp'},
  { id: '2C', pisoId: '2', unidad: '2C', estado: 'Disponible', amb: '1 AMBIENTE',  sup: '33.00 m²', svgData: { puntos: "353,352 458,275 600,425 550,463 490,400 466,417 421,373 395,392 ", centroTexto: { x: 474, y: 352 } } , imagenDetalle:'/P 1-2 . 1 AMB Acomp.webp', imagenGif:'P.2.3.2comp.webp'},
  { id: '2D', pisoId: '2', unidad: '2D', estado: 'Disponible', amb: '1 AMBIENTE',  sup: '32.35 m²', svgData: { puntos: "458,274 474,261 449,238 516,189 694,357 601,424 558,282 573,269 713,401 625,464 610,448 607,441", centroTexto: { x: 558, y: 290 } } , imagenDetalle:'/P 1-2 . 1 AMB Bcomp.webp', imagenGif:'P.2.3.3comp.webp'},
  { id: '2E', pisoId: '2', unidad: '2E', estado: 'Disponible', amb: '1 AMBIENTE',  sup: '34.60 m²', svgData: { puntos: "456,260 442,271 442,258 265,99 391,35 512,192 442,245 ", centroTexto: { x: 419, y: 156 } } , imagenDetalle:'/P 1-2 . 1 AMB Ccomp.webp', imagenGif:'P.2.3.4comp.webp'},
   
  // PISO 1 
  { id: '1A', pisoId: '1', unidad: '1A', estado: 'Disponible',    amb: '3 AMBIENTES', sup: '93.85 m²', svgData: { puntos: "24,278 109,213 163,260 319,144 406,226 291,310 311,328 291,342 298,348 188,432 ", centroTexto: { x: 259, y: 260 } } , imagenDetalle:'/P 1-2 . 3 AMBcomp.webp', imagenGif:'P.2.3.0comp.webp'},
  { id: '1B', pisoId: '1', unidad: '1B', estado: 'Disponible', amb: '2 AMBIENTES', sup: '59.60 m²', svgData: { puntos: "189,432 300,348 327,375 354,352 396,392 422,372 473,422 393,480 456,534 359,606", centroTexto: { x: 347, y: 439 } }, imagenDetalle:'/P 1-2 . 2 AMBcomp.webp' , imagenGif:'P.2.3.1comp.webp'},
  { id: '1C', pisoId: '1', unidad: '1C', estado: 'Disponible', amb: '1 AMBIENTE',  sup: '33.00 m²', svgData: { puntos: "353,352 458,275 600,425 550,463 490,400 466,417 421,373 395,392 ", centroTexto: { x: 474, y: 352 } },imagenDetalle: '/P 1-2 . 1 AMB Acomp.webp', imagenGif:'P.2.3.2comp.webp' },
  { id: '1D', pisoId: '1', unidad: '1D', estado: 'Disponible', amb: '1 AMBIENTE',  sup: '32.35 m²', svgData: { puntos: "458,274 474,261 449,238 516,189 694,357 601,424 558,282 573,269 713,401 625,464 610,448 607,441", centroTexto: { x: 558, y: 290 } } , imagenDetalle:'/P 1-2 . 1 AMB Bcomp.webp', imagenGif:'P.2.3.3comp.webp'},
  { id: '1E', pisoId: '1', unidad: '1E', estado: 'Disponible', amb: '1 AMBIENTE',  sup: '34.60 m²', svgData: { puntos: "456,260 442,271 442,258 265,99 391,35 512,192 442,245 ", centroTexto: { x: 419, y: 156 } } , imagenDetalle:'/P 1-2 . 1 AMB Ccomp.webp', imagenGif:'P.2.3.4comp.webp'},
  
  // Entrepiso (AMENITIES) 
  { id: '1Cowork',  pisoId: 'EP', unidad: 'Cowork',  estado: 'Amenities', amb: 'Área Común', sup: '93.85 m²', svgData: {
    puntos: "50,50 350,50 350,700 50,700",
     centroTexto: { x: 200, y: 375 } } },
  { id: '1Laundry', pisoId: 'EP', unidad: 'Laundry', estado: 'Amenities', amb: 'Servicio',   sup: '59.60 m²', svgData: { 
    puntos: "400,50 650,50 650,700 400,700", 
    centroTexto: { x: 525, y: 375 } } },
  { id: '1SUM',     pisoId: 'EP', unidad: 'SUM',     estado: 'Amenities',    amb: 'Área Común', sup: '30.00 m²', svgData: { puntos: "97,432 222,432 222,298 432,298 432,676 426,676 426,720 97,720", centroTexto: { x: 825, y: 375 } } },

 // --- COCHERAS PB ---
  { id: 'C-PB-1', pisoId: 'PB', unidad: '01', estado: 'Disponible', amb: 'Cocheras', sup: '35.00 m²', isPrivada: true, capacidad: '2 Autos', svgData: { puntos: "10,10 50,10 50,50 10,50", centroTexto: { x: 30, y: 30 } } },
  { id: 'C-PB-2', pisoId: 'PB', unidad: '02', estado: 'Disponible', amb: 'Cocheras', sup: '28.00 m²', isPrivada: true, capacidad: '2 Autos', svgData: { puntos: "60,10 100,10 100,50 60,50", centroTexto: { x: 80, y: 30 } }  },
  { id: 'C-PB-3', pisoId: 'PB', unidad: '03', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: true, capacidad: '2 Auto', svgData: { puntos: "110,10 150,10 150,50 110,50", centroTexto: { x: 130, y: 30 } }  },
  { id: 'C-PB-4', pisoId: 'PB', unidad: '04', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: true, capacidad: '2 Auto', svgData: { puntos: "160,10 200,10 200,50 160,50", centroTexto: { x: 180, y: 30 } } },
  { id: 'C-PB-5', pisoId: 'PB', unidad: '05', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "210,10 250,10 250,50 210,50", centroTexto: { x: 230, y: 30 } } },
  { id: 'C-PB-6', pisoId: 'PB', unidad: '06', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "10,60 50,60 50,100 10,100", centroTexto: { x: 30, y: 80 } } },
  { id: 'C-PB-7', pisoId: 'PB', unidad: '07', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "60,60 100,60 100,100 60,100", centroTexto: { x: 80, y: 80 } } },
  { id: 'C-PB-8', pisoId: 'PB', unidad: '08', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "110,60 150,60 150,100 110,100", centroTexto: { x: 130, y: 80 } } },
  { id: 'C-PB-9', pisoId: 'PB', unidad: '09', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "160,60 200,60 200,100 160,100", centroTexto: { x: 180, y: 80 } } },
  { id: 'C-PB-10', pisoId: 'PB', unidad: '10', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "210,60 250,60 250,100 210,100", centroTexto: { x: 230, y: 80 } } },
  { id: 'C-PB-11', pisoId: 'PB', unidad: '11', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '2 Auto', svgData: { puntos: "10,110 50,110 50,150 10,150", centroTexto: { x: 30, y: 130 } } },
  { id: 'C-PB-12', pisoId: 'PB', unidad: '12', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '2 Auto', svgData: { puntos: "60,110 100,110 100,150 60,150", centroTexto: { x: 80, y: 130 } } },
 
  // --- COCHERAS SUBSUELO ---
  { id: 'C-SS-13', pisoId: 'Subsuelo', unidad: '13', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Pick up', svgData: { puntos: "110,10 150,10 150,50 110,50", centroTexto: { x: 130, y: 30 } } },
  { id: 'C-SS-14', pisoId: 'Subsuelo', unidad: '14', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 pick up', svgData: { puntos: "160,10 200,10 200,50 160,50", centroTexto: { x: 180, y: 30 } } },
  { id: 'C-SS-15', pisoId: 'Subsuelo', unidad: '15', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "210,10 250,10 250,50 210,50", centroTexto: { x: 230, y: 30 } } },
  { id: 'C-SS-16', pisoId: 'Subsuelo', unidad: '16', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "10,60 50,60 50,100 10,100", centroTexto: { x: 30, y: 80 } } },
  { id: 'C-SS-17', pisoId: 'Subsuelo', unidad: '17', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "60,60 100,60 100,100 60,100", centroTexto: { x: 80, y: 80 } } },
  { id: 'C-SS-18', pisoId: 'Subsuelo', unidad: '18', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "110,60 150,60 150,100 110,100", centroTexto: { x: 130, y: 80 } } },
  { id: 'C-SS-19', pisoId: 'Subsuelo', unidad: '19', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "160,60 200,60 200,100 160,100", centroTexto: { x: 180, y: 80 } } },
  { id: 'C-SS-20', pisoId: 'Subsuelo', unidad: '20', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "210,60 250,60 250,100 210,100", centroTexto: { x: 230, y: 80 } } },
  { id: 'C-SS-21', pisoId: 'Subsuelo', unidad: '21', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "10,110 50,110 50,150 10,150", centroTexto: { x: 30, y: 130 } } },
  { id: 'C-SS-22', pisoId: 'Subsuelo', unidad: '22', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "60,110 100,110 100,150 60,150", centroTexto: { x: 80, y: 130 } } },
  { id: 'C-SS-23', pisoId: 'Subsuelo', unidad: '23', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "110,110 150,110 150,150 110,150", centroTexto: { x: 130, y: 130 } } },
  { id: 'C-SS-24', pisoId: 'Subsuelo', unidad: '24', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "160,110 200,110 200,150 160,150", centroTexto: { x: 180, y: 130 } } },
  { id: 'C-SS-25', pisoId: 'Subsuelo', unidad: '25', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "210,110 250,110 250,150 210,150", centroTexto: { x: 230, y: 130 } } },
  { id: 'C-SS-26', pisoId: 'Subsuelo', unidad: '26', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "10,160 50,160 50,200 10,200", centroTexto: { x: 30, y: 180 } } },
  { id: 'C-SS-27', pisoId: 'Subsuelo', unidad: '27', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "60,160 100,160 100,200 60,200", centroTexto: { x: 80, y: 180 } } },
  { id: 'C-SS-28', pisoId: 'Subsuelo', unidad: '28', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "110,160 150,160 150,200 110,200", centroTexto: { x: 130, y: 180 } } },
  { id: 'C-SS-29', pisoId: 'Subsuelo', unidad: '29', estado: 'Disponible', amb: 'Cocheras', sup: '12.50 m²', isPrivada: false, capacidad: '1 Auto', svgData: { puntos: "160,160 200,160 200,200 160,200", centroTexto: { x: 180, y: 180 } } },


  // --- BAULERAS PLANTA BAJA --- 
  { id: 'B-PB-11', pisoId: 'PB', unidad: 'B11', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-PB-12', pisoId: 'PB', unidad: 'B12', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },


  // --- BAULERAS ENTREPISO ---
  { id: 'B-EP-13', pisoId: 'Entrepiso', unidad: 'B13', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-14', pisoId: 'Entrepiso', unidad: 'B14', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },
  { id: 'B-EP-15', pisoId: 'Entrepiso', unidad: 'B15', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-16', pisoId: 'Entrepiso', unidad: 'B16', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },
  { id: 'B-EP-17', pisoId: 'Entrepiso', unidad: 'B17', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-18', pisoId: 'Entrepiso', unidad: 'B18', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },
  { id: 'B-EP-19', pisoId: 'Entrepiso', unidad: 'B19', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-20', pisoId: 'Entrepiso', unidad: 'B20', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },
  { id: 'B-EP-21', pisoId: 'Entrepiso', unidad: 'B21', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-22', pisoId: 'Entrepiso', unidad: 'B22', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },
  { id: 'B-EP-23', pisoId: 'Entrepiso', unidad: 'B23', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-24', pisoId: 'Entrepiso', unidad: 'B24', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },
  { id: 'B-EP-25', pisoId: 'Entrepiso', unidad: 'B25', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-26', pisoId: 'Entrepiso', unidad: 'B26', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },
  { id: 'B-EP-27', pisoId: 'Entrepiso', unidad: 'B27', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-28', pisoId: 'Entrepiso', unidad: 'B28', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },
  { id: 'B-EP-29', pisoId: 'Entrepiso', unidad: 'B29', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,110 30,110 30,130 10,130", centroTexto: { x: 20, y: 120 } } },
  { id: 'B-EP-30', pisoId: 'Entrepiso', unidad: 'B30', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,110 60,110 60,130 40,130", centroTexto: { x: 50, y: 120 } } },

 
 
 
 // --- BAULERAS SUBSUELO ---
  { id: 'B-SS-1', pisoId: 'Subsuelo', unidad: 'B1', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "70,110 90,110 90,130 70,130", centroTexto: { x: 80, y: 120 } } },
  { id: 'B-SS-2', pisoId: 'Subsuelo', unidad: 'B2', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "100,110 120,110 120,130 100,130", centroTexto: { x: 110, y: 120 } } },
  { id: 'B-SS-3', pisoId: 'Subsuelo', unidad: 'B3', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "130,110 150,110 150,130 130,130", centroTexto: { x: 140, y: 120 } } },
  { id: 'B-SS-4', pisoId: 'Subsuelo', unidad: 'B4', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "10,140 30,140 30,160 10,160", centroTexto: { x: 20, y: 150 } } },
  { id: 'B-SS-5', pisoId: 'Subsuelo', unidad: 'B5', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "40,140 60,140 60,160 40,160", centroTexto: { x: 50, y: 150 } } },
  { id: 'B-SS-6', pisoId: 'Subsuelo', unidad: 'B6', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "70,140 90,140 90,160 70,160", centroTexto: { x: 80, y: 150 } } },
  { id: 'B-SS-7', pisoId: 'Subsuelo', unidad: 'B7', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "100,140 120,140 120,160 100,160", centroTexto: { x: 110, y: 150 } } },
  { id: 'B-SS-8', pisoId: 'Subsuelo', unidad: 'B8', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "130,140 150,140 150,160 130,160", centroTexto: { x: 140, y: 150 } } },
  { id: 'B-SS-9', pisoId: 'Subsuelo', unidad: 'B9', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "100,140 120,140 120,160 100,160", centroTexto: { x: 110, y: 150 } } },
  { id: 'B-SS-10', pisoId: 'Subsuelo', unidad: 'B10', estado: 'Disponible', amb: 'Bauleras', sup: '3.00 m²', svgData: { puntos: "130,140 150,140 150,160 130,160", centroTexto: { x: 140, y: 150 } } },
];
 
export const pisosData = [
  {
    id: 'Terraza',
    nombre: 'Terraza',
    tipo: 'Amenities',
    depts: ['Amenities'],
    descripcion: 'Terraza con solarium y parrillas.',
    imagenes: {
      plano: 'https://placehold.co/800x600/f8fafc/0f172a?text=PLANO+TERRAZA',
      planoIluminado: 'https://placehold.co/800x600/f8fafc/0f172a?text=PLANO+TERRAZA+ILUMINADO',
      axono: null,
      detalle: null
    },
    mapaDesktop: {
      points: '369,47 453,46 459,103 579,103 586,44 669,44 668,18 571,18 561,79 474,79 465,18 369,18',
      labelX: 471,
      labelY: 25,
      dotX: 310
    },
    mapaMobile: {
      points: '35,75 169,75 176,141 373,141 383,72 518,72 518,31 373,31 354,99 199,99 176,31 35,31',
      labelX: 471,
      labelY: 25,
      dotX: 310
    }
  },
  {
    id: '9', 
    nombre: 'Piso 9',
    tipo: 'Residencial',
    depts: ['9A', '9B'],
    descripcion: 'Semipisos de 4 ambientes.',
    imagenes: {
     plano: '/P.7.8.9.vertical.blancocomp.webp',
      planoIluminado: '/P.7.8.9.vertical.colorcomp.webp',
      axono: '/planta 7.8.9_result.webp',
      detalle: '/',
    },
    mapaDesktop: {
      points: '369,47 453,46 458,103 578,103 585,45 669,44 672,89 585,91 578,136 456,137 452,91 368,92',
      labelX: 471,
      labelY: 69,
      dotX: 310
    },
    mapaMobile: {
      points: '35,75 169,75 176,142 371,142 383,72 518,72 520,143 383,146 371,216 175,216 169,147 35,147',
      labelX: 471,
      labelY: 69,
      dotX: 310
    }
  },
  {
    id: '8', 
    nombre: 'Piso 8',
    tipo: 'Residencial',
    depts: ['8A', '8B'],
    descripcion: 'Semipisos de 4 ambientes.',
    imagenes: {
      plano: '/P.7.8.9.vertical.blancocomp.webp',
      planoIluminado: '/P.7.8.9.vertical.colorcomp.webp',
      axono: '/planta 7.8.9_result.webp',
      detalle: null
    },
    mapaDesktop: {
      points: '368,92 452,92 457,137 579,136 586,92 673,90 672,135 585,136 579,177 457,177 452,137 368,137',
      labelX: 450, 
      labelY: 114, 
      dotX: 310
    },
    mapaMobile: {
      points: '35,147 169,147 176,216 371,216 382,146 521,145 522,218 383,220 371,282 175,282 169,222 35,222', 
      labelX: 450, 
      labelY: 114, 
      dotX: 310
    }
  },
  {
    id: '7', 
    nombre: 'Piso 7',
    tipo: 'Residencial',
    depts: ['7A', '7B'],
    descripcion: 'Semipisos de 4 ambientes.',
    imagenes: {
      plano: '/P.7.8.9.vertical.blancocomp.webp',
      planoIluminado: '/P.7.8.9.vertical.colorcomp.webp',
      axono: '/planta 7.8.9_result.webp',
      detalle: null
    },
    mapaDesktop: {
      points: '368,138 452,137 457,176 579,176 586,136 672,136 672,182 585,183 578,216 457,216 452,183 368,183', 
      labelX: 450, 
      labelY: 159,
      dotX: 310
    },
    mapaMobile: {
      points: '34,222 169,222 176,280 372,280 383,220 522,220 522,292 383,294 372,344 176,344 169,294 34,296', 
      labelX: 450, 
      labelY: 159,
      dotX: 310
    }
  }, 
  {
    id: '6', 
    nombre: 'Piso 6',
    tipo: 'Residencial',
    depts: ['6A', '6B', '6C'],
    descripcion: 'Unidades de 3 ambientes.',
    imagenes: {
      plano: '/P.5.6.vertical.blanco2.webp',
      planoIluminado: '/P.5.6.vertical.color2.webp',
      axono: '/planta 5.6_result.webp',
      detalle: null
    },
    mapaDesktop: {
      points: '368,183 452,183 458,216 579,216 585,181 671,181 670,227 586,227 579,257 457,257 452,227 368,229', 
      labelX: 450, 
      labelY: 201,
      dotX: 310
    },
    mapaMobile: {
      points: '34,296 167,296 176,345 372,345 383,294 523,294 521,366 383,366 372,412 176,412 167,366 34,368', 
      labelX: 450, 
      labelY: 201,
      dotX: 310
    }
  }, 
  {
    id: '5', 
    nombre: 'Piso 5',
    tipo: 'Residencial',
    depts: ['5A', '5B', '5C'],
    descripcion: 'Unidades de 3 ambientes.',
    imagenes: {
     plano: '/P.5.6.vertical.blanco2.webp',
      planoIluminado: '/P.5.6.vertical.color2.webp',
      axono: '/planta 5.6_result.webp',
      detalle: null
    },
    mapaDesktop: {
      points: '368,229 452,227 458,257 578,257 586,227 670,227 670,272 585,273 578,296 458,296 452,274 368,274', 
      labelX: 450, 
      labelY: 249,
      dotX: 310
    },
    mapaMobile: {
      points: '34,368 168,368 176,412 372,412 383,366 521,366 521,441 383,441 372,477 176,477 168,441 34,441', 
      labelX: 450, 
      labelY: 249,
      dotX: 310
    }
  }, 
  {
    id: '4', 
    nombre: 'Piso 4',
    tipo: 'Residencial',
    depts: ['4A', '4B', '4C', '4D'],
    descripcion: 'Unidades de 2 ambientes.',
    imagenes: {
      plano: '/P.3.4.vertical.blancocomp.webp',
      planoIluminado: '/P.3.4.vertical.colorcomp.webp',
      axono: '/planta 3.4_result.webp',
      detalle: null
    },
    mapaDesktop: {
      points: '368,274 452,274 458,296 578,296 585,273 670,272 670,319 585,319 578,337 458,337 452,320 368,320', 
      labelX: 450, 
      labelY: 296,
      dotX: 310
    },
    mapaMobile: {
      points: '34,441 168,441 176,477 372,477 383,441 521,441 521,514 383,514 372,541 176,541 168,514 34,514', 
      labelX: 450, 
      labelY: 296,
      dotX: 310
    }
  }, 
  {
    id: '3', 
    nombre: 'Piso 3',
    tipo: 'Residencial',
    depts: ['3A', '3B', '3C', '3D'],
    descripcion: 'Unidades de 2 ambientes.',
    imagenes: {
       plano: '/P.3.4.vertical.blancocomp.webp',
      planoIluminado: '/P.3.4.vertical.colorcomp.webp',
      axono: '/planta 3.4_result.webp',
      detalle: null
    },
    mapaDesktop: {
      points: '368,320 452,320 458,337 578,337 585,319 670,319 669,364 585,364 578,376 458,376 452,365 368,365', 
      labelX: 450, 
      labelY: 342,
      dotX: 310
    },
    mapaMobile: {
      points: '34,514 168,514 176,541 372,541 383,514 521,514 521,587 383,587 372,609 176,609 168,589 34,589', 
      labelX: 450, 
      labelY: 342,
      dotX: 310
    }
  }, 
  {
    id: '2', 
    nombre: 'Piso 2',
    tipo: 'Residencial',
    depts: ['2A', '2B', '2C', '2D', '2E'],
    descripcion: 'Unidades de 3, 2 y 1 ambiente/s.',
    imagenes: {
      plano: '/P.1.2.vertical.blanco-2comp.webp',
      planoIluminado: '/P.1.2.vertical.iluminado-2comp.webp',
      axono: '/planta 1.2_result.webp',
      detalle: null
    },
    mapaDesktop: {
      points: '368,364 452,364 458,376 578,376 585,364 669,364 669,410 546,410 541,418 458,418 452,410 368,410', 
      labelX: 450, 
      labelY: 387,
      dotX: 310
    },
    mapaMobile: {
      points: '34,589 168,589 176,609 372,609 383,587 521,587 520,663 319,663 312,674 176,674 168,654 34,654', 
      labelX: 450, 
      labelY: 387,
      dotX: 310
    }
  }, 
  {
    id: '1', 
    nombre: 'Piso 1',
    tipo: 'Residencial',
    depts: ['1A', '1B', '1C', '1D', '1E'],
    descripcion: 'Unidades de 3, 2 y 1 ambiente/s.',
    imagenes: {
      plano: '/P.1.2.vertical.blanco-2comp.webp',
      planoIluminado: '/P.1.2.vertical.iluminado-2comp.webp',
      axono: '/planta 1.2_result.webp',
      detalle: null
    },
    mapaDesktop: {
      points: '368,410 452,410 458,418 542,418 546,410 669,410 669,455 546,455 542,458 458,458 452,455 368,457', 
      labelX: 450, 
      labelY: 433,
      dotX: 310
    },
    mapaMobile: {
      points: '33,663 169,663 178,680 313,680 319,663 518,663 518,734 319,735 313,745 178,745 169,736 33,736', 
      labelX: 450, 
      labelY: 433,
      dotX: 310
    }
  }, 
  {
    id: 'EP', 
    nombre: 'Entrepiso',
    tipo: 'Amenities',
    depts: ['Cowork', 'Laundry', 'Sum', 'Bauleras'],
    descripcion: 'SUM, Cowork, Laundry y Bauleras',
    imagenes: {
      plano: '',
      planoIluminado: '', // Reemplazar por el archivo correspondiente
      axono: '',
      detalle: ''
    },
    mapaDesktop: {
      points: '368,457 669,455 669,501 368,501', 
      labelX: 471, 
      labelY: 479,
      dotX: 310
    },
    mapaMobile: {
      points: '33,736 169,736 178,745 313,745 319,735 518,735 518,809 319,809 313,813 33,813', 
      labelX: 471, 
      labelY: 479,
      dotX: 310
    }
  }, 
  {
    id: 'PB', 
    nombre: 'Planta Baja',
    tipo: 'Acceso y Cocheras',
    depts: ['Acceso', 'Cocheras'],
    descripcion: 'Acceso, Cocheras',
    imagenes: {
      plano: '/pbplanta-4.png',
      planoIluminado: '/pbplanta-4.png',
      axono: '/pbplanta-4.png',
      detalle: null
    },
    mapaDesktop: {
      points: '407,502 581,501 581,549 407,549 ', 
      labelX: 471, 
      labelY: 523,
      dotX: 310
    },
    mapaMobile: {
      points: '96,813 376,813 376,888 96,888 ', 
      labelX: 471, 
      labelY: 523,
      dotX: 31
    }
  }, 
  {
    id: 'Subsuelo', 
    nombre: 'Subsuelo',
    tipo: 'Cocheras',
    depts: ['Cocheras'],
    descripcion: 'Cocheras',
    imagenes: {
      plano: 'pbplanta-4.png',
      planoIluminado: 'https://placehold.co/800x600/f8fafc/0f172a?text=SUBSUELO+ILUMINADO',
      axono: null,
      detalle: null
    },
    mapaDesktop: {
      points: '581,502 669,502 669,549 581,549', 
      labelX: 471, 
      labelY: 523,
      dotX: 710
    },
    mapaMobile: {
      points: '376,813 518,813 518,888 376,888', 
      labelX: 471, 
      labelY: 523,
      dotX: 710
    }
  }
];


export const imagenGeneralCocheras = '/pbplanta-4.png';

export const imagenGeneralBauleras = '/pbplanta-4.png';