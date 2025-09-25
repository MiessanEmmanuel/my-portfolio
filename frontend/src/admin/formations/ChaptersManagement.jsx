import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import Button from '../../components/Button';
import { formationsApi } from '../../services/formationsApi';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  BookOpen,
  Clock,
  Users,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ChaptersManagement = () => {
  const [chapters, setChapters] = useState([]);
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('all');
  const [publishedOnly, setPublishedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('order');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadChapters();
  }, [selectedFormation, publishedOnly, sortBy, searchTerm]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [chaptersResponse, formationsResponse] = await Promise.all([
        formationsApi.admin.getChapters(),
        formationsApi.admin.getFormations()
      ]);
      
      setChapters(Array.isArray(chaptersResponse.data) ? chaptersResponse.data : []);
      setFormations(Array.isArray(formationsResponse.data) ? formationsResponse.data : []);
    } catch (error) {
      console.error('Error loading data:', error);
      setChapters([]);
      setFormations([]);
    } finally {
      setLoading(false);
    }
  };

  const loadChapters = async () => {
    try {
      const params = {};
      
      if (selectedFormation !== 'all') {
        params.formation_id = selectedFormation;
      }
      
      if (publishedOnly) {
        params.published_only = true;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (sortBy) {
        params.sort = sortBy;
      }

      const response = await formationsApi.admin.getChapters(params);
      setChapters(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error loading chapters:', error);
      setChapters([]);
    }
  };

  const handleDelete = async (chapterId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce chapitre ?')) {
      try {
        await formationsApi.admin.deleteChapter(chapterId);
        setChapters(chapters.filter(chapter => chapter.id !== chapterId));
      } catch (error) {
        console.error('Error deleting chapter:', error);
        alert('Erreur lors de la suppression du chapitre');
      }
    }
  };

  const handlePublishToggle = async (chapter) => {
    try {
      if (chapter.is_published) {
        await formationsApi.admin.unpublishChapter(chapter.id);
      } else {
        await formationsApi.admin.publishChapter(chapter.id);
      }
      
      setChapters(chapters.map(c => 
        c.id === chapter.id 
          ? { ...c, is_published: !c.is_published }
          : c
      ));
    } catch (error) {
      console.error('Error toggling publish status:', error);
      alert('Erreur lors de la modification du statut de publication');
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '0min';
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return hours + 'h' + (remainingMinutes > 0 ? ' ' + remainingMinutes + 'min' : '');
    }
    
    return remainingMinutes + 'min';
  };

  const filteredChapters = chapters.filter(chapter => {
    if (selectedFormation !== 'all' && chapter.formation_id !== parseInt(selectedFormation)) {
      return false;
    }
    
    if (publishedOnly && !chapter.is_published) {
      return false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return chapter.title?.toLowerCase().includes(searchLower) ||
             chapter.description?.toLowerCase().includes(searchLower);
    }
    
    return true;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-text-dark">
              Gestion des Chapitres
            </h1>
            <p className="text-text-secondary dark:text-text-light mt-1">
              Gérez les chapitres de vos formations
            </p>
          </div>
          
          <Link to="/admin/formation-chapters/new">
            <Button variant="gradient" className="flex items-center gap-2">
              <Plus size={20} />
              Nouveau Chapitre
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
              />
            </div>

            {/* Formation Filter */}
            <div>
              <select
                value={selectedFormation}
                onChange={(e) => setSelectedFormation(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
              >
                <option value="all">Toutes les formations</option>
                {formations.map(formation => (
                  <option key={formation.id} value={formation.id}>
                    {formation.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
              >
                <option value="order">Par ordre</option>
                <option value="title">Par titre</option>
                <option value="duration">Par durée</option>
                <option value="created">Par date création</option>
              </select>
            </div>

            {/* Published Only */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="publishedOnly"
                checked={publishedOnly}
                onChange={(e) => setPublishedOnly(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
              />
              <label htmlFor="publishedOnly" className="ml-2 text-sm text-text-primary dark:text-text-dark">
                Publiés seulement
              </label>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden">
          {filteredChapters.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-text-light mb-4" />
              <h3 className="text-lg font-medium text-text-primary dark:text-text-dark mb-2">
                Aucun chapitre trouvé
              </h3>
              <p className="text-text-secondary dark:text-text-light">
                {searchTerm || selectedFormation !== 'all' || publishedOnly 
                  ? 'Aucun chapitre ne correspond à vos critères de recherche.'
                  : 'Commencez par créer votre premier chapitre.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border dark:divide-border">
                <thead className="bg-gray-50 dark:bg-background-dark">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-light uppercase tracking-wider">
                      Chapitre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-light uppercase tracking-wider">
                      Formation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-light uppercase tracking-wider">
                      Ordre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-light uppercase tracking-wider">
                      Durée
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-light uppercase tracking-wider">
                      Leçons
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-light uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary dark:text-text-light uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-surface-dark divide-y divide-border dark:divide-border">
                  {filteredChapters.map((chapter) => (
                    <tr key={chapter.id} className="hover:bg-gray-50 dark:hover:bg-background-dark">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-text-primary dark:text-text-dark">
                            {chapter.title}
                          </div>
                          {chapter.description && (
                            <div className="text-sm text-text-secondary dark:text-text-light truncate max-w-xs">
                              {chapter.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-primary dark:text-text-dark">
                          {chapter.formation?.title || 'Formation non trouvée'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-text-primary dark:text-text-dark">
                          #{chapter.sort_order}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-text-secondary dark:text-text-light">
                          <Clock size={16} className="mr-1" />
                          {formatDuration(chapter.duration_minutes)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-text-secondary dark:text-text-light">
                          <Users size={16} className="mr-1" />
                          {chapter.lessons?.length || 0} leçon{chapter.lessons?.length > 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handlePublishToggle(chapter)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            chapter.is_published
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {chapter.is_published ? (
                            <>
                              <CheckCircle size={14} className="mr-1" />
                              Publié
                            </>
                          ) : (
                            <>
                              <AlertCircle size={14} className="mr-1" />
                              Brouillon
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/admin/formation-chapters/${chapter.id}/edit`}
                            className="text-primary hover:text-primary-hover"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handlePublishToggle(chapter)}
                            className="text-text-secondary hover:text-text-primary"
                          >
                            {chapter.is_published ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <button
                            onClick={() => handleDelete(chapter.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-surface-dark rounded-lg p-6 border border-border dark:border-border">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-text-primary dark:text-text-dark">
                  {chapters.length}
                </p>
                <p className="text-text-secondary dark:text-text-light">
                  Chapitres au total
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-surface-dark rounded-lg p-6 border border-border dark:border-border">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-text-primary dark:text-text-dark">
                  {chapters.filter(c => c.is_published).length}
                </p>
                <p className="text-text-secondary dark:text-text-light">
                  Chapitres publiés
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-surface-dark rounded-lg p-6 border border-border dark:border-border">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-text-primary dark:text-text-dark">
                  {formatDuration(chapters.reduce((total, c) => total + (c.duration_minutes || 0), 0))}
                </p>
                <p className="text-text-secondary dark:text-text-light">
                  Durée totale
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChaptersManagement;