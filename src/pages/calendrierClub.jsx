import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

const formatGoogleDate = (date) => {
  return new Date(date).toISOString().replace(/[-:]|\.000Z/g, '').slice(0, 15);
};


export default function CalendrierClub() {
  const [evenements, setEvenements] = useState([]);
  const [message, setMessage] = useState('');
  const [popupEvenement, setPopupEvenement] = useState(null);


  useEffect(() => {
    fetch('http://localhost:3000/api/calendrier')
      .then(res => res.json())
      .then(data => {
        const transformes = data.map(e => ({
          id: e._id,
          title: e.typeEvenement === 'match' && e.score
            ? `${e.titre} 🏆 ${e.score}`
            : e.titre,

          start: e.dateDebut,
          end: e.dateFin || e.dateDebut,
          allDay: e.touteLaJournee,
          backgroundColor: e.statut === 'annulé' ? '#991b1b' : e.statut === 'reporté' ? '#f59e0b' : '#2563eb',
          borderColor: '#1e3a8a',
          typeEvenement: e.typeEvenement,
          lieu: e.lieu,
          categorie: e.categorie,
          score: e.score,

        }));
        setEvenements(transformes);
      })
      .catch(() => setMessage("❌ Impossible de charger les événements"));
  }, []);

  return (
    <div className="calendrier-container">
      <h2>Calendrier du club</h2>
      {message && <p>{message}</p>}

      {popupEvenement && (
  <div className="popup-evenement">
    <div className="popup-box">
      <h3>{popupEvenement.titre}</h3>

      {popupEvenement.type && (
        <p><strong>🏷️ Type :</strong> {popupEvenement.type}</p>
      )}
      {popupEvenement.score && (
        <p><strong>🏆 Score :</strong> {popupEvenement.score}</p>
      )}
      {popupEvenement.categorie && (
        <p><strong>👥 Catégorie :</strong> {popupEvenement.categorie}</p>
      )}
      {popupEvenement.lieu && (
        <p><strong>📍 Lieu :</strong> {popupEvenement.lieu}</p>
      )}
      <p><strong>🕘 Début :</strong> {popupEvenement.debut.toLocaleString('fr-FR')}</p>
      {popupEvenement.fin && (
        <p><strong>⏱️ Fin :</strong> {popupEvenement.fin.toLocaleString('fr-FR')}</p>
      )}
      {popupEvenement.allDay && <p>🕒 Toute la journée</p>}

      <div className="popup-actions">
        <button onClick={() => window.print()}>🖨️ Imprimer</button>

        <a
          href={`https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(popupEvenement.titre)}&dates=${formatGoogleDate(popupEvenement.debut)}/${formatGoogleDate(popupEvenement.fin || popupEvenement.debut)}&details=${encodeURIComponent(popupEvenement.score || '')}&location=${encodeURIComponent(popupEvenement.lieu || '')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          📅 Ajouter à Google Agenda
        </a>

        <button onClick={() => setPopupEvenement(null)}>❌ Fermer</button>
      </div>
    </div>
  </div>
)}



      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={evenements}
        locale={frLocale}
        
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        height="auto"
        eventClick={(info) => {
  const e = info.event.extendedProps;
      setPopupEvenement({
        titre: info.event.title,
        debut: info.event.start,
        fin: info.event.end,
        allDay: info.event.allDay,
        lieu: e.lieu,
        categorie: e.categorie,
        type: e.typeEvenement,
        score: e.score
      });
}}

      />
    </div>
  );
}
