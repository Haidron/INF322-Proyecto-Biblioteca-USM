// src/pages/Collections.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Laptop } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Barra superior de navegación (Consistente con el resto del prototipo) */}
      <header className="bg-[#1C2A3E] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B5842A]">
              <Laptop size={18} className="text-[#121B29]" />
            </div>
            <div className="leading-tight">
              <p className="font-serif font-bold text-base">Biblioteca USM</p>
              <p className="text-slate-400 text-[11px]">Préstamo de Colecciones</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              to="/libros"
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-slate-200 hover:bg-white/10 transition-colors"
            >
              <BookOpen size={16} />
              <span>Ver Libros</span>
            </Link>
            <Link
              to="/salas"
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-slate-200 hover:bg-white/10 transition-colors"
            >
              <Calendar size={16} />
              <span>Salas</span>
            </Link>
            <div className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold bg-white/15 text-amber-300">
              <Laptop size={16} />
              <span>Colecciones</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido Principal - Visor de Colecciones */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden flex flex-col h-[600px]">
          
          {/* Cabecera Azul del Visor */}
          <div className="bg-[#004B87] text-white px-4 py-2 font-bold text-sm tracking-wide">
            COLECCIONES
          </div>

          {/* Área del Carrusel */}
          <div className="flex-1 flex flex-col relative px-12 py-8">
            
            {/* Contenedor de la Imagen Centrada */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <img 
                src={currentItem.image} 
                alt={currentItem.title} 
                className="max-w-full max-h-[350px] object-contain drop-shadow-md transition-all duration-300"
              />
            </div>

            {/* Título del Ítem (Estilo Turquesa) */}
            <div className="mt-auto">
              <h2 className="text-[#339999] font-medium text-sm md:text-base">
                {currentItem.title}
              </h2>
            </div>

            {/* Botón Anterior */}
            <button 
              onClick={prevItem}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 hover:text-black cursor-pointer transition-transform active:scale-95"
              aria-label="Anterior"
            >
              <div className="bg-black text-white rounded-full p-0.5">
                <ChevronLeft size={28} strokeWidth={3} />
              </div>
            </button>

            {/* Botón Siguiente */}
            <button 
              onClick={nextItem}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800 hover:text-black cursor-pointer transition-transform active:scale-95"
              aria-label="Siguiente"
            >
              <div className="bg-black text-white rounded-full p-0.5">
                <ChevronRight size={28} strokeWidth={3} />
              </div>
            </button>
            
          </div>
        </div>
      </main>
    </div>
  );
}