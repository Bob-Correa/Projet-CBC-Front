import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { useAdmin } from '../../context/AdminContext';
import RetourDashboard from '../../components/RetourDashboard';
import './AdminActualites.css';

export default function AdminActualites() {
  const [actualites, setActualites] = useState([]);
  const [message, setMessage] = useState('');
  

  //const { admin } = useAdmin();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetch('http://localhost:3000/api/actualites', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setActualites(data))
      .catch(() => setMessage("❌ Impossible de charger les actualités"));
  }, []);

  const supprimerActualite = async (id) => {
    const confirm = window.confirm("Supprimer cette actualité ?");
    if (!confirm) return;

    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:3000/api/actualites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      setActualites(actualites.filter(actu => actu._id !== id));
    } else {
      setMessage("❌ Échec de la suppression");
    }
  };

  return (
    <div className="admin-actualites">
    <RetourDashboard />
      <h2>📰 Gestion des actualités</h2>
      <Link to="/admin/actualites/creer" className="btn-ajouter">➕ Nouvelle actualité</Link>

      {message && <p>{message}</p>}

      <ul className="liste-actualites">
        {actualites.map(actu => (
          <li key={actu._id} className="carte-actu">
            <h3>{actu.titre}</h3>
            <p>{actu.contenu.slice(0, 100)}...</p>
            <div className="actions">
              <Link to={`/admin/actualites/modifier/${actu._id}`}>✏️ Modifier</Link>
              <button onClick={() => supprimerActualite(actu._id)}>🗑️ Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
