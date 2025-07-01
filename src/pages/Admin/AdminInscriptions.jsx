import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import './adminInscriptions.css'; // Assurez-vous d'avoir ce fichier CSS pour le style


export default function AdminInscriptions() {
  const [inscriptions, setInscriptions] = useState([]);
  const [categorieFiltre, setCategorieFiltre] = useState('');
  const [statutFiltre, setStatutFiltre] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/inscriptions', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setInscriptions(data));
  }, []);

  const filtrer = (liste) => {
    return liste.filter(i => {
      const matchCategorie = categorieFiltre ? i.categorie === categorieFiltre : true;
      const matchStatut = statutFiltre === 'validees' ? i.validee
                        : statutFiltre === 'nonValidees' ? !i.validee
                        : true;
      return matchCategorie && matchStatut;
    });
  };

  const supprimer = async (id) => {
    if (!window.confirm("Supprimer cette inscription ?")) return;
    await fetch(`http://localhost:3000/api/inscriptions/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    setInscriptions(inscriptions.filter(i => i._id !== id));
  };

  const valider = async (id) => {
    await fetch(`http://localhost:3000/api/inscriptions/${id}/valider`, {
      method: 'PUT',
      credentials: 'include'
    });
    setInscriptions(inscriptions.map(i => i._id === id ? { ...i, validee: true } : i));
  };

  const categories = [...new Set(inscriptions.map(i => i.categorie))];

  return (
    <div>
      <h2>📋 Inscriptions reçues</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select value={categorieFiltre} onChange={e => setCategorieFiltre(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={statutFiltre} onChange={e => setStatutFiltre(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="validees">Validées ✅</option>
          <option value="nonValidees">Non validées ❌</option>
        </select>
      </div>
      <CSVLink
        data={filtrer(inscriptions)}
        filename="inscriptions.csv"
        separator=";"
         className="btn-export"
        >
        📥 Exporter en CSV
        </CSVLink>


      <table>
        <thead>
          <tr>
            <th>Nom</th><th>Prénom</th><th>Catégorie</th><th>Email</th><th>Validée</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtrer(inscriptions).map(i => (
            <tr key={i._id}>
              <td>{i.nom}</td>
              <td>{i.prenom}</td>
              <td>{i.categorie}</td>
              <td>{i.email}</td>
              <td>{i.validee ? '✅' : '❌'}</td>
              <td>
                <button onClick={() => valider(i._id)} disabled={i.validee}>Valider</button>
                <button onClick={() => supprimer(i._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
