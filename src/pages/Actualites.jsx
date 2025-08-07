import { useEffect, useState } from 'react';
import './actualites.css';
import { Link } from 'react-router-dom';

export default function Actualites() {
  const [actualites, setActualites] = useState([]);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/actualites')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setActualites(data))
      .catch(err => {
        console.error('❌ Erreur lors du fetch des actualités :', err);
      });
  }, []);

  const actualitesFiltrees = actualites
    .filter(actu =>
      actu.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      actu.contenu.toLowerCase().includes(recherche.toLowerCase())
    )
    .sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));

  return (
    <div className="page-actualites">
      <h2>🗞️ Actualités du club</h2>

      <input
        type="text"
        placeholder="🔍 Rechercher une actualité..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        className="champ-recherche"
      />

      <div className="liste-actus">
        {actualitesFiltrees.map(actu => (
          <div key={actu._id} className="carte-actu">
            <Link to={`/actualites/${actu._id}`}>
              {actu.image && <img src={actu.image} alt={actu.titre} />}
              <h3>{actu.titre}</h3>
            </Link>
            <p className="date">{new Date(actu.datePublication).toLocaleDateString('fr-FR')}</p>
            <p>{actu.contenu.slice(0, 160)}...</p>
            <Link to={`/actualites/${actu._id}`} className="lire-suite">📖 Lire la suite</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
