import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AffichageActualite from '../components/AffichageActualite';
import './ActualiteDetails.css'; // Assurez-vous d'avoir ce fichier CSS pour le style
import { API_URL } from '../config.js'; // Assurez-vous que le chemin est correct

export default function ActualiteDetail() {
  const { id } = useParams();
  const [actu, setActu] = useState(null);

  console.log("🧭 ID récupéré depuis l'URL :", id);

  useEffect(() => {
    fetch(`${API_URL}/actualites/${id}`)
      .then(res => {
        console.log("📡 Réponse fetch :", res);
        return res.json();
      })
      .then(data => {
        console.log("✅ Données reçues :", data);
        setActu(data);
      })
      .catch(err => {
        console.error("❌ Erreur lors du fetch :", err);
      });
  }, [id]);

  if (!actu) return <p>Chargement de l’actualité...</p>;

return <AffichageActualite actu={actu} />;

}
