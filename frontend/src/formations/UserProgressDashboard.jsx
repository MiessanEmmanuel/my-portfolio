import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { formationsApi } from '../services/formationsApi';
import {
  Award,
  Clock,
  BookOpen,
  TrendingUp,
  Calendar,
  Play,
  CheckCircle,
  Target,
  BarChart3,
  Flame,
  Star,
  Download,
  ArrowRight,
  Trophy,
  User,
  Settings
} from 'lucide-react';

const UserProgressDashboard = () => {
  const [progressData, setProgressData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vous devez être connecté pour voir cette page');
        return;
      }

      const [dashboardResponse, enrollmentsResponse] = await Promise.all([
        formationsApi.getProgressDashboard(),
        formationsApi.getUserEnrollments()
      ]);

      setProgressData(dashboardResponse.data);
      setEnrollments(enrollmentsResponse.data);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Get formations with user progress
  const formationsInProgress = enrollments.filter(enrollment => 
    !enrollment.is_completed && enrollment.progress_percentage > 0
  );

  const completedFormations = enrollments.filter(enrollment => 
    enrollment.is_completed
  );

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'progress', label: 'En cours', icon: Play },
    { id: 'completed', label: 'Terminées', icon: CheckCircle },
    { id: 'certificates', label: 'Certificats', icon: Award }
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary dark:text-text-light mb-1">{title}</p>
          <p className="text-3xl font-bold text-text-primary dark:text-text-dark mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-secondary dark:text-text-light">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="text-accent-green" size={16} />
              <span className="text-sm text-accent-green">{trend}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  const ProgressCard = ({ enrollment }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden hover:shadow-lg transition-smooth">
      <div className="relative">
        <img
          src={enrollment.formation.image_url || '/images/default-formation.jpg'}
          alt={enrollment.formation.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
            {Math.round(enrollment.progress_percentage)}%
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-text-primary dark:text-text-dark mb-2 line-clamp-2">
          {enrollment.formation.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary dark:text-text-light">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{Math.floor(enrollment.total_time_spent / 60)}h {enrollment.total_time_spent % 60}min</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{enrollment.lessons_completed}/{enrollment.formation.lessons_count} leçons</span>
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${enrollment.progress_percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary dark:text-text-light">
            Commencé le {new Date(enrollment.enrolled_at).toLocaleDateString('fr-FR')}
          </span>
          <Link to={`/formations/${enrollment.formation.slug}`}>
            <Button variant="outline" size="sm">
              Continuer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  const CompletedCard = ({ enrollment }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border overflow-hidden hover:shadow-lg transition-smooth">
      <div className="relative">
        <img
          src={enrollment.formation.image_url || '/images/default-formation.jpg'}
          alt={enrollment.formation.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-accent-green text-white text-sm font-medium rounded-full">
            Terminé
          </span>
        </div>
        {enrollment.certificate_url && (
          <div className="absolute bottom-4 right-4">
            <Award className="text-yellow-500" size={24} />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-text-primary dark:text-text-dark mb-2 line-clamp-2">
          {enrollment.formation.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary dark:text-text-light">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>Terminé le {new Date(enrollment.completed_at).toLocaleDateString('fr-FR')}</span>
          </div>
          {enrollment.final_grade && (
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500" size={14} />
              <span>Note: {enrollment.final_grade}%</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {enrollment.certificate_url && (
              <span className="text-sm text-accent-green font-medium">Certificat obtenu</span>
            )}
          </div>
          <div className="flex gap-2">
            {enrollment.certificate_url && (
              <a href={enrollment.certificate_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Download size={14} className="mr-1" />
                  Certificat
                </Button>
              </a>
            )}
            <Link to={`/formations/${enrollment.formation.slug}`}>
              <Button variant="outline" size="sm">
                Revoir
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const ActivityChart = () => (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
      <h3 className="font-semibold text-text-primary dark:text-text-dark mb-6">
        Activité des 7 derniers jours
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, i) => {
          const day = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i];
          const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
          return (
            <div key={i} className="text-center">
              <div className="text-xs text-text-secondary dark:text-text-light mb-2">{day}</div>
              <div className={`w-full h-16 rounded ${
                activity === 0 ? 'bg-gray-100 dark:bg-gray-700' :
                activity === 1 ? 'bg-primary/20' :
                activity === 2 ? 'bg-primary/40' :
                activity === 3 ? 'bg-primary/60' :
                'bg-primary'
              }`} />
              <div className="text-xs text-text-secondary dark:text-text-light mt-2">
                {activity > 0 ? `${activity}h` : '0'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-80"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-96"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
              <p className="text-text-secondary dark:text-text-light mb-6">{error}</p>
              <Button onClick={loadUserData}>Réessayer</Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-text-primary dark:text-text-dark mb-4">
                    Mon Tableau de Bord
                  </h1>
                  <p className="text-lg text-text-secondary dark:text-text-light">
                    Suivez votre progression et vos accomplissements
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {progressData?.current_streak && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark rounded-full border border-border dark:border-border">
                      <Flame className="text-orange-500" size={20} />
                      <span className="font-medium text-text-primary dark:text-text-dark">
                        Série de {progressData.current_streak} jours
                      </span>
                    </div>
                  )}
                  <Button variant="outline">
                    <Settings size={16} className="mr-2" />
                    Paramètres
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Temps total"
                  value={progressData?.total_time_spent ? `${Math.floor(progressData.total_time_spent / 60)}h ${progressData.total_time_spent % 60}min` : '0h'}
                  icon={Clock}
                  color="bg-primary"
                  trend="+2h cette semaine"
                />
                <StatCard
                  title="Formations en cours"
                  value={formationsInProgress.length}
                  icon={Play}
                  color="bg-secondary"
                  subtitle="Formations actives"
                />
                <StatCard
                  title="Formations terminées"
                  value={completedFormations.length}
                  icon={CheckCircle}
                  color="bg-accent-green"
                  subtitle="Objectifs atteints"
                />
                <StatCard
                  title="Certificats obtenus"
                  value={enrollments.filter(e => e.certificate_url).length}
                  icon={Award}
                  color="bg-accent-yellow"
                  subtitle="Compétences validées"
                />
              </div>
            </>
          )}
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
                  className={`flex items-center gap-2 px-4 py-2 font-medium whitespace-nowrap border-b-2 transition-smooth ${
                    activeTab === tab.id
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Activity */}
                <div>
                  <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-6">
                    Activité récente
                  </h2>
                  <ActivityChart />
                </div>

                {/* Continue Learning */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                      Continuer l'apprentissage
                    </h2>
                    <Link to="/formations" className="text-primary hover:text-primary-hover font-medium">
                      Voir toutes les formations
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {formationsInProgress.slice(0, 2).map(enrollment => (
                      <ProgressCard key={enrollment.id} enrollment={enrollment} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Goals */}
                <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
                  <h3 className="font-semibold text-text-primary dark:text-text-dark mb-4">
                    Objectifs de la semaine
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary dark:text-text-light">
                        Étudier 5 heures
                      </span>
                      <span className="text-sm font-medium text-primary">3/5h</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary dark:text-text-light">
                        Terminer 2 leçons
                      </span>
                      <span className="text-sm font-medium text-accent-green">2/2</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-accent-green h-2 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
                  <h3 className="font-semibold text-text-primary dark:text-text-dark mb-4">
                    Derniers achievements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center">
                        <Trophy className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary dark:text-text-dark">
                          Première formation terminée
                        </p>
                        <p className="text-sm text-text-secondary dark:text-text-light">
                          Il y a 3 jours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Flame className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary dark:text-text-dark">
                          Série de 5 jours
                        </p>
                        <p className="text-sm text-text-secondary dark:text-text-light">
                          Aujourd'hui
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                  Formations en cours
                </h2>
                <Link to="/formations">
                  <Button variant="gradient">
                    <BookOpen size={16} className="mr-2" />
                    Découvrir de nouvelles formations
                  </Button>
                </Link>
              </div>

              {formationsInProgress.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formationsInProgress.map(enrollment => (
                    <ProgressCard key={enrollment.id} enrollment={enrollment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="mx-auto h-16 w-16 text-text-light mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
                    Aucune formation en cours
                  </h3>
                  <p className="text-text-secondary dark:text-text-light mb-6">
                    Commencez une nouvelle formation pour voir votre progression ici
                  </p>
                  <Link to="/formations">
                    <Button variant="gradient">
                      Explorer les formations
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Completed Tab */}
          {activeTab === 'completed' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                  Formations terminées
                </h2>
                <span className="text-text-secondary dark:text-text-light">
                  {completedFormations.length} formation{completedFormations.length !== 1 ? 's' : ''} terminée{completedFormations.length !== 1 ? 's' : ''}
                </span>
              </div>

              {completedFormations.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedFormations.map(enrollment => (
                    <CompletedCard key={enrollment.id} enrollment={enrollment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <CheckCircle className="mx-auto h-16 w-16 text-text-light mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
                    Aucune formation terminée
                  </h3>
                  <p className="text-text-secondary dark:text-text-light mb-6">
                    Terminez votre première formation pour débloquer des certificats
                  </p>
                  <Link to="/formations">
                    <Button variant="gradient">
                      Commencer une formation
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                  Mes certificats
                </h2>
                <span className="text-text-secondary dark:text-text-light">
                  {enrollments.filter(e => e.certificate_url).length} certificat{enrollments.filter(e => e.certificate_url).length !== 1 ? 's' : ''} obtenu{enrollments.filter(e => e.certificate_url).length !== 1 ? 's' : ''}
                </span>
              </div>

              {enrollments.filter(e => e.certificate_url).length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedFormations
                    .filter(enrollment => enrollment.certificate_url)
                    .map(enrollment => (
                      <div
                        key={enrollment.id}
                        className="bg-white dark:bg-surface-dark rounded-xl border border-border dark:border-border p-6 text-center hover:shadow-lg transition-smooth"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="text-white" size={32} />
                        </div>
                        <h3 className="font-semibold text-text-primary dark:text-text-dark mb-2">
                          {enrollment.formation.title}
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-text-light mb-4">
                          Terminé le {new Date(enrollment.completed_at).toLocaleDateString('fr-FR')}
                        </p>
                        {enrollment.final_grade && (
                          <p className="text-lg font-bold text-accent-green mb-4">
                            Note: {enrollment.final_grade}%
                          </p>
                        )}
                        <a href={enrollment.certificate_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full">
                            <Download size={16} className="mr-2" />
                            Télécharger le certificat
                          </Button>
                        </a>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Award className="mx-auto h-16 w-16 text-text-light mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-2">
                    Aucun certificat obtenu
                  </h3>
                  <p className="text-text-secondary dark:text-text-light mb-6">
                    Terminez des formations pour obtenir des certificats de réussite
                  </p>
                  <Link to="/formations">
                    <Button variant="gradient">
                      Parcourir les formations
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer variant={1} />
    </div>
  );
};

export default UserProgressDashboard;