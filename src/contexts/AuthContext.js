import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password, navigate) => {
    // Simulação de autenticação, substitua pela lógica de autenticação real
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      alert('Credenciais inválidas');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
