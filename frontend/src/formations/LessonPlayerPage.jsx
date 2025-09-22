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
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  CheckCircle,
  Lock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Download,
  MessageSquare,
  Code,
  ExternalLink,
  Clock,
  RotateCcw,
  ChevronDown,
  ChevronUp
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
          const progressResponse = await formationsApi.getLessonProgress(lessonId);
          setLessonProgress(progressResponse.data);
          setLessonCompleted(progressResponse.data.is_completed);
          setUserNotes(progressResponse.data.notes || '');
          
          // Set video position if available
          if (progressResponse.data.last_position_seconds) {
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
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
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

  const handleMarkAsCompleted = () => {
    markAsCompleted();
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
    <div className={`bg-white dark:bg-surface-dark border-l border-border dark:border-border transition-all duration-300 ${showSidebar ? 'w-80 lg:w-80 md:w-72' : 'w-0 overflow-hidden'
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
            {showSidebar ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {formation.lessons.map((lesson, index) => {
            const isUnlocked = lesson.isFree || formation.isFree;
            const isCurrent = lesson.id === currentLesson.id;
            const isCompleted = mockUserProgress.formationsInProgress
              .find(p => p.formationId === formation.id)?.completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`p-3 rounded-lg border transition-smooth cursor-pointer ${isCurrent
                  ? 'border-primary bg-primary/5 text-primary'
                  : isUnlocked
                    ? 'border-border dark:border-border hover:border-primary/30 text-text-primary dark:text-text-dark'
                    : 'border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                onClick={() => isUnlocked && navigate(`/formations/${slug}/lessons/${lesson.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isCompleted
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
                      index + 1
                    ) : (
                      <Lock size={12} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium truncate">
                        {lesson.title}
                      </h4>
                      {lesson.isFree && (
                        <span className="px-1 py-0.5 bg-accent-green text-white text-xs rounded">
                          Gratuit
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={10} />
                      <span>{lesson.duration}</span>
                      {lesson.type === 'video' && <Play size={10} />}
                      {lesson.type === 'exercise' && <Code size={10} />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-6 pt-6 border-t border-border dark:border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary dark:text-text-light">Progression</span>
            <span className="text-sm font-medium text-primary">
              {Math.round(((mockUserProgress.formationsInProgress.find(p => p.formationId === formation.id)?.completedLessons.length || 0) / formation.lessons.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((mockUserProgress.formationsInProgress.find(p => p.formationId === formation.id)?.completedLessons.length || 0) / formation.lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark border-b border-border dark:border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            <Link
              to={`/formations/${slug}`}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth flex-shrink-0"
            >
              <ArrowLeft size={20} className="text-text-primary dark:text-text-dark" />
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-text-primary dark:text-text-dark truncate text-sm md:text-base">
                {currentLesson.title}
              </h1>
              <p className="text-xs md:text-sm text-text-secondary dark:text-text-light truncate">
                {formation.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <Button
              variant={lessonCompleted ? "gradient" : "outline"}
              size="sm"
              onClick={markAsCompleted}
              disabled={lessonCompleted}
              className="hidden md:flex"
            >
              <CheckCircle size={16} className="mr-2" />
              {lessonCompleted ? 'Terminé' : 'Marquer comme terminé'}
            </Button>

            <button
              onClick={markAsCompleted}
              disabled={lessonCompleted}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth"
              title={lessonCompleted ? 'Terminé' : 'Marquer comme terminé'}
            >
              <CheckCircle size={20} className={`${lessonCompleted ? 'text-green-500' : 'text-text-primary dark:text-text-dark'}`} />
            </button>

            <button
              onClick={() => setShowNotes(!showNotes)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth"
              title="Notes"
            >
              <FileText size={20} className="text-text-primary dark:text-text-dark" />
            </button>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth"
              title="Contenu du cours"
            >
              <BookOpen size={20} className="text-text-primary dark:text-text-dark" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player */}
          {currentLesson.type === 'video' ? (
            <div className="relative bg-black">
              {currentLesson.videoUrl ? (
                <iframe
                  ref={videoRef}
                  className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px]"
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    height: '70vh'
                  }}
                />
              ) : (
                <video
                  ref={videoRef}
                  className="w-full h-[70vh] object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  poster={formation.image}
                >
                  <source src="/api/placeholder-video.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la vidéo HTML5.
                </video>
              )}

              {/* Video Controls - Only for native video, not iframe */}
              {!currentLesson.videoUrl && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div
                    className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlayPause}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-smooth"
                      >
                        {isPlaying ? (
                          <Pause className="text-white" size={24} />
                        ) : (
                          <Play className="text-white" size={24} />
                        )}
                      </button>

                      <button
                        onClick={goToPreviousLesson}
                        disabled={lessonIndex === 0}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <SkipBack className="text-white" size={20} />
                      </button>

                      <button
                        onClick={goToNextLesson}
                        disabled={lessonIndex === formation.lessons.length - 1}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <SkipForward className="text-white" size={20} />
                      </button>

                      <div className="flex items-center gap-2 text-white text-sm">
                        <span>{formatTime(currentTime)}</span>
                        <span>/</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-smooth"
                        >
                          {isMuted ? (
                            <VolumeX className="text-white" size={20} />
                          ) : (
                            <Volume2 className="text-white" size={20} />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-20"
                        />
                      </div>

                      <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-smooth">
                        <Settings className="text-white" size={20} />
                      </button>

                      <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-smooth">
                        <Maximize className="text-white" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Simple lesson navigation for iframe videos */}
              {currentLesson.videoUrl && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={goToPreviousLesson}
                    disabled={lessonIndex === 0}
                    className="p-2 bg-black/60 hover:bg-black/80 rounded-full transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Leçon précédente"
                  >
                    <SkipBack className="text-white" size={20} />
                  </button>

                  <button
                    onClick={goToNextLesson}
                    disabled={lessonIndex === formation.lessons.length - 1}
                    className="p-2 bg-black/60 hover:bg-black/80 rounded-full transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Leçon suivante"
                  >
                    <SkipForward className="text-white" size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Exercise Content */
            <div className="h-[70vh] bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Code className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
                  Exercice Pratique
                </h2>
                <p className="text-text-secondary dark:text-text-light mb-6">
                  {currentLesson.description}
                </p>
                {currentLesson.exerciseUrl && (
                  <a href={currentLesson.exerciseUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="gradient">
                      <ExternalLink size={16} className="mr-2" />
                      Ouvrir l'exercice
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Lesson Content */}
          <div className="bg-white dark:bg-surface-dark p-4 md:p-6">
            <div className="max-w-4xl">
              <h2 className="text-xl md:text-2xl font-bold text-text-primary dark:text-text-dark mb-4">
                {currentLesson.title}
              </h2>
              <p className="text-text-secondary dark:text-text-light mb-6">
                {currentLesson.description}
              </p>

              {/* Long Description with HTML content */}
              {currentLesson.longDescription && (
                <div
                  className="lesson-content prose prose-sm md:prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: currentLesson.longDescription }}
                />
              )}

              {/* Lesson Navigation */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border dark:border-border">
                <Button
                  variant="outline"
                  onClick={goToPreviousLesson}
                  disabled={lessonIndex === 0}
                  className="disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Leçon précédente
                </Button>

                <div className="text-center order-first md:order-none">
                  <p className="text-sm text-text-secondary dark:text-text-light">
                    Leçon {lessonIndex + 1} sur {formation.lessons.length}
                  </p>
                </div>

                <Button
                  variant="gradient"
                  onClick={goToNextLesson}
                  disabled={lessonIndex === formation.lessons.length - 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  Leçon suivante
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {showNotes && (
            <div className="bg-white dark:bg-surface-dark border-t border-border dark:border-border p-4 md:p-6">
              <h3 className="font-semibold text-text-primary dark:text-text-dark mb-4">
                Mes notes
              </h3>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Prenez des notes sur cette leçon..."
                className="w-full h-32 px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
              />
              <div className="flex justify-end mt-4">
                <Button variant="gradient" size="sm">
                  Sauvegarder
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <LessonSidebar />
      </div>
    </div>
  );
};

export default LessonPlayerPage;