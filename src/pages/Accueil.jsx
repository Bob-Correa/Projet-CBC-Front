import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BandeauEvenement from '../components/BandeauEvenement';
import './accueil.css';

export default function Accueil() {
  const [actus, setActus] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/actualites/derniere')
      .then(res => res.json())
      .then(data => setActus(data.slice(0, 3)));
  }, []);

  return (
    <div className="accueil">
      <BandeauEvenement />

      <h1 className="titre-accueil">Bienvenue sur le site du CBC 🏀</h1>

      <div className="bloc-actus">
        {actus.map(actu => (
          <div key={actu._id} className="carte-actu">
            {actu.image && <img src={actu.image} alt={actu.titre} />}
            <h3>{actu.titre}</h3>
            <Link to={`/actualites/${actu.slug}`} className="lien-actu">Lire la suite</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
