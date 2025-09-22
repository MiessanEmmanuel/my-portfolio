import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Button from '../components/Button';
import { formationsApi } from '../services/formationsApi';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Folder,
  BookOpen,
  AlertCircle,
  X,
  Save
} from 'lucide-react';

const FormationCategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, category: null });
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    color: '#3B82F6',
    sort_order: 0
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await formationsApi.admin.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        const response = await formationsApi.admin.updateCategory(editingCategory.id, formData);
        setCategories(categories.map(cat =>
          cat.id === editingCategory.id ? response.data : cat
        ));
      } else {
        const response = await formationsApi.admin.createCategory(formData);
        setCategories([...categories, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await formationsApi.admin.deleteCategory(categoryId);
      setCategories(categories.filter(cat => cat.id !== categoryId));
      setDeleteModal({ show: false, category: null });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: '',
      color: '#3B82F6',
      sort_order: 0
    });
    setEditingCategory(null);
    setShowModal(false);
  };

  const openEditModal = (category) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      icon: category.icon || '',
      color: category.color || '#3B82F6',
      sort_order: category.sort_order || 0
    });
    setEditingCategory(category);
    setShowModal(true);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CategoryCard = ({ category }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6 hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: category.color || '#3B82F6' }}
          >
            {category.icon ? (
              <span className="text-xl">{category.icon}</span>
            ) : (
              <Folder size={24} />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark">
              {category.name}
            </h3>
            <p className="text-sm text-text-secondary dark:text-text-light">
              {category.slug}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => openEditModal(category)}>
            <Edit size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteModal({ show: true, category })}
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {category.description && (
        <p className="text-text-secondary dark:text-text-light mb-4">
          {category.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border">
        <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-light">
          <BookOpen size={16} />
          <span>{category.formations_count || 0} formation{(category.formations_count || 0) !== 1 ? 's' : ''}</span>
        </div>
        <span className="text-sm text-text-secondary dark:text-text-light">
          Ordre: {category.sort_order || 0}
        </span>
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
              Catégories de formations
            </h1>
            <p className="text-text-secondary dark:text-text-light mt-1">
              Organisez vos formations par catégories
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Plus size={20} className="mr-2" />
            Nouvelle catégorie
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une catégorie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                />
              </div>
            </div>
            <span className="text-text-secondary dark:text-text-light">
              {filteredCategories.length} catégorie{filteredCategories.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-24"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex justify-between pt-4 border-t border-border dark:border-border">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-12 text-center">
            <Folder className="mx-auto h-16 w-16 text-text-light mb-4" />
            <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
              Aucune catégorie trouvée
            </h3>
            <p className="text-text-secondary dark:text-text-light mb-6">
              {searchTerm
                ? 'Aucune catégorie ne correspond à votre recherche'
                : 'Commencez par créer votre première catégorie'
              }
            </p>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <Plus size={16} className="mr-2" />
              Créer une catégorie
            </Button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark">
                  {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-smooth"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({
                        ...formData,
                        name,
                        slug: generateSlug(name)
                      });
                    }}
                    className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                    placeholder="Ex: Développement Web"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                    placeholder="Ex: developpement-web"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                    rows="3"
                    placeholder="Description de la catégorie..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Icône (Emoji)
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                      placeholder="💻"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Couleur
                    </label>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full h-10 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                    min="0"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={resetForm} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    <Save size={16} className="mr-2" />
                    {editingCategory ? 'Modifier' : 'Créer'}
                  </Button>
                </div>
              </form>
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
                    Supprimer la catégorie
                  </h3>
                  <p className="text-text-secondary dark:text-text-light">
                    Cette action est irréversible
                  </p>
                </div>
              </div>

              <p className="text-text-secondary dark:text-text-light mb-6">
                Êtes-vous sûr de vouloir supprimer la catégorie "<strong>{deleteModal.category?.name}</strong>" ?
                {deleteModal.category?.formations_count > 0 && (
                  <span className="block mt-2 text-red-600">
                    Attention : Cette catégorie contient {deleteModal.category.formations_count} formation{deleteModal.category.formations_count !== 1 ? 's' : ''}.
                  </span>
                )}
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModal({ show: false, category: null })}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleDeleteCategory(deleteModal.category.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={deleteModal.category?.formations_count > 0}
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

export default FormationCategoriesManagement;