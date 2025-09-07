import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { projects } from '../data/projects';
import { ExternalLink, Github, Calendar, User, Clock, Filter } from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');

  const categories = ['Tous', ...new Set(projects.map(p => p.category))];
  const statuses = ['Tous', ...new Set(projects.map(p => p.status))];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'Tous' || project.category === selectedCategory;
    const statusMatch = selectedStatus === 'Tous' || project.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const ProjectCard = ({ project }) => (
    <div className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-border dark:border-border hover:border-primary/30 hover:shadow-xl transition-smooth">
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-smooth duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
            {project.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${project.status === 'Terminé'
              ? 'bg-accent-green text-white'
              : project.status === 'En cours'
                ? 'bg-accent-yellow text-white'
                : 'bg-gray-500 text-white'
            }`}>
            {project.status}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-smooth flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-smooth flex items-center gap-2"
              >
                <Github size={16} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mb-3">
          {project.title}
        </h3>
        <p className="text-text-secondary dark:text-text-light mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-text-light text-xs rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-text-secondary dark:text-text-light">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{project.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{project.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-light">
            <User size={14} />
            <span>{project.client}</span>
          </div>
          <Link to={`/projets/${project.id}`}>
            <Button variant="outline" size="sm">
              Voir détails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary dark:text-text-dark mb-6">
            Mes <span className="text-primary">Projets</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary dark:text-text-light max-w-3xl mx-auto">
            Découvrez une sélection de mes réalisations les plus récentes,
            allant des applications web aux solutions mobiles et systèmes complexes.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-surface-dark border-b border-border dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-text-secondary" />
              <span className="text-text-primary dark:text-text-dark font-medium">Filtrer par :</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="space-x-2">
                <span className="text-sm text-text-secondary">Catégorie :</span>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-text-secondary hover:bg-primary/10'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="space-x-2">
                <span className="text-sm text-text-secondary">Statut :</span>
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${selectedStatus === status
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-text-secondary hover:bg-secondary/10'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
              {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary dark:text-text-light text-lg">
                Aucun projet trouvé avec ces critères.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('Tous');
                  setSelectedStatus('Tous');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer variant={1} />
    </div>
  );
};

export default ProjectsPage;