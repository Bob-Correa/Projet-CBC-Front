import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './adminForm.css';
import RetourDashboard from '../../components/RetourDashboard';

export default function ModifierPreinscription() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [statut, setStatut] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetch(`http://localhost:3000/api/preinscriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setNom(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setStatut(data.statut || '');
      })
      .catch(() => setMessage("❌ Impossible de charger la pré-inscription"));
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/preinscriptions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nom, prenom, email, statut })
    });

    if (res.ok) {
      navigate('/admin/preinscriptions');
    } else {
      const err = await res.json();
      setMessage(err.message || "❌ Erreur lors de la modification");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-preinscription">
    <RetourDashboard />
      <h2>✏️ Modifier la pré-inscription</h2>

      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <select value={statut} onChange={(e) => setStatut(e.target.value)} required>
        <option value="">-- Statut --</option>
        <option value="en attente">En attente</option>
        <option value="validée">Validée</option>
        <option value="refusée">Refusée</option>
      </select>

      <button type="submit">💾 Enregistrer</button>
      {message && <p>{message}</p>}
    </form>
  );
}
