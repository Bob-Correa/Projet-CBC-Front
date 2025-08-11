import { useState } from 'react';
import { API_URL } from '../config.js'; // Assurez-vous que le chemin est correct

function FormulaireAjoutAdmin({ onAdminAjoute }) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [role, setRole] = useState('admin');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reponse = await fetch(`${API_URL}admin/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nom, email, motDePasse, role })
    });

    const resultat = await reponse.json();

    if (reponse.ok) {
      setMessage('✅ Admin créé avec succès !');
      onAdminAjoute(); // pour rafraîchir la liste
      setNom('');
      setEmail('');
      setMotDePasse('');
      setRole('admin');
    } else {
      setMessage(`❌ Erreur : ${resultat.message || 'Impossible de créer l’admin.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-ajout-admin">
      <h3>➕ Ajouter un administrateur</h3>
      <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} required />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="superadmin">Superadmin</option>
      </select>
      <button type="submit">Créer</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default FormulaireAjoutAdmin;
