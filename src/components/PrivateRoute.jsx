import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function PrivateRoute({ children }) {
  const { admin, loading } = useAdmin();

  if (loading) return <p>Chargement...</p>;
  return admin ? children : <Navigate to="/admin/login" replace />;
}
