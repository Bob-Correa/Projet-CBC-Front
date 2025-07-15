import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminMedias.css';
import RetourDashboard from '../../components/RetourDashboard';

export default function AdminMedias() {
  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    // Récupération des albums
    fetch('http://localhost:3000/api/media/albums', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAlbums(data))
      .catch(() => setMessage("❌ Impossible de charger les albums"));

    // Récupération des vidéos
    fetch('http://localhost:3000/api/media/videos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(() => setMessage("❌ Impossible de charger les vidéos"));
  }, [token]);

  const supprimerAlbum = async (id) => {
    const confirm = window.confirm("🗑️ Supprimer cet album ?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/api/media/albums/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      setAlbums(prev => prev.filter(album => album._id !== id));
    } else {
      setMessage("❌ Échec de la suppression d'album");
    }
  };

  const supprimerVideo = async (id) => {
    const confirm = window.confirm("🗑️ Supprimer cette vidéo ?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/api/media/videos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      setVideos(prev => prev.filter(video => video._id !== id));
    } else {
      setMessage("❌ Échec de la suppression de vidéo");
    }
  };

  return (
    <div className="admin-medias">
      <RetourDashboard />
      <h2>🎥📷 Gestion des médias</h2>
      <div className="liens-creation">
        <Link to="/admin/medias/album" className="btn-ajouter">➕ Nouvel album</Link>
        <Link to="/admin/medias/video" className="btn-ajouter">➕ Nouvelle vidéo</Link>
      </div>

      {message && <p>{message}</p>}

      <h3>📁 Albums photos</h3>
      <ul className="liste-medias">
        {albums.map(album => (
          <li key={album._id} className="carte-media">
            <h4>{album.titre}</h4>
            <p><strong>📅 Créé :</strong> {new Date(album.date).toLocaleDateString('fr-FR')}</p>
            <p><strong>📂 Catégorie :</strong> {album.categorie}</p>
            <p><strong>🖼️ Nombre d'images :</strong> {album.images.length}</p>
            <div className="actions">
              <Link to={`/admin/medias/album/${album._id}`}>✏️ Modifier</Link>
              <button onClick={() => supprimerAlbum(album._id)}>🗑️ Supprimer</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>🎬 Vidéos de match</h3>
      <ul className="liste-medias">
        {videos.map(video => (
          <li key={video._id} className="carte-media">
            <h4>{video.titre}</h4>
            <p><strong>📅 Match :</strong> {new Date(video.matchDate).toLocaleDateString('fr-FR')}</p>
            <p><strong>👥 Équipes :</strong> {video.equipe.join(' vs ')}</p>
            <p><strong>🔗 Lien :</strong> <a href={video.url} target="_blank" rel="noreferrer">Voir</a></p>
            <div className="actions">
              <Link to={`/admin/medias/video/${video._id}`}>✏️ Modifier</Link>
              <button onClick={() => supprimerVideo(video._id)}>🗑️ Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
