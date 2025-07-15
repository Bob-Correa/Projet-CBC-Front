// src/pages/Admin/FormVideo.jsx
import { useState } from 'react';
import RetourDashboard from '../../components/RetourDashboard';
import './adminForm.css';

export default function FormVideo() {
  const [titre, setTitre] = useState('');
  const [url, setUrl] = useState('');
  const [equipe1, setEquipe1] = useState('');
  const [equipe2, setEquipe2] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titre || !url || !equipe1 || !equipe2 || !matchDate) {
      setMessage("Tous les champs obligatoires doivent être remplis");
      return;
    }

    const data = {
      titre,
      url,
      equipe: [equipe1, equipe2],
      matchDate,
      description
    };

    const token = localStorage.getItem('adminToken');
    const res = await fetch('http://localhost:3000/api/media/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      setMessage("✅ Vidéo ajoutée !");
      setTitre('');
      setUrl('');
      setEquipe1('');
      setEquipe2('');
      setMatchDate('');
      setDescription('');
    } else {
      setMessage("❌ Erreur lors de l’enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <RetourDashboard />
      <h2>🎥 Ajouter une vidéo de match</h2>

      <label>
        Titre
        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
      </label>

      <label>
        URL YouTube/Vimeo
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>

      <label>
        Équipe 1
        <input type="text" value={equipe1} onChange={(e) => setEquipe1(e.target.value)} />
      </label>

      <label>
        Équipe 2
        <input type="text" value={equipe2} onChange={(e) => setEquipe2(e.target.value)} />
      </label>

      <label>
        Date du match
        <input type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} />
      </label>

      <label>
        Description
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <button type="submit">Ajouter</button>
      {message && <p>{message}</p>}
    </form>
  );
}
