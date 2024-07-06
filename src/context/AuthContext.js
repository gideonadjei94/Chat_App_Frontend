// src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// Create a context with default value of null
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Mock login function
  const login = (username, password) => {
    // Replace this with your authentication logic (e.g., API call)
    if (username === 'user' && password === 'password') {
      setIsAuthenticated(true);
      setUser({ username: 'user' });
      return true;
    }
    return false;
  };

  // Mock logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Auth object to be passed down to consuming components
  const auth = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
