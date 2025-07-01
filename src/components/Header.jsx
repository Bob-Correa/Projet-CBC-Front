// src/components/Header.jsx
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const{ user, logout } = useAuth();
  return (
    <header className="header">
      <div className="logo-zone">
        <img src="/logo-cbc-SA.png" alt="Logo du club" className="logo" />
        <h1>Crau Basket Club</h1>
      </div>
      <nav className="menu-horizontal">
        <Link to="/boutique">Boutique</Link>
        <Link to="/inscription">Pré-Inscription</Link>
        <Link to="/actualites">Actualités</Link>
        <Link to="/partenaires">Partenaires</Link>
        <Link to="/medias">Médias</Link>
        <Link to="/calendrier">Calendrier</Link>
        <Link to="/contact">Contact</Link>
        {user?.accessToken ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <button onClick={logout} className="admin-logout">Déconnexion</button>
          </>
        ) : (
          <Link to="/admin/login" className="admin-login">Admin</Link>
        )}
      </nav>
    </header>
  );
}
