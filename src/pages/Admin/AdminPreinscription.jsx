import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './adminInscriptions.css';
import RetourDashboard from '../../components/RetourDashboard';     





export default function AdminPreinscriptions() {
  const [preinscriptions, setPreinscriptions] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [page, setPage] = useState(1);
  const parPage = 5;
  const [message, setMessage] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [filtreCategorie, setFiltreCategorie] = useState('');



  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetch('http://localhost:3000/api/inscriptions', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
      if (Array.isArray(data)) {
        setPreinscriptions(data);
      } else if (Array.isArray(data.inscriptions)) {
        setPreinscriptions(data.inscriptions);
      } else {
        console.warn("Format inattendu pour preinscriptions :", data);
        setPreinscriptions([]);
      }
    })
      .catch(() => setMessage("❌ Impossible de charger les pré-inscriptions"));
  }, [token]);

  const valider = async (id) => {
    const res = await fetch(`http://localhost:3000/api/inscriptions/${id}/valider`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      setPreinscriptions(prev =>
        prev.map(p => p._id === id ? { ...p, statut: 'validée' } : p)
      );
    } else {
      setMessage("❌ Échec de la validation");
    }
  };

  const supprimer = async (id) => {
    const confirm = window.confirm("Supprimer cette pré-inscription ?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/api/inscriptions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      setPreinscriptions(prev => prev.filter(p => p._id !== id));
    } else {
      setMessage("❌ Échec de la suppression");
    }
  };

  const filtres = preinscriptions
  .filter(p =>
    p.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    p.email.toLowerCase().includes(recherche.toLowerCase())
  )
  .filter(p => !filtreCategorie || p.categorie === filtreCategorie);


  const totalPages = Math.ceil(filtres.length / parPage);
  const debut = (page - 1) * parPage;
  const visibles = filtres.slice(debut, debut + parPage);

  return (
    <div className="admin-preinscriptions">
    <RetourDashboard />
      <h2>📋 Gestion des pré-inscriptions</h2>

      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        className="champ-recherche"
      />

      {message && <p>{message}</p>}
      <div className="filtre-container">
  <label htmlFor="filtreCategorie">Filtrer par catégorie :</label>
  <select
    id="filtreCategorie"
    value={filtreCategorie}
    onChange={(e) => setFiltreCategorie(e.target.value)}
  >
    <option value="">Toutes les catégories</option>
    {[
      "Baby Basket", "U7", "U9F", "U9G", "U11F", "U11G",
      "U13F", "U13G", "U15F", "U15G", "U18F", "U18G",
      "Senior Femme", "Senior Homme", "Loisirs"
    ].map(cat => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
</div>

<p className="compteur-demande">
  Total demandes affichées : <strong>{filtres.length}</strong>
</p>
<div className="resume-stats">
  <p>✅ Validées : {filtres.filter(p => p.statut === 'validée').length}</p>
  <p>🕗 En attente : {filtres.filter(p => p.statut === 'en attente').length}</p>
  <p>❌ Refusées : {filtres.filter(p => p.statut === 'refusée').length}</p>
</div>

      <ul className="liste-preinscriptions">
        {visibles.map(p => (
          <li key={p._id} className="carte-preinscription">
  <h3
  onClick={() => setSelectedId(selectedId === p._id ? null : p._id)}
  className="entete-preinscription"
>
  <span>{p.nom} {p.prenom} — {p.categorie}</span>
  <span className={`badge-statut badge-${p.statut?.replace(/\s/g, '')}`}>
    {p.statut}
  </span>
</h3>


  {selectedId === p._id && (
    <div className="details-preinscription">
      <p><strong>Sexe :</strong> {p.sexe}</p>
      <p><strong>Date de naissance :</strong> {new Date(p.dateNaissance).toLocaleDateString()}</p>
      <p><strong>Cotisation :</strong> {p.cotisation} €</p>
      <p><strong>Type adhésion :</strong> {p.typeAdhesion}</p>
      <p><strong>Email :</strong> {p.email}</p>
      <p><strong>Téléphone :</strong> {p.telephone}</p>
      <p><strong>Adresse :</strong> {p.adresse}, {p.codePostal} {p.ville}</p>
      <p><strong>Modes de paiement :</strong> {p.modePaiement.join(', ')}</p>
      {p.numeroCarteCJeune && <p><strong>Carte CJeune :</strong> {p.numeroCarteCJeune}</p>}

      {p.representants && p.representants.length > 0 && (
        <div>
          <strong>Représentants légaux :</strong>
          <ul>
            {p.representants.map((rl, index) => (
              <li key={index}>
                {rl.prenom} {rl.nom} — {rl.email} — {rl.telephone}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="actions">
        {p.statut !== 'validée' && (
          <button onClick={() => valider(p._id)}>✅ Valider</button>
        )}
        <Link to={`/admin/inscriptions/modifier/${p._id}`}>✏️ Modifier</Link>
        <a
          href={`http://localhost:3000/api/inscriptions/${p._id}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >📄 PDF</a>
        <button onClick={() => supprimer(p._id)}>🗑 Supprimer</button>
      </div>
    </div>
  )}
</li>

        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'actif' : ''}
            >
              {i + 1}
            </button>
            
          ))}
          
        </div>
      )}
    </div>
  );
}
