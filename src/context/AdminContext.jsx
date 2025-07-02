import { createContext, useContext, useEffect, useState } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 1. Vérifie et charge l'admin au démarrage
  useEffect(() => {
    const chargerProfil = async () => {
      let token = localStorage.getItem('adminToken');

      const profil = async (t) => {
        const res = await fetch('http://localhost:3000/api/admin/profil', {
          headers: { Authorization: `Bearer ${t}` }
        });

        if (!res.ok) throw new Error();
        const data = await res.json();
        setAdmin(data);
      };

      try {
        if (!token) {
          // ⏳ tente de rafraîchir le token
          const refresh = await fetch('http://localhost:3000/api/admin/token', {
            method: 'POST',
            credentials: 'include'
          });

          const data = await refresh.json();
          if (refresh.ok && data.accessToken) {
            token = data.accessToken;
            localStorage.setItem('adminToken', token);
          } else {
            throw new Error();
          }
        }

        await profil(token);
      } catch (err) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    chargerProfil();
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
