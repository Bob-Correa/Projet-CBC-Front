import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AjouterEvenement.css';
import RetourDashboard from '../../components/RetourDashboard';

export default function AjouterEvenement() {
  const [evenement, setEvenement] = useState({
    titre: '',
    description: '',
    lieu: '',
    typeEvenement: '',
    categorie: '',
    dateDebut: '',
    dateFin: '',
    touteLaJournee: false,
    visibilite: 'publique',
    statut: 'confirmé',
    scoreA: '',
    scoreB: '',
    equipeA: '',
    equipeB: '',


  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvenement(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const scoreFormate = `${evenement.equipeA} ${evenement.scoreA} – ${evenement.scoreB} ${evenement.equipeB}`;
const payload = {
  ...evenement,
  score: scoreFormate,
};

      const res = await fetch('http://localhost:3000/api/calendrier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMessage('✅ Événement créé avec succès');
        setTimeout(() => navigate('/admin/calendrier'), 1500);
      } else {
        const err = await res.json();
        setMessage(`❌ ${err.message || 'Erreur lors de la création'}`);
      }
    } catch {
      setMessage('❌ Serveur inaccessible');
    }
  };

  return (
    <div className="ajout-evenement">
      <RetourDashboard />
      <h2>🆕 Ajouter un événement</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titre" value={evenement.titre} onChange={handleChange} placeholder="Titre" required />
        <textarea name="description" value={evenement.description} onChange={handleChange} placeholder="Description" />

        <input type="text" name="lieu" value={evenement.lieu} onChange={handleChange} placeholder="Lieu" />
        
        <select name="typeEvenement" value={evenement.typeEvenement} onChange={handleChange} required>
          <option value="">Type d'événement</option>
          <option value="entrainement">Entraînement</option>
          <option value="match">Match</option>
          <option value="reunion">Réunion</option>
          <option value="autre">Autre</option>
        </select>

        <select name="categorie" value={evenement.categorie} onChange={handleChange}>
          <option value="">Catégorie concernée (facultatif)</option>
          {[
            "Baby Basket", "U7", "U9F", "U9G", "U11F", "U11G",
            "U13F", "U13G", "U15F", "U15G", "U18F", "U18G",
            "Senior Femme", "Senior Homme", "Loisirs"
          ].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>
          📅 Date de début :
          <input type="datetime-local" name="dateDebut" value={evenement.dateDebut} onChange={handleChange} required />
        </label>

        <label>
          📅 Date de fin :
          <input type="datetime-local" name="dateFin" value={evenement.dateFin} onChange={handleChange} />
        </label>

        <label>
          <input type="checkbox" name="touteLaJournee" checked={evenement.touteLaJournee} onChange={handleChange} />
          Toute la journée
        </label>

        <select name="visibilite" value={evenement.visibilite} onChange={handleChange}>
          <option value="publique">Publique</option>
          <option value="admin">Réservé aux admins</option>
          <option value="privee">Privé</option>
        </select>

        <select name="statut" value={evenement.statut} onChange={handleChange}>
          <option value="confirmé">Confirmé</option>
          <option value="reporté">Reporté</option>
          <option value="annulé">Annulé</option>
        </select>
                    <div className="champ-score">
              <input
                type="text"
                name="equipeA"
                value={evenement.equipeA}
                onChange={handleChange}
                placeholder="Équipe A"
                required={evenement.typeEvenement === 'match'}
              />

              <input
                type="number"
                name="scoreA"
                value={evenement.scoreA}
                onChange={handleChange}
                placeholder="Score A"
                min="0"
              />

              <span className="separateur-score">–</span>

              <input
                type="number"
                name="scoreB"
                value={evenement.scoreB}
                onChange={handleChange}
                placeholder="Score B"
                min="0"
              />

              <input
                type="text"
                name="equipeB"
                value={evenement.equipeB}
                onChange={handleChange}
                placeholder="Équipe B"
                required={evenement.typeEvenement === 'match'}
              />
            </div>



        <button type="submit">Créer</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
