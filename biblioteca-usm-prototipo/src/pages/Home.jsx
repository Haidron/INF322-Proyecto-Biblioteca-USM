import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, CalendarDays, Laptop } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';

const Arrow = () => (
	<svg aria-hidden="true" viewBox="0 0 20 20" className="arrow-icon">
		<path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const SearchIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" className="search-icon">
		<circle cx="10.8" cy="10.8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
		<path d="m15.5 15.5 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
	</svg>
);

const services = [
	{ number: '01', title: 'Catálogo', text: 'Busca libros y recursos por título, autor o tema.', href: '/catalogo', label: 'Explorar catálogo', icon: BookOpen },
	{ number: '02', title: 'Salas de estudio', text: 'Encuentra un espacio disponible en tu sede.', href: '/salas', label: 'Reservar una sala', icon: CalendarDays },
	{ number: '03', title: 'Colecciones', text: 'Conoce los recursos físicos disponibles para préstamo.', href: '/colecciones', label: 'Ver colecciones', icon: Laptop },
];

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="home-page">
			<style>{`
				:root { --ink:#192b27; --muted:#66736e; --green:#24594c; --green-dark:#174438; --lime:#d8e6bd; --cream:#f7f6f0; --line:#e4e7df; }
				* { box-sizing:border-box; }
				.home-page { min-height:100vh; color:var(--ink); background:#fff; font-family:'DM Sans',sans-serif; }
				.home-page a { color:inherit; text-decoration:none; }
				.home-page a:focus-visible, .home-page input:focus-visible { outline:3px solid #d3923e; outline-offset:3px; }
				.site-header { height:78px; display:flex; align-items:center; justify-content:space-between; max-width:1200px; padding:0 28px; margin:auto; }
				.brand { display:flex; align-items:center; gap:11px; font-size:15px; font-weight:700; letter-spacing:-.3px; }
				.brand-mark { width:38px; height:38px; display:grid; place-items:center; border-radius:12px 12px 12px 4px; background:var(--green); color:#fff; }
				.brand-mark svg { width:22px; height:22px; }
				.brand small { display:block; margin-top:2px; color:var(--muted); font-size:10px; font-weight:500; letter-spacing:.8px; text-transform:uppercase; }
				.main-nav { display:flex; align-items:center; gap:32px; color:#4b5a54; font-size:13px; font-weight:600; }
				.main-nav a:hover, .text-link:hover { color:var(--green); }
				.account-link { padding:10px 16px; border:1px solid var(--line); border-radius:8px; color:var(--ink)!important; }
				.account-link:hover { background:var(--cream); }
				.hero { position:relative; overflow:hidden; background:var(--cream); }
				.hero-inner { position:relative; max-width:1200px; min-height:440px; margin:auto; padding:76px 28px 66px; display:grid; grid-template-columns:1.15fr .85fr; align-items:center; gap:48px; }
				.eyebrow { display:flex; align-items:center; gap:9px; color:var(--green); font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; }
				.eyebrow:before { content:''; width:24px; height:1px; background:currentColor; }
				.hero h1 { max-width:600px; margin:17px 0 16px; font:600 clamp(40px,5vw,62px)/1.07 'Playfair Display',Georgia,serif; letter-spacing:-1.6px; }
				.hero h1 span { color:var(--green); }
				.hero-copy { max-width:480px; margin:0; color:#66716b; font-size:15px; line-height:1.75; }
				.search-form { display:flex; max-width:520px; height:54px; margin-top:28px; padding:5px; background:#fff; border:1px solid #e6e8df; border-radius:9px; box-shadow:0 7px 22px #21392c0c; }
				.search-icon { width:20px; flex:none; margin:0 10px 0 11px; align-self:center; color:#839087; }
				.search-form input { width:100%; min-width:0; border:0; outline:0; color:var(--ink); background:transparent; font:14px 'DM Sans',sans-serif; }
				.search-form input::placeholder { color:#929b94; }
				.search-form button { flex:none; padding:0 18px; border:0; border-radius:6px; background:var(--green); color:#fff; font:600 13px 'DM Sans',sans-serif; cursor:pointer; }
				.search-form button:hover { background:var(--green-dark); }
				.hero-art { position:relative; min-height:280px; display:grid; place-items:center; }
				.art-circle { position:absolute; width:290px; height:290px; border-radius:50%; background:#e9eddd; }
				.book-stack { position:relative; width:245px; height:220px; transform:rotate(-5deg); }
				.book { position:absolute; bottom:20px; height:178px; border-radius:5px 10px 10px 5px; box-shadow:12px 14px 24px #172f2521; }
				.book:after { content:''; position:absolute; top:0; right:10px; width:3px; height:100%; background:#ffffff31; }
				.book-one { left:22px; width:83px; background:#b96f4b; transform:rotate(-13deg); }
				.book-two { left:83px; width:86px; height:202px; background:#315f51; transform:rotate(3deg); }
				.book-three { left:148px; width:75px; height:164px; background:#d5b66e; transform:rotate(13deg); }
				.book-label { position:absolute; top:63px; left:12px; right:12px; padding:10px 4px; border-top:1px solid #fff9; border-bottom:1px solid #fff9; color:#fff; text-align:center; font:600 10px/1.45 'DM Sans',sans-serif; letter-spacing:1px; text-transform:uppercase; }
				.book-three .book-label { top:58px; color:#3e3a2b; border-color:#3e3a2b66; }
				.art-note { position:absolute; right:8px; bottom:11px; padding:10px 14px; border:1px solid #e6e8df; border-radius:8px; background:#fff; box-shadow:0 8px 20px #21392c0d; color:#526057; font-size:11px; }
				.art-note strong { color:var(--green); }
				.content { max-width:1200px; margin:auto; padding:66px 28px 72px; }
				.section-heading { display:flex; align-items:end; justify-content:space-between; gap:20px; margin-bottom:25px; }
				.section-heading h2 { margin:8px 0 0; font:600 30px/1.2 'Playfair Display',Georgia,serif; letter-spacing:-.5px; }
				.section-heading p { margin:8px 0 0; color:var(--muted); font-size:13px; }
				.text-link { display:inline-flex; align-items:center; gap:7px; color:var(--green); font-size:12px; font-weight:700; white-space:nowrap; }
				.arrow-icon { width:17px; height:17px; }
				.service-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
				.service-card { min-height:176px; padding:21px 22px 19px; border:1px solid var(--line); border-radius:10px; transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
				.service-card:hover { transform:translateY(-3px); border-color:#c8d6ca; box-shadow:0 12px 25px #21392c0c; }
				.card-top { display:flex; justify-content:space-between; align-items:center; }
				.card-number { color:#9aa49c; font-size:11px; font-weight:700; letter-spacing:1px; }
				.card-icon { width:35px; height:35px; display:grid; place-items:center; border-radius:9px; background:#eff3e8; color:var(--green); }
				.card-icon svg { width:18px; height:18px; }
				.service-card h3 { margin:15px 0 6px; font-size:16px; }
				.service-card p { max-width:280px; margin:0; color:var(--muted); font-size:12px; line-height:1.65; }
				.card-link { display:inline-flex; align-items:center; gap:5px; margin-top:14px; color:var(--green); font-size:11px; font-weight:700; }
				.bottom-band { display:grid; grid-template-columns:1.15fr .85fr; gap:16px; margin-top:44px; }
				.notice { min-height:150px; padding:24px 26px; border-radius:10px; background:var(--green); color:#fff; }
				.notice .eyebrow { color:#d5e5c4; }
				.notice h3 { margin:12px 0 7px; font:600 22px 'Playfair Display',Georgia,serif; }
				.notice p { max-width:510px; margin:0; color:#e0e9e3; font-size:12px; line-height:1.7; }
				.hours { padding:22px 24px; border:1px solid var(--line); border-radius:10px; }
				.hours h3 { margin:0 0 14px; font-size:14px; }
				.hours-row { display:flex; justify-content:space-between; gap:16px; padding:8px 0; border-top:1px solid #edf0e9; color:var(--muted); font-size:12px; }
				.hours-row strong { color:var(--ink); font-weight:600; }
				.site-footer { border-top:1px solid var(--line); }
				.footer-inner { max-width:1200px; margin:auto; padding:19px 28px; display:flex; justify-content:space-between; gap:16px; color:#7a857e; font-size:11px; }
				@media (max-width:760px) {
					.site-header { height:68px; padding:0 20px; }
					.main-nav { gap:14px; }
					.site-header { height:auto; min-height:68px; flex-wrap:wrap; gap:10px; padding-top:12px; padding-bottom:12px; }
					.main-nav { flex-wrap:wrap; justify-content:flex-end; }
					.main-nav a { padding:7px 9px; }
					.main-nav a svg { display:none; }
					.hero-inner { grid-template-columns:1fr; gap:10px; padding:58px 22px 35px; }
					.hero h1 { max-width:540px; font-size:clamp(42px,10vw,58px); }
					.hero-art { min-height:220px; }
					.art-circle { width:220px; height:220px; }
					.book-stack { transform:scale(.82) rotate(-5deg); }
					.art-note { right:calc(50% - 155px); bottom:2px; }
					.content { padding:48px 22px 54px; }
					.service-grid { grid-template-columns:1fr; }
					.service-card { min-height:0; }
					.bottom-band { grid-template-columns:1fr; margin-top:32px; }
				}
				@media (max-width:440px) {
					.brand { font-size:13px; }
					.brand-mark { width:34px; height:34px; }
					.account-link { padding:9px 11px; font-size:12px; }
					.hero-inner { padding-top:45px; }
					.search-form button { padding:0 12px; }
					.section-heading { align-items:start; flex-direction:column; }
					.footer-inner { flex-direction:column; }
				}
				@media (prefers-reduced-motion:reduce) { *, *:before, *:after { scroll-behavior:auto!important; transition:none!important; } }
			`}</style>

			<SiteHeader />

			<section className="hero" aria-labelledby="hero-title">
				<div className="hero-inner">
					<div>
						<div className="eyebrow">Tu biblioteca, más cerca</div>
						<h1 id="hero-title">Un mundo de ideas <span>te espera.</span></h1>
						<p className="hero-copy">Encuentra tu próxima lectura, consulta el catálogo y gestiona tus préstamos en un solo lugar.</p>
						<form className="search-form" role="search" onSubmit={(event) => {
							event.preventDefault();
							const query = new FormData(event.currentTarget).get('q')?.toString().trim();
							navigate(`/catalogo${query ? `?q=${encodeURIComponent(query)}` : ''}`);
						}}>
							<SearchIcon />
							<label htmlFor="catalog-search" className="visually-hidden">Buscar libros en el catálogo</label>
							<input id="catalog-search" type="search" name="q" placeholder="Busca por título, autor o tema" />
							<button type="submit">Buscar</button>
						</form>
					</div>
					<div className="hero-art" aria-hidden="true">
						<div className="art-circle" />
						<div className="book-stack">
							<div className="book book-one"><div className="book-label">Leer<br />explorar</div></div>
							<div className="book book-two"><div className="book-label">Ideas<br />que inspiran</div></div>
							<div className="book book-three"><div className="book-label">Nuevos<br />horizontes</div></div>
						</div>
						<div className="art-note"><strong>Descubre</strong> algo nuevo hoy</div>
					</div>
				</div>
			</section>

			<main className="content" aria-labelledby="services-title">
				<div className="section-heading">
					<div><div className="eyebrow">Servicios en línea</div><h2 id="services-title">¿Qué necesitas hacer?</h2><p>Accede rápidamente a los servicios de la biblioteca.</p></div>
					<Link className="text-link" to="/catalogo">Explorar catálogo <Arrow /></Link>
				</div>
				<div className="service-grid">
					{services.map((service) => (
						<article className="service-card" key={service.number}>
							<div className="card-top"><span className="card-number">{service.number}</span><span className="card-icon" aria-hidden="true"><service.icon /></span></div>
							<h3>{service.title}</h3><p>{service.text}</p>
							<Link className="card-link" to={service.href} aria-label={service.label}>Acceder <Arrow /></Link>
						</article>
					))}
				</div>

				<div className="bottom-band">
					<aside className="notice" aria-labelledby="notice-title">
						<div className="eyebrow">Información útil</div>
						<h3 id="notice-title">Tu próxima historia comienza aquí.</h3>
						<p>Explora el catálogo para encontrar libros y recursos disponibles para la comunidad universitaria.</p>
					</aside>
					<aside className="hours" aria-labelledby="hours-title">
						<h3 id="hours-title">Horario de atención</h3>
						<div className="hours-row"><span>Lunes a viernes</span><strong>08:30 – 18:00</strong></div>
						<div className="hours-row"><span>Sábados, domingos y festivos</span><strong>Cerrado</strong></div>
					</aside>
				</div>
			</main>

			<footer className="site-footer"><div className="footer-inner"><span>Biblioteca USM · Universidad Técnica Federico Santa María</span><span>Un espacio para aprender y descubrir</span></div></footer>
			<style>{`.visually-hidden { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }`}</style>
		</div>
	);
}
