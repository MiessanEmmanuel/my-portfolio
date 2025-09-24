import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Alias pour la compatibilité avec les composants admin existants
export const useAdminAuth = useAuth;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Migration des anciens tokens admin vers le système unifié
  useEffect(() => {
    const adminToken = localStorage.getItem('token');
    const adminUser = localStorage.getItem('admin_user');
    
    if (adminToken && !localStorage.getItem('token')) {
      // Migrer le token admin vers le token unifié
      localStorage.setItem('token', adminToken);
      localStorage.removeItem('token');
      
      if (adminUser) {
        localStorage.setItem('user', adminUser);
        localStorage.removeItem('admin_user');
      }
    }
    
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (authService.isAuthenticated()) {
        // Essayer d'abord les données en cache
        const cachedUser = authService.getCachedUser();
        if (cachedUser) {
          setUser(cachedUser);
          setIsAuthenticated(true);
          setLoading(false);
        }

        // Puis vérifier avec le serveur
        try {
          const userData = await authService.getCurrentUser();
          const user = userData.user || userData;
          setUser(user);
          setIsAuthenticated(true);
          // Mettre à jour le cache
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          // Si l'API échoue mais qu'on a des données en cache, les garder
          if (!cachedUser) {
            throw error;
          }
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      authService.clearToken();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      
      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };


  const isAdmin = () => {
    return user?.role === 'admin';

  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
    checkAuthStatus,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}