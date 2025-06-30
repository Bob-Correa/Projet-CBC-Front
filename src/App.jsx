// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Accueil from './pages/Accueil';
// Tu ajouteras les autres pages ici au fur et à mesure

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        {/* Autres routes à venir : Boutique, Actus, etc. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
