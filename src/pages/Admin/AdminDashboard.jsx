
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './AdminDashboard.css'; 

export default function AdminDashboard() {
  const { admin, logout, loading } = useAdmin();
    if (loading) return <p>Chargement...</p>;
    if (!admin) return <p>⛔ Accès interdit</p>;
  return (
    <div className="admin-dashboard">
      <h2>Bienvenue {admin?.nom || 'Admin'} 👋</h2>
      <p>Que souhaitez-vous gérer aujourd’hui ?</p>
      <button onClick={logout}>Se déconnecter</button>

      <div className="admin-sections">
        <Link to="/admin/actualites" className="admin-card">
          📰 <strong>Actualités</strong>
          <span>Créer, modifier, supprimer des articles</span>
        </Link>

        <Link to="/admin/preinscriptions" className="admin-card">
          📋 <strong>Pré-inscriptions</strong>
          <span>Valider, modifier ou supprimer les demandes</span>
        </Link>

        <Link to="/admin/medias" className="admin-card">
          🖼️ <strong>Médias</strong>
          <span>Albums photos, vidéos, galeries</span>
        </Link>

        <Link to="/admin/calendrier" className="admin-card">
          📅 <strong>Calendrier</strong>
          <span>Rencontres, scores, événements</span>
        </Link>
      </div>
    </div>
  );
}
