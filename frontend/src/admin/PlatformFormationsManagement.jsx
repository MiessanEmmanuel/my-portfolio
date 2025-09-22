import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Button from '../components/Button';
import { formationsApi } from '../services/formationsApi';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  Users,
  Clock,
  BookOpen,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

const PlatformFormationsManagement = () => {
  const [formations, setFormations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, formation: null });

  const levels = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [formationsResponse, categoriesResponse] = await Promise.all([
        formationsApi.admin.getFormations(),
        formationsApi.admin.getCategories()
      ]);
      
      setFormations(formationsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFormation = async (formationId) => {
    try {
      await formationsApi.admin.deleteFormation(formationId);
      setFormations(formations.filter(f => f.id !== formationId));
      setDeleteModal({ show: false, formation: null });
    } catch (error) {
      console.error('Error deleting formation:', error);
    }
  };

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || formation.category_id === parseInt(selectedCategory);
    const matchesLevel = selectedLevel === 'all' || formation.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const FormationCard = ({ formation }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6 hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark line-clamp-1">
              {formation.title}
            </h3>
            <div className="flex gap-2">
              {formation.is_free && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Gratuit
                </span>
              )}
              {formation.is_premium && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Premium
                </span>
              )}
              {formation.is_published ? (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Publié
                </span>
              ) : (
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  Brouillon
                </span>
              )}
            </div>
          </div>
          <p className="text-text-secondary dark:text-text-light text-sm line-clamp-2 mb-3">
            {formation.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-text-light">
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              <span>{formation.category?.name || 'Sans catégorie'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} />
              <span>{formation.level}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{formation.students_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formation.total_duration ? `${Math.round(formation.total_duration / 60)}h` : 'N/A'}</span>
            </div>
          </div>
        </div>
        <img
          src={formation.image || '/default-formation.jpg'}
          alt={formation.title}
          className="w-20 h-20 object-cover rounded-lg ml-4"
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500" size={16} fill="currentColor" />
            <span className="text-sm font-medium">{formation.rating || '0'}</span>
          </div>
          {!formation.is_free && (
            <span className="text-lg font-bold text-primary">{formation.price}€</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Link to={`/formations/${formation.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              <Eye size={16} />
            </Button>
          </Link>
          <Link to={`/admin/platform-formations/${formation.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit size={16} />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteModal({ show: true, formation })}
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-text-dark">
              Gestion des formations de la plateforme
            </h1>
            <p className="text-text-secondary dark:text-text-light mt-1">
              Gérez les formations disponibles sur votre plateforme
            </p>
          </div>
          <Link to="/admin/platform-formations/create">
            <Button variant="primary">
              <Plus size={20} className="mr-2" />
              Nouvelle formation
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-border dark:border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-smooth"
              >
                <Filter size={16} />
                Filtres
                <ChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
              </button>
              <span className="text-text-secondary dark:text-text-light">
                {filteredFormations.length} formation{filteredFormations.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border dark:border-border">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Niveau
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                >
                  <option value="all">Tous les niveaux</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Formations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border dark:border-border">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredFormations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFormations.map(formation => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-12 text-center">
            <BookOpen className="mx-auto h-16 w-16 text-text-light mb-4" />
            <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
              Aucune formation trouvée
            </h3>
            <p className="text-text-secondary dark:text-text-light mb-6">
              {searchTerm || selectedCategory !== 'all' || selectedLevel !== 'all'
                ? 'Aucune formation ne correspond à vos critères de recherche'
                : 'Commencez par créer votre première formation'
              }
            </p>
            <div className="flex gap-4 justify-center">
              {(searchTerm || selectedCategory !== 'all' || selectedLevel !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLevel('all');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              )}
              <Link to="/admin/platform-formations/create">
                <Button variant="primary">
                  <Plus size={16} className="mr-2" />
                  Créer une formation
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModal.show && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark">
                    Supprimer la formation
                  </h3>
                  <p className="text-text-secondary dark:text-text-light">
                    Cette action est irréversible
                  </p>
                </div>
              </div>
              
              <p className="text-text-secondary dark:text-text-light mb-6">
                Êtes-vous sûr de vouloir supprimer la formation "<strong>{deleteModal.formation?.title}</strong>" ? 
                Cette action supprimera également tous les chapitres, leçons et progressions associés.
              </p>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModal({ show: false, formation: null })}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleDeleteFormation(deleteModal.formation.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700"
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

export default PlatformFormationsManagement;