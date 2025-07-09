import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';



export default function CalendrierClub() {
  const [evenements, setEvenements] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/calendrier')
      .then(res => res.json())
      .then(data => {
        const transformes = data.map(e => ({
          id: e._id,
          title: e.titre,
          start: e.dateDebut,
          end: e.dateFin || e.dateDebut,
          allDay: e.touteLaJournee,
          backgroundColor: e.statut === 'annulé' ? '#991b1b' : e.statut === 'reporté' ? '#f59e0b' : '#2563eb',
          borderColor: '#1e3a8a'
        }));
        setEvenements(transformes);
      })
      .catch(() => setMessage("❌ Impossible de charger les événements"));
  }, []);

  return (
    <div className="calendrier-container">
      <h2>📅 Calendrier du club</h2>
      {message && <p>{message}</p>}

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
      />
    </div>
  );
}
