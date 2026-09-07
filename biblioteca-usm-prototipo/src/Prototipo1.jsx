import { useState, useEffect, useRef } from "react";
import {
  Home,
  Search,
  X,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Clock,
} from "lucide-react";

/* ---------------------------------------------------------
   Tokens
--------------------------------------------------------- */
const ink = "#20242C";
const inkSoft = "#5B5F6B";
const paper = "#F3F1EA";
const paperRaised = "#FFFFFF";
const navy = "#1C2A3E";
const navyDeep = "#121B29";
const gold = "#B5842A";
const goldDeep = "#8C6620";
const leaf = "#2F6F5E";
const leafDeep = "#1E4B3E";
const line = "#DEDACC";

const serif = {
  fontFamily:
    "'Iowan Old Style','Palatino Linotype','Book Antiqua', Georgia, serif",
};

/* ---------------------------------------------------------
   Data — catálogo de muestra
--------------------------------------------------------- */
const BOOKS = [
  {
    id: 1,
    title: "Los testamentos",
    author: "Margaret Atwood",
    category: "Ficción",
    format: "Libro electrónico",
    year: 2019,
    pages: 520,
    cover: { from: "#3E5C46", to: "#1D2E22", text: "#F4EFE3" },
    synopsis:
      "Quince años después de los hechos de 'El cuento de la criada', tres voces distintas narran, desde dentro y fuera del régimen, el principio de su fin.",
    content: [
      "Vista previa de prototipo — el siguiente texto es contenido de muestra, no un fragmento real de la obra.",
      "La primera voz llega desde los archivos de una casa que ya no existe. La segunda, desde una escuela donde las preguntas se aprenden a media voz. La tercera, desde el otro lado de una frontera que separa dos formas de recordar.",
      "A medida que los tres relatos avanzan, empiezan a rozarse: un nombre que se repite, una fecha que no cuadra, una carta que debía haberse quemado.",
    ],
  },
  {
    id: 2,
    title: "NCh1017:2026 Hormigón: confección en obra y ensayo de probetas",
    author: "Instituto de la Construcción",
    category: "Normativa",
    format: "Documento técnico",
    year: 2026,
    pages: 48,
    cover: { from: "#223047", to: "#0E1826", text: "#EDEFF2" },
    synopsis:
      "Norma chilena que fija el procedimiento para preparar, curar y ensayar a compresión probetas cúbicas y cilíndricas de hormigón elaboradas en obra.",
    content: [
      "Contenido de muestra generado para este prototipo.",
      "1. Alcance — Este documento establece las condiciones mínimas de muestreo, moldeo y curado de probetas para el control de calidad del hormigón fabricado en faena.",
      "2. Procedimiento — Las probetas se extraen de una tanda representativa, se compactan en capas y se identifican antes del curado inicial en obra.",
    ],
  },
  {
    id: 3,
    title: "Física I: Mecánica",
    author: "Marcelo Alonso y Edward J. Finn",
    category: "Ciencias",
    format: "Libro electrónico",
    year: 2020,
    pages: 436,
    cover: { from: "#2B4C7E", to: "#14243D", text: "#EEF2F8" },
    synopsis:
      "Edición revisada y aumentada del clásico texto universitario sobre cinemática, dinámica y las leyes que describen el movimiento de los cuerpos.",
    content: [
      "Vista previa de prototipo — texto ilustrativo, no un extracto real del libro.",
      "Capítulo 1. Cinemática — Antes de preguntar por qué se mueve un cuerpo, conviene aprender a describir cómo se mueve: posición, velocidad y aceleración son las tres preguntas que ordenan todo lo demás.",
      "Un tren que frena, una piedra que cae, un planeta que orbita: distintos fenómenos, la misma gramática matemática para describirlos.",
    ],
  },
  {
    id: 4,
    title: "Física II: Mecánica",
    author: "Marcelo Alonso y Edward J. Finn",
    category: "Ciencias",
    format: "Libro electrónico",
    year: 2020,
    pages: 452,
    cover: { from: "#1F5E5A", to: "#0E2E2C", text: "#EAF4F2" },
    synopsis:
      "Continúa el desarrollo de la mecánica clásica con trabajo, energía, choques y dinámica de sistemas de partículas y cuerpos rígidos.",
    content: [
      "Vista previa de prototipo — texto ilustrativo, no un extracto real del libro.",
      "Capítulo 9. Choques — En el instante del impacto, dos cuerpos intercambian en fracciones de segundo lo que la energía y el momento lineal habían acumulado durante todo su recorrido.",
      "Distinguir un choque elástico de uno inelástico es, en el fondo, preguntar qué queda igual y qué se transforma.",
    ],
  },
  {
    id: 5,
    title: "Derecho de la información personal",
    author: "Colección Derecho USM",
    category: "Derecho",
    format: "Libro electrónico",
    year: 2022,
    pages: 214,
    cover: { from: "#5B2A2A", to: "#2C1414", text: "#F4E9E6" },
    synopsis:
      "Estudio del derecho a la protección de datos personales a la luz de la Ley N.º 19.628 y su desarrollo jurisprudencial.",
    content: [
      "Vista previa de prototipo — texto ilustrativo, no un extracto real del libro.",
      "Introducción — Toda persona deja, sin proponérselo, un rastro de datos que la describen. El derecho que los protege es, ante todo, el derecho a decidir qué parte de ese rastro se comparte y con quién.",
      "El análisis recorre los principios de licitud, finalidad y proporcionalidad que sostienen el tratamiento de datos en Chile.",
    ],
  },
  {
    id: 6,
    title: "Diseño de máquinas: un enfoque integrado",
    author: "Robert L. Norton",
    category: "Ingeniería",
    format: "Libro electrónico",
    year: 2011,
    pages: 1078,
    cover: { from: "#B5651D", to: "#6B3A10", text: "#FBF1E5" },
    synopsis:
      "Texto de referencia para el diseño de elementos mecánicos, integrando fatiga, esfuerzos y selección de materiales en casos reales.",
    content: [
      "Vista previa de prototipo — texto ilustrativo, no un extracto real del libro.",
      "Capítulo 1. Introducción al diseño — Diseñar una máquina es negociar, pieza por pieza, entre lo que la física permite y lo que el material está dispuesto a soportar sin fallar.",
      "Cada componente cuenta una historia de cargas: cuánto recibe, cuántas veces, y durante cuánto tiempo.",
    ],
  },
  {
    id: 7,
    title: "Roark's Formulas for Stress and Strain",
    author: "Richard G. Budynas y Ali M. Sadegh",
    category: "Ingeniería",
    format: "Libro electrónico",
    year: 2020,
    pages: 968,
    cover: { from: "#1B2A44", to: "#0A1220", text: "#EDEFF4" },
    synopsis:
      "Novena edición del manual de referencia para el cálculo de esfuerzos y deformaciones en piezas y estructuras.",
    content: [
      "Vista previa de prototipo — texto ilustrativo, no un extracto real del libro.",
      "Chapter 1. Overview — Every loaded body answers with a shape change, however small. This reference collects the formulas that translate that answer into numbers an engineer can trust.",
      "The tables are only as useful as the boundary conditions you choose to believe.",
    ],
  },
  {
    id: 8,
    title: "Tratado latinoamericano de sociología del trabajo",
    author: "Enrique de la Garza Toledo (coord.)",
    category: "Ciencias sociales",
    format: "Libro electrónico",
    year: 2018,
    pages: 612,
    cover: { from: "#5C4A2E", to: "#2E2416", text: "#F3EEE2" },
    synopsis:
      "Panorama coordinado de las transformaciones del trabajo en América Latina, desde la informalidad hasta las nuevas plataformas digitales.",
    content: [
      "Vista previa de prototipo — texto ilustrativo, no un extracto real del libro.",
      "Introducción — Hablar de trabajo en América Latina es hablar de una región donde conviven, en el mismo día y a veces en la misma persona, el contrato formal y la changa de la tarde.",
      "Los capítulos recorren esa convivencia desde distintos países y distintas escalas.",
    ],
  },
  {
    id: 9,
    title: "Mercado Libre: lo mejor aún está por venir",
    author: "Caso de estudio",
    category: "Negocios",
    format: "Caso de estudio",
    year: 2023,
    pages: 32,
    cover: { from: "#8A3B22", to: "#401810", text: "#FBEEE5" },
    synopsis:
      "Caso de negocios sobre la expansión regional de una plataforma de comercio electrónico y sus decisiones de logística y fintech.",
    content: [
      "Vista previa de prototipo — texto ilustrativo, no un extracto real del caso.",
      "Contexto — Crecer en trece países a la vez obliga a resolver, casi al mismo tiempo, cómo se paga, cómo se entrega y cómo se compite con el comercio de barrio.",
      "El caso invita a decidir qué apuesta priorizar para la próxima década.",
    ],
  },
];

