import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BandeauEvenement from '../components/BandeauEvenement';
import './accueil.css';
import ActuCarrousel from '../components/ActuCarrousel';
import { API_URL } from '../config.js'; // Assurez-vous que le chemin est correct

export default function Accueil() {
  const [actus, setActus] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/actualites/derniere`)
      .then(res => res.json())
      .then(data => setActus(data.slice(0, 3)));
  }, []);
  const partenaires = [
  { nom: 'Intermarché', logo: '/Logo/intermarche.jpg' },
  { nom: 'Kyks Tacos', logo: '/Logo/kyks-tacos.png' },
  { nom: 'Nestenn Immobilier', logo: '/Logo/NESTENN-BLANC.png' },
  { nom: 'Ville de Saint-Martin-de-Crau', logo: '/Logo/smc.jpg' },
  { nom: 'CM Coaching', logo: '/Logo/Cm.png' },
  
];


  return (
    <><div className="accueil">
      <BandeauEvenement />
      <ActuCarrousel />
      <h1 className="titre-accueil">Dernières Infos 🏀</h1>

    <div className="bloc-actus">
  {actus.map(actu => (
    <Link
      key={actu._id}
      to={`/actualites/${actu.slug}`}
      className="carte-actu"
    >
      {actu.image && <img src={actu.image} alt={actu.titre} />}
      <h3>{actu.titre}</h3>
      <p className="lien-actu">Lire la suite</p>
    </Link>
  ))}
</div>

    </div><div className="section-partenaires">
        <h2>Nos partenaires</h2>
        <div className="grille-logos">
          {partenaires.map((p, i) => (
            <div key={i} className="logo-partenaire">
              <img src={p.logo} alt={p.nom} />
            </div>
          ))}
        </div>
      </div></>

  );
}
