// src/App.jsx
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import RoomReservation from './pages/RoomReservation';
import Catalog from './pages/Catalog';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="bg-slate-900 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/salas" className="font-bold text-lg tracking-wide">
              Biblioteca <span className="text-amber-400">USM</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link to="/libros" className="hover:text-amber-300 transition-colors">
                Pedir Libros
              </Link>
              <Link to="/salas" className="hover:text-amber-300 transition-colors">
                Reservar Salas
              </Link>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/salas" replace />} />
            <Route path="/salas" element={<RoomReservation />} />
            <Route path="/libros" element={<Catalog />} />
            <Route path="*" element={<div className="p-8 text-center text-slate-500">Página no encontrada (404)</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}