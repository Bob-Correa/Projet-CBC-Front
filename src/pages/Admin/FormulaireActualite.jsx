// src/components/FormulaireActualite.jsx
import { useState } from 'react';
import './adminForm.css';
import RetourDashboard from '../../components/RetourDashboard';

export default function FormulaireActualite() {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !contenu || !image) {
      setMessage("Tous les champs sont requis.");
      return;
    }

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('contenu', contenu);
    formData.append('image', image); // champ 'image' attendu par Multer

    try {
      const token = localStorage.getItem('adminToken'); // ou depuis ton contexte

const res = await fetch('http://localhost:3000/api/actualites', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  body: formData
});


      if (res.ok) {
        setMessage("✅ Actualité créée avec succès !");
        setTitre('');
        setContenu('');
        setImage(null);
      } else {
        const err = await res.json();
        setMessage(`❌ Erreur : ${err.message}`);
      }
    } catch (err) {
      setMessage("❌ Erreur réseau.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-actualite">
    <RetourDashboard />
      <h2>Créer une actualité 📰</h2>

      <input
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />

      <textarea
        placeholder="Contenu"
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Publier</button>

      {message && <p>{message}</p>}
    </form>
  );
}
