// src/pages/Admin/FormAlbum.jsx
import { useState } from 'react';
import RetourDashboard from '../../components/RetourDashboard';
import './adminForm.css';
import { API_URL } from '../../config.js'; // Assurez-vous que le chemin est correct

export default function FormAlbum() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titre || !categorie || images.length === 0) {
      setMessage("Tous les champs sont requis");
      return;
    }

    const data = new FormData();
    data.append('titre', titre);
    data.append('description', description);
    data.append('categorie', categorie);
    images.forEach(img => data.append('images', img));

    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_URL}/media/albums`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    });

    if (res.ok) {
      setMessage("✅ Album créé !");
      setTitre('');
      setDescription('');
      setCategorie('');
      setImages([]);
    } else {
      setMessage("❌ Erreur lors de la création");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <RetourDashboard />
      <h2>📁 Créer un album photo</h2>

      <label>
        Titre
        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
      </label>

      <label>
        Description
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label>
  Catégorie
  <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
    <option value="">-- Sélectionner --</option>
    <option value="Matchs">Matchs</option>
    <option value="Tournois">Tournois</option>
    <option value="Événements">Événements</option>
    <option value="Coulisses">Coulisses</option>
  </select>
</label>


      <label>
        Images (max 10)
        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
      </label>

      <button type="submit">Créer l’album</button>
      {message && <p>{message}</p>}
    </form>
  );
}
