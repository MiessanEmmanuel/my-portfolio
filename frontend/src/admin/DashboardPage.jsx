import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../services/api'
import AdminLayout from './AdminLayout';
import Button from '../components/Button';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import {
  FolderOpen,
  GraduationCap,
  MessageSquare,
  User,
  Calendar,
  TrendingUp,
  Eye,
  Plus,
  ArrowRight,
  Loader
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({
    projects: 0,
    formations: 0,
    messages: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');

      // Fetch projects count
      const projectsResponse = await fetch(`${API_BASE_URL || 'http://127.0.0.1:8000/api'}/admin/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      // Fetch formations count
      const formationsResponse = await fetch(`${API_BASE_URL || 'http://127.0.0.1:8000/api'}/admin/formations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      // Fetch messages count
      const messagesResponse = await fetch(`${API_BASE_URL || 'http://127.0.0.1:8000/api'}/admin/contact-messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (projectsResponse.ok && formationsResponse.ok && messagesResponse.ok) {
        const projectsData = await projectsResponse.json();
        const formationsData = await formationsResponse.json();
        const messagesData = await messagesResponse.json();

        setStats({
          projects: projectsData.data?.length || projectsData.length || 0,
          formations: formationsData.data?.length || formationsData.length || 0,
          messages: messagesData.data?.length || messagesData.length || 0,
          totalViews: Math.floor(Math.random() * 10000) + 1000 // Mock data for now
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
      console.error('Dashboard stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, link }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border hover:shadow-lg transition-smooth">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary dark:text-text-light mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-text-primary dark:text-text-dark">
            {loading ? '...' : value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
      {link && (
        <div className="mt-4">
          <Link
            to={link}
            className="text-primary hover:text-primary-hover text-sm font-medium flex items-center gap-1"
          >
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );

  const QuickAction = ({ title, description, icon: Icon, color, link }) => (
    <Link
      to={link}
      className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border hover:shadow-lg hover:border-primary/30 transition-smooth group"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-smooth`}>
          <Icon className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark mb-2">
            {title}
          </h3>
          <p className="text-text-secondary dark:text-text-light text-sm">
            {description}
          </p>
        </div>
        <ArrowRight className="text-text-light group-hover:text-primary transition-smooth" size={20} />
      </div>
    </Link>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bonjour, {user?.name || 'Admin'} 👋
              </h1>
              <p className="text-lg opacity-90">
                Voici un aperçu de votre portfolio aujourd'hui
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/80">
              <Calendar size={20} />
              <span>{new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={fetchDashboardStats}
            >
              Réessayer
            </Button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Projets"
            value={stats.projects}
            icon={FolderOpen}
            color="bg-primary"
            link="/admin/projects"
          />
          <StatCard
            title="Formations"
            value={stats.formations}
            icon={GraduationCap}
            color="bg-secondary"
            link="/admin/formations"
          />
          <StatCard
            title="Messages"
            value={stats.messages}
            icon={MessageSquare}
            color="bg-accent-green"
            link="/admin/messages"
          />
          <StatCard
            title="Vues totales"
            value={stats.totalViews.toLocaleString()}
            icon={Eye}
            color="bg-accent-blue"
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
            Actions rapides
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickAction
              title="Nouveau projet"
              description="Ajouter un nouveau projet à votre portfolio"
              icon={Plus}
              color="bg-primary"
              link="/admin/projects/new"
            />
            <QuickAction
              title="Nouvelle formation"
              description="Ajouter une formation ou certification"
              icon={Plus}
              color="bg-secondary"
              link="/admin/formations/new"
            />
            <QuickAction
              title="Messages récents"
              description="Consulter les derniers messages reçus"
              icon={MessageSquare}
              color="bg-accent-green"
              link="/admin/messages"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
          <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-4">
            Activité récente
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-background-dark rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <FolderOpen className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-primary dark:text-text-dark">
                  Vous avez {stats.projects} projets dans votre portfolio
                </p>
                <p className="text-xs text-text-secondary dark:text-text-light">
                  Dernière modification aujourd'hui
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-background-dark rounded-lg">
              <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
                <MessageSquare className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-primary dark:text-text-dark">
                  {stats.messages} nouveaux messages reçus
                </p>
                <p className="text-xs text-text-secondary dark:text-text-light">
                  Nécessite votre attention
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;