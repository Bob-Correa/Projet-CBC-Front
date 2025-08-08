import React from 'react';
import './CategoriesPage.css';

const categories = [
  {
    id: 1,
    nom: 'Baby basket',
    image: '/Categories/Baby-basket.png',
    description: 'Pour la première année le club décide d\' ouvrir ses porte au plus petits...',
  },
  {
    id: 2,
    nom: 'U7',
    image: '/Categories/U7.JPG',
    description: 'De 5 à 7 ans, les enfants découvrent les bases du basket dans une ambiance ludique.',
  },
  {
    id: 3,
    nom: 'U9',
    image: '/Categories/U9.JPG',
    description: 'De 7 à 9 ans, les jeunes joueurs commencent à apprendre les techniques de base du basket et du jeu collectif.',
  },
  {
    id: 4,
    nom: 'U11 Filles',
    image: '/Categories/U11F.jpg',
    description: 'Les filles de 9 à 11 ans s\'entraînent ensemble pour développer leurs compétences et leur esprit d\'équipe.',
  },
  {
    id: 5,
    nom: 'U11 Garçons',
    image: '/Categories/U11G.JPG',
    description: 'Les garçons de 9 à 11 ans s\'entraînent ensemble pour développer leurs compétences et leur esprit d\'équipe.',
  },
  {
    id: 6,
    nom: 'U13 Filles',
    image: '/Categories/U13F.JPG',
    description: '  Fini le mini-basket, place au basket à 5 contre 5 pour les filles de 11 à 13 ans.',
  },
  {
    id: 7,
    nom: 'U13 Garçons',
    image: '/Categories/U13G.jpg',
    description: 'Fini le mini-basket, place au basket à 5 contre 5 pour les garçons de 11 à 13 ans.',
  },
  {
    id: 8,
    nom: 'U15 Filles',
    image: '/Categories/U15F.jpg',
    description: 'Les filles de 13 à 15 ans continuent de progresser dans leur pratique du basket avec des entraînements adaptés.',
  },
  {
    id: 9,
    nom: ' U15 Garçons',
    image: '/Categories/U15G.jpg',
    description: 'Les garçons de 13 à 15 ans continuent de progresser dans leur pratique du basket avec des entraînements adaptés.',
  },
  {
    id: 10,
    nom: 'U18 Filles',
    image: '/Categories/U18F.png',
    description: 'Les filles de 15 à 18 ans s\'entraînent pour se préparer aux compétitions et aux matchs.',
  },
  {
    id: 11,
    nom: 'Seniors Filles',
    image: '/Categories/Seniors-F.jpg',
    description: 'Les séniors filles sont prêtes à affronter les défis du championnat avec passion et détermination.',
  },
  {
    id: 12,
    nom: 'Seniors Garçons',
    image: '/Categories/Senior-H.jpg',
    description: 'Cette année, les séniors garçons visent le haut du tableau avec une équipe renforcée.',
  },
  {
    id: 13,
    nom: 'Loisirs',
    image: '/Categories/loisirs.jpg',
    description: 'Le basket loisirs est ouvert à tous ceux qui souhaitent pratiquer le basket sans pression de compétition.',
  },
  // Ajoute autant de catégories que tu veux
];

const CategoriesPage = () => {
  return (
    <div className="categories-container">
      <h1>Nos Catégories</h1>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="categorie-card">
            <img src={cat.image} alt={cat.nom} />
            <h2>{cat.nom}</h2>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
