import { useEffect, useState } from 'react';
import './actualites.css';

export default function Actualites() {
  const [actualites, setActualites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/actualites')
      .then(res => res.json())
      .then(data => setActualites(data));
  }, []);

  return (
    <div className="page-actualites">
      <h2>🗞️ Actualités du club</h2>
      <div className="liste-actus">
        {actualites.map(actu => (
          <div key={actu._id} className="carte-actu">
            {actu.image && <img src={actu.image} alt={actu.titre} />}
            <h3>{actu.titre}</h3>
            <p className="date">{new Date(actu.datePublication).toLocaleDateString()}</p>
            <p>{actu.contenu}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
