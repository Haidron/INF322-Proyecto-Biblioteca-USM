// src/pages/RoomReservation.jsx
import { useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import { ROOMS_DATA, CAMPUSES } from '../data/rooms';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function RoomReservation() {
  const [selectedCampus, setSelectedCampus] = useState('Casa Central');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState(getTodayDate);
  
  const [activeReservation, setActiveReservation] = useState(null);
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const campusRooms = ROOMS_DATA.filter(room => room.campus === selectedCampus);
  const availableCategories = Array.from(new Set(campusRooms.map(r => r.category)));

  const filteredRooms = campusRooms.filter(room => {
    return selectedCategory === 'all' || room.category === selectedCategory;
  });

  const handleCampusChange = (newCampus) => {
    setSelectedCampus(newCampus);
    setSelectedCategory('all');
  };

  const handleConfirmReservation = () => {
    setConfirmedReservation(activeReservation);
    setActiveReservation(null);
  };

  return (
    <div className="app-shell min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      {/* Contenido de Reserva */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {confirmedReservation && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex justify-between items-center shadow-sm">
            <div>
              <p className="font-bold text-sm">¡Reserva confirmada con éxito!</p>
              <p className="text-xs text-emerald-700">
                {confirmedReservation.roomName} ({confirmedReservation.campus}, {confirmedReservation.floor}) — {confirmedReservation.date} en bloque {confirmedReservation.time}
              </p>
            </div>
            <button 
              onClick={() => setConfirmedReservation(null)}
              className="text-xs font-semibold underline text-emerald-800 hover:text-emerald-950 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Controles / Filtros */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Reserva de Salas de Estudio</h1>
              <p className="text-sm text-slate-500">Selecciona sede, fecha y bloque horario</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg self-start md:self-auto">
              {filteredRooms.length} salas en esta sede
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Campus / Sede</label>
              <select
                value={selectedCampus}
                onChange={(e) => handleCampusChange(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-slate-800 focus:outline-none"
              >
                {CAMPUSES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Fecha</label>
              <input
                type="date"
                value={selectedDate}
                min={getTodayDate()}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Capacidad / Espacio</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-slate-800 focus:outline-none"
              >
                <option value="all">Todas las capacidades ({campusRooms.length})</option>
                {availableCategories.includes('individual') && (
                  <option value="individual">Individuales (1 pers.)</option>
                )}
                {availableCategories.includes('pequena') && (
                  <option value="pequena">Salas Pequeñas (2 a 4 pers.)</option>
                )}
                {availableCategories.includes('mediana') && (
                  <option value="mediana">Salas Medianas (4 a 6 pers.)</option>
                )}
                {availableCategories.includes('grande') && (
                  <option value="grande">Salas Grandes (+6 pers.)</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Salas */}
        <div className="space-y-3">
          {filteredRooms.map(room => (
            <div key={room.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-slate-300 transition-all">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">{room.name}</h2>
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {room.categoryLabel}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">{room.floor}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {room.slots.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    onClick={() => setActiveReservation({
                      roomId: room.id,
                      roomName: room.name,
                      campus: room.campus,
                      floor: room.floor,
                      time: slot.time,
                      date: selectedDate
                    })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      slot.available
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-600 hover:text-white cursor-pointer active:scale-95'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed line-through'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {filteredRooms.length === 0 && (
            <div className="bg-white p-8 rounded-xl text-center text-slate-500 border border-slate-200">
              No hay espacios que coincidan con la búsqueda para esta sede.
            </div>
          )}
        </div>
      </main>

      {/* Modal de confirmación */}
      {activeReservation && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Confirmar Reserva</h3>
            <p className="text-xs text-slate-500 mb-4">Verifica los detalles de tu solicitud:</p>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Espacio:</span>
                <span className="font-bold text-slate-800">{activeReservation.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sede:</span>
                <span className="font-medium text-slate-700">{activeReservation.campus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ubicación:</span>
                <span className="font-medium text-slate-700">{activeReservation.floor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fecha:</span>
                <span className="font-medium text-slate-700">{activeReservation.date}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-500 font-semibold">Bloque:</span>
                <span className="font-bold text-emerald-700">{activeReservation.time}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveReservation(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReservation}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}