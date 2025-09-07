import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home1 from './pages/Home1';
import ProjectsPage from './projets/ProjectsPage';
import ProjectDetailPage from './projets/ProjectDetailPage';
import Dashboard from './pages/Dashboard';
import ExerciseDetail from './pages/ExerciseDetail';
import ContactPage from './pages/ContactPage';
import { Home, Layers, Sparkles } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';



// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home1 />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/projets/:id" element={<ProjectDetailPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Fallback route */}
            <Route path="*" element={<Home1 />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;