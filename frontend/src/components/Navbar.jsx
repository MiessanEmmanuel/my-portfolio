import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2, Moon, Sun } from 'lucide-react';
import Button from './Button';
import { useTheme } from '../contexts/ThemeContext';

const NavBar = ({ variant = 1 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Projets', href: '/projets' },
    { name: 'Contact', href: '/contact' },
  ];

  const navVariants = {
    1: 'bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-border dark:border-border',
    2: 'bg-background-dark text-text-dark',
    3: 'bg-transparent absolute top-0 left-0 right-0 z-50',
  };

  return (
    <nav className={`sticky top-0 z-50 transition-smooth ${navVariants[variant]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary dark:text-text-dark">DevFolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary dark:text-text-light hover:text-primary transition-smooth font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-text-secondary dark:text-text-light hover:text-primary transition-smooth font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-surface transition-smooth text-text-secondary hover:text-primary"
              aria-label="Basculer le mode sombre"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="#github">
              <Button variant="outline" size="sm">
                Github
              </Button>
            </Link>
            <Button variant="primary" size="sm">
              Télécharger mon CV
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface transition-smooth"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-background-dark border-b border-border dark:border-border animate-scale-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-text-secondary dark:text-text-light hover:text-primary transition-smooth font-medium py-2"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-text-secondary dark:text-text-light hover:text-primary transition-smooth font-medium py-2"
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="pt-4 space-y-3">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 w-full p-2 rounded-lg hover:bg-surface dark:hover:bg-surface-dark transition-smooth text-text-secondary dark:text-text-light"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                {isDark ? 'Mode clair' : 'Mode sombre'}
              </button>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  Contact
                </Button>
              </Link>
              <Button variant="primary" size="sm" className="w-full">
                Projets
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;