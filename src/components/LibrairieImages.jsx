// src/components/LibrairieImages.jsx
import { useEffect, useState } from 'react';
import './LibrairieImages.css';

export default function LibrairieImages({ onSelect }) {
  const [albums, setAlbums] = useState([]);
  const [filtre, setFiltre] = useState('Tous');

  useEffect(() => {
    fetch('http://localhost:3000/api/media/albums')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAlbums(data);
        else setAlbums([]);
      });
  }, []);

  const albumsFiltres = filtre === 'Tous'
    ? albums
    : albums.filter(album => album.categorie === filtre);

  return (
    <div className="librairie-container">
      <h4>📁 Librairie d’images</h4>

      {/* Filtres par catégorie */}
      <div className="filtres-librairie">
        {['Tous', 'Matchs', 'Tournois', 'Événements', 'Coulisses'].map(cat => (
          <button
            key={cat}
            onClick={() => setFiltre(cat)}
            className={filtre === cat ? 'filtre-actif' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Affichage des albums */}
      {albumsFiltres.map(album => (
        <div key={album._id} className="album-section">
          <h5>{album.titre}</h5>
          <div className="miniatures-librairie">
            {album.images.map((img, i) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                key={i}
                src={`http://localhost:3000${img}`}
                alt={`Image de l’album ${album.titre} #${i + 1}`}
                onClick={() => onSelect(img)}
                className="img-clickable"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
