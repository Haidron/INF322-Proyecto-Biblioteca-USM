// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './pages/Catalog';
import RoomReservation from './pages/RoomReservation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir la raíz al catálogo de libros */}
        <Route path="/" element={<Navigate to="/libros" replace />} />

        {/* Pantalla 1: Módulo de libros de tu compañero */}
        <Route path="/libros" element={<Catalog />} />

        {/* Pantalla 2: Tu módulo de reserva de salas */}
        <Route path="/salas" element={<RoomReservation />} />

        {/* Ruta 404 de respaldo */}
        <Route path="*" element={<Navigate to="/libros" replace />} />
      </Routes>
    </BrowserRouter>
  );
}