// src/pages/admin/AdminList.jsx
import { useEffect, useState } from 'react';
import './AdminList.css';
import FormulaireAjoutAdmin from '../../components/FormulaireAjoutAdmin';
import RetourDashboard from '../../components/RetourDashboard';

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const chargerAdmins = async () => {
    try {
      const reponse = await fetch('http://localhost:3000/api/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await reponse.json();
     setAdmins(data); // ← au lieu de data.admins

    } catch (err) {
      console.error('Erreur lors du chargement des admins :', err);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  const promouvoirAdmin = async (id) => {
    const reponse = await fetch(`http://localhost:3000/api/admin/role/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: 'superadmin' })
    });

    const resultat = await reponse.json();
    if (reponse.ok) {
      alert('✅ Admin promu en superadmin');
      chargerAdmins();
    } else {
      alert(`❌ Erreur : ${resultat.message}`);
    }
  };

  const supprimerAdmin = async (id) => {
    if (!window.confirm('❗ Supprimer cet admin ?')) return;

    const reponse = await fetch(`http://localhost:3000/api/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });

    const resultat = await reponse.json();
    if (reponse.ok) {
      alert('🗑️ Admin supprimé');
      chargerAdmins();
    } else {
      alert(`❌ Erreur : ${resultat.message}`);
    }
  };

  useEffect(() => {
    chargerAdmins();
  }, []);

  return (
    <div className="admin-list-page">
      <RetourDashboard />
      <h1>👥 Liste des administrateurs</h1 >
      <p>Gérez les administrateurs du site. Vous pouvez en ajouter, supprimer ou promouvoir.</p>

      <h2>👑 Gestion des administrateurs</h2>

      <FormulaireAjoutAdmin onAdminAjoute={chargerAdmins} />

      {loading ? (
        <p>Chargement...</p>
      ) : admins.length === 0 ? (
        <p>👀 Aucun administrateur à afficher.</p>
      ) : (
        <ul className="admin-list">
          {admins.map(admin => (
            <li key={admin._id}>
              <strong>{admin.nom}</strong> – {admin.email} ({admin.role})
              {admin.role !== 'superadmin' && (
                <button onClick={() => promouvoirAdmin(admin._id)}>🔼 Promouvoir</button>
              )}
              <button onClick={() => supprimerAdmin(admin._id)}>🗑️ Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
