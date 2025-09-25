import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import Button from '../../components/Button';
import { adminService } from '../../services/adminService';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  ExternalLink,
  Github,
  Loader,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    category: '',
    status: 'En cours',
    image: '',
    live_url: '',
    github_url: '',
    client: '',
    date_completed: '',
    duration: '',
    slug: '',
    featured: false,
    technologies: [],
    features: [],
    gallery: []
  });

  const [technologies, setTechnologies] = useState([]);
  const [features, setFeatures] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newGalleryItem, setNewGalleryItem] = useState({ image_url: '', alt_text: '' });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Application Web',
    'Application Mobile',
    'Site Web',
    'E-commerce',
    'Dashboard',
    'API',
    'Desktop',
    'Autre'
  ];

  const statuses = [
    'En cours',
    'Terminé',
    'En pause',
    'Planifié'
  ];

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id, isEdit]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const project = await adminService.getProject(id);
      
      setFormData({
        ...project,
        date_completed: project.date_completed ? project.date_completed.split('T')[0] : '',
        featured: Boolean(project.featured)
      });
      
      setTechnologies(project.technologies || []);
      setFeatures(project.features || []);
      setGallery(project.gallery || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }
    if (!formData.status) {
      newErrors.status = 'Le statut est requis';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'L\'image principale est requise';
    }
    if (!formData.client.trim()) {
      newErrors.client = 'Le client est requis';
    }
    if (!formData.duration.trim()) {
      newErrors.duration = 'La durée est requise';
    }

    // Generate slug if not provided
    if (!formData.slug.trim()) {
      formData.slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const projectData = {
        ...formData,
        technologies,
        features,
        gallery
      };

      if (isEdit) {
        await adminService.updateProject(id, projectData);
      } else {
        await adminService.createProject(projectData);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/projects');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Technology management
  const addTechnology = () => {
    if (newTech.trim() && !technologies.find(t => t.name === newTech.trim())) {
      setTechnologies([...technologies, { name: newTech.trim() }]);
      setNewTech('');
    }
  };

  const removeTechnology = (index) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  // Feature management
  const addFeature = () => {
    if (newFeature.trim() && !features.find(f => f.feature_text === newFeature.trim())) {
      setFeatures([...features, { feature_text: newFeature.trim() }]);
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Gallery management
  const addGalleryItem = () => {
    if (newGalleryItem.image_url.trim()) {
      setGallery([...gallery, { ...newGalleryItem }]);
      setNewGalleryItem({ image_url: '', alt_text: '' });
    }
  };

  const removeGalleryItem = (index) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-16">
          <Loader className="animate-spin h-8 w-8 text-primary" />
          <span className="ml-2 text-text-secondary">Chargement du projet...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/projects')}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-smooth"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-text-primary dark:text-text-dark">
                {isEdit ? 'Modifier le projet' : 'Nouveau projet'}
              </h1>
              <p className="text-text-secondary dark:text-text-light">
                {isEdit ? 'Modifiez les informations du projet' : 'Ajoutez un nouveau projet à votre portfolio'}
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            <p className="text-green-700">
              Projet {isEdit ? 'modifié' : 'créé'} avec succès ! Redirection en cours...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-6">
              Informations générales
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Titre du projet *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.title ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                  placeholder="Nom du projet"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.category ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Statut *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.status ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
              </div>

              <div>
                <label htmlFor="client" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Client *
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.client ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                  placeholder="Nom du client"
                />
                {errors.client && <p className="text-red-500 text-sm mt-1">{errors.client}</p>}
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Durée *
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.duration ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                  placeholder="ex: 3 mois"
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              <div>
                <label htmlFor="date_completed" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Date de completion
                </label>
                <input
                  type="date"
                  id="date_completed"
                  name="date_completed"
                  value={formData.date_completed}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="url-du-projet"
                />
                <p className="text-xs text-text-secondary mt-1">Sera généré automatiquement si vide</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-text-primary dark:text-text-dark">
                  Projet mis en avant
                </label>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Description courte *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark resize-none ${
                    errors.description ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                  placeholder="Description courte du projet"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="long_description" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Description détaillée
                </label>
                <textarea
                  id="long_description"
                  name="long_description"
                  rows={6}
                  value={formData.long_description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark resize-none"
                  placeholder="Description détaillée du projet, contexte, défis, solutions..."
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-6">
              Médias et liens
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Image principale (URL) *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.image ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>

              <div>
                <label htmlFor="live_url" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  URL du projet en ligne
                </label>
                <input
                  type="url"
                  id="live_url"
                  name="live_url"
                  value={formData.live_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="https://monprojet.com"
                />
              </div>

              <div>
                <label htmlFor="github_url" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  URL du dépôt GitHub
                </label>
                <input
                  type="url"
                  id="github_url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-6">
              Technologies utilisées
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="Nom de la technologie"
                />
                <Button type="button" variant="outline" onClick={addTechnology}>
                  <Plus size={16} />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    <span>{tech.name}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="text-primary hover:text-primary-hover"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-6">
              Fonctionnalités principales
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="flex-1 px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="Description de la fonctionnalité"
                />
                <Button type="button" variant="outline" onClick={addFeature}>
                  <Plus size={16} />
                </Button>
              </div>

              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-background-dark rounded-lg">
                    <CheckCircle className="text-accent-green flex-shrink-0" size={16} />
                    <span className="flex-1 text-text-primary dark:text-text-dark">{feature.feature_text}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-6">
              Galerie d'images
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="url"
                  value={newGalleryItem.image_url}
                  onChange={(e) => setNewGalleryItem(prev => ({ ...prev, image_url: e.target.value }))}
                  className="px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="URL de l'image"
                />
                <input
                  type="text"
                  value={newGalleryItem.alt_text}
                  onChange={(e) => setNewGalleryItem(prev => ({ ...prev, alt_text: e.target.value }))}
                  className="px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="Texte alternatif"
                />
                <Button type="button" variant="outline" onClick={addGalleryItem}>
                  <Plus size={16} className="mr-2" />
                  Ajouter
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((item, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={item.image_url}
                      alt={item.alt_text}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-smooth"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/projects')}
              disabled={submitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  {isEdit ? 'Modification...' : 'Création...'}
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  {isEdit ? 'Modifier le projet' : 'Créer le projet'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProjectForm;