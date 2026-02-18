import { useState } from 'react';
import './Bureau.css';

const membres = [
  { id: 1, nom: 'Veronique Castillo', role: 'Presidente', photo: '/Photo-membre/Vero.jpeg' },
  { id: 2, nom: 'Semchaa Haroun', role: 'Vice-Presidente', photo: '/Photo-membre/Semchaa.JPG' },
  { id: 3, nom: 'Peggy Cavallin', role: 'Trésorière', photo: '/Photo-membre/Peggy.jpg' },
  { id: 4, nom: 'Bob Correa', role: 'Secrétaire Générale', photo: '/Photo-membre/Bob.jpg' },
  { id: 5, nom: 'Nicolas Djemai', role: 'Correspondant', photo: '/Photo-membre/Nicolas.JPG' },
  { id: 6, nom: 'Lucas De Freitas', role: 'Membre Assesseur', photo: '/Photo-membre/Lucas.jpeg' },
  { id: 7, nom: 'Yanis Medjbar', role: 'Membre Assesseur', photo: '/Photo-membre/Yaya.jpg' },
  { id: 8, nom: 'Manon Tirabassi', role: 'Membre Assesseur', photo: '/Photo-membre/Manon.jpg' },
  { id: 9, nom: 'Olivier Daran', role: 'Membre Assesseur', photo: '/Photo-membre/olivier.jpg' },
];


export default function Bureau() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="page-bureau">
      <h2>Le Bureau</h2>
      <div className="grille-bureau">
        {membres.map((membre) => {
          const isFlipped = flippedCards[membre.id];
          return (
            <div key={membre.id} className="carte-membre" onClick={() => toggleFlip(membre.id)}>
              <div className={`carte-inner ${isFlipped ? 'flipped' : ''}`}>
                <div className="carte-front">
                  <img src={membre.photo} alt={membre.nom} />
                  <h3>{membre.nom}</h3>
                  <p>{membre.role}</p>
                </div>
                <div className="carte-back">
                  <h3>{membre.nom}</h3>
                  <p>Âge : {membre.age || '—'}</p>
                  
                  <p>💬 "{membre.citation || '—'}"</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
