import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Button from '../components/Button';
import { adminService } from '../services/adminService';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Award,
  Building,
  Clock,
  Loader,
  AlertCircle,
  BookOpen,
  ExternalLink
} from 'lucide-react';

const FormationsManagement = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getFormations();
      setFormations(response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching formations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFormation = async (id) => {
    try {
      await adminService.deleteFormation(id);
      setFormations(formations.filter(f => f.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter formations
  const types = ['Tous', ...new Set(formations.map(f => f.type))];
  const statuses = ['Tous', ...new Set(formations.map(f => f.status))];

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Tous' || formation.type === selectedType;
    const matchesStatus = selectedStatus === 'Tous' || formation.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const FormationCard = ({ formation }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden hover:shadow-lg transition-smooth">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-secondary text-white text-sm font-medium rounded-full">
                {formation.type}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                formation.status === 'Terminé'
                  ? 'bg-accent-green text-white'
                  : formation.status === 'En cours'
                    ? 'bg-accent-yellow text-white'
                    : 'bg-gray-500 text-white'
              }`}>
                {formation.status}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
              {formation.title}
            </h3>
            
            <div className="flex items-center gap-2 text-text-secondary dark:text-text-light mb-3">
              <Building size={16} />
              <span>{formation.institution}</span>
            </div>

            <p className="text-text-secondary dark:text-text-light mb-4 line-clamp-2">
              {formation.description}
            </p>

            <div className="flex items-center justify-between text-sm text-text-secondary dark:text-text-light mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>
                  {new Date(formation.start_date).toLocaleDateString('fr-FR')}
                  {formation.end_date && ` - ${new Date(formation.end_date).toLocaleDateString('fr-FR')}`}
                </span>
              </div>
              {formation.duration_hours && (
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{formation.duration_hours}h</span>
                </div>
              )}
            </div>

            {formation.skills && formation.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {formation.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-accent-blue/10 text-accent-blue text-xs rounded-full">
                    {skill.skill_name}
                  </span>
                ))}
                {formation.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-text-light text-xs rounded-full">
                    +{formation.skills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {formation.certificate_url && (
              <a
                href={formation.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent-green/10 text-accent-green rounded-lg hover:bg-accent-green/20 transition-smooth"
                title="Voir le certificat"
              >
                <Award size={16} />
              </a>
            )}
          </div>
          
          <div className="flex gap-2">
            <Link
              to={`/admin/formations/${formation.id}/edit`}
              className="p-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-smooth"
              title="Modifier"
            >
              <Edit size={16} />
            </Link>
            <button
              onClick={() => setDeleteConfirm(formation.id)}
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
              Gestion des formations
            </h1>
            <p className="text-text-secondary dark:text-text-light mt-1">
              Gérez vos formations et certifications
            </p>
          </div>
          <Link to="/admin/formations/new">
            <Button variant="gradient" size="lg">
              <Plus size={20} className="mr-2" />
              Nouvelle formation
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
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
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
            <span className="ml-2 text-text-secondary">Chargement des formations...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-700">{error}</p>
            <Button variant="outline" size="sm" className="ml-auto" onClick={fetchFormations}>
              Réessayer
            </Button>
          </div>
        )}

        {/* Formations Grid */}
        {!loading && !error && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary dark:text-text-light">
                {filteredFormations.length} formation{filteredFormations.length !== 1 ? 's' : ''} trouvée{filteredFormations.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFormations.map(formation => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>

            {filteredFormations.length === 0 && formations.length > 0 && (
              <div className="text-center py-16">
                <BookOpen className="mx-auto h-12 w-12 text-text-light mb-4" />
                <p className="text-text-secondary dark:text-text-light text-lg">
                  Aucune formation trouvée avec ces critères.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('Tous');
                    setSelectedStatus('Tous');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {formations.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="mx-auto h-12 w-12 text-text-light mb-4" />
                <p className="text-text-secondary dark:text-text-light text-lg">
                  Aucune formation enregistrée pour le moment.
                </p>
                <Link to="/admin/formations/new" className="mt-4 inline-block">
                  <Button variant="gradient">
                    <Plus size={16} className="mr-2" />
                    Ajouter votre première formation
                  </Button>
                </Link>
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
                Êtes-vous sûr de vouloir supprimer cette formation ? Cette action est irréversible.
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
                  onClick={() => handleDeleteFormation(deleteConfirm)}
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

export default FormationsManagement;