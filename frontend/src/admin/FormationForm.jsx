import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Button from '../components/Button';
import { adminService } from '../services/adminService';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Calendar,
  Award,
  Building,
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
    institution: '',
    description: '',
    type: 'Formation',
    status: 'Terminé',
    start_date: '',
    end_date: '',
    certificate_url: '',
    image: '',
    duration_hours: '',
    level: 'Débutant',
    instructor: '',
    slug: '',
    skills: []
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const types = [
    'Formation',
    'Certification',
    'Diplôme',
    'Cours en ligne',
    'Workshop',
    'Conférence',
    'Bootcamp',
    'Autodidacte'
  ];

  const statuses = [
    'Terminé',
    'En cours',
    'Planifié',
    'Abandonné'
  ];

  const levels = [
    'Débutant',
    'Intermédiaire',
    'Avancé',
    'Expert'
  ];

  useEffect(() => {
    if (isEdit) {
      fetchFormation();
    }
  }, [id, isEdit]);

  const fetchFormation = async () => {
    try {
      setLoading(true);
      const formation = await adminService.getFormation(id);
      
      setFormData({
        ...formation,
        start_date: formation.start_date ? formation.start_date.split('T')[0] : '',
        end_date: formation.end_date ? formation.end_date.split('T')[0] : '',
        duration_hours: formation.duration_hours || ''
      });
      
      setSkills(formation.skills || []);
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
    if (!formData.institution.trim()) {
      newErrors.institution = 'L\'institution est requise';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (!formData.type) {
      newErrors.type = 'Le type est requis';
    }
    if (!formData.status) {
      newErrors.status = 'Le statut est requis';
    }
    if (!formData.start_date) {
      newErrors.start_date = 'La date de début est requise';
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
        skills
      };

      if (isEdit) {
        await adminService.updateFormation(id, formationData);
      } else {
        await adminService.createFormation(formationData);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/formations');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Skills management
  const addSkill = () => {
    if (newSkill.trim() && !skills.find(s => s.skill_name === newSkill.trim())) {
      setSkills([...skills, { skill_name: newSkill.trim() }]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
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
              onClick={() => navigate('/admin/formations')}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-smooth"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-text-primary dark:text-text-dark">
                {isEdit ? 'Modifier la formation' : 'Nouvelle formation'}
              </h1>
              <p className="text-text-secondary dark:text-text-light">
                {isEdit ? 'Modifiez les informations de la formation' : 'Ajoutez une nouvelle formation à votre portfolio'}
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
                <label htmlFor="institution" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Institution/Organisme *
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.institution ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                  placeholder="Nom de l'institution"
                />
                {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
              </div>

              <div>
                <label htmlFor="instructor" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Instructeur/Formateur
                </label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="Nom de l'instructeur"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.type ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
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
                <label htmlFor="start_date" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Date de début *
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                    errors.start_date ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                />
                {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
              </div>

              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                />
              </div>

              <div>
                <label htmlFor="duration_hours" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Durée (heures)
                </label>
                <input
                  type="number"
                  id="duration_hours"
                  name="duration_hours"
                  value={formData.duration_hours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="40"
                  min="0"
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
                  placeholder="url-de-la-formation"
                />
                <p className="text-xs text-text-secondary mt-1">Sera généré automatiquement si vide</p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark resize-none ${
                    errors.description ? 'border-red-500' : 'border-border dark:border-border'
                  }`}
                  placeholder="Description de la formation, objectifs, contenu..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Média et Certification */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-6">
              Média et certification
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  Image/Logo (URL)
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="https://example.com/logo.jpg"
                />
              </div>

              <div>
                <label htmlFor="certificate_url" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                  URL du certificat
                </label>
                <input
                  type="url"
                  id="certificate_url"
                  name="certificate_url"
                  value={formData.certificate_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="https://certificat.com/verify/123"
                />
              </div>
            </div>
          </div>

          {/* Compétences acquises */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-6">
              Compétences acquises
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="flex-1 px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  placeholder="Nom de la compétence"
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  <Plus size={16} />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                    <span>{skill.skill_name}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-secondary hover:text-secondary-hover"
                    >
                      <X size={14} />
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