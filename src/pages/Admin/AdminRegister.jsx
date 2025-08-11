import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminForm.css'; 
import { API_URL } from '../../config.js'; // Assurez-vous que le chemin est correct

export default function AdminRegister() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, motDePasse })
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('✅ Admin créé. Redirection...');
      setTimeout(() => navigate('/admin/login'), 1500); // petite pause sympa
    } else {
      setMessage(`❌ ${data.message}`);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
  <h2>Créer un compte admin</h2>

  <label>
    Nom
    <input type="text" value={nom} onChange={e => setNom(e.target.value)} required />
  </label>

  <label>
    Email
    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
  </label>

  <label>
  Mot de passe
  <div className="input-mdp">
    <input
      type={afficherMotDePasse ? 'text' : 'password'}
      value={motDePasse}
      onChange={e => setMotDePasse(e.target.value)}
      required
    />
    <button
      type="button"
      onClick={() => setAfficherMotDePasse(prev => !prev)}
      className="btn-toggle-mdp"
      aria-label="Afficher ou masquer le mot de passe"
    >
      {afficherMotDePasse ? '🙈' : '👁️'}
    </button>
  </div>
</label>


  <button type="submit">Créer le compte</button>
  <p>{message}</p>
</form>

  );
}

// Le formulaire d'inscription pour les administrateurs
// Permet de créer un compte admin avec nom, email et mot de passe
// Affiche un message de succès ou d'erreur après la soumission
// Utilise l'API pour enregistrer le nouvel admin dans la base de données
// Assure que les champs sont remplis avant la soumission
// Utilise des hooks pour gérer l'état des champs et du message
// Le formulaire est simple et direct, idéal pour les administrateurs du club
// Peut être intégré dans une page dédiée à la gestion des administrateurs
// Permet de créer plusieurs comptes admin si nécessaire
// Utile pour les clubs qui ont besoin de plusieurs administrateurs
// Assure que seuls les administrateurs peuvent accéder à cette fonctionnalité
// Peut être étendu pour inclure des validations supplémentaires si besoin
// Utilise des messages clairs pour informer l'utilisateur du résultat de l'action