import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './adminInscriptions.css';
import RetourDashboard from '../../components/RetourDashboard';     





export default function AdminPreinscriptions() {
  const [preinscriptions, setPreinscriptions] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [page, setPage] = useState(1);
  const parPage = 5;
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetch('http://localhost:3000/api/inscriptions', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setPreinscriptions(data))
      .catch(() => setMessage("❌ Impossible de charger les pré-inscriptions"));
  }, [token]);

  const valider = async (id) => {
    const res = await fetch(`http://localhost:3000/api/inscriptions/${id}/valider`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      setPreinscriptions(prev =>
        prev.map(p => p._id === id ? { ...p, statut: 'validée' } : p)
      );
    } else {
      setMessage("❌ Échec de la validation");
    }
  };

  const supprimer = async (id) => {
    const confirm = window.confirm("Supprimer cette pré-inscription ?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/api/inscriptions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      setPreinscriptions(prev => prev.filter(p => p._id !== id));
    } else {
      setMessage("❌ Échec de la suppression");
    }
  };

  const filtres = preinscriptions.filter(p =>
    p.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    p.email.toLowerCase().includes(recherche.toLowerCase())
  );

  const totalPages = Math.ceil(filtres.length / parPage);
  const debut = (page - 1) * parPage;
  const visibles = filtres.slice(debut, debut + parPage);

  return (
    <div className="admin-preinscriptions">
    <RetourDashboard />
      <h2>📋 Gestion des pré-inscriptions</h2>

      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        className="champ-recherche"
      />

      {message && <p>{message}</p>}

      <ul className="liste-preinscriptions">
        {visibles.map(p => (
          <li key={p._id} className="carte-preinscription">
            <h3>{p.nom} {p.prenom}</h3>
            <p><strong>Email :</strong> {p.email}</p>
            <p><strong>Statut :</strong> {p.statut}</p>
            <div className="actions">
              {p.statut !== 'validée' && (
                <button onClick={() => valider(p._id)}>✅ Valider</button>
              )}
              <Link to={`/admin/inscriptions/modifier/${p._id}`}>✏️ Modifier</Link>
              <button onClick={() => supprimer(p._id)}>🗑️ Supprimer</button>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'actif' : ''}
            >
              {i + 1}
            </button>
            
          ))}
          
        </div>
      )}
    </div>
  );
}
