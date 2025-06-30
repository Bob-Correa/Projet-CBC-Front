import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ModifierActualite() {
  const { id } = useParams();
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/api/actualites/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitre(data.titre);
        setContenu(data.contenu);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/actualites/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ titre, contenu })
    });
    alert("✅ Actualité mise à jour !");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>✏️ Modifier l’actualité</h2>
      <input value={titre} onChange={(e) => setTitre(e.target.value)} />
      <textarea value={contenu} onChange={(e) => setContenu(e.target.value)} />
      <button type="submit">Enregistrer</button>
    </form>
  );
}
