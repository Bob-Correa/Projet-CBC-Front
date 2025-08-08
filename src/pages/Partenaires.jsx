import './Partenaires.css';

const partenaires = [
  {
    nom: 'Intermarché',
    logo: '/Logo/intermarche.jpg',
    lien: 'https://www.intermarche.com/accueil',
  },
  {
    nom: 'Nestenn Immobilier',
    logo: '/Logo/NESTENN-BLANC.png',
    lien: 'https://nestenn.com/vente/saint-martin-de-crau-13310',
  },
  {
    nom: 'CM Coaching',
    logo: '/Logo/Cm.png',
    lien: 'https://www.cmcoaching.fr',
  },
  {
    nom: 'Ville de Saint-Martin-de-Crau',
    logo: '/Logo/smc.jpg',
    lien: 'https://www.saintmartindecrau.fr',
  },
  {
    nom: 'Kyks Tacos',
    logo: '/Logo/kyks-tacos.png',
    lien: 'https://www.facebook.com/Lotentik13310/?locale=fr_FR',
  },
  // Ajoute autant de partenaires que tu veux
];

export default function Partenaires() {
  return (
    <div className="partenaires-container">
      <h2>Nos partenaires</h2>
      <div className="grille-partenaires">
        {partenaires.map((partenaire, index) => (
          <a
            key={index}
            href={partenaire.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="carte-partenaire"
          >
            <img src={partenaire.logo} alt={partenaire.nom} />
            <p>{partenaire.nom}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
