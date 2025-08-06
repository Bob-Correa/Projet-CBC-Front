// src/pages/Page404.jsx
import { Link } from 'react-router-dom';
import './Page404.css';

export default function Page404() {
  return (
    <div className="page-404">
      <h1>404 🕳️</h1>
      <p>Oups… cette page n’existe pas ou a été déplacée.</p>
      <Link to="/" className="btn-retour">🏠 Retour à l’accueil</Link>
    </div>
  );
}
