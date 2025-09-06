import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2, Moon, Sun } from 'lucide-react';
import Button from './Button';

const NavBar = ({ variant = 1 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];
  
  const navVariants = {
    1: 'bg-white/80 backdrop-blur-md border-b border-border',
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
            <span className="text-xl font-bold text-text-primary">DevFolio</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-primary transition-smooth font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-surface transition-smooth"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Get Started
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
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-border animate-scale-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-text-secondary hover:text-primary transition-smooth font-medium py-2"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
              <Button variant="primary" size="sm" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;