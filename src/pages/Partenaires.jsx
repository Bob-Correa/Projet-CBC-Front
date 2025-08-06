import './Partenaires.css';

const partenaires = [
  {
    nom: 'Supermarché Super U',
    logo: '/Logo/superu.png',
    lien: 'https://www.craumarket.fr',
  },
  {
    nom: 'Garage AutoPro',
    logo: '/logos/autopro.png',
    lien: 'https://www.autopro.fr',
  },
  {
    nom: 'Crédit Agricole',
    logo: '/logos/credit-agricole.png',
    lien: 'https://www.credit-agricole.fr',
  },
  {
    nom: 'Ville de Saint-Martin-de-Crau',
    logo: '/Logo/smc.jpg',
    lien: 'https://www.saintmartindecrau.fr',
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
