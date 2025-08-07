import { useNavigate } from "react-router-dom";

export default function AffichageActualite({ actu }) {
  const navigate = useNavigate();
  return (
    <div className="page-actu-detail">
      <div className="date">
        {new Date(actu.datePublication).toLocaleDateString('fr-FR')}
      </div>

      <h2>{actu.titre}</h2>

      <div className="page-actu-content">
        <div className="image-container">
          {actu.image && (
            <img
              src={`http://localhost:3001${actu.image}`}
              alt={actu.titre}
            />
          )}
        </div>

        <div className="text-container">
          <p>{actu.contenu}</p>
        </div>

        <button className="btn-retour" onClick={() => navigate('/actualites')}>
        ← Retour aux actualités
      </button>
      </div>
    </div>
  );
}
