import './Bureau.css';

const membres = [
    { nom: 'Veronique Castillo' , role: 'Presidente', photo: '/Photo-membre' },
    { nom: 'Semchaa Haroun' , role: 'Vice-Presidente', photo: '/Photo-membre/Semchaa.JPG' },
    { nom: 'Peggy Cavallin' , role: 'Trésorière', photo: '/Photo-membre/Peggy.jpg' },
    { nom: 'Bob Correa' , role: 'Secrétaire Générale', photo: '/Photo-membre/Bob.jpg' },
    { nom: 'Nicolas Djemai' , role: 'Correspondant', photo: '/Photo-membre/Nicolas.JPG' },
    { nom: 'Lucas De Freitas' , role: 'Membre Assesseur', photo: '/Photo-membre' },
    { nom: 'Yanis Medjbar' , role: 'Membre Assesseur', photo: '/Photo-membre' },
    { nom: 'Manon Tirabassi' , role: 'Membre Assesseur', photo: '/Photo-membre/Manon.jpg' },
    { nom: 'Olivier Daran' , role: 'Membre Assesseur', photo: '/Photo-membre/olivier.jpg' },

];

export default function Bureau() {
  return (
    <div className="page-bureau">
      <h2> Le Bureau </h2>
      <div className="grille-bureau">
        {membres.map((membre, i) => (
          <div key={i} className="carte-membre">
            <img src={membre.photo} alt={membre.nom} />
            <h3>{membre.nom}</h3>
            <p>{membre.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}