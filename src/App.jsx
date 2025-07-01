import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Accueil from './pages/Accueil';
import AdminActualites from './pages/Admin/AdminActualites';
import ModifierActualite from './pages/Admin/ModifierActualite';
import FormulaireActualite from './pages/Admin/FormulaireActualite';
import HandleLogin from './pages/Admin/AdminLogin';
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/AdminRoute'; // 👈 ajout
import AdminInscriptions from './pages/Admin/AdminInscriptions';
import PrivateRoute from './components/PrivateRoute'; // 👈 ajout
import PreInscription from './pages/PreInscription';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/admin/login" element={<HandleLogin />} />

          {/* 🔐 Routes protégées par AdminRoute */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminActualites />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/modifier/:id"
            element={
              <AdminRoute>
                <ModifierActualite />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/creer"
            element={
              <AdminRoute>
                <FormulaireActualite />
              </AdminRoute>
            }
          />
          <Route path="/admin/inscriptions" element={
        <PrivateRoute>
             <AdminInscriptions />
        </PrivateRoute>
        } />
          <Route path="/inscription" element={<PreInscription />} />
          

          {/* Tu peux continuer à ajouter tes routes ici */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
