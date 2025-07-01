import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const login = ({ accessToken }) => {
    setIsAdmin(true);
    setAccessToken(accessToken);
  };

  const logout = () => {
    setIsAdmin(false);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
