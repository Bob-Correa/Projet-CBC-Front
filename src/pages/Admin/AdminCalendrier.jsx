import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminCalendrier.css';
import RetourDashboard from '../../components/RetourDashboard';
import { API_URL } from '../../config.js'; // Assurez-vous que le chemin est correct

export default function AdminCalendrier() {
  const [evenements, setEvenements] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetch(`${API_URL}/calendrier`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setEvenements(data))
      .catch(() => setMessage("❌ Impossible de charger les événements"));
  }, [token]);

  const supprimerEvenement = async (id) => {
    const confirm = window.confirm("🗑️ Supprimer cet événement ?");
    if (!confirm) return;

    const res = await fetch(`${API_URL}/calendrier/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      setEvenements(prev => prev.filter(ev => ev._id !== id));
    } else {
      setMessage("❌ Échec de la suppression");
    }
  };

  const formaterDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="admin-calendrier">
      <RetourDashboard />
      <h2>🛠️ Gestion du calendrier</h2>
      <Link to="/admin/calendrier/ajouter" className="btn-ajouter">➕ Ajouter un événement</Link>

      {message && <p>{message}</p>}

      <ul className="liste-evenements">
        {evenements.map(ev => (
          <li key={ev._id} className={`carte-evenement carte-${ev.typeEvenement}`}>
            <h3>{ev.titre}</h3>
            <p><strong>📅 Début :</strong> {formaterDate(ev.dateDebut)}</p>
            {ev.dateFin && <p><strong>📅 Fin :</strong> {formaterDate(ev.dateFin)}</p>}
            {ev.lieu && <p><strong>📍 Lieu :</strong> {ev.lieu}</p>}
            {ev.categorie && <p><strong>👥 Catégorie :</strong> {ev.categorie}</p>}
            {ev.score && <p><strong>🏆 Score :</strong> {ev.score}</p>}
            <p><strong>🔖 Type :</strong> {ev.typeEvenement}</p>
            <p><strong>👁️ Visibilité :</strong> {ev.visibilite}</p>
            <p><strong>🚩 Statut :</strong> {ev.statut}</p>

            <div className="actions">
              <Link to={`/admin/calendrier/modifier/${ev._id}`}>✏️ Modifier</Link>
              <button onClick={() => supprimerEvenement(ev._id)}>🗑️ Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
