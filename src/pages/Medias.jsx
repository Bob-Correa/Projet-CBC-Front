import { useEffect, useState } from 'react';
import './Medias.css';

export default function Medias() {
  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [filtreCategorie, setFiltreCategorie] = useState('Tous');
  const albumsFiltres = filtreCategorie === 'Tous'
  ? albums
  : albums.filter(album => album.categorie === filtreCategorie);
    const videosFiltres = filtreCategorie === 'Tous'
    ? videos
    : videos.filter(video => video.categorie === filtreCategorie);


  useEffect(() => {
    fetch('http://localhost:3000/api/media/albums')
      .then(res => res.json())
      .then(data => {
        console.log("📁 Albums reçus :", data);
        setAlbums(Array.isArray(data) ? data : []);
      })
      .catch(() => setMessage("❌ Impossible de charger les albums"));

    fetch('http://localhost:3000/api/media/videos')
      .then(res => res.json())
      .then(data => {
        console.log("🎥 Vidéos reçues :", data);
        setVideos(Array.isArray(data) ? data : []);
      })
      .catch(() => setMessage("❌ Impossible de charger les vidéos"));
  }, []);

  return (
    <div className="page-medias">
      <h2>🎞️ Médias du Club</h2>

      {message && <p>{message}</p>}

      <h3>📁 Albums photos</h3>
      <div className="filtres-categories">
  {['Tous', 'Matchs', 'Tournois', 'Événements', 'Coulisses'].map(cat => (
    <button
      key={cat}
      onClick={() => setFiltreCategorie(cat)}
      className={filtreCategorie === cat ? 'active-filtre' : ''}
    >
      {cat}
    </button>
  ))}
</div>

      <div className="gallery-albums">
        {Array.isArray(albumsFiltres) && albumsFiltres.map(album => (
          <div key={album._id} className="carte-album">
            <h4>{album.titre}</h4>
            <p>{album.description}</p>
            <div className="miniatures">
              {Array.isArray(album.images) && album.images.slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:3000${img}`}
                  alt={`Miniature ${i + 1}`}
                />
              ))}
            </div>
            <p className="date">📅 Créé le : {new Date(album.date).toLocaleDateString('fr-FR')}</p>
            <p className="categorie">📂 Catégorie : {album.categorie}</p>
            <p className="nombre-images">🖼️ {album.images.length} image(s)</p>

          </div>
        ))}
      </div>

      <h3>🎥 Vidéos de match</h3>
      <div className="videos-section">
        {Array.isArray(videosFiltres) && videosFiltres.map(video => (
          <div key={video._id} className="carte-video">
            <h4>{video.titre}</h4>
            <p>{video.description}</p>
            <iframe
              src={video.url}
              title={video.titre}
              width="100%"
              height="250"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          
        ))}
      </div>
    </div>
  );
}
