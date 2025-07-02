import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminRoute = ({ children }) => {
  const { admin, loading } = useAdmin();

  if (loading) return <p>Chargement...</p>;
  return admin ? children : <Navigate to="/" />;
};

export default AdminRoute;
