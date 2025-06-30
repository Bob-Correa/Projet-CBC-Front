// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Accueil from './pages/Accueil';
import AdminActualites from './pages/AdminActualites';
import ModifierActualite from './pages/ModifierActualite';
import FormulaireActualite from './pages/FormulaireActualite';
import { AuthProvider } from './context/AuthContext';
import HandleLogin from './pages/AdminLogin';
// Tu ajouteras les autres pages ici au fur et à mesure

function App() {
  return (
   <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/admin" element={<AdminActualites />} />
          <Route path="/admin/modifier/:id" element={<ModifierActualite />} />
          <Route path="/admin/creer" element={<FormulaireActualite />} />
          <Route path="/admin/login" element={<HandleLogin />} />
          {/* Autres routes à venir */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
