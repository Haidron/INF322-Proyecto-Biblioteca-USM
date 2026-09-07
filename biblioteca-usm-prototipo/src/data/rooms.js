// src/data/rooms.js

const DEFAULT_SLOTS = [
  "08:15 - 09:25",
  "09:35 - 10:45",
  "10:55 - 12:05",
  "12:15 - 13:25",
  "14:30 - 15:40",
  "15:50 - 17:00",
  "17:10 - 18:20",
  "18:30 - 19:40"
];

const generateSlots = (seed) => {
  return DEFAULT_SLOTS.map((time, idx) => ({
    time,
    available: (seed + idx) % 3 !== 0
  }));
};

const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

const generatedRooms = [];

// ==========================================
// 1. CASA CENTRAL
// Individual (Piso 6, 20) | 2-4 (Piso 4, 2) | 4-6 (Piso 5, 2) | +6 (Piso 4, 2)
// ==========================================
for (let i = 1; i <= 20; i++) {
  generatedRooms.push({
    id: `cc-ind-${pad(i)}`,
    name: `Cubículo Individual ${pad(i)}`,
    category: "individual",
    categoryLabel: "Individual (1 pers.)",
    campus: "Casa Central",
    floor: "Piso 6",
    capacity: 1,
    slots: generateSlots(i)
  });
}
for (let i = 1; i <= 2; i++) {
  generatedRooms.push({
    id: `cc-g24-${pad(i)}`,
    name: `Sala de Estudio 40${i}`,
    category: "pequena",
    categoryLabel: "2 a 4 personas",
    campus: "Casa Central",
    floor: "Piso 4",
    capacity: 4,
    slots: generateSlots(i + 20)
  });
}
for (let i = 1; i <= 2; i++) {
  generatedRooms.push({
    id: `cc-g46-${pad(i)}`,
    name: `Sala de Trabajo 50${i}`,
    category: "mediana",
    categoryLabel: "4 a 6 personas",
    campus: "Casa Central",
    floor: "Piso 5",
    capacity: 6,
    slots: generateSlots(i + 22)
  });
}
for (let i = 1; i <= 2; i++) {
  generatedRooms.push({
    id: `cc-g6p-${pad(i)}`,
    name: `Sala Magna Grupal 41${i}`,
    category: "grande",
    categoryLabel: "+6 personas",
    campus: "Casa Central",
    floor: "Piso 4",
    capacity: 10,
    slots: generateSlots(i + 24)
  });
}

// ==========================================
// 2. SEDE VIÑA DEL MAR
// 3 individuales | 5 de 2-4 pers | 1 de 4-6 pers
// ==========================================
for (let i = 1; i <= 3; i++) {
  generatedRooms.push({
    id: `vdm-ind-${pad(i)}`,
    name: `Cubículo Individual V${i}`,
    category: "individual",
    categoryLabel: "Individual (1 pers.)",
    campus: "Sede Viña del Mar",
    floor: "Piso 1",
    capacity: 1,
    slots: generateSlots(i + 30)
  });
}
for (let i = 1; i <= 5; i++) {
  generatedRooms.push({
    id: `vdm-g24-${pad(i)}`,
    name: `Sala de Estudio V10${i}`,
    category: "pequena",
    categoryLabel: "2 a 4 personas",
    campus: "Sede Viña del Mar",
    floor: "Piso 2",
    capacity: 4,
    slots: generateSlots(i + 35)
  });
}
generatedRooms.push({
  id: `vdm-g46-01`,
  name: `Sala Colaborativa V201`,
  category: "mediana",
  categoryLabel: "4 a 6 personas",
  campus: "Sede Viña del Mar",
  floor: "Piso 2",
  capacity: 6,
  slots: generateSlots(41)
});

// ==========================================
// 3. CAMPUS VITACURA
// 6 de 4 personas | 4 de 6 personas
// ==========================================
for (let i = 1; i <= 6; i++) {
  generatedRooms.push({
    id: `vit-g4-${pad(i)}`,
    name: `Sala de Estudio Vitacura ${pad(i)}`,
    category: "pequena",
    categoryLabel: "4 personas",
    campus: "Campus Vitacura",
    floor: "Edificio Biblioteca",
    capacity: 4,
    slots: generateSlots(i + 50)
  });
}
for (let i = 1; i <= 4; i++) {
  generatedRooms.push({
    id: `vit-g6-${pad(i)}`,
    name: `Sala Grupal Vitacura 20${i}`,
    category: "mediana",
    categoryLabel: "6 personas",
    campus: "Campus Vitacura",
    floor: "Piso 2",
    capacity: 6,
    slots: generateSlots(i + 60)
  });
}

// ==========================================
// 4. CAMPUS SAN JOAQUÍN
// 6 de 4 personas | 12 de 8 personas
// ==========================================
for (let i = 1; i <= 6; i++) {
  generatedRooms.push({
    id: `sj-g4-${pad(i)}`,
    name: `Sala de Estudio SJ ${pad(i)}`,
    category: "pequena",
    categoryLabel: "4 personas",
    campus: "Campus San Joaquín",
    floor: "Piso 1",
    capacity: 4,
    slots: generateSlots(i + 70)
  });
}
for (let i = 1; i <= 12; i++) {
  generatedRooms.push({
    id: `sj-g8-${pad(i)}`,
    name: `Sala Grupal Magna SJ ${pad(i)}`,
    category: "grande",
    categoryLabel: "8 personas (+6)",
    campus: "Campus San Joaquín",
    floor: "Piso 2",
    capacity: 8,
    slots: generateSlots(i + 80)
  });
}

// ==========================================
// 5. SEDE CONCEPCIÓN
// 3 de 4 personas | 9 de 6 personas
// ==========================================
for (let i = 1; i <= 3; i++) {
  generatedRooms.push({
    id: `ccp-g4-${pad(i)}`,
    name: `Sala de Estudio Concepción ${pad(i)}`,
    category: "pequena",
    categoryLabel: "4 personas",
    campus: "Sede Concepción",
    floor: "Piso 1",
    capacity: 4,
    slots: generateSlots(i + 100)
  });
}
for (let i = 1; i <= 9; i++) {
  generatedRooms.push({
    id: `ccp-g6-${pad(i)}`,
    name: `Sala Grupal Concepción 20${i}`,
    category: "mediana",
    categoryLabel: "6 personas",
    campus: "Sede Concepción",
    floor: "Piso 2",
    capacity: 6,
    slots: generateSlots(i + 110)
  });
}

export const ROOMS_DATA = generatedRooms;

export const CAMPUSES = [
  "Casa Central",
  "Sede Viña del Mar",
  "Campus Vitacura",
  "Campus San Joaquín",
  "Sede Concepción"
];