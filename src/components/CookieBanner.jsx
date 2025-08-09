import React, { useState, useEffect } from 'react';
import './CookieBanner.css'; // Assurez-vous d'avoir un fichier CSS pour le styleé

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem('cookieConsent', choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez accepter ou refuser les cookies non essentiels.
      </p>
      <div className="cookie-buttons">
        <button onClick={() => handleConsent('accepted')}>Accepter</button>
        <button onClick={() => handleConsent('refused')}>Refuser</button>
      </div>
    </div>
  );
};

export default CookieBanner;

