import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { formationsApi } from '../services/formationsApi';
import {
  Play,
  Clock,
  Users,
  Star,
  Award,
  CheckCircle,
  Lock,
  ArrowLeft,
  BookOpen,
  Target,
  Code,
  Download,
  Share,
  Heart,
  BarChart3,
  Calendar,
  User,
  Globe,
  Github,
  Twitter
} from 'lucide-react';

const FormationDetailPage = () => {
  const { slug } = useParams();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [userProgress, setUserProgress] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFormationData = async () => {
      try {
        setLoading(true);

        // Load formation details
        const formationResponse = await formationsApi.getFormation(slug);
        setFormation(formationResponse.data);

        // Load reviews
        const reviewsResponse = await formationsApi.getFormationReviews(slug);
        setReviews(reviewsResponse.data.reviews.data || []);

        // Check if user is enrolled and load progress (only if authenticated)
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const progressResponse = await formationsApi.getFormationProgress(slug);
            setUserProgress(progressResponse.data);
            setEnrolled(true);
          } catch (err) {
            // User not enrolled, that's ok
            setEnrolled(false);
          }
        }

      } catch (err) {
        setError('Erreur lors du chargement de la formation');
        console.error('Error loading formation:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFormationData();
  }, [slug]);

  const handleEnroll = async () => {
    try {
      await formationsApi.enrollInFormation(slug);
      setEnrolled(true);
      // Reload formation progress
      const progressResponse = await formationsApi.getFormationProgress(slug);
      setUserProgress(progressResponse.data);
    } catch (err) {
      console.error('Error enrolling:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!formation) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
            Formation non trouvée
          </h1>
          <Link to="/formations">
            <Button variant="primary">Retour aux formations</Button>
          </Link>
        </div>
      </div>
    );
  }

  const LessonItem = ({ lesson, index, isUnlocked }) => (
    <div className={`flex items-center gap-4 p-4 rounded-lg border transition-smooth ${isUnlocked
        ? 'border-border dark:border-border hover:border-primary/30 bg-white dark:bg-surface-dark cursor-pointer'
        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
      }`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lesson.isCompleted
          ? 'bg-accent-green text-white'
          : isUnlocked
            ? 'bg-primary/10 text-primary'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
        }`}>
        {lesson.isCompleted ? (
          <CheckCircle size={20} />
        ) : isUnlocked ? (
          lesson.type === 'video' ? <Play size={16} /> : <Code size={16} />
        ) : (
          <Lock size={16} />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className={`font-medium ${isUnlocked ? 'text-text-primary dark:text-text-dark' : 'text-gray-400'
            }`}>
            {index + 1}. {lesson.title}
          </h4>
          {lesson.isFree && (
            <span className="px-2 py-1 bg-accent-green text-white text-xs rounded-full">
              Gratuit
            </span>
          )}
        </div>
        <p className={`text-sm ${isUnlocked ? 'text-text-secondary dark:text-text-light' : 'text-gray-400'
          }`}>
          {lesson.description}
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-text-light">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{lesson.duration}</span>
        </div>
        {lesson.type === 'video' && <Play size={14} />}
        {lesson.type === 'exercise' && <Code size={14} />}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: BookOpen },
    { id: 'curriculum', label: 'Programme', icon: Target },
    { id: 'instructor', label: 'Formateur', icon: User },
    { id: 'reviews', label: 'Avis', icon: Star }
  ];

  const totalLessons = formation.total_lessons || 0;
  const completedLessons = userProgress?.enrollment?.lessonProgress?.filter(p => p.is_completed).length || 0;
  const progressPercentage = userProgress?.enrollment?.progress_percentage || 0;

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />

      {/* Back Navigation */}
      <section className="pt-24 pb-8 bg-white dark:bg-surface-dark border-b border-border dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/formations"
            className="inline-flex items-center gap-2 text-text-secondary dark:text-text-light hover:text-primary transition-smooth"
          >
            <ArrowLeft size={20} />
            Retour aux formations
          </Link>
        </div>
      </section>

      {/* Formation Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full">
                  {formation.category?.name || 'Général'}
                </span>
                <span className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded-full">
                  {formation.level}
                </span>
                {formation.is_free && (
                  <span className="px-4 py-2 bg-accent-green text-white text-sm font-medium rounded-full">
                    Gratuit
                  </span>
                )}
                {formation.is_premium && (
                  <span className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-full">
                    Premium
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-text-primary dark:text-text-dark mb-6">
                {formation.title}
              </h1>

              <p className="text-lg text-text-secondary dark:text-text-light mb-8">
                {formation.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500" size={20} fill="currentColor" />
                  <span className="font-semibold">{formation.rating || '0'}</span>
                  <span className="text-text-secondary dark:text-text-light">
                    ({formation.students_count?.toLocaleString() || '0'} étudiants)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-primary" size={20} />
                  <span>{formation.total_duration ? `${Math.round(formation.total_duration / 60)}h` : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-secondary" size={20} />
                  <span>{totalLessons} leçons</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border">
                <img
                  src={formation.instructor?.user?.avatar || '/default-avatar.png'}
                  alt={formation.instructor?.user?.name || 'Instructeur'}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-text-dark">
                    {formation.instructor?.user?.name || 'Instructeur'}
                  </h3>
                  <p className="text-text-secondary dark:text-text-light">
                    {formation.instructor?.bio || 'Expert passionné'}
                  </p>
                </div>
              </div>

              {/* Progress Bar (if enrolled) */}
              {userProgress && (
                <div className="mb-8 p-6 bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary dark:text-text-dark">
                      Votre progression
                    </h3>
                    <span className="text-primary font-semibold">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-text-secondary dark:text-text-light">
                    {completedLessons} sur {totalLessons} leçons terminées • {userProgress?.enrollment?.formatted_time_spent || '0min'} passées
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                {/* Video Preview */}
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden mb-6">
                  <div className="relative">
                    <img
                      src={formation.image}
                      alt={formation.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur rounded-full p-4">
                        <Play className="text-white" size={32} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {!formation.is_free && formation.price && (
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-primary">
                          {formation.price}€
                        </span>
                      </div>
                    )}

                    {enrolled && userProgress ? (
                      <Link to={`/formations/${formation.slug}/lessons/${userProgress?.enrollment?.current_lesson_id || '1'}`}>
                        <Button variant="gradient" size="lg" className="w-full mb-4">
                          <Play size={20} className="mr-2" />
                          Continuer
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="gradient"
                        size="lg"
                        className="w-full mb-4"
                        onClick={handleEnroll}
                        disabled={!localStorage.getItem('token')}
                      >
                        <Play size={20} className="mr-2" />
                        {formation.is_free ? 'Commencer gratuitement' : 'S\'inscrire à la formation'}
                      </Button>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart size={16} />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Formation Stats */}
                <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
                  <h3 className="font-semibold text-text-primary dark:text-text-dark mb-4">
                    Informations
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary dark:text-text-light">Niveau</span>
                      <span className="font-medium">{formation.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary dark:text-text-light">Durée</span>
                      <span className="font-medium">{formation.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary dark:text-text-light">Leçons</span>
                      <span className="font-medium">{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary dark:text-text-light">Étudiants</span>
                      <span className="font-medium">{'formation.studentsCount.toLocaleString()'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary dark:text-text-light">Dernière mise à jour</span>
                      <span className="font-medium">
                        {new Date(formation.updatedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white dark:bg-surface-dark border-b border-border dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium whitespace-nowrap border-b-2 transition-smooth ${activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
                      Description
                    </h2>
                    <p className="text-text-secondary dark:text-text-light leading-relaxed">
                      {formation.long_description || formation.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
                      Ce que vous allez apprendre
                    </h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {formation.objectives && formation.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-accent-green mt-1 flex-shrink-0" size={20} />
                          <span className="text-text-secondary dark:text-text-light">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
                      Prérequis
                    </h2>
                    <ul className="space-y-2">
                      {formation.requirements && formation.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-text-secondary dark:text-text-light">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
                      Technologies abordées
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {formation.technologies && formation.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Curriculum Tab */}
              {activeTab === 'curriculum' && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-6">
                    Programme de la formation
                  </h2>
                  <div className="space-y-6">
                    {formation.chapters && formation.chapters.map((chapter, chapterIndex) => (
                      <div key={chapter.id} className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-border dark:border-border">
                          <h3 className="font-semibold text-text-primary dark:text-text-dark">
                            Chapitre {chapterIndex + 1}: {chapter.title}
                          </h3>
                          <p className="text-sm text-text-secondary dark:text-text-light mt-1">
                            {chapter.lessons?.length || 0} leçons
                          </p>
                        </div>
                        <div className="p-4 space-y-3">
                          {chapter.lessons && chapter.lessons.map((lesson, lessonIndex) => {
                            const isUnlocked = lesson.is_free || enrolled || formation.is_free;
                            const lessonProgress = userProgress?.chapters_progress
                              ?.find(cp => cp.chapter.id === chapter.id)
                              ?.lessons?.find(lp => lp.lesson.id === lesson.id)?.progress;

                            return (
                              <LessonItem
                                key={lesson.id}
                                lesson={{
                                  ...lesson,
                                  isCompleted: lessonProgress?.is_completed || false,
                                  duration: lesson.estimated_time_minutes ? `${lesson.estimated_time_minutes}min` : 'N/A'
                                }}
                                index={lessonIndex}
                                isUnlocked={isUnlocked}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Tab */}
              {activeTab === 'instructor' && (
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <img
                      src={formation.instructor?.user?.avatar || '/default-avatar.png'}
                      alt={formation.instructor?.user?.name || 'Instructeur'}
                      className="w-24 h-24 rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-2">
                        {formation.instructor?.user?.name || 'Instructeur'}
                      </h2>
                      <p className="text-text-secondary dark:text-text-light mb-4">
                        {formation.instructor?.bio || 'Expert passionné dans son domaine'}
                      </p>
                      {formation.instructor?.social_links && (
                        <div className="flex gap-4">
                          {formation.instructor.social_links.website && (
                            <a href={formation.instructor.social_links.website} className="text-primary hover:text-primary-hover">
                              <Globe size={20} />
                            </a>
                          )}
                          {formation.instructor.social_links.github && (
                            <a href={`https://github.com/${formation.instructor.social_links.github}`} className="text-primary hover:text-primary-hover">
                              <Github size={20} />
                            </a>
                          )}
                          {formation.instructor.social_links.twitter && (
                            <a href={`https://twitter.com/${formation.instructor.social_links.twitter}`} className="text-primary hover:text-primary-hover">
                              <Twitter size={20} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-6">
                    Avis des étudiants
                  </h2>
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={review.user?.avatar || '/default-avatar.png'}
                              alt={review.user?.name || 'Utilisateur'}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-text-primary dark:text-text-dark">
                                  {review.user?.name || 'Utilisateur'}
                                </h4>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={16}
                                      className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                                    />
                                  ))}
                                </div>
                              </div>
                              <h5 className="font-medium text-text-primary dark:text-text-dark mb-2">
                                {review.title}
                              </h5>
                              <p className="text-text-secondary dark:text-text-light">
                                {review.comment}
                              </p>
                              {review.pros && review.pros.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium text-green-600 mb-1">Points positifs:</p>
                                  <ul className="text-sm text-text-secondary dark:text-text-light">
                                    {review.pros.map((pro, index) => (
                                      <li key={index}>• {pro}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {review.cons && review.cons.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium text-red-600 mb-1">Points à améliorer:</p>
                                  <ul className="text-sm text-text-secondary dark:text-text-light">
                                    {review.cons.map((con, index) => (
                                      <li key={index}>• {con}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Star className="mx-auto h-16 w-16 text-text-light mb-4" />
                      <p className="text-text-secondary dark:text-text-light">
                        Aucun avis pour le moment. Soyez le premier à laisser votre avis !
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
                <h3 className="font-semibold text-text-primary dark:text-text-dark mb-4">
                  Partager cette formation
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Twitter size={16} />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant={1} />
    </div>
  );
};

export default FormationDetailPage;