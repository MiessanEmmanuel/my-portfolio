import { useState, useEffect } from 'react';

import Button from '../../components/Button';
import { formationsApi } from '../../services/formationsApi';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Play,
  FileText,
  Clock,
  AlertCircle,
  X,
  Save,
  Eye,
  Filter,
  BookOpen,
  Video,
  Code,
  ExternalLink
} from 'lucide-react';
import AdminLayout from '../AdminLayout';

const LessonsManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [formations, setFormations] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('all');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, lesson: null });
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    chapter_id: '',
    video_url: '',
    exercise_url: '',
    estimated_time_minutes: 0,
    sort_order: 0,
    type: 'video',
    is_free: false,
    is_published: true
  });

  useEffect(() => {
    loadData();
  }, []);
  console.log(formations)
  useEffect(() => {
    if (selectedFormation !== 'all') {
      loadChapters(selectedFormation);
    } else {
      setChapters([]);
      setSelectedChapter('all');
    }
  }, [selectedFormation]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [lessonsResponse, formationsResponse] = await Promise.all([
        formationsApi.admin.getLessons(),
        formationsApi.admin.getFormations()
      ]);

      setLessons(Array.isArray(lessonsResponse.data.data) ? lessonsResponse.data.data : []);
      setFormations(Array.isArray(formationsResponse.data) ? formationsResponse.data : []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChapters = async (formationId) => {
    try {
      const response = await formationsApi.admin.getFormationChapters(formationId);
      setChapters(response.data);
    } catch (error) {
      console.error('Error loading chapters:', error);
      setChapters([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLesson) {
        const response = await formationsApi.admin.updateLesson(editingLesson.id, formData);
          
        setLessons(lessons.map(lesson => {
           console.log(lesson.id, editingLesson.id)
         return lesson.id === editingLesson.id ? response.data : lesson
        }
        ));
      } else {
        const response = await formationsApi.admin.createLesson(formData);
        setLessons([...lessons, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await formationsApi.admin.deleteLesson(lessonId);
      setLessons(lessons.filter(lesson => lesson.id !== lessonId));
      setDeleteModal({ show: false, lesson: null });
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      content: '',
      chapter_id: '',
      video_url: '',
      exercise_url: '',
      estimated_time_minutes: 0,
      sort_order: 0,
      type: 'video',
      is_free: false,
      is_published: true
    });
    setEditingLesson(null);
    setShowModal(false);
  };

  const openEditModal = (lesson) => {
    setFormData({
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description || '',
      content: lesson.content || '',
      chapter_id: lesson.chapter_id,
      video_url: lesson.video_url || '',
      exercise_url: lesson.exercise_url || '',
      estimated_time_minutes: lesson.estimated_time_minutes || 0,
      sort_order: lesson.sort_order || 0,
      type: lesson.type || 'video',
      is_free: lesson.is_free || false,
      is_published: lesson.is_published !== false
    });
    setEditingLesson(lesson);
    setShowModal(true);
  };

  const generateSlug = (title) => {
    return title
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

  const filteredLessons = lessons.filter(lesson => {
    console.log(lessons)
    const matchesSearch = lesson.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormation = selectedFormation === 'all' ||
      lesson.chapter?.formation_id === parseInt(selectedFormation);
    const matchesChapter = selectedChapter === 'all' ||
      lesson.chapter_id === parseInt(selectedChapter);
    const matchesType = selectedType === 'all' || lesson.type === selectedType;

    return matchesSearch && matchesFormation && matchesChapter && matchesType;
  });

  const LessonCard = ({ lesson }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6 hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            {lesson.type === 'video' ? (
              <Video className="text-primary" size={24} />
            ) : lesson.type === 'exercise' ? (
              <Code className="text-secondary" size={24} />
            ) : lesson.type === 'quiz' ? (
              <AlertCircle className="text-accent-green" size={24} />
            ) : (
              <FileText className="text-text-light" size={24} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark truncate">
              {lesson.title}
            </h3>
            <p className="text-sm text-text-secondary dark:text-text-light">
              {lesson.chapter?.title} • {lesson.chapter?.formation?.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${lesson.type === 'video' ? 'bg-blue-100 text-blue-800' :
                  lesson.type === 'exercise' ? 'bg-green-100 text-green-800' :
                    lesson.type === 'quiz' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                }`}>
                {lesson.type === 'video' ? 'Vidéo' :
                  lesson.type === 'exercise' ? 'Exercice' :
                    lesson.type === 'quiz' ? 'Quiz' :
                      'Texte'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={() => openEditModal(lesson)}>
            <Edit size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteModal({ show: true, lesson })}
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {lesson.description && (
        <p className="text-text-secondary dark:text-text-light mb-4 line-clamp-2">
          {lesson.description}
        </p>
      )}

      <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary dark:text-text-light">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{lesson.estimated_time_minutes || 0} min</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Ordre: {lesson.sort_order || 0}</span>
        </div>
        {lesson.is_free && (
          <span className="px-2 py-1 bg-accent-green text-white text-xs rounded">
            Gratuit
          </span>
        )}
        {!lesson.is_published && (
          <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded">
            Brouillon
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-border dark:border-border">
        {lesson.video_url && (
          <a
            href={lesson.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:text-primary-hover text-sm"
          >
            <Play size={14} />
            <span>Vidéo</span>
            <ExternalLink size={12} />
          </a>
        )}
        {lesson.exercise_url && (
          <a
            href={lesson.exercise_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-secondary hover:text-secondary-hover text-sm"
          >
            <Code size={14} />
            <span>Exercice</span>
            <ExternalLink size={12} />
          </a>
        )}
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
              Gestion des leçons
            </h1>
            <p className="text-text-secondary dark:text-text-light mt-1">
              Gérez le contenu de vos leçons
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Plus size={20} className="mr-2" />
            Nouvelle leçon
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une leçon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                />
              </div>
            </div>

            <select
              value={selectedFormation}
              onChange={(e) => setSelectedFormation(e.target.value)}
              className="px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
            >
              <option value="all">Toutes les formations</option>
              {formations.map(formation => (
                <option key={formation.id} value={formation.id}>
                  {formation.title}
                </option>
              ))}
            </select>

            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              disabled={selectedFormation === 'all'}
              className="px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark disabled:opacity-50"
            >
              <option value="all">Tous les chapitres</option>
              {chapters.map(chapter => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.title}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
            >
              <option value="all">Tous les types</option>
              <option value="video">Vidéo</option>
              <option value="exercise">Exercice</option>
              <option value="quiz">Quiz</option>
              <option value="text">Texte</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-border dark:border-border">
            <span className="text-text-secondary dark:text-text-light">
              {filteredLessons.length} leçon{filteredLessons.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Lessons Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-32"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex gap-4 mb-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-12 text-center">
            <BookOpen className="mx-auto h-16 w-16 text-text-light mb-4" />
            <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
              Aucune leçon trouvée
            </h3>
            <p className="text-text-secondary dark:text-text-light mb-6">
              {searchTerm || selectedFormation !== 'all' || selectedChapter !== 'all' || selectedType !== 'all'
                ? 'Aucune leçon ne correspond à vos filtres'
                : 'Commencez par créer votre première leçon'
              }
            </p>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <Plus size={16} className="mr-2" />
              Créer une leçon
            </Button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark">
                  {editingLesson ? 'Modifier la leçon' : 'Nouvelle leçon'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-smooth"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Titre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setFormData({
                          ...formData,
                          title,
                          slug: generateSlug(title)
                        });
                      }}
                      className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                      placeholder="Titre de la leçon"
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
                      placeholder="slug-de-la-lecon"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Chapitre *
                  </label>
                  <select
                    required
                    value={formData.chapter_id}
                    onChange={(e) => setFormData({ ...formData, chapter_id: e.target.value })}
                    className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  >
                    <option value="">Sélectionner un chapitre</option>
                    {formations.map(formation => (
                      <optgroup key={formation.id} label={formation.title}>
                        {formation.chapters?.map(chapter => (
                          <option key={chapter.id} value={chapter.id}>
                            {chapter.title}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Type de leçon *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  >
                    <option value="video">Vidéo</option>
                    <option value="exercise">Exercice</option>
                    <option value="quiz">Quiz</option>
                    <option value="text">Texte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Description courte
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                    rows="3"
                    placeholder="Description courte de la leçon..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Contenu détaillé (HTML)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                    rows="6"
                    placeholder="Contenu détaillé de la leçon (HTML autorisé)..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      URL Vidéo
                    </label>
                    <input
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      URL Exercice
                    </label>
                    <input
                      type="url"
                      value={formData.exercise_url}
                      onChange={(e) => setFormData({ ...formData, exercise_url: e.target.value })}
                      className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Durée estimée (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.estimated_time_minutes}
                      onChange={(e) => setFormData({ ...formData, estimated_time_minutes: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                      min="0"
                    />
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
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_free}
                      onChange={(e) => setFormData({ ...formData, is_free: e.target.checked })}
                      className="rounded border-border focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary dark:text-text-dark">Leçon gratuite</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="rounded border-border focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary dark:text-text-dark">Publié</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={resetForm} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    <Save size={16} className="mr-2" />
                    {editingLesson ? 'Modifier' : 'Créer'}
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
                    Supprimer la leçon
                  </h3>
                  <p className="text-text-secondary dark:text-text-light">
                    Cette action est irréversible
                  </p>
                </div>
              </div>

              <p className="text-text-secondary dark:text-text-light mb-6">
                Êtes-vous sûr de vouloir supprimer la leçon "<strong>{deleteModal.lesson?.title}</strong>" ?
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModal({ show: false, lesson: null })}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleDeleteLesson(deleteModal.lesson.id)}
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

export default LessonsManagement;