// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './pages/Catalog';
import RoomReservation from './pages/RoomReservation';
import Collections from './pages/Collections'; // <-- Importamos el nuevo componente

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir la raíz al catálogo de libros */}
        <Route path="/" element={<Navigate to="/libros" replace />} />

        {/* Pantalla 1: Módulo de libros */}
        <Route path="/libros" element={<Catalog />} />

        {/* Pantalla 2: Módulo de reserva de salas */}
        <Route path="/salas" element={<RoomReservation />} />

        {/* Pantalla 3: Módulo de colecciones físicas */}
        <Route path="/colecciones" element={<Collections />} />

        {/* Ruta 404 de respaldo */}
        <Route path="*" element={<Navigate to="/libros" replace />} />
      </Routes>
    </BrowserRouter>
  );
}