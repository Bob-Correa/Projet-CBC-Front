import './boutique.css';

export default function Boutique() {
  return (
    <div className="boutique-en-attente">
      <h2>🛍️ Boutique en préparation</h2>
      <p>
        Patience... Les produits du club seront bientôt disponibles en ligne !  
        Maillots, sweats, accessoires et bien plus encore arrivent très bientôt.
      </p>
      <p style={{ fontStyle: 'italic', color: '#7f1d1d' }}>
        🔔 Restez connectés pour ne pas manquer l’ouverture officielle !
      </p>
    </div>
  );
}
