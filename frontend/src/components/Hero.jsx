import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Zap } from 'lucide-react';
import Button from './Button';

const Hero = ({ variant = 1 }) => {
  const skills = [
    'React & Node.js',
    'TypeScript',
    'Python & Django',
    'UI/UX Design',
  ];

  if (variant === 1) {
    return (
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-secondary/3" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Photo du développeur */}
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto relative">
                <img
                  src="https://placehold.co/128x128/6366f1/ffffff?text=Dev"
                  alt="Photo du développeur"
                  className="w-full h-full rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-green rounded-full border-4 border-white dark:border-background-dark flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Badge de statut */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Disponible pour nouveaux projets</span>
            </div>

            {/* Titre principal */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary dark:text-text-dark leading-tight max-w-4xl mx-auto">
                Développeur
                <span className="text-primary"> Full-Stack</span><br />
                Passionné par l'Innovation
              </h1>

              <p className="text-lg sm:text-xl text-text-secondary dark:text-text-light max-w-2xl mx-auto leading-relaxed">
                Spécialisé dans le développement d'applications web modernes et performantes.
                Transformons vos idées en solutions digitales innovantes.
              </p>
            </div>

            {/* Technologies principales */}
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {skills.slice(0, 4).map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-white dark:bg-surface-dark rounded-full text-sm font-medium text-text-primary dark:text-text-dark shadow-sm border border-border dark:border-border">
                  {skill.replace(' & ', ' • ')}
                </span>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/projets">
                <Button variant="gradient" size="lg" className="min-w-[200px]">
                  Voir mes projets
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Me contacter
                </Button>
              </Link>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-text-secondary dark:text-text-light">Projets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-secondary">5+</div>
                <div className="text-sm text-text-secondary dark:text-text-light">Années</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent-yellow">100%</div>
                <div className="text-sm text-text-secondary dark:text-text-light">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-secondary/10 rounded-full blur-xl animate-float-delayed" />
      </section>
    );
  }

  if (variant === 2) {
    return (
      <section className="relative min-h-screen flex items-center bg-background-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <span className="text-sm font-medium text-primary">Features</span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              The world's most<br />
              powerful design<br />
              <span className="gradient-primary bg-clip-text text-transparent">workflow</span>
            </h1>

            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Simultaneously design, code and collaborate with your
              team all from one place.
            </p>

            <div className="flex justify-center gap-4">
              <Button variant="gradient" size="lg">
                Start Free Trial
              </Button>
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 animate-float">
            <div className="w-20 h-20 bg-accent-purple rounded-2xl flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="absolute top-1/3 right-10 animate-float-delayed">
            <div className="w-16 h-16 bg-accent-yellow rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  // Variant 3
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
              Drag, Drop and
              <span className="text-primary"> Mix Your Own</span>
              Landing Page
            </h1>

            <p className="text-xl text-text-secondary">
              All the components, elements are neatly and clean prepared,
              all you need to do is design your own landing page in minutes.
            </p>

            <Button variant="gradient" size="xl" className="shadow-2xl">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-30" />
            <div className="relative">
              <img
                src="https://placehold.co/600x800/6366f1/ffffff?text=Design+Preview"
                alt="Design Preview"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-yellow rounded-full" />
                  <div>
                    <p className="font-semibold">Ready to get started?</p>
                    <p className="text-sm text-text-secondary">Sign up with your email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-yellow/20 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;