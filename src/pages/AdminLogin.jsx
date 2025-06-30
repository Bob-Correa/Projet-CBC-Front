import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse })
      });

      const data = await res.json();

      if (res.ok) {
        login({ accessToken: data.accessToken });
        navigate('/admin');
      } else {
        setMessage(data.message || "Échec de connexion");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion Admin 🔐</h2>
      <input
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
      />
      <button type="submit">Se connecter</button>
      {message && <p>{message}</p>}
    </form>
  );
}
