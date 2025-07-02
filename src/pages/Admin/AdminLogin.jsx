import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './adminForm.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { setAdmin } = useAdmin();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        credentials: 'include', // important pour le cookie refreshToken
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);

        // Optionnel : appel immédiat au profil
        const profilRes = await fetch('http://localhost:3000/api/admin/profil', {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });

        const adminData = await profilRes.json();
        setAdmin(adminData);

        navigate('/admin');
      } else {
        setMessage(data.message || 'Échec de la connexion');
      }
    } catch (err) {
      setMessage('❌ Erreur serveur');
    }
  };

  return (
    <form onSubmit={handleLogin} className="admin-form">
      <h2>Connexion Admin 🔐</h2>

      <input
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>
        Mot de passe
        <div className="input-mdp">
          <input
            type={afficherMotDePasse ? 'text' : 'password'}
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
          <button
            type="button"
            className="btn-toggle-mdp"
            onClick={() => setAfficherMotDePasse((prev) => !prev)}
            aria-label="Afficher ou masquer le mot de passe"
          >
            {afficherMotDePasse ? '🙈' : '👁️'}
          </button>
        </div>
      </label>

      <button type="submit">Se connecter</button>
      {message && <p className="message-erreur">{message}</p>}
    </form>
  );
}
