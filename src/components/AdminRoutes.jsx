import { useAdmin } from '../context/AdminContext';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { admin } = useAdmin();
  return admin ? children : <Navigate to="/admin/login" />;
}
