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
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './admin/LoginPage';
import DashboardPage from './admin/DashboardPage';
import ProjectsManagement from './admin/ProjectsManagement';
import ProjectForm from './admin/ProjectForm';
import FormationsManagement from './admin/FormationsManagement';
import FormationForm from './admin/FormationForm';
import PlatformFormationsManagement from './admin/PlatformFormationsManagement';
import FormationCategoriesManagement from './admin/FormationCategoriesManagement';
import LessonsManagement from './admin/LessonsManagement';
import ContactMessagesManagement from './admin/ContactMessagesManagement';
import ProtectedRoute from './admin/ProtectedRoute';
import FormationsListPage from './formations/FormationsListPage';
import FormationDetailPage from './formations/FormationDetailPage';
import LessonPlayerPage from './formations/LessonPlayerPage';
import UserProgressDashboard from './formations/UserProgressDashboard';

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>

        <Router>
          <div className="App">

            {/* Routes */}
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home1 />} />
              <Route path="/projets" element={<ProjectsPage />} />
              <Route path="/projets/:id" element={<ProjectDetailPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Formations routes */}
              <Route path="/formations" element={<FormationsListPage />} />
              <Route path="/formations/:slug" element={<FormationDetailPage />} />
              <Route path="/formations/:slug/lessons/:lessonId" element={<LessonPlayerPage />} />
              <Route path="/mon-apprentissage" element={<UserProgressDashboard />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/projects" element={
                <ProtectedRoute>
                  <ProjectsManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/projects/new" element={
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/projects/:id/edit" element={
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/formations" element={
                <ProtectedRoute>
                  <FormationsManagement />
                </ProtectedRoute>
              } />

              <Route path="/admin/messages" element={
                <ProtectedRoute>
                  <ContactMessagesManagement />
                </ProtectedRoute>
              } />

              {/* Platform formations management */}
              <Route path="/admin/platform-formations" element={
                <ProtectedRoute>
                  <PlatformFormationsManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/platform-formations/create" element={
                <ProtectedRoute>
                  <FormationForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/platform-formations/:id/edit" element={
                <ProtectedRoute>
                  <FormationForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/formation-categories" element={
                <ProtectedRoute>
                  <FormationCategoriesManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/lessons" element={
                <ProtectedRoute>
                  <LessonsManagement />
                </ProtectedRoute>
              } />

              {/* Fallback route */}
              <Route path="*" element={<Home1 />} />
            </Routes>
          </div>
        </Router>

      </AuthProvider>

    </ThemeProvider>
  );
};

export default App;