import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { formationsApi } from '../services/formationsApi';
import '../styles/lesson-content.css';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Lock,
  Clock,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';

const LessonPlayerPage = () => {
  const { slug, lessonId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [formation, setFormation] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [previousLesson, setPreviousLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(null);
  const [formationProgress, setFormationProgress] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressSaveTimeout, setProgressSaveTimeout] = useState(null);

  useEffect(() => {
    loadLessonData();
  }, [slug, lessonId]);

  const loadLessonData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load formation data
      const formationResponse = await formationsApi.getFormation(slug);
      setFormation(formationResponse.data);

      // Load lesson data
      const lessonResponse = await formationsApi.getLesson(lessonId);
      setCurrentLesson(lessonResponse.data);

      // Load lesson progress if user is authenticated
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Load formation progress
          const formationProgressResponse = await formationsApi.getFormationProgress(slug);
          setFormationProgress(formationProgressResponse.data);

          // Load lesson progress
          const progressResponse = await formationsApi.getLessonProgress(lessonId);
          setLessonProgress(progressResponse.data);
          setLessonCompleted(progressResponse.data.is_completed);
          setUserNotes(progressResponse.data.notes || '');
          
          // Set video position if available
          if (progressResponse.data.last_position_seconds && videoRef.current) {
            videoRef.current.currentTime = progressResponse.data.last_position_seconds;
            setCurrentTime(progressResponse.data.last_position_seconds);
          }
        } catch (err) {
          // User might not have progress for this lesson yet
          console.log('No progress found for this lesson');
        }
      }

      // Load next and previous lessons
      const [nextResponse, prevResponse] = await Promise.all([
        formationsApi.getNextLesson(lessonId).catch(() => null),
        formationsApi.getPreviousLesson(lessonId).catch(() => null)
      ]);

      setNextLesson(nextResponse?.data);
      setPreviousLesson(prevResponse?.data);

    } catch (err) {
      setError('Erreur lors du chargement de la leçon');
      console.error('Error loading lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (progressData) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await formationsApi.markLessonProgress(lessonId, progressData);
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  const markAsCompleted = async () => {
    const progressData = {
      position_seconds: currentTime,
      watch_time_seconds: Math.floor(currentTime),
      completion_percentage: 100,
      is_completed: true,
      notes: userNotes
    };

    await saveProgress(progressData);
    setLessonCompleted(true);
  };

  // Video controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime;
      setCurrentTime(newTime);

      // Auto-save progress every 10 seconds
      if (progressSaveTimeout) {
        clearTimeout(progressSaveTimeout);
      }
      
      const timeout = setTimeout(() => {
        const progress = (newTime / videoRef.current.duration) * 100;
        const progressData = {
          position_seconds: Math.floor(newTime),
          watch_time_seconds: Math.floor(newTime),
          completion_percentage: Math.min(progress, 100),
          is_completed: progress >= 90,
          notes: userNotes
        };
        
        saveProgress(progressData);
        
        // Auto-complete lesson if watched 90%
        if (progress >= 90 && !lessonCompleted) {
          setLessonCompleted(true);
        }
      }, 2000);
      
      setProgressSaveTimeout(timeout);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      
      // Set saved position if available
      if (lessonProgress?.last_position_seconds) {
        videoRef.current.currentTime = lessonProgress.last_position_seconds;
        setCurrentTime(lessonProgress.last_position_seconds);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const goToPreviousLesson = () => {
    if (previousLesson) {
      navigate(`/formations/${slug}/lessons/${previousLesson.id}`);
    }
  };

  const goToNextLesson = () => {
    if (nextLesson) {
      navigate(`/formations/${slug}/lessons/${nextLesson.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
            Erreur de chargement
          </h1>
          <p className="text-text-secondary dark:text-text-light mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!formation || !currentLesson) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
            Leçon non trouvée
          </h1>
          <Link to={`/formations/${slug}`}>
            <Button>Retour à la formation</Button>
          </Link>
        </div>
      </div>
    );
  }

  const LessonSidebar = () => (
    <div className={`bg-white dark:bg-surface-dark border-l border-border dark:border-border transition-all duration-300 ${
      showSidebar ? 'w-80 lg:w-80 md:w-72' : 'w-0 overflow-hidden'
    } ${showSidebar ? 'fixed lg:static top-0 right-0 h-full z-50 lg:z-auto shadow-xl lg:shadow-none' : ''}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-text-primary dark:text-text-dark">
            Contenu du cours
          </h3>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth"
          >
            {showSidebar ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {formation.chapters && formation.chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id} className="mb-4">
              <h4 className="font-medium text-text-primary dark:text-text-dark mb-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {chapter.title}
              </h4>
              <div className="space-y-1">
                {chapter.lessons && chapter.lessons.map((lesson, lessonIndex) => {
                  const isUnlocked = lesson.is_free || formation.is_free;
                  const isCurrent = lesson.id === parseInt(lessonId);
                  const isCompleted = formationProgress?.chapters_progress
                    ?.find(cp => cp.chapter.id === chapter.id)
                    ?.lessons?.find(lp => lp.lesson.id === lesson.id)?.progress?.is_completed;

                  return (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border transition-smooth cursor-pointer ${
                        isCurrent
                          ? 'border-primary bg-primary/5 text-primary'
                          : isUnlocked
                            ? 'border-border dark:border-border hover:border-primary/30 text-text-primary dark:text-text-dark'
                            : 'border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => isUnlocked && navigate(`/formations/${slug}/lessons/${lesson.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          isCompleted
                            ? 'bg-accent-green text-white'
                            : isCurrent
                              ? 'bg-primary text-white'
                              : isUnlocked
                                ? 'bg-gray-100 dark:bg-gray-700 text-text-secondary'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle size={14} />
                          ) : isUnlocked ? (
                            lessonIndex + 1
                          ) : (
                            <Lock size={12} />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium truncate">
                              {lesson.title}
                            </h4>
                            {lesson.is_free && (
                              <span className="px-1 py-0.5 bg-accent-green text-white text-xs rounded">
                                Gratuit
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock size={10} />
                            <span>{lesson.estimated_time_minutes ? `${lesson.estimated_time_minutes}min` : 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        {formationProgress && (
          <div className="mt-6 pt-6 border-t border-border dark:border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary dark:text-text-light">Progression</span>
              <span className="text-sm font-medium text-primary">
                {Math.round(formationProgress.enrollment?.progress_percentage || 0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${formationProgress.enrollment?.progress_percentage || 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex">
      {/* Main video area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/formations/${slug}`} className="hover:text-gray-300 transition-smooth">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-semibold truncate">{currentLesson.title}</h1>
          </div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-smooth"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Video player */}
        <div className="flex-1 relative bg-black flex items-center justify-center">
          {currentLesson.video_url ? (
            <iframe
              src={currentLesson.video_url}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={currentLesson.title}
            />
          ) : (
            <div className="text-white text-center">
              <BookOpen size={48} className="mx-auto mb-4" />
              <h3 className="text-xl mb-2">Pas de vidéo disponible</h3>
              <p className="text-gray-400">Cette leçon contient du contenu textuel</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-black text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goToPreviousLesson}
                disabled={!previousLesson}
                className="p-2 hover:bg-gray-800 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipBack size={20} />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="p-3 bg-primary hover:bg-primary-hover rounded-full transition-smooth"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button
                onClick={goToNextLesson}
                disabled={!nextLesson}
                className="p-2 hover:bg-gray-800 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipForward size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {!lessonCompleted && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAsCompleted}
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Marquer comme terminé
                </Button>
              )}
              
              {lessonCompleted && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={16} />
                  <span className="text-sm">Terminé</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lesson content */}
        <div className="bg-white dark:bg-surface-dark p-6 border-t border-border dark:border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
              {currentLesson.title}
            </h2>
            
            {currentLesson.long_description && (
              <div 
                className="lesson-content prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: currentLesson.long_description }}
              />
            )}

            {currentLesson.exercise_url && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Exercice pratique
                </h3>
                <a
                  href={currentLesson.exercise_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Accéder à l'exercice →
                </a>
              </div>
            )}

            {/* Notes */}
            <div className="mt-8">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-2 text-text-primary dark:text-text-dark hover:text-primary transition-smooth"
              >
                <BookOpen size={16} />
                Mes notes
                {showNotes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {showNotes && (
                <div className="mt-4 p-4 border border-border dark:border-border rounded-lg">
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    onBlur={() => {
                      const progressData = {
                        position_seconds: currentTime,
                        watch_time_seconds: Math.floor(currentTime),
                        completion_percentage: lessonCompleted ? 100 : Math.min((currentTime / duration) * 100, 100),
                        is_completed: lessonCompleted,
                        notes: userNotes
                      };
                      saveProgress(progressData);
                    }}
                    placeholder="Écrivez vos notes ici..."
                    className="w-full h-32 p-3 border border-border dark:border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <LessonSidebar />
      
      {/* Overlay for mobile */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default LessonPlayerPage;