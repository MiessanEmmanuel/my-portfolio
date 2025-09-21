import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Button from '../components/Button';
import {
  Menu,
  X,
  Home,
  FolderOpen,
  GraduationCap,
  MessageSquare,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Shield
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home, current: location.pathname === '/admin/dashboard' },
    { name: 'Projets', href: '/admin/projects', icon: FolderOpen, current: location.pathname.startsWith('/admin/projects') },
    { name: 'Formations', href: '/admin/formations', icon: GraduationCap, current: location.pathname.startsWith('/admin/formations') },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare, current: location.pathname.startsWith('/admin/messages') },
  ];

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'lg:hidden' : 'hidden lg:flex'} lg:w-64 lg:flex-col lg:fixed lg:inset-y-0`}>
      <div className="flex flex-col flex-grow bg-white dark:bg-surface-dark border-r border-border dark:border-border overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6 py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <Shield className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-text-primary dark:text-text-dark">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${item.current
                    ? 'bg-primary text-white'
                    : 'text-text-secondary dark:text-text-light hover:bg-primary/10 hover:text-primary'
                  }`}
                onClick={() => mobile && setSidebarOpen(false)}
              >
                <Icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${item.current ? 'text-white' : 'text-text-light group-hover:text-primary'
                    }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="flex-shrink-0 p-4">
          <div className="bg-gray-50 dark:bg-background-dark rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                <User className="text-white" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary dark:text-text-dark truncate">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-text-secondary dark:text-text-light truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/25" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <Sidebar />

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-surface-dark border-b border-border dark:border-border">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Page title */}
              <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-text-primary dark:text-text-dark">
                {navigation.find(item => item.current)?.name || 'Dashboard'}
              </h1>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                type="button"
                className="max-w-xs bg-white dark:bg-surface-dark flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
                  <User className="text-white" size={16} />
                </div>
                <span className="hidden sm:block text-text-primary dark:text-text-dark font-medium">
                  {user?.name || 'Admin'}
                </span>
                <ChevronDown className="ml-1 h-4 w-4 text-text-secondary" />
              </button>

              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-surface-dark ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-secondary dark:text-text-light hover:bg-gray-100 dark:hover:bg-background-dark"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;