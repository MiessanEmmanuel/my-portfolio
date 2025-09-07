import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { getExerciseById, getFormationById } from '../data/formations';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  CheckCircle,
  PlayCircle,
  Code,
  ExternalLink,
  Award,
  Lightbulb,
  FileText,
  Download
} from 'lucide-react';

const ExerciseDetail = () => {
  const { id } = useParams();
  const exercise = getExerciseById(id);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(exercise?.completed || false);

  if (!exercise) {
    return <Navigate to="/dashboard" replace />;
  }

  const formation = getFormationById(exercise.formationId);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile': return 'bg-accent-green/20 text-accent-green border-accent-green/30';
      case 'Moyen': return 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30';
      case 'Difficile': return 'bg-secondary/20 text-secondary border-secondary/30';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Pratique': return <Code className="text-primary" size={20} />;
      case 'Projet': return <Award className="text-secondary" size={20} />;
      case 'Théorie': return <BookOpen className="text-accent-blue" size={20} />;
      default: return <FileText className="text-text-secondary" size={20} />;
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // Ici vous pourriez envoyer une requête à votre API pour marquer l'exercice comme terminé
  };

  const handleStartOver = () => {
    setIsCompleted(false);
    setShowSolution(false);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/dashboard"
            className="inline-flex items-center gap-2 text-text-secondary dark:text-text-light hover:text-primary transition-smooth mb-6"
          >
            <ArrowLeft size={20} />
            Retour au dashboard
          </Link>
          
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {getTypeIcon(exercise.type)}
                <span className="text-sm text-text-secondary dark:text-text-light">
                  {formation?.title} • {exercise.type}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-text-dark mb-4">
                {exercise.title}
              </h1>
              
              <p className="text-lg text-text-secondary dark:text-text-light mb-6">
                {exercise.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className={`px-3 py-2 rounded-lg border text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-surface-dark rounded-lg border border-border dark:border-border">
                  <Clock size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary dark:text-text-dark">
                    {exercise.estimatedTime}
                  </span>
                </div>
                
                {isCompleted && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-accent-green/20 text-accent-green rounded-lg border border-accent-green/30">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Terminé</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-2xl text-white">{formation?.icon}</span>
                  </div>
                  <h3 className="font-semibold text-text-primary dark:text-text-dark mb-2">
                    {formation?.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-text-light">
                    {formation?.level}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Instructions */}
              <div className="bg-white dark:bg-surface-dark rounded-xl p-8 border border-border dark:border-border">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                    Instructions
                  </h2>
                </div>
                
                <div className="prose prose-sm max-w-none text-text-secondary dark:text-text-light">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {exercise.instructions}
                  </pre>
                </div>
              </div>

              {/* Code Template */}
              {exercise.codeTemplate && (
                <div className="bg-white dark:bg-surface-dark rounded-xl p-8 border border-border dark:border-border">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Code className="text-secondary" size={24} />
                      <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                        Template de départ
                      </h2>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download size={16} className="mr-2" />
                      Télécharger
                    </Button>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-gray-300 text-sm">
                      <code>{exercise.codeTemplate}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {!isCompleted ? (
                  <>
                    <Button variant="gradient" size="lg" onClick={handleComplete}>
                      <CheckCircle size={20} className="mr-2" />
                      Marquer comme terminé
                    </Button>
                    <Button variant="outline" size="lg">
                      <PlayCircle size={20} className="mr-2" />
                      Ouvrir dans l'éditeur
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="lg" onClick={handleStartOver}>
                      <PlayCircle size={20} className="mr-2" />
                      Recommencer
                    </Button>
                    <Button 
                      variant={showSolution ? "primary" : "secondary"} 
                      size="lg"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      <Lightbulb size={20} className="mr-2" />
                      {showSolution ? 'Masquer la solution' : 'Voir la solution'}
                    </Button>
                  </>
                )}
              </div>

              {/* Solution (si exercice terminé) */}
              {isCompleted && showSolution && (
                <div className="bg-gradient-to-br from-accent-green/5 to-accent-blue/5 rounded-xl p-8 border-2 border-accent-green/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="text-accent-green" size={24} />
                    <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
                      Solution proposée
                    </h2>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-gray-300 text-sm">
                      <code>
{`// Solution pour: ${exercise.title}
// Cette solution respecte toutes les exigences de l'exercice

${exercise.codeTemplate.includes('<!DOCTYPE html>') ? 
`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Portfolio - ${exercise.title}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: #6366f1; }
    </style>
</head>
<body>
    <h1>Mon nom</h1>
    <p>Je suis un développeur passionné par la création d'applications web.</p>
    <ul>
        <li>Programmation</li>
        <li>Design UI/UX</li>
        <li>Apprentissage continu</li>
    </ul>
</body>
</html>` : 
`// Solution JavaScript
function calculer(operation, a, b) {
    switch(operation) {
        case 'addition': return a + b;
        case 'soustraction': return a - b;
        case 'multiplication': return a * b;
        case 'division': return b !== 0 ? a / b : 'Erreur: division par zéro';
        default: return 'Opération non supportée';
    }
}

console.log(calculer('addition', 5, 3)); // 8`
}`}
                      </code>
                    </pre>
                  </div>
                  
                  <div className="mt-4 p-4 bg-accent-blue/10 rounded-lg">
                    <p className="text-sm text-accent-blue font-medium">
                      💡 Astuce : Cette solution n'est qu'un exemple. Il existe souvent plusieurs façons correctes de résoudre un exercice !
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Resources */}
              {exercise.resources && exercise.resources.length > 0 && (
                <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
                  <h3 className="font-semibold text-text-primary dark:text-text-dark mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-primary" />
                    Ressources utiles
                  </h3>
                  <div className="space-y-3">
                    {exercise.resources.map((resource, index) => (
                      <a 
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary-hover transition-smooth text-sm"
                      >
                        <ExternalLink size={14} />
                        {resource.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress */}
              <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
                <h3 className="font-semibold text-text-primary dark:text-text-dark mb-4">
                  Votre progression
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary dark:text-text-light">Exercice actuel</span>
                    <span className="font-medium text-text-primary dark:text-text-dark">
                      {isCompleted ? 'Terminé' : 'En cours'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary dark:text-text-light">Temps estimé</span>
                    <span className="font-medium text-text-primary dark:text-text-dark">
                      {exercise.estimatedTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary dark:text-text-light">Difficulté</span>
                    <span className={`font-medium ${
                      exercise.difficulty === 'Facile' ? 'text-accent-green' :
                      exercise.difficulty === 'Moyen' ? 'text-accent-yellow' : 'text-secondary'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-accent-yellow/10 to-accent-orange/10 rounded-xl p-6 border border-accent-yellow/20">
                <h3 className="font-semibold text-text-primary dark:text-text-dark mb-4 flex items-center gap-2">
                  <Lightbulb size={20} className="text-accent-yellow" />
                  Conseils
                </h3>
                <ul className="text-sm text-text-secondary dark:text-text-light space-y-2">
                  <li>• Lisez attentivement les instructions</li>
                  <li>• Testez votre code régulièrement</li>
                  <li>• N'hésitez pas à consulter les ressources</li>
                  <li>• Prenez votre temps pour comprendre</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant={1} />
    </div>
  );
};

export default ExerciseDetail;