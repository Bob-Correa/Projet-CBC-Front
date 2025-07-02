import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Accueil from './pages/Accueil';
import Actualites from './pages/Actualites';
import Boutique from './pages/Boutique';
import PreInscription from './pages/PreInscription';
import AdminActualites from './pages/Admin/AdminActualites';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import AdminDashboard from './pages/Admin/AdminDashboard';
import FormulaireActualite from './pages/Admin/FormulaireActualite';
import ModifierActualite from './pages/Admin/ModifierActualite';
import AdminPreinscription from './pages/Admin/AdminPreinscription';
import ModifierPreinscription from './pages/Admin/ModifierPreinscription';

import AdminRoute from './components/AdminRoute';
//import PrivateRoute from './components/PrivateRoute';

import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Header />
        <Routes>
          {/* 🌍 Pages publiques */}
          <Route path="/" element={<Accueil />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/inscription" element={<PreInscription />} />

          {/* 🔐 Authentification admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* 🛡️ Routes protégées pour admins connectés */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/admin/actualites" element={
            <AdminRoute>
                <AdminActualites />
            </AdminRoute>
        } />


          <Route
            path="/admin/creer"
            element={
              <AdminRoute>
                <FormulaireActualite />
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

          <Route path="/admin/preinscriptions" element={
            <AdminRoute>
                <AdminPreinscription />
            </AdminRoute>
          } />
          
          <Route path="/admin/preinscriptions/modifier/:id" element={
            <AdminRoute>
                <ModifierPreinscription />
            </AdminRoute>
          } />

          {/* 🚧 Routes pour créer/modifier des actualités */}
          <Route path="/admin/actualites/creer" element={
          <AdminRoute>
              <FormulaireActualite />
          </AdminRoute>
          } />

          <Route path="/admin/actualites/modifier/:id" element={
            <AdminRoute>
                <ModifierActualite />
             </AdminRoute>
          } />


          {/* 🚧 Ajoute ici tes futures routes */}
          </Routes>
         </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
