import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contenu">
        <div className="footer-liens">
          <a href="/contact">Contactez-nous</a>
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/plan-du-site">Plan du site</a>
        </div>
        <div className="footer-reseaux">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <i className="fab fa-x-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
      <div className="footer-bas">
        <p>&copy; 2025 CrauBasketClub.fr — Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;
