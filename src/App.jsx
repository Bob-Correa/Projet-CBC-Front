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
import AdminCalendrier from './pages/Admin/AdminCalendrier';
import AjouterEvenement from './pages/Admin/AjouterEvenement';
import ModifierEvenement from './pages/Admin/ModifierEvenement';
import FormulaireActualite from './pages/Admin/FormulaireActualite';
import ModifierActualite from './pages/Admin/ModifierActualite';
import AdminPreinscription from './pages/Admin/AdminPreinscription';
import ModifierPreinscription from './pages/Admin/ModifierPreinscription';
import AdminMedias from './pages/Admin/AdminMedias';
import Medias from './pages/Medias';
import FormAlbum from './pages/Admin/FormAlbum';
import FormVideo from './pages/Admin/FormVideo';


import CalendrierClub from './pages/calendrierClub';

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
          <Route path="/boutique" element={<Boutique  />} />
         

          <Route path="/inscription" element={<PreInscription />} />
          <Route path="/calendrier" element={<CalendrierClub />} />
          <Route path="/medias" element={<Medias />} />

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

                    <Route path="/admin/calendrier" element={
            <AdminRoute>
              <AdminCalendrier />
            </AdminRoute>
          } />
          
          <Route path="/admin/calendrier/ajouter" element={
            <AdminRoute>
              <AjouterEvenement />
            </AdminRoute>
          } />
          <Route path="/admin/calendrier/modifier/:id" element={
            <AdminRoute>
              <ModifierEvenement />
            </AdminRoute>
          } />



          {/* 🚧 Routes pour créer/modifier des actualités */}
          <Route path="/admin/actualites/creer" element={ <AdminRoute><FormulaireActualite /></AdminRoute>} />

          <Route path="/admin/actualites/modifier/:id" element={<AdminRoute><ModifierActualite /></AdminRoute>} />
          <Route path="/admin/medias" element={<AdminRoute><AdminMedias /></AdminRoute>} />
          <Route path="/admin/medias/album" element={<AdminRoute><FormAlbum /></AdminRoute>} />
          <Route path="/admin/medias/album/modifier/:id" element={<AdminRoute><FormAlbum /></AdminRoute>} />
          <Route path="/admin/medias/video" element={<AdminRoute><FormVideo /></AdminRoute>} />




          {/* 🚧 Ajoute ici tes futures routes */}
          </Routes>
         </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
