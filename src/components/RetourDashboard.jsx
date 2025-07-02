import { Link } from 'react-router-dom';
import './RetourDashboard.css';

export default function RetourDashboard() {
  return (
    <div className="bloc-retour-dashboard">
      <Link to="/admin" className="btn-retour">🏠 Retour au tableau de bord</Link>
    </div>
  );
}
