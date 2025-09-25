import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import Button from '../../components/Button';
import { adminService } from '../../services/adminService';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Github,
  Calendar,
  User,
  Loader,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getProjects();
      setProjects(response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await adminService.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter projects
  const categories = ['Tous', ...new Set(projects.map(p => p.category))];
  const statuses = ['Tous', ...new Set(projects.map(p => p.status))];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Tous' || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const ProjectCard = ({ project }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden hover:shadow-lg transition-smooth">
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
            {project.category}
          </span>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${project.status === 'Terminé'
              ? 'bg-accent-green text-white'
              : project.status === 'En cours'
                ? 'bg-accent-yellow text-white'
                : 'bg-gray-500 text-white'
            }`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
          {project.title}
        </h3>
        <p className="text-text-secondary dark:text-text-light mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between text-sm text-text-secondary dark:text-text-light mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{project.date_completed || project.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={14} />
            <span>{project.client}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-smooth"
                title="Voir le projet"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-smooth"
                title="Code source"
              >
                <Github size={16} />
              </a>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              to={`/admin/projects/${project.id}/edit`}
              className="p-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-smooth"
              title="Modifier"
            >
              <Edit size={16} />
            </Link>
            <button
              onClick={() => setDeleteConfirm(project.id)}
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-smooth"
              title="Supprimer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary dark:text-text-dark">
              Gestion des projets
            </h1>
            <p className="text-text-secondary dark:text-text-light mt-1">
              Gérez vos projets de portfolio
            </p>
          </div>
          <Link to="/admin/projects/new">
            <Button variant="gradient" size="lg">
              <Plus size={20} className="mr-2" />
              Nouveau projet
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin h-8 w-8 text-primary" />
            <span className="ml-2 text-text-secondary">Chargement des projets...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-700">{error}</p>
            <Button variant="outline" size="sm" className="ml-auto" onClick={fetchProjects}>
              Réessayer
            </Button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary dark:text-text-light">
                {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {filteredProjects.length === 0 && projects.length > 0 && (
              <div className="text-center py-16">
                <p className="text-text-secondary dark:text-text-light text-lg">
                  Aucun projet trouvé avec ces critères.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Tous');
                    setSelectedStatus('Tous');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark mb-4">
                Confirmer la suppression
              </h3>
              <p className="text-text-secondary dark:text-text-light mb-6">
                Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Annuler
                </Button>
                <Button
                  variant="gradient"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDeleteProject(deleteConfirm)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProjectsManagement;