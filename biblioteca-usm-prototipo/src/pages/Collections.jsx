// src/pages/Collections.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import notebookImg from '../assets/notebook1.png';
import kindleImg from '../assets/kindle1.png';
import calculadoraImg from '../assets/calculadora1.png';

const COLLECTION_ITEMS = [
  {
    id: 1,
    title: "Notebook HP 240 G5 para Programa Inclusión USM",
    image: notebookImg, // <-- Fíjate que va sin comillas
  },
  {
    id: 2,
    title: "Kindle Touch [Sólo en Casa Central]",
    image: kindleImg,
  },
  {
    id: 3,
    title: "Calculadora Científica Casio FX-991EX",
    image: calculadoraImg,
  }
];

export default function Collections() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === COLLECTION_ITEMS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? COLLECTION_ITEMS.length - 1 : prevIndex - 1
    );
  };

  const currentItem = COLLECTION_ITEMS[currentIndex];

  return (
    <div className="app-shell min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      {/* Contenido Principal - Visor de Colecciones */}
      <main className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col min-h-[520px]">
          
          <div className="bg-[#24594c] text-white px-5 py-4">
            <h1 className="font-serif font-semibold text-xl">Colecciones</h1>
            <p className="text-sm text-white/80">Recursos físicos disponibles para la comunidad universitaria</p>
          </div>

          {/* Área del Carrusel */}
          <div className="flex-1 flex flex-col relative px-12 py-8" role="region" aria-label="Colecciones disponibles" aria-roledescription="carrusel">
            
            {/* Contenedor de la Imagen Centrada */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <img 
                src={currentItem.image} 
                alt={currentItem.title} 
                className="max-w-full max-h-[350px] object-contain"
              />
            </div>

            <div className="mt-auto text-center" aria-live="polite">
              <p className="text-sm text-slate-500">{currentIndex + 1} de {COLLECTION_ITEMS.length}</p>
              <h2 className="mt-1 text-[#24594c] font-semibold text-base md:text-lg">
                {currentItem.title}
              </h2>
            </div>

            {/* Botón Anterior */}
            <button 
              onClick={prevItem}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 hover:text-black cursor-pointer transition-transform active:scale-95"
              aria-label="Elemento anterior"
            >
              <div className="bg-[#24594c] text-white rounded-full p-2">
                <ChevronLeft size={28} strokeWidth={3} />
              </div>
            </button>

            {/* Botón Siguiente */}
            <button 
              onClick={nextItem}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800 hover:text-black cursor-pointer transition-transform active:scale-95"
              aria-label="Elemento siguiente"
            >
              <div className="bg-[#24594c] text-white rounded-full p-2">
                <ChevronRight size={28} strokeWidth={3} />
              </div>
            </button>
            
          </div>
        </div>
      </main>
    </div>
  );
}