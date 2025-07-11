import { Link } from 'react-router-dom';
import './Header.css';
import { useAdmin } from '../context/AdminContext';
import { useState } from 'react';

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { user, logout } = useAdmin();

  return (
    <header className="header">
      <div className="bloc-logo">
        <Link to="/" className="logo-link">
          <img src="/logo-cbc-SA.png" alt="Logo du club" className="logo" />
        </Link>
        <span className="titre-club">Crau Basket Club</span>
      </div>

      <button
        className="burger"
        onClick={() => setMenuOuvert(!menuOuvert)}
        aria-label="Menu burger"
      >
        <span className="barre"></span>
        <span className="barre"></span>
        <span className="barre"></span>
      </button>

      <nav className={`menu ${menuOuvert ? 'ouvert' : ''}`}>
        <div className="menu-deroulant">
        <span className="menu-titre">Boutique ▾</span>
          <div className="sous-menu">
              <a
            href="https://www.ekinsport.com/fr/ma-boutique-club/basketball/craubasketclub"
            target="_blank"
            rel="noopener noreferrer"  >
              Boutique Ekinsport
              </a>
              <Link to="/boutique">Boutique CBC</Link>
        </div>
          </div>

        <Link to="/inscription">Pré-Inscription</Link>
        <Link to="/actualites">Actualités</Link>
        <Link to="/partenaires">Partenaires</Link>
        <Link to="/medias">Médias</Link>
        <Link to="/calendrier">Calendrier</Link>
        <Link to="/contact">Contact</Link>
        {user?.accessToken ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <button onClick={logout}>Déconnexion</button>
          </>
        ) : (
          <Link to="/admin/login">Admin</Link>
        )}
      </nav>
    </header>
  );
}