const CATEGORIES = [
  "Todos",
  ...Array.from(new Set(BOOKS.map((b) => b.category))),
];

/* ---------------------------------------------------------
   Piezas visuales
--------------------------------------------------------- */
function Cover({ book, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-t-sm ${className}`}
      style={{
        background: `linear-gradient(150deg, ${book.cover.from}, ${book.cover.to})`,
        boxShadow: "inset -6px 0 10px rgba(0,0,0,0.18)",
        aspectRatio: "2 / 3",
      }}
    >
      <div
        className="absolute inset-0 flex flex-col justify-between p-3"
        style={{ color: book.cover.text }}
      >
        <span
          className="self-start rounded-full px-2 py-0.5"
          style={{ backgroundColor: "rgba(255,255,255,0.16)", fontSize: 11 }}
        >
          {book.category}
        </span>
        <p className="leading-snug" style={{ ...serif, fontSize: 15 }}>
          {book.title}
        </p>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span
      className="rounded-full border px-2.5 py-1 text-xs"
      style={{ borderColor: line, color: inkSoft }}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------
   App
--------------------------------------------------------- */
export default function App() {
  const [view, setView] = useState("catalogo"); // catalogo | biblioteca
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [loans, setLoans] = useState([]); // ids de libros pedidos
  const [readingId, setReadingId] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const selectedBook = BOOKS.find((b) => b.id === selectedId) || null;
  const readingBook = BOOKS.find((b) => b.id === readingId) || null;

  const visibleBooks = BOOKS.filter((b) => {
    const matchesCategory = category === "Todos" || b.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  function openBook(id) {
    setSelectedId(id);
    requestAnimationFrame(() => setPanelOpen(true));
  }
  function closePanel() {
    setPanelOpen(false);
    setTimeout(() => setSelectedId(null), 250);
  }

  function borrow(book) {
    setLoans((prev) => (prev.includes(book.id) ? prev : [...prev, book.id]));
    showToast(`Se agregó "${book.title}" a tu biblioteca.`);
  }

  function showToast(message) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const isBorrowed = (id) => loans.includes(id);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: paper,
        color: ink,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* ---------- Nav ---------- */}
      <header style={{ backgroundColor: navy }} className="text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: gold }}
            >
              <BookOpen size={18} color={navyDeep} />
            </div>
            <div className="leading-tight">
              <p style={{ ...serif, fontSize: 16 }}>Ateneo</p>
              <p style={{ color: "#B9C2D4", fontSize: 11 }}>
                Biblioteca digital · prototipo
              </p>
            </div>
          </div>

          <div
            className="hidden flex-1 items-center gap-2 rounded-full px-3 py-1.5 sm:flex"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", maxWidth: 360 }}
          >
            <Search size={15} color="#B9C2D4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título o autor"
              className="w-full bg-transparent text-sm text-white placeholder-slate-300 outline-none"
            />
          </div>

          <nav className="flex items-center gap-1.5">
            <button
              onClick={() => setView("catalogo")}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors"
              style={{
                backgroundColor:
                  view === "catalogo" ? "rgba(255,255,255,0.14)" : "transparent",
              }}
            >
              <Home size={16} />
              <span className="hidden sm:inline">Catálogo</span>
            </button>
            <button
              onClick={() => setView("biblioteca")}
              className="relative flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-sm transition-colors"
              style={{
                backgroundColor:
                  view === "biblioteca" ? "rgba(255,255,255,0.14)" : "transparent",
              }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs"
                style={{ backgroundColor: gold, color: navyDeep }}
              >
                MC
              </span>
              <span className="hidden sm:inline">Mi biblioteca</span>
              {loans.length > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full"
                  style={{ backgroundColor: leaf, fontSize: 10 }}
                >
                  {loans.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      {view === "catalogo" && (
        <section className="border-b" style={{ borderColor: line }}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 py-10 sm:grid-cols-2 sm:py-14">
            <div>
              <h1
                className="max-w-md leading-tight"
                style={{ ...serif, color: ink, fontSize: 34 }}
              >
                Tu próxima lectura empieza aquí.
              </h1>
              <p className="mt-4 max-w-sm" style={{ color: inkSoft, fontSize: 15 }}>
                Explora el catálogo, pide un libro prestado y ábrelo al
                instante en Mi biblioteca.
              </p>
            </div>
            <div className="flex h-40 items-end justify-center gap-2 sm:h-48">
              {BOOKS.slice(0, 8).map((b, i) => (
                <div
                  key={b.id}
                  className="rounded-t-sm"
                  style={{
                    background: `linear-gradient(180deg, ${b.cover.from}, ${b.cover.to})`,
                    width: 22 + (i % 3) * 4,
                    height: 90 + ((i * 37) % 70),
                    boxShadow: "inset -3px 0 6px rgba(0,0,0,0.18)",
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Catálogo ---------- */}
      {view === "catalogo" && (
        <main className="mx-auto max-w-6xl px-5 py-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 style={{ ...serif, fontSize: 21 }}>Novedades</h2>
            <span className="text-sm" style={{ color: inkSoft }}>
              {visibleBooks.length} resultado
              {visibleBooks.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors"
                style={
                  category === c
                    ? { backgroundColor: ink, color: paper, borderColor: ink }
                    : { borderColor: line, color: inkSoft }
                }
              >
                {c}
              </button>
            ))}
          </div>

          {visibleBooks.length === 0 ? (
            <div
              className="rounded-md border py-16 text-center"
              style={{ borderColor: line, color: inkSoft }}
            >
              No encontramos libros para "{query}". Prueba con otro título o
              autor.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {visibleBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => openBook(book.id)}
                  className="group text-left"
                >
                  <div className="relative">
                    <Cover book={book} className="w-full" />
                    <div
                      className="absolute inset-0 rounded-t-sm opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ boxShadow: "0 10px 24px rgba(20,20,10,0.22)" }}
                    />
                    {isBorrowed(book.id) && (
                      <span
                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ backgroundColor: leaf }}
                      >
                        <CheckCircle2 size={14} color="#fff" />
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 leading-snug" style={{ color: ink, fontSize: 14 }}>
                    {book.title}
                  </p>
                  <p style={{ color: inkSoft, fontSize: 13 }}>{book.author}</p>
                </button>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ---------- Mi biblioteca ---------- */}
      {view === "biblioteca" && (
        <main className="mx-auto max-w-6xl px-5 py-10">
          <div className="mb-8 flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-sm"
              style={{ backgroundColor: gold, color: navyDeep }}
            >
              MC
            </span>
            <div>
              <h2 style={{ ...serif, fontSize: 21 }}>Mi biblioteca</h2>
              <p className="text-sm" style={{ color: inkSoft }}>
                {loans.length === 0
                  ? "Todavía no tienes préstamos activos."
                  : `${loans.length} libro${loans.length === 1 ? "" : "s"} en préstamo.`}
              </p>
            </div>
          </div>

          {loans.length === 0 ? (
            <div
              className="flex flex-col items-center gap-3 rounded-md border py-20 text-center"
              style={{ borderColor: line, color: inkSoft }}
            >
              <BookOpen size={28} color={inkSoft} />
              <p className="max-w-xs text-sm">
                Explora el catálogo y pide tu primer libro prestado para
                verlo aquí.
              </p>
              <button
                onClick={() => setView("catalogo")}
                className="mt-1 rounded-full px-4 py-1.5 text-sm text-white"
                style={{ backgroundColor: ink }}
              >
                Ir al catálogo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {loans
                .map((id) => BOOKS.find((b) => b.id === id))
                .map((book) => (
                  <div key={book.id}>
                    <button onClick={() => openBook(book.id)} className="block w-full text-left">
                      <Cover book={book} className="w-full" />
                    </button>
                    <p className="mt-2.5 leading-snug" style={{ fontSize: 14 }}>
                      {book.title}
                    </p>
                    <p style={{ color: inkSoft, fontSize: 13 }}>{book.author}</p>
                    <button
                      onClick={() => setReadingId(book.id)}
                      className="mt-2 w-full rounded-full py-1.5 text-white"
                      style={{ backgroundColor: leaf, fontSize: 13 }}
                    >
                      Leer ahora
                    </button>
                  </div>
                ))}
            </div>
          )}
        </main>
      )}

      {/* ---------- Panel de detalle ---------- */}
      {selectedBook && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            onClick={closePanel}
            className="absolute inset-0 transition-opacity"
            style={{
              backgroundColor: "rgba(15,18,24,0.45)",
              opacity: panelOpen ? 1 : 0,
            }}
          />
          <div
            className="relative flex h-full w-full max-w-md flex-col overflow-y-auto shadow-2xl transition-transform duration-300"
            style={{
              backgroundColor: paperRaised,
              transform: panelOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm" style={{ color: inkSoft }}>
                Detalle del libro
              </span>
              <button onClick={closePanel} aria-label="Cerrar">
                <X size={18} color={inkSoft} />
              </button>
            </div>

            <div className="px-5">
              <Cover book={selectedBook} className="h-64 w-44" />
            </div>

            <div className="px-5 py-5">
              <h3 className="leading-tight" style={{ ...serif, fontSize: 22 }}>
                {selectedBook.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: inkSoft }}>
                {selectedBook.author}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>{selectedBook.format}</Badge>
                <Badge>{selectedBook.year}</Badge>
                <Badge>{selectedBook.pages} páginas</Badge>
              </div>

              <p className="mt-5 leading-relaxed" style={{ color: "#3A3E47", fontSize: 14.5 }}>
                {selectedBook.synopsis}
              </p>

              <div className="mt-7 flex flex-col gap-2.5">
                {isBorrowed(selectedBook.id) ? (
                  <>
                    <div
                      className="flex items-center gap-2 rounded-md px-3.5 py-2.5 text-sm"
                      style={{ backgroundColor: "#EAF2EF", color: leafDeep }}
                    >
                      <CheckCircle2 size={16} />
                      Ya está en tu biblioteca
                    </div>
                    <button
                      onClick={() => {
                        setReadingId(selectedBook.id);
                        closePanel();
                      }}
                      className="rounded-full py-2.5 text-sm text-white"
                      style={{ backgroundColor: leaf }}
                    >
                      Leer ahora
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => borrow(selectedBook)}
                    className="rounded-full py-2.5 text-sm text-white transition-colors"
                    style={{ backgroundColor: gold }}
                    onMouseDown={(e) => (e.currentTarget.style.backgroundColor = goldDeep)}
                    onMouseUp={(e) => (e.currentTarget.style.backgroundColor = gold)}
                  >
                    Pedir prestado
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Lector ---------- */}
      {readingBook && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: paper }}>
          <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-5">
            <button
              onClick={() => setReadingId(null)}
              className="flex items-center gap-1.5 text-sm"
              style={{ color: inkSoft }}
            >
              <ArrowLeft size={16} />
              Volver a mi biblioteca
            </button>
            <button onClick={() => setReadingId(null)} aria-label="Cerrar lectura">
              <X size={18} color={inkSoft} />
            </button>
          </div>

          <div className="mx-auto max-w-2xl px-6 pb-24">
            <p className="flex items-center gap-1.5 text-xs" style={{ color: inkSoft }}>
              <Clock size={13} />
              {readingBook.pages} páginas · {readingBook.format}
            </p>
            <h1 className="mt-2 leading-tight" style={{ ...serif, fontSize: 30 }}>
              {readingBook.title}
            </h1>
            <p className="mt-1" style={{ color: inkSoft, fontSize: 15 }}>
              {readingBook.author}
            </p>

            <div className="mt-8 space-y-5" style={{ fontSize: 16, lineHeight: 1.8 }}>
              {readingBook.content.map((p, i) =>
                i === 0 ? (
                  <p key={i} className="italic" style={{ color: inkSoft, fontSize: 13 }}>
                    {p}
                  </p>
                ) : (
                  <p key={i} style={{ ...serif, color: "#2B2E36" }}>
                    {p}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- Toast ---------- */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-sm text-white shadow-lg"
          style={{ backgroundColor: ink }}
        >
          <CheckCircle2 size={16} color={gold} />
          {toast}
        </div>
      )}
    </div>
  );
}
