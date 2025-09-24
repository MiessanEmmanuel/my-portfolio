import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader className="animate-spin h-6 w-6 text-primary" />
          <span className="text-text-secondary">Vérification des permissions...</span>
        </div>
      </div>
    );
  }
console.log(isAdmin())
  if (!isAuthenticated || !isAdmin()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;