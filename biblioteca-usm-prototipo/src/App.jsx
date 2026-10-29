// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Catalog from './pages/Catalog';
import RoomReservation from './pages/RoomReservation';
import Collections from './pages/Collections';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/libros" element={<Catalog />} />
        <Route path="/prestamos" element={<Catalog />} />
        <Route path="/salas" element={<RoomReservation />} />
        <Route path="/reservas" element={<Navigate to="/salas" replace />} />
        <Route path="/recursos" element={<Collections />} />
        <Route path="/colecciones" element={<Navigate to="/recursos" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}