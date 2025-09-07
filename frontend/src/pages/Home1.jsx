import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import TemplateCard from '../components/TemplateCard';
import Footer from '../components/Footer';
import Button from '../components/Button';
import {
  Palette,
  Code,
  Layers,
  Smartphone,
  Globe,
  Zap,
  CheckCircle,
  Users,
  BarChart,
  Shield,
  Sparkles,
  Package
} from 'lucide-react';
import NavBar from '../components/Navbar';

const Home1 = () => {
  const skills = [
    {
      icon: <Code size={24} />,
      title: 'Développement Frontend',
      description: 'React, Vue.js, Angular, TypeScript, et les dernières technologies web.',
      color: 'primary',
    },
    {
      icon: <Globe size={24} />,
      title: 'Développement Backend',
      description: 'Node.js, Python, API REST, GraphQL et bases de données.',
      color: 'secondary',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Applications Mobile',
      description: 'React Native, Flutter pour des apps performantes multi-plateformes.',
      color: 'purple',
    },
    {
      icon: <Layers size={24} />,
      title: 'Architecture Logicielle',
      description: 'Conception d’architectures scalables et maintenables.',
      color: 'yellow',
    },
    {
      icon: <Zap size={24} />,
      title: 'DevOps & Cloud',
      description: 'Docker, Kubernetes, AWS, CI/CD pour des déploiements automatisés.',
      color: 'blue',
    },
    {
      icon: <Palette size={24} />,
      title: 'UI/UX Design',
      description: 'Création d’interfaces intuitives et expériences utilisateur optimales.',
      color: 'green',
    },
  ];

  const services = [
    {
      title: 'Développement Web',
      price: 'Sur devis',
      features: [
        { text: 'Sites web responsifs', included: true },
        { text: 'Applications React/Vue', included: true },
        { text: 'Intégration API', included: true },
        { text: 'SEO optimisé', included: true },
        { text: 'Maintenance incluse', included: true },
        { text: 'Hébergement premium', included: false },
      ],
    },
    {
      title: 'Solution Complète',
      price: 'Personnalisé',
      highlighted: true,
      features: [
        { text: 'Full-stack development', included: true },
        { text: 'Base de données optimisée', included: true },
        { text: 'Architecture scalable', included: true },
        { text: 'Tests automatisés', included: true },
        { text: 'Déploiement cloud', included: true },
        { text: 'Support prioritaire', included: true },
      ],
    },
    {
      title: 'Consulting & Audit',
      price: 'Flexible',
      features: [
        { text: 'Audit de code existant', included: true },
        { text: 'Optimisation performance', included: true },
        { text: 'Formation équipe', included: true },
        { text: 'Architecture review', included: true },
        { text: 'Best practices', included: true },
        { text: 'Suivi long terme', included: true },
      ],
    },
  ];

  const projects = [
    {
      image: 'from-primary to-primary-light',
      title: 'Plateforme E-commerce',
      category: 'React & Node.js',
      description: 'Application de commerce en ligne avec paiement intégré et tableau de bord admin.',
      gradient: true,
    },
    {
      image: 'from-secondary to-secondary-light',
      title: 'API de Gestion',
      category: 'Backend',
      description: 'API REST robuste avec authentification JWT et documentation Swagger.',
      gradient: true,
    },
    {
      image: 'from-accent-purple to-accent-blue',
      title: 'App Mobile Finance',
      category: 'React Native',
      description: 'Application mobile de gestion financière avec synchronisation cloud.',
      gradient: true,
    },
    {
      image: 'https://placehold.co/400x300/6366f1/ffffff?text=Dashboard',
      title: 'Dashboard Analytics',
      category: 'Vue.js',
      description: 'Tableau de bord interactif avec visualisation de données en temps réel.',
    },
  ];

  const stats = [
    { value: '50+', label: 'Projets Réalisés' },
    { value: '5+', label: 'Années d’Expérience' },
    { value: '100%', label: 'Clients Satisfaits' },
    { value: '24/7', label: 'Disponibilité' },
  ];

  return (
    <div className="min-h-screen bg-background  dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />
      <Hero variant={1} />

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface dark:bg-surface-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">Compétences</span>
            <h2 className="text-4xl font-bold text-text-primary mt-2">
              Expertise technique et créative
            </h2>
            <p className="text-xl text-text-secondary mt-4 max-w-2xl mx-auto">
              Ma maîtrise des technologies modernes pour créer des solutions digitales innovantes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <FeatureCard key={index} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background dark:bg-background-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-primary">À propos</span>
                <h2 className="text-4xl font-bold text-text-primary mt-2">
                  Passion pour l'innovation et l'excellence
                </h2>
              </div>

              <p className="text-lg text-text-secondary leading-relaxed">
                Développeur full-stack passionné avec plus de 5 ans d'expérience dans la création
                de solutions digitales innovantes. Je me spécialise dans le développement d'applications
                web et mobile performantes, en utilisant les technologies les plus récents.
              </p>

              <p className="text-lg text-text-secondary leading-relaxed">
                Mon approche combine expertise technique approfondie et compréhension des enjeux business
                pour livrer des solutions qui génèrent un réel impact. J'ai accompagné des startups comme
                des grandes entreprises dans leur transformation digitale.
              </p>

              {/* Tech Stack */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">Technologies Maîtrisées</h3>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB'].map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="gradient">
                  Télécharger CV
                </Button>
                <Button variant="outline">
                  Me contacter
                </Button>
              </div>
            </div>

            {/* Image & Stats */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl" />
                <img
                  src="https://placehold.co/500x600/6366f1/ffffff?text=Developer"
                  alt="Developer"
                  className="relative rounded-2xl shadow-xl"
                />
              </div>

              {/* Experience Highlights */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white dark:bg-surface-dark rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-primary mb-1">50+</div>
                  <div className="text-text-secondary dark:text-text-light text-sm">Projets livrés</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-surface-dark rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-secondary mb-1">5+</div>
                  <div className="text-text-secondary dark:text-text-light text-sm">Années d'exp.</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-surface-dark rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-accent-purple mb-1">15+</div>
                  <div className="text-text-secondary dark:text-text-light text-sm">Technologies</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-surface-dark rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-accent-yellow mb-1">100%</div>
                  <div className="text-text-secondary dark:text-text-light text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-surface dark:bg-surface-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-sm font-medium text-primary">Projets</span>
              <h2 className="text-4xl font-bold text-text-primary mt-2">
                Réalisations Récentes
              </h2>
              <p className="text-xl text-text-secondary mt-4">
                Découvrez quelques-uns de mes projets les plus marquants, allant des applications web aux solutions mobiles.
              </p>
            </div>
            <Link to="/projets">
              <Button variant="outline">
                Voir tous les projets
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <TemplateCard key={index} {...project} />
            ))}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-r from-primary to-primary-dark rounded-2xl text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Transformons vos idées en réalité digitale.
                </h3>
                <p className="text-white/80 text-lg">
                  Collaboration étroite pour des résultats exceptionnels
                </p>
              </div>
              <Button variant="secondary" size="lg">
                Discutons de votre projet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-surface dark:bg-surface-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">Services</span>
            <h2 className="text-4xl font-bold text-text-primary mt-2">
              Solutions Sur Mesure
            </h2>
            <p className="text-xl text-text-secondary mt-4 max-w-2xl mx-auto">
              Des services adaptés à vos besoins pour donner vie à vos projets digitaux.
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                Choisissez Votre Formule.
              </h3>
              <p className="text-text-secondary">
                Des options flexibles adaptées à chaque projet et budget.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <PricingCard key={index} {...service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-secondary">
              Prêt à commencer votre projet ?
              <span className="text-primary font-medium ml-1">Contactez-moi dès maintenant</span>
            </p>
            <Button variant="gradient" size="lg" className="mt-6">
              Commencer
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background dark:bg-background-dark transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-accent-yellow/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-accent-yellow mr-2" />
            <span className="text-sm font-medium text-accent-yellow">Disponible pour nouveaux projets</span>
          </div>

          <h2 className="text-5xl font-bold text-text-primary mb-6">
            Prêt à conrétiser votre vision ?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Collaborons pour transformer vos idées en solutions digitales performantes et innovantes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl">
              Démarrer un projet
            </Button>
            <Button variant="outline" size="xl">
              Planifier un appel
            </Button>
          </div>
        </div>
      </section>

      <Footer variant={1} />
    </div>
  );
};

export default Home1;