import { useState } from 'react';
import './adminForm.css';
import RetourDashboard from '../../components/RetourDashboard';
import LibrairieImages from '../../components/LibrairieImages';
import { API_URL } from '../../config.js'; // Assurez-vous que le chemin est correct

export default function FormulaireActualite() {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [imageUpload, setImageUpload] = useState(null); // fichier uploadé
  const [imageLibrairie, setImageLibrairie] = useState(null); // image sélectionnée
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !contenu || (!imageUpload && !imageLibrairie)) {
      setMessage("Tous les champs sont requis.");
      return;
    }

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('contenu', contenu);

    if (imageUpload) {
      formData.append('image', imageUpload);
    } else if (imageLibrairie) {
      formData.append('image', imageLibrairie); // envoyer le chemin
    }

    try {
      const token = localStorage.getItem('adminToken');

      const res = await fetch(`${API_URL}/actualites`, {
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
        setImageUpload(null);
        setImageLibrairie(null);
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

      <label>📤 Importer une nouvelle image :</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
          setImageLibrairie(null); // reset sélection
        }}
      />

      <label>📁 ...ou choisir une image existante :</label>
      <LibrairieImages onSelect={(imgPath) => {
        setImageLibrairie(imgPath);
        setImageUpload(null); // reset upload
      }} />

      {(imageLibrairie || imageUpload) && (
        <div className="apercu-image">
          <p>✅ Image sélectionnée :</p>
          <img
            src={
              imageUpload
                ? URL.createObjectURL(imageUpload)
                : `${API_URL}${imageLibrairie}`
            }
            alt={`Prévisualisation de l’image : ${imageLibrairie || imageUpload.name}`}

            style={{ maxWidth: '120px', borderRadius: '6px' }}
          />
        </div>
      )}

      <button type="submit">Publier</button>

      {message && <p>{message}</p>}
    </form>
  );
}
