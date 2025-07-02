import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './adminForm.css';
import RetourDashboard from '../../components/RetourDashboard';


export default function ModifierActualite() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Charger l’actu existante
    const token = localStorage.getItem('adminToken');
    fetch(`http://localhost:3000/api/actualites/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setTitre(data.titre);
        setContenu(data.contenu);
      })
      .catch(() => setMessage("❌ Impossible de charger l’actualité"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('contenu', contenu);
    if (image) formData.append('image', image);

    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch(`http://localhost:3000/api/actualites/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        setMessage("✅ Actualité modifiée !");
        navigate('/admin');
      } else {
        const err = await res.json();
        setMessage(`❌ ${err.message}`);
      }
    } catch (err) {
      setMessage("❌ Erreur réseau");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-actualite">
    <RetourDashboard />
      <h2>Modifier l’actualité ✏️</h2>

      <input
        type="text"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        placeholder="Titre"
      />

      <textarea
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        placeholder="Contenu"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Enregistrer</button>
      {message && <p>{message}</p>}
    </form>
  );
}
