import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import Button from '../../components/Button';
import { formationsApi } from '../../services/formationsApi';
import {
  Save,
  X,
  AlertCircle,
  BookOpen,
  Clock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

const ChapterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    formation_id: '',
    title: '',
    description: '',
    sort_order: 0,
    duration_minutes: 0,
    is_published: true
  });
  
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFormations();
    if (isEditMode) {
      loadChapter();
    }
  }, [id, isEditMode]);

  const loadFormations = async () => {
    try {
      const response = await formationsApi.admin.getFormations();
      setFormations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error loading formations:', error);
      setFormations([]);
    }
  };

  const loadChapter = async () => {
    try {
      setLoading(true);
      const response = await formationsApi.admin.getChapter(id);
      const chapter = response.data;
      
      setFormData({
        formation_id: chapter.formation_id || '',
        title: chapter.title || '',
        description: chapter.description || '',
        sort_order: chapter.sort_order || 0,
        duration_minutes: chapter.duration_minutes || 0,
        is_published: chapter.is_published ?? true
      });
    } catch (error) {
      console.error('Error loading chapter:', error);
      setError('Erreur lors du chargement du chapitre');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) || 0 : value)
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.formation_id) {
      newErrors.formation_id = 'La formation est requise';
    }

    if (!formData.title?.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Le titre ne peut pas dépasser 255 caractères';
    }

    if (formData.sort_order < 0) {
      newErrors.sort_order = 'L\'ordre doit être un nombre positif';
    }

    if (formData.duration_minutes < 0) {
      newErrors.duration_minutes = 'La durée doit être un nombre positif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (isEditMode) {
        await formationsApi.admin.updateChapter(id, formData);
      } else {
        await formationsApi.admin.createChapter(formData);
      }
      
      navigate('/admin/formation-chapters');
    } catch (error) {
      console.error('Error saving chapter:', error);
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setError(
          error.response?.data?.message || 
          `Erreur lors de ${isEditMode ? 'la modification' : 'la création'} du chapitre`
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/formation-chapters');
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCancel}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft size={20} className="text-text-secondary" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                {isEditMode ? 'Modifier le Chapitre' : 'Nouveau Chapitre'}
              </h1>
              <p className="text-text-secondary dark:text-text-light mt-1">
                {isEditMode ? 'Modifiez les informations du chapitre' : 'Créez un nouveau chapitre pour vos formations'}
              </p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
                <h2 className="text-lg font-semibold text-text-primary dark:text-text-dark mb-4">
                  Informations du Chapitre
                </h2>

                <div className="space-y-4">
                  {/* Formation Selection */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Formation *
                    </label>
                    <select
                      name="formation_id"
                      value={formData.formation_id}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                        errors.formation_id ? 'border-red-500' : 'border-border dark:border-border'
                      }`}
                      required
                    >
                      <option value="">Sélectionner une formation</option>
                      {formations.map(formation => (
                        <option key={formation.id} value={formation.id}>
                          {formation.title}
                        </option>
                      ))}
                    </select>
                    {errors.formation_id && (
                      <p className="text-red-500 text-sm mt-1">{errors.formation_id}</p>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Titre du Chapitre *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ex: Introduction aux concepts de base"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                        errors.title ? 'border-red-500' : 'border-border dark:border-border'
                      }`}
                      maxLength={255}
                      required
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Description du chapitre (optionnel)"
                      className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                    />
                  </div>

                  {/* Order and Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                        Ordre dans la formation
                      </label>
                      <input
                        type="number"
                        name="sort_order"
                        value={formData.sort_order}
                        onChange={handleChange}
                        min="0"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                          errors.sort_order ? 'border-red-500' : 'border-border dark:border-border'
                        }`}
                      />
                      {errors.sort_order && (
                        <p className="text-red-500 text-sm mt-1">{errors.sort_order}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                        Durée estimée (minutes)
                      </label>
                      <input
                        type="number"
                        name="duration_minutes"
                        value={formData.duration_minutes}
                        onChange={handleChange}
                        min="0"
                        placeholder="Ex: 45"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                          errors.duration_minutes ? 'border-red-500' : 'border-border dark:border-border'
                        }`}
                      />
                      {errors.duration_minutes && (
                        <p className="text-red-500 text-sm mt-1">{errors.duration_minutes}</p>
                      )}
                    </div>
                  </div>

                  {/* Publication Status */}
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <div className="flex items-center">
                        {formData.is_published ? (
                          <CheckCircle size={20} className="text-green-500 mr-2" />
                        ) : (
                          <AlertCircle size={20} className="text-gray-400 mr-2" />
                        )}
                        <span className="text-sm font-medium text-text-primary dark:text-text-dark">
                          Publier le chapitre
                        </span>
                      </div>
                    </label>
                    <p className="text-sm text-text-secondary dark:text-text-light mt-1 ml-7">
                      {formData.is_published 
                        ? 'Ce chapitre sera visible pour les étudiants' 
                        : 'Ce chapitre restera en brouillon'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <X size={20} className="mr-2" />
                  Annuler
                </Button>
                <Button
                  type="submit"
                  variant="gradient"
                  disabled={saving}
                  className="min-w-[140px]"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save size={20} className="mr-2" />
                  )}
                  {saving 
                    ? 'Enregistrement...' 
                    : (isEditMode ? 'Modifier' : 'Créer')
                  }
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
              <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark mb-4">
                Aperçu
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary dark:text-text-light">Formation:</span>
                  <span className="font-medium text-text-primary dark:text-text-dark">
                    {formData.formation_id ? 
                      formations.find(f => f.id == formData.formation_id)?.title || 'Formation sélectionnée'
                      : 'Aucune'
                    }
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary dark:text-text-light">Titre:</span>
                  <span className="font-medium text-text-primary dark:text-text-dark">
                    {formData.title || 'Titre du chapitre'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary dark:text-text-light">Ordre:</span>
                  <span className="font-medium text-text-primary dark:text-text-dark">
                    #{formData.sort_order}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary dark:text-text-light">Durée:</span>
                  <span className="font-medium text-text-primary dark:text-text-dark flex items-center">
                    <Clock size={14} className="mr-1" />
                    {formatDuration(formData.duration_minutes)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary dark:text-text-light">Statut:</span>
                  <span className={`flex items-center ${formData.is_published ? 'text-green-600' : 'text-gray-500'}`}>
                    {formData.is_published ? (
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
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                💡 Conseils
              </h3>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Utilisez un titre descriptif pour votre chapitre</li>
                <li>• L'ordre détermine la position dans la formation</li>
                <li>• La durée aide les étudiants à planifier leur temps</li>
                <li>• Gardez en brouillon pour tester avant publication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChapterForm;