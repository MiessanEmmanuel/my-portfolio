import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home1 from './pages/Home1';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import { Home, Layers, Sparkles } from 'lucide-react';

// Page Selector Component
const PageSelector = () => {
  const location = useLocation();

  const styleItems = {
    current : 'group flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white hover:bg-primary hover:text-white transition-smooth',
    notCurrent : 'group flex items-center justify-center w-12 h-12 rounded-xl hover:bg-primary hover:text-white transition-smooth'
  }
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-border p-2 flex flex-col gap-2">
        <Link 
          to="/" 
          className={ location.pathname === "/" ? styleItems.current : styleItems.notCurrent }
          title="Home 1"
        >
          <Home size={20} />
        </Link>
        <Link 
          to="/home2" 
           className={ location.pathname === "/home2" ? styleItems.current : styleItems.notCurrent }
          title="Home 2"
        >
          <Layers size={20} />
        </Link>
        <Link 
          to="/home3" 
           className={ location.pathname === "/home3" ? styleItems.current : styleItems.notCurrent }
          title="Home 3"
        >
          <Sparkles size={20} />
        </Link>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Page Selector - visible on all pages */}
        <PageSelector />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/home3" element={<Home3 />} />
          {/* Fallback route */}
          <Route path="*" element={<Home1 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;