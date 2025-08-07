import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AdminProvider } from './context/AdminContext';
import AdminRoute from './components/AdminRoute';

import '@fortawesome/fontawesome-free/css/all.min.css';

// 🌍 Pages publiques
import Accueil from './pages/Accueil';
import Actualites from './pages/Actualites';
import ActualiteDetail from './pages/ActualiteDetails';
import Boutique from './pages/Boutique';
import Bureau from './pages/Bureau';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';
import Partenaires from './pages/Partenaires';
import PreInscription from './pages/PreInscription';
import CalendrierClub from './pages/calendrierClub';
import Medias from './pages/Medias';
import Page404 from './pages/Page404';

// 🔐 Authentification admin
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';

// 🛡️ Pages admin protégées
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminActualites from './pages/Admin/AdminActualites';
import FormulaireActualite from './pages/Admin/FormulaireActualite';
import ModifierActualite from './pages/Admin/ModifierActualite';
import AdminPreinscription from './pages/Admin/AdminPreinscription';
import ModifierPreinscription from './pages/Admin/ModifierPreinscription';
import AdminCalendrier from './pages/Admin/AdminCalendrier';
import AjouterEvenement from './pages/Admin/AjouterEvenement';
import ModifierEvenement from './pages/Admin/ModifierEvenement';
import AdminMedias from './pages/Admin/AdminMedias';
import FormAlbum from './pages/Admin/FormAlbum';
import FormVideo from './pages/Admin/FormVideo';
import AdminList from './pages/Admin/AdminList';

function App() {
  return (
    <AdminProvider>
      <Header />

      <Routes>
        {/* 🌍 Pages publiques */}
        <Route path="/" element={<Accueil />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/actualites/:id" element={<ActualiteDetail />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/club/bureau" element={<Bureau />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/partenaires" element={<Partenaires />} />
        <Route path="/inscription" element={<PreInscription />} />
        <Route path="/calendrier" element={<CalendrierClub />} />
        <Route path="/medias" element={<Medias />} />
        <Route path="*" element={<Page404 />} />

        {/* 🔐 Authentification admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* 🛡️ Pages admin protégées */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/actualites" element={<AdminRoute><AdminActualites /></AdminRoute>} />
        <Route path="/admin/actualites/creer" element={<AdminRoute><FormulaireActualite /></AdminRoute>} />
        <Route path="/admin/actualites/modifier/:id" element={<AdminRoute><ModifierActualite /></AdminRoute>} />

        <Route path="/admin/preinscriptions" element={<AdminRoute><AdminPreinscription /></AdminRoute>} />
        <Route path="/admin/preinscriptions/modifier/:id" element={<AdminRoute><ModifierPreinscription /></AdminRoute>} />

        <Route path="/admin/calendrier" element={<AdminRoute><AdminCalendrier /></AdminRoute>} />
        <Route path="/admin/calendrier/ajouter" element={<AdminRoute><AjouterEvenement /></AdminRoute>} />
        <Route path="/admin/calendrier/modifier/:id" element={<AdminRoute><ModifierEvenement /></AdminRoute>} />

        <Route path="/admin/medias" element={<AdminRoute><AdminMedias /></AdminRoute>} />
        <Route path="/admin/medias/album" element={<AdminRoute><FormAlbum /></AdminRoute>} />
        <Route path="/admin/medias/album/modifier/:id" element={<AdminRoute><FormAlbum /></AdminRoute>} />
        <Route path="/admin/medias/video" element={<AdminRoute><FormVideo /></AdminRoute>} />

        <Route path="/admin/all" element={<AdminList />} />
      </Routes>

      <Footer />
    </AdminProvider>
  );
}

export default App;
