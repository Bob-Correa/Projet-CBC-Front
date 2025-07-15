import { createContext, useContext, useEffect, useState } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Vérifie et charge l'admin au démarrage
  useEffect(() => {
    const chargerProfil = async () => {
      let token = localStorage.getItem('adminToken');

      const profil = async (t) => {
        const res = await fetch('http://localhost:3000/api/admin/profil', {
          headers: { Authorization: `Bearer ${t}` }
        });

        if (res.status === 401) {
          console.warn("❌ Token expiré, suppression...");
          localStorage.removeItem("adminToken");
          throw new Error("Token expiré");
        }

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

  // 🔁 Ajout du refresh périodique
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/admin/token', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok && data.accessToken) {
          localStorage.setItem('adminToken', data.accessToken);
        }
      } catch (err) {
        console.warn("🔄 Échec du refresh périodique :", err);
      }
    }, 14 * 60 * 1000); // toutes les 14 minutes

    return () => clearInterval(interval);
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
