import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { formationsApi } from '../services/formationsApi';
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Award,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';

const FormationsListPage = () => {
  const [formations, setFormations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
  const sortOptions = [
    { value: 'popular', label: 'Plus populaires' },
    { value: 'newest', label: 'Plus récentes' },
    { value: 'rating', label: 'Mieux notées' },
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' }
  ];

  // Load formations and categories from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [formationsResponse, categoriesResponse] = await Promise.all([
          formationsApi.getFormations({
            search: searchTerm || undefined,
            category_id: selectedCategory !== 'all' ? selectedCategory : undefined,
            level: selectedLevel !== 'all' ? selectedLevel : undefined,
            sort: sortBy
          }),
          formationsApi.getCategories()
        ]);
        console.log(formationsResponse.data)
        setFormations(formationsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError('Erreur lors du chargement des formations');
        console.error('Error loading formations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Search will be handled by the main useEffect
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const FormationCard = ({ formation, isListView = false }) => (
    <div className={`bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-smooth group ${
      isListView ? 'flex gap-6 p-6' : ''
    }`}>
      <div className={`relative ${isListView ? 'w-80 flex-shrink-0' : ''}`}>
        <img
          src={formation.image}
          alt={formation.title}
          className={`w-full object-cover group-hover:scale-105 transition-smooth duration-500 ${
            isListView ? 'h-48 rounded-lg' : 'h-48'
          }`}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {formation.is_free ? (
            <span className="px-3 py-1 bg-accent-green text-white text-sm font-medium rounded-full">
              Gratuit
            </span>
          ) : formation.is_premium ? (
            <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
              Premium
            </span>
          ) : (
            <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
              Payant
            </span>
          )}
          <span className="px-3 py-1 bg-black/50 text-white text-sm font-medium rounded-full backdrop-blur">
            {formation.level}
          </span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur rounded-full p-4">
            <Play className="text-white" size={24} />
          </div>
        </div>
      </div>

      <div className={`${isListView ? 'flex-1' : 'p-6'}`}>
        <div className="flex items-start justify-between mb-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            {formation.category?.name || 'Général'}
          </span>
          {!formation.is_free && formation.price && (
            <span className="text-2xl font-bold text-primary">
              {formation.price}€
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-3 group-hover:text-primary transition-smooth line-clamp-2">
          {formation.title}
        </h3>

        <p className="text-text-secondary dark:text-text-light mb-4 line-clamp-2">
          {formation.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary dark:text-text-light">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{formation.total_duration ? `${Math.round(formation.total_duration / 60)}h` : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{formation.students_count?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500" size={16} fill="currentColor" />
            <span>{formation.rating || '0'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={formation.instructor?.user?.avatar || '/default-avatar.png'}
              alt={formation.instructor?.user?.name || 'Instructeur'}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-text-secondary dark:text-text-light">
              {formation.instructor?.user?.name || 'Instructeur'}
            </span>
          </div>
          
          <Link to={`/formations/${formation.slug}`}>
            <Button variant="outline" size="sm">
              <BookOpen size={16} className="mr-2" />
              Voir
            </Button>
          </Link>
        </div>

        {/* Technologies */}
        {formation.technologies && formation.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-4">
            {formation.technologies.slice(0, 4).map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-text-light text-xs rounded">
                {tech}
              </span>
            ))}
            {formation.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-text-light text-xs rounded">
                +{formation.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary dark:text-text-dark mb-6">
              Formations <span className="text-primary">Développement</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary dark:text-text-light max-w-3xl mx-auto mb-8">
              Apprenez les technologies modernes avec des formations pratiques 
              créées par des experts passionnés
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une formation, technologie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-border dark:border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark text-lg"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-smooth ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-surface-dark text-text-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              Toutes ({formations.length})
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-smooth ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-surface-dark text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {category.name} ({category.formations_count || 0})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8 border-b border-border dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-border dark:border-border rounded-lg hover:bg-gray-50 dark:hover:bg-surface-dark transition-smooth"
              >
                <SlidersHorizontal size={16} />
                Filtres
                <ChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-text-secondary dark:text-text-light">
                {formations.length} formation{formations.length !== 1 ? 's' : ''}
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-smooth ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-text-secondary'
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-smooth ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-text-secondary'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Niveau
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  >
                    <option value="all">Tous les niveaux</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Prix
                  </label>
                  <select className="w-full px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark">
                    <option value="all">Tous les prix</option>
                    <option value="free">Gratuit</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Durée
                  </label>
                  <select className="w-full px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark">
                    <option value="all">Toutes les durées</option>
                    <option value="short">Moins de 5h</option>
                    <option value="medium">5h - 15h</option>
                    <option value="long">Plus de 15h</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Formations Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="flex gap-4 mb-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-red-500 mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
                Erreur de chargement
              </h3>
              <p className="text-text-secondary dark:text-text-light mb-6">
                {error}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Réessayer
              </Button>
            </div>
          ) : formations.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }>
              {formations.map(formation => (
                <FormationCard 
                  key={formation.id} 
                  formation={formation} 
                  isListView={viewMode === 'list'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="mx-auto h-16 w-16 text-text-light mb-4" />
              <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
                Aucune formation trouvée
              </h3>
              <p className="text-text-secondary dark:text-text-light mb-6">
                Essayez de modifier vos critères de recherche
              </p>
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
            </div>
          )}
        </div>
      </section>

      <Footer variant={1} />
    </div>
  );
};

export default FormationsListPage;