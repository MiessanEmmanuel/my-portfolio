import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Button from '../components/Button';
import { authService } from '../services/authService';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Loader,
  AlertCircle,
  CheckCircle,
  X,
  BookOpen
} from 'lucide-react';

const FormationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    image: '',
    trailer_video_url: '',
    category_id: '',
    level: 'Débutant',
    duration_total_minutes: '',
    price: '',
    discount_price: '',
    is_free: false,
    is_premium: false,
    status: 'draft',
    difficulty_score: 1,
    requirements: [],
    objectives: [],
    technologies: [],
    has_certificate: false,
    certificate_template_url: ''
  });

  const [categories, setCategories] = useState([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newTechnology, setNewTechnology] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const statuses = [
    { value: 'draft', label: 'Brouillon' },
    { value: 'published', label: 'Publié' },
    { value: 'archived', label: 'Archivé' }
  ];

  const levels = [
    'Débutant',
    'Intermédiaire',
    'Avancé',
    'Expert'
  ];

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchFormation();
    }
  }, [id, isEdit]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${ import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8002/api'}/admin/formation-categories`, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        console.log(categories)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };


  const fetchFormation = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8002/api'}/admin/formations/${id}`, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const formation = await response.json();
        setFormData({
          title: formation.title || '',
          slug: formation.slug || '',
          description: formation.description || '',
          long_description: formation.long_description || '',
          image: formation.image || '',
          trailer_video_url: formation.trailer_video_url || '',
          category_id: formation.category_id || '',
          level: formation.level || 'Débutant',
          duration_total_minutes: formation.duration_total_minutes || '',
          price: formation.price || '',
          discount_price: formation.discount_price || '',
          is_free: formation.is_free || false,
          is_premium: formation.is_premium || false,
          status: formation.status || 'draft',
          difficulty_score: formation.difficulty_score || 1,
          requirements: formation.requirements || [],
          objectives: formation.objectives || [],
          technologies: formation.technologies || [],
          has_certificate: formation.has_certificate || false,
          certificate_template_url: formation.certificate_template_url || ''
        });
      } else {
        setError('Erreur lors du chargement de la formation');
      }
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
    if (!formData.category_id) {
      newErrors.category_id = 'La catégorie est requise';
    }

    if (!formData.level) {
      newErrors.level = 'Le niveau est requis';
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
      const formationData = {
        ...formData,
        duration_total_minutes: formData.duration_total_minutes ? parseInt(formData.duration_total_minutes) : null,
        price: formData.price ? parseFloat(formData.price) : null,
        discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
        difficulty_score: parseInt(formData.difficulty_score),
        requirements: Array.isArray(formData.requirements) ? formData.requirements : [],
        objectives: Array.isArray(formData.objectives) ? formData.objectives : [],
        technologies: Array.isArray(formData.technologies) ? formData.technologies : []
      };

      const url = isEdit 
        ? `${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8002/api'}/admin/formations/${id}`
        : `${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8002/api'}/admin/formations`;

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formationData)
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/formations');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur lors de la sauvegarde');
      }
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

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Array management functions
  const addRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addObjective = () => {
    if (newObjective.trim() && !formData.objectives.includes(newObjective.trim())) {
      setFormData(prev => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()]
      }));
      setNewObjective('');
    }
  };

  const removeObjective = (index) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-16">
          <Loader className="animate-spin h-8 w-8 text-primary" />
          <span className="ml-2 text-text-secondary">Chargement de la formation...</span>
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
              onClick={() => navigate('/admin/platform-formations/')}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-smooth"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-text-primary dark:text-text-dark">
                {isEdit ? 'Modifier la formation' : 'Nouvelle formation'}
              </h1>
              <p className="text-text-secondary dark:text-text-light">
                {isEdit ? 'Modifiez les informations de la formation' : 'Ajoutez une nouvelle formation'}
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            <p className="text-green-700">
              Formation {isEdit ? 'modifiée' : 'créée'} avec succès ! Redirection en cours...
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
                  Titre de la formation *
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
                  placeholder="Nom de la formation"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
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
                  placeholder="url-de-la-formation"
                />
                <p className="text-xs text-text-secondary mt-1">Sera généré automatiquement si vide</p>
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Niveau *
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.level ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
              </div>

              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Catégorie *
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.category_id ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
              </div>

             

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Statut
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="duration_total_minutes" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Durée totale (minutes)
                </label>
                <input
                  type="number"
                  id="duration_total_minutes"
                  name="duration_total_minutes"
                  value={formData.duration_total_minutes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="120"
                  min="0"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Prix (€)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="99.99"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_free"
                    checked={formData.is_free}
                    onChange={handleChange}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-text-primary dark:text-text-dark">Formation gratuite</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_premium"
                    checked={formData.is_premium}
                    onChange={handleChange}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-text-primary dark:text-text-dark">Formation premium</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Description *
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
                  placeholder="Description courte de la formation"
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
                  rows={5}
                  value={formData.long_description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark resize-none"
                  placeholder="Description détaillée de la formation, objectifs, contenu..."
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/formations')}
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
                  {isEdit ? 'Modifier la formation' : 'Créer la formation'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default FormationForm;