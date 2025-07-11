import { useEffect, useState } from 'react';
import './actualites.css';

export default function Actualites() {
  const [actualites, setActualites] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [articleActif, setArticleActif] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/actualites')
      .then(res => res.json())
      .then(data => setActualites(data));
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
          <div key={actu._id} className="carte-actu" onClick={() => setArticleActif(actu)}>
            {actu.image && <img src={actu.image} alt={actu.titre} />}
            <h3>{actu.titre}</h3>
            <p className="date">{new Date(actu.datePublication).toLocaleDateString('fr-FR')}</p>
            <p>{actu.contenu.slice(0, 160)}...</p>
            <span className="lire-suite">📖 Lire la suite</span>
          </div>
        ))}
      </div>

      {articleActif && (
        <div className="modal-actu" onClick={() => setArticleActif(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3>{articleActif.titre}</h3>
            {articleActif.image && <img src={articleActif.image} alt={articleActif.titre} />}
            <p className="date">{new Date(articleActif.datePublication).toLocaleDateString('fr-FR')}</p>
            <p>{articleActif.contenu}</p>
            <button onClick={() => setArticleActif(null)}>❌ Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
