import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminActualites() {
  const [actus, setActus] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/actualites', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setActus(data));
  }, []);

  const supprimerActu = async (id) => {
    if (!window.confirm("Supprimer cette actualité ?")) return;

    const res = await fetch(`http://localhost:3000/api/actualites/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.ok) {
      setActus(actus.filter(a => a._id !== id));
    }
  };

  return (
    <div className="admin-actus">
      <h2>🛠️ Gestion des actualités</h2>
      <Link to="/admin/creer">➕ Nouvelle actualité</Link>
      <ul>
        {actus.map(actu => (
          <li key={actu._id}>
            <strong>{actu.titre}</strong>
            <Link to={`/admin/modifier/${actu._id}`}>✏️ Modifier</Link>
            <button onClick={() => supprimerActu(actu._id)}>🗑️ Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
