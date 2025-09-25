import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  Shield,
  BookOpen,
  Folder,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [platformSubmenuOpen, setPlatformSubmenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home, current: location.pathname === '/admin/dashboard' },
    { name: 'Projets', href: '/admin/projects', icon: FolderOpen, current: location.pathname.startsWith('/admin/projects') },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare, current: location.pathname.startsWith('/admin/messages') },
  ];

  const platformNavigation = [
    { name: 'Formations', href: '/admin/platform-formations', icon: BookOpen, current: location.pathname.startsWith('/admin/platform-formations') },
    { name: 'Catégories', href: '/admin/formation-categories', icon: Folder, current: location.pathname.startsWith('/admin/formation-categories') },
    { name: 'Chapitres', href: '/admin/formation-chapters', icon: BookOpen, current: location.pathname.startsWith('/admin/formation-chapters') },
    { name: 'Leçons', href: '/admin/lessons', icon: GraduationCap, current: location.pathname.startsWith('/admin/lessons') },
  ];

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'lg:hidden' : 'hidden lg:block'} ${sidebarCollapsed && !mobile ? 'lg:w-16' : 'lg:w-64'} lg:fixed lg:inset-y-0 transition-all duration-300 ease-in-out`}>
      <div className="flex flex-col h-full bg-white dark:bg-surface-dark border-r border-border dark:border-border overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6 py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <Shield className="text-white" size={20} />
            </div>
            {(!sidebarCollapsed || mobile) && (
              <span className="text-xl font-bold text-text-primary dark:text-text-dark">
                Admin Panel
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${sidebarCollapsed && !mobile ? 'justify-center' : ''} ${item.current
                      ? 'bg-primary text-white'
                      : 'text-text-secondary dark:text-text-light hover:bg-primary/10 hover:text-primary'
                    }`}
                  onClick={() => mobile && setSidebarOpen(false)}
                >
                  <Icon
                    className={`${sidebarCollapsed && !mobile ? 'mr-0' : 'mr-3'} flex-shrink-0 h-5 w-5 ${item.current ? 'text-white' : 'text-text-light group-hover:text-primary'
                      }`}
                  />
                  {(!sidebarCollapsed || mobile) && item.name}
                </Link>
                {sidebarCollapsed && !mobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Platform section */}
          {(!sidebarCollapsed || mobile) && (
            <div className="pt-4">
              <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-xs font-semibold text-text-secondary dark:text-text-light uppercase tracking-wider">
                  Plateforme
                </h3>
                <button
                  onClick={() => setPlatformSubmenuOpen(!platformSubmenuOpen)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ChevronDown 
                    className={`w-4 h-4 text-text-light transition-transform ${platformSubmenuOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
              </div>
              {platformSubmenuOpen && (
                <div className="space-y-1">
                  {platformNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth ml-3 ${item.current
                            ? 'bg-primary text-white'
                            : 'text-text-secondary dark:text-text-light hover:bg-primary/10 hover:text-primary'
                          }`}
                        onClick={() => mobile && setSidebarOpen(false)}
                      >
                        <Icon
                          className={`mr-3 flex-shrink-0 h-4 w-4 ${item.current ? 'text-white' : 'text-text-light group-hover:text-primary'
                            }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* User info */}
        <div className="flex-shrink-0 p-4">
          <div className="bg-gray-50 dark:bg-background-dark rounded-lg p-3">
            <div className={`flex items-center ${sidebarCollapsed && !mobile ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                <User className="text-white" size={16} />
              </div>
              {(!sidebarCollapsed || mobile) && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary dark:text-text-dark truncate">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-text-light truncate">
                    {user?.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      {/* Desktop sidebar - always visible on lg+ */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-10 lg:hidden">
          <div className="fixed inset-0 bg-black/25" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex w-64 flex-col bg-white dark:bg-surface-dark">
            <div className="flex flex-col h-full border-r border-border dark:border-border overflow-y-auto">
              {/* Mobile Header with close button */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <Shield className="text-white" size={20} />
                  </div>
                  <span className="text-xl font-bold text-text-primary dark:text-text-dark">
                    Admin Panel
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-md text-text-light hover:text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="mt-5 flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${item.current
                          ? 'bg-primary text-white'
                          : 'text-text-secondary dark:text-text-light hover:bg-primary/10 hover:text-primary'
                        }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${item.current ? 'text-white' : 'text-text-light group-hover:text-primary'
                          }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
                
                {/* Platform section for mobile */}
                <div className="pt-4">
                  <div className="flex items-center justify-between px-3 py-2">
                    <h3 className="text-xs font-semibold text-text-secondary dark:text-text-light uppercase tracking-wider">
                      Plateforme
                    </h3>
                    <button
                      onClick={() => setPlatformSubmenuOpen(!platformSubmenuOpen)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ChevronDown 
                        className={`w-4 h-4 text-text-light transition-transform ${platformSubmenuOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                  </div>
                  {platformSubmenuOpen && (
                    <div className="space-y-1">
                      {platformNavigation.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth ml-3 ${item.current
                                ? 'bg-primary text-white'
                                : 'text-text-secondary dark:text-text-light hover:bg-primary/10 hover:text-primary'
                              }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <Icon
                              className={`mr-3 flex-shrink-0 h-4 w-4 ${item.current ? 'text-white' : 'text-text-light group-hover:text-primary'
                                }`}
                            />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </nav>

              {/* Mobile User info */}
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
        </div>
      )}

      {/* Main content */}
      <div className={`${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'} flex flex-col flex-1 transition-all duration-300 ease-in-out`}>
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-surface-dark border-b border-border dark:border-border">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              {/* Mobile menu button - only visible on mobile */}
              <button
                type="button"
                className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Desktop collapse button - only visible on desktop */}
              <button
                type="button"
                className="hidden lg:flex -ml-0.5 -mt-0.5 h-12 w-12 items-center justify-center rounded-md text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary mr-4"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
              </button>

              {/* Page title */}
              <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-text-primary dark:text-text-dark">
                {[...navigation, ...platformNavigation].find(item => item.current)?.name || 'Dashboard'}
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