import { useEffect, useState } from 'react';
import './ActuCarrousel.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../config.js'; // Assurez-vous que le chemin est correct


export default function ActuCarrousel() {
  const [actualites, setActualites] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/actualites`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setActualites(data);
      });
  }, []);

  useEffect(() => {
    const auto = setInterval(() => {
      setIndex(prev => (prev + 1) % actualites.length);
    }, 5000);
    return () => clearInterval(auto);
  }, [actualites.length]);

  if (actualites.length === 0) return null;

  const actu = actualites[index];

  const precedent = () => {
    setIndex(prev => (prev - 1 + actualites.length) % actualites.length);
  };

  const suivant = () => {
    setIndex(prev => (prev + 1) % actualites.length);
  };

  return (
    <div className="carrousel-actu">
      <div className="carrousel-visuel">
  {actu.image && (
    <Link to={`/actualites/${actu.slug}`}>
      <img
        src={`${API_URL}${actu.image}`}
        alt={actu.titre}
        className="carrousel-image"
      />
    </Link>
  )}
</div>


      <div className="carrousel-infos">
        <h3>{actu.titre}</h3>
        <p>{actu.contenu.slice(0, 120)}...</p>
        <a href="/actualites">Lire la suite →</a>
        <div className="carrousel-nav">
          <button onClick={precedent}>←</button>
          <button onClick={suivant}>→</button>
        </div>
      </div>
    </div>
  );
}
