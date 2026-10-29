// src/pages/Catalog.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import {
  Search,
  X,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Clock,
} from "lucide-react";

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
   Persistencia de préstamos en la sesión (sessionStorage)
   Evita que "Mis préstamos" se vacíe al cambiar de apartado.
--------------------------------------------------------- */
const LOANS_STORAGE_KEY = "biblioteca-usm:prestamos";

function readStoredLoans() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(LOANS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredLoans(loans) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(loans));
  } catch {
    // sessionStorage no disponible (modo privado, etc.): se ignora.
  }
}

/* ---------------------------------------------------------
   Piezas visuales
--------------------------------------------------------- */
function Cover({ book, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-t-sm shadow-sm border border-black/5 ${className}`}
      style={{
        background: `linear-gradient(150deg, ${book.cover.from}, ${book.cover.to})`,
        aspectRatio: "2 / 3",
      }}
    >
      <div
        className="absolute inset-0 flex flex-col justify-between p-3"
        style={{ color: book.cover.text }}
      >
        <span
          className="self-start rounded-full px-2 py-0.5 bg-white/10 font-medium"
          style={{ fontSize: 11 }}
        >
          {book.category}
        </span>
        <p className="leading-snug font-serif" style={{ fontSize: 15 }}>
          {book.title}
        </p>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500 font-medium">
      {children}
    </span>
  );
}

/* ---------------------------------------------------------
   Componente Catalog (Módulo de Libros)
--------------------------------------------------------- */
export default function Catalog() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const view = location.pathname === "/prestamos" ? "biblioteca" : "catalogo";
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [selectedId, setSelectedId] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [loans, setLoans] = useState(readStoredLoans);
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
  useEffect(() => {
    writeStoredLoans(loans);
  }, [loans]);
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const isBorrowed = (id) => loans.includes(id);

  return (
    <div className="app-shell min-h-screen bg-slate-50 text-slate-900">
      
      {/* ---------- Nav ---------- */}
      <SiteHeader />

      {/* ---------- Hero ---------- */}
      {view === "catalogo" && (
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 py-8 sm:grid-cols-2 sm:py-10">
            <div>
              <h1 className="max-w-md leading-tight font-serif text-3xl text-slate-900 font-bold">
                Tu próxima lectura y estudio empieza aquí.
              </h1>
              <p className="mt-3 max-w-sm text-slate-500 text-[15px]">
                Explora el catálogo de textos de estudio, pide un libro prestado y ábrelo al instante.
              </p>
            </div>
            <div className="flex h-36 items-end justify-center gap-2 sm:h-44">
              {BOOKS.slice(0, 8).map((b, i) => (
                <div
                  key={b.id}
                  className="rounded-t-sm shadow-sm"
                  style={{
                    background: `linear-gradient(180deg, ${b.cover.from}, ${b.cover.to})`,
                    width: 22 + (i % 3) * 4,
                    height: 80 + ((i * 37) % 60),
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
          <form role="search" className="mb-8 flex h-12 max-w-xl items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm">
            <Search size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
            <label htmlFor="book-search" className="sr-only">Buscar libros por título o autor</label>
            <input
              id="book-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por título o autor"
              className="h-full w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </form>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-[21px] font-bold text-slate-800">Novedades</h2>
            <span className="text-sm text-slate-500 font-medium" aria-live="polite">
              {visibleBooks.length} resultado{visibleBooks.length !== 1 && "s"}
            </span>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer font-medium ${
                  category === c
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {visibleBooks.length === 0 ? (
            <div className="rounded-xl bg-white border border-slate-200 py-16 text-center text-slate-500 shadow-sm">
              No encontramos libros para &quot;{query}&quot;. Prueba con otro título o autor.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {visibleBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => openBook(book.id)}
                  className="group text-left cursor-pointer transition-transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <Cover book={book} className="w-full" />
                    {isBorrowed(book.id) && (
                      <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                        <CheckCircle2 size={14} className="text-white" />
                      </span>
                    )}
                  </div>
                  <p className="mt-3 leading-snug font-bold text-slate-900 text-[14px]">
                    {book.title}
                  </p>
                  <p className="text-slate-500 text-[13px] mt-0.5">{book.author}</p>
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
            <span className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold bg-[#24594c] text-white shadow-sm">
              USM
            </span>
            <div>
              <h2 className="font-serif text-[21px] font-bold text-slate-800">Mis préstamos digitales</h2>
              <p className="text-sm text-slate-500">
                {loans.length === 0
                  ? "Todavía no tienes préstamos activos."
                  : `${loans.length} libro${loans.length === 1 ? "" : "s"} en préstamo.`}
              </p>
            </div>
          </div>

          {loans.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-white border border-slate-200 py-20 text-center text-slate-500 shadow-sm">
              <BookOpen size={32} className="text-slate-300 mb-2" />
              <p className="max-w-xs text-sm">
                Explora el catálogo y pide tu primer libro prestado para verlo aquí.
              </p>
              <Link
                to="/catalogo"
                className="mt-2 rounded-full px-5 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Ir al catálogo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {loans
                .map((id) => BOOKS.find((b) => b.id === id))
                .map((book) => (
                  <div key={book.id} className="flex flex-col h-full">
                    <button onClick={() => openBook(book.id)} className="block w-full text-left cursor-pointer transition-transform hover:-translate-y-1">
                      <Cover book={book} className="w-full" />
                    </button>
                    <p className="mt-3 leading-snug font-bold text-slate-900 text-[14px]">
                      {book.title}
                    </p>
                    <p className="text-slate-500 text-[13px] mt-0.5 mb-3">{book.author}</p>
                    <button
                      onClick={() => setReadingId(book.id)}
                      className="mt-auto w-full rounded-full py-2 text-white font-medium text-[13px] bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
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
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity cursor-pointer"
            style={{ opacity: panelOpen ? 1 : 0 }}
          />
          <div
            className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300"
            style={{ transform: panelOpen ? "translateX(0)" : "translateX(100%)" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Detalle del libro
              </span>
              <button onClick={closePanel} aria-label="Cerrar" className="cursor-pointer p-1 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="px-6 pt-6 pb-4">
              <Cover book={selectedBook} className="w-48 mx-auto shadow-md" />
            </div>

            <div className="px-6 py-4 flex-1 flex flex-col">
              <h3 className="leading-tight font-serif text-[22px] font-bold text-slate-900">
                {selectedBook.title}
              </h3>
              <p className="mt-1.5 text-[15px] font-medium text-slate-500">
                {selectedBook.author}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>{selectedBook.format}</Badge>
                <Badge>{selectedBook.year}</Badge>
                <Badge>{selectedBook.pages} páginas</Badge>
              </div>

              <p className="mt-6 leading-relaxed text-slate-600 text-[14.5px]">
                {selectedBook.synopsis}
              </p>

              <div className="mt-auto pt-8 pb-6 flex flex-col gap-3">
                {isBorrowed(selectedBook.id) ? (
                  <>
                    <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      Ya está en tu biblioteca
                    </div>
                    <button
                      onClick={() => {
                        setReadingId(selectedBook.id);
                        closePanel();
                      }}
                      className="rounded-full py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm"
                    >
                      Leer ahora
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => borrow(selectedBook)}
                    className="rounded-full py-3 text-sm font-semibold text-white bg-[#24594c] hover:bg-[#174438] transition-colors cursor-pointer shadow-sm"
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-5">
            <button
              onClick={() => setReadingId(null)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
              Volver a mi biblioteca
            </button>
            <button onClick={() => setReadingId(null)} aria-label="Cerrar lectura" className="cursor-pointer p-1.5 hover:bg-slate-200 rounded-full transition-colors">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          <div className="mx-auto max-w-2xl px-6 pb-24 pt-4">
            <p className="flex items-center gap-1.5 text-[13px] font-medium text-slate-400 uppercase tracking-wide">
              <Clock size={14} />
              {readingBook.pages} páginas · {readingBook.format}
            </p>
            <h1 className="mt-3 leading-tight font-serif text-3xl font-bold text-slate-900">
              {readingBook.title}
            </h1>
            <p className="mt-2 text-lg text-slate-500 font-medium">
              {readingBook.author}
            </p>

            <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-slate-700">
              {readingBook.content.map((p, i) =>
                i === 0 ? (
                  <p key={i} className="italic text-slate-500 text-[15px] border-l-2 border-slate-300 pl-4">
                    {p}
                  </p>
                ) : (
                  <p key={i} className="font-serif">
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
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium text-white shadow-lg bg-slate-800">
          <CheckCircle2 size={18} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}