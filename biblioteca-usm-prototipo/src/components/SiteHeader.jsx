import { BookOpen, CalendarDays, Laptop, Library } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const navigation = [
  { to: '/catalogo', label: 'Catálogo', icon: BookOpen },
  { to: '/salas', label: 'Salas', icon: CalendarDays },
  { to: '/colecciones', label: 'Colecciones', icon: Laptop },
  { to: '/prestamos', label: 'Mis préstamos', icon: Library, account: true },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Biblioteca USM, inicio">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M4 5.5c2.8-.8 5.4-.2 8 1.7v12c-2.6-1.9-5.2-2.5-8-1.7v-12Zm16 0c-2.8-.8-5.4-.2-8 1.7v12c2.6-1.9 5.2-2.5 8-1.7v-12Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </span>
        <span>
          Biblioteca USM
          <small>Universidad Técnica Federico Santa María</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Navegación principal">
        {navigation.map(({ to, label, icon: Icon, account }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [account && 'account-link', isActive && 'active']
                .filter(Boolean)
                .join(' ')
            }
          >
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
