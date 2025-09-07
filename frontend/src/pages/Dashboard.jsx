import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { 
  formations, 
  getExercisesByFormation, 
  currentUser 
} from '../data/formations';
import { 
  BookOpen, 
  Clock, 
  Award, 
  PlayCircle, 
  CheckCircle, 
  Lock,
  User,
  Calendar,
  TrendingUp,
  Target,
  Filter
} from 'lucide-react';

const Dashboard = () => {
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Obtenir les formations de l'utilisateur
  const userFormations = formations.filter(formation => 
    currentUser.enrolledFormations.includes(formation.id)
  );

  const getProgressPercentage = (formationId) => {
    const progress = currentUser.progress[formationId];
    if (!progress) return 0;
    return Math.round((progress.completed / progress.total) * 100);
  };

  const getTotalProgress = () => {
    const total = Object.values(currentUser.progress).reduce((acc, p) => acc + p.total, 0);
    const completed = Object.values(currentUser.progress).reduce((acc, p) => acc + p.completed, 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const ExerciseCard = ({ exercise }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'available': return 'text-accent-green';
        case 'locked': return 'text-text-light';
        case 'completed': return 'text-accent-blue';
        default: return 'text-text-secondary';
      }
    };

    const getStatusIcon = (status, completed) => {
      if (completed) return <CheckCircle className="text-accent-green" size={20} />;
      if (status === 'locked') return <Lock className="text-text-light" size={20} />;
      return <PlayCircle className="text-accent-green" size={20} />;
    };

    const getDifficultyColor = (difficulty) => {
      switch (difficulty) {
        case 'Facile': return 'bg-accent-green/20 text-accent-green';
        case 'Moyen': return 'bg-accent-yellow/20 text-accent-yellow';
        case 'Difficile': return 'bg-secondary/20 text-secondary';
        default: return 'bg-gray-100 text-gray-600';
      }
    };

    return (
      <div className={`bg-white dark:bg-surface-dark rounded-xl p-6 border transition-smooth ${
        exercise.status === 'locked' 
          ? 'border-border dark:border-border opacity-60' 
          : 'border-border dark:border-border hover:border-primary/30 hover:shadow-lg'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {getStatusIcon(exercise.status, exercise.completed)}
            <div>
              <h3 className={`font-semibold ${
                exercise.status === 'locked' 
                  ? 'text-text-light dark:text-text-secondary' 
                  : 'text-text-primary dark:text-text-dark'
              }`}>
                {exercise.title}
              </h3>
              <p className={`text-sm ${
                exercise.status === 'locked' 
                  ? 'text-text-light' 
                  : 'text-text-secondary dark:text-text-light'
              }`}>
                {exercise.type} • {exercise.estimatedTime}
              </p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
        </div>
        
        <p className={`mb-4 ${
          exercise.status === 'locked' 
            ? 'text-text-light' 
            : 'text-text-secondary dark:text-text-light'
        }`}>
          {exercise.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-light">
            <Clock size={14} />
            <span>{exercise.estimatedTime}</span>
          </div>
          
          {exercise.status !== 'locked' ? (
            <Link to={`/dashboard/exercise/${exercise.id}`}>
              <Button variant={exercise.completed ? "outline" : "primary"} size="sm">
                {exercise.completed ? 'Revoir' : 'Commencer'}
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Verrouillé
            </Button>
          )}
        </div>
      </div>
    );
  };

  const FormationCard = ({ formation, onClick, isSelected }) => {
    const progress = getProgressPercentage(formation.id);
    
    return (
      <div 
        className={`bg-gradient-to-br ${formation.color} rounded-xl p-6 text-white cursor-pointer transition-smooth hover:scale-105 ${
          isSelected ? 'ring-4 ring-white/50' : ''
        }`}
        onClick={() => onClick(formation)}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">{formation.icon}</span>
          <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
            {formation.level}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
        <p className="text-white/80 text-sm mb-4">{formation.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/80">
            <span>{currentUser.progress[formation.id]?.completed || 0}/{formation.totalExercises} exercices</span>
            <span>{formation.duration}</span>
          </div>
        </div>
      </div>
    );
  };

  const filteredExercises = selectedFormation 
    ? getExercisesByFormation(selectedFormation.id).filter(exercise => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'available') return exercise.status === 'available' && !exercise.completed;
        if (filterStatus === 'completed') return exercise.completed;
        if (filterStatus === 'locked') return exercise.status === 'locked';
        return true;
      })
    : [];

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-text-primary dark:text-text-dark">
                  Bonjour, {currentUser.name} 👋
                </h1>
                <p className="text-text-secondary dark:text-text-light">
                  Continuons votre apprentissage !
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{getTotalProgress()}%</div>
                <div className="text-sm text-text-secondary">Progression globale</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{userFormations.length}</div>
                <div className="text-sm text-text-secondary">Formation{userFormations.length > 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-accent-green" size={24} />
                <div>
                  <div className="text-lg font-bold text-text-primary dark:text-text-dark">
                    {Object.values(currentUser.progress).reduce((acc, p) => acc + p.completed, 0)}
                  </div>
                  <div className="text-sm text-text-secondary">Exercices terminés</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Target className="text-accent-blue" size={24} />
                <div>
                  <div className="text-lg font-bold text-text-primary dark:text-text-dark">
                    {Object.values(currentUser.progress).reduce((acc, p) => acc + p.total, 0)}
                  </div>
                  <div className="text-sm text-text-secondary">Total exercices</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Calendar className="text-accent-yellow" size={24} />
                <div>
                  <div className="text-lg font-bold text-text-primary dark:text-text-dark">
                    {new Date(currentUser.joinDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </div>
                  <div className="text-sm text-text-secondary">Date d'inscription</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Award className="text-secondary" size={24} />
                <div>
                  <div className="text-lg font-bold text-text-primary dark:text-text-dark">
                    {userFormations.filter(f => getProgressPercentage(f.id) === 100).length}
                  </div>
                  <div className="text-sm text-text-secondary">Formations complètes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-6">
            Mes Formations
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {userFormations.map(formation => (
              <FormationCard 
                key={formation.id} 
                formation={formation}
                onClick={setSelectedFormation}
                isSelected={selectedFormation?.id === formation.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Exercices */}
      {selectedFormation && (
        <section className="py-8 bg-white dark:bg-surface-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                Exercices - {selectedFormation.title}
              </h2>
              
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-text-secondary" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white dark:bg-background-dark border border-border dark:border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">Tous les exercices</option>
                  <option value="available">Disponibles</option>
                  <option value="completed">Terminés</option>
                  <option value="locked">Verrouillés</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredExercises.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
            
            {filteredExercises.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto text-text-light mb-4" size={48} />
                <h3 className="text-xl font-semibold text-text-secondary mb-2">
                  Aucun exercice trouvé
                </h3>
                <p className="text-text-light">
                  Essayez de changer le filtre ou sélectionnez une autre formation.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
      
      {!selectedFormation && (
        <section className="py-16 text-center">
          <BookOpen className="mx-auto text-text-light mb-4" size={48} />
          <h3 className="text-xl font-semibold text-text-secondary mb-2">
            Sélectionnez une formation
          </h3>
          <p className="text-text-light">
            Choisissez une formation ci-dessus pour voir les exercices disponibles.
          </p>
        </section>
      )}

      <Footer variant={1} />
    </div>
  );
};

export default Dashboard;