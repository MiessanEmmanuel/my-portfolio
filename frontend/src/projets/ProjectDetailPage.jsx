import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useProject } from '../hooks/useProjects';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Loader
} from 'lucide-react';

const ProjectDetailPage = () => {
  const { id } = useParams(); // This is now the slug
  const { project, loading, error } = useProject(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
        <NavBar variant={1} />
        <div className="flex justify-center items-center py-32">
          <Loader className="animate-spin h-8 w-8 text-primary" />
          <span className="ml-2 text-text-secondary">Chargement du projet...</span>
        </div>
        <Footer variant={1} />
      </div>
    );
  }

  if (error || !project) {
    return <Navigate to="/projets" replace />;
  }

  const gallery = project.gallery || [];

  const openGallery = (index) => {
    setSelectedImage(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const GalleryModal = () => (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative max-w-6xl max-h-full">
        <button
          onClick={closeGallery}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
        >
          <X size={32} />
        </button>

        <img
          src={gallery[selectedImage]?.image_url || gallery[selectedImage]}
          alt={gallery[selectedImage]?.alt_text || `${project.title} - Image ${selectedImage + 1}`}
          className="max-w-full max-h-screen object-contain"
        />

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {project.gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-3 h-3 rounded-full ${index === selectedImage ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />

      {/* Back Navigation */}
      <section className="pt-24 pb-8 bg-white dark:bg-surface-dark border-b border-border dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 text-text-secondary dark:text-text-light hover:text-primary transition-smooth"
          >
            <ArrowLeft size={20} />
            Retour aux projets
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full">
                  {project.category}
                </span>
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${project.status === 'Terminé'
                  ? 'bg-accent-green text-white'
                  : project.status === 'En cours'
                    ? 'bg-accent-yellow text-white'
                    : 'bg-gray-500 text-white'
                  }`}>
                  {project.status}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary dark:text-text-dark mb-6">
                {project.title}
              </h1>

              <p className="text-lg text-text-secondary dark:text-text-light mb-8">
                {project.long_description || project.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary" size={20} />
                  <div>
                    <p className="text-sm text-text-secondary dark:text-text-light">Date</p>
                    <p className="font-semibold text-text-primary dark:text-text-dark">{project.date_completed || project.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-primary" size={20} />
                  <div>
                    <p className="text-sm text-text-secondary dark:text-text-light">Durée</p>
                    <p className="font-semibold text-text-primary dark:text-text-dark">{project.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="text-primary" size={20} />
                  <div>
                    <p className="text-sm text-text-secondary dark:text-text-light">Client</p>
                    <p className="font-semibold text-text-primary dark:text-text-dark">{project.client}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="gradient" size="lg">
                      <ExternalLink size={20} className="mr-2" />
                      Voir le projet
                    </Button>
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      <Github size={20} className="mr-2" />
                      Code source
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-smooth"
                onClick={() => openGallery(0)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-8 text-center">
            Galerie du projet
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => openGallery(index)}
              >
                <img
                  src={image?.image_url || image}
                  alt={image?.alt_text || `${project.title} - Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth rounded-lg flex items-center justify-center">
                  <ExternalLink className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies & Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-8">
                Technologies utilisées
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.technologies && project.technologies.map((tech, index) => (
                  <div key={index} className="bg-white dark:bg-surface-dark p-4 rounded-lg border border-border dark:border-border text-center hover:border-primary/30 transition-smooth">
                    <span className="font-medium text-text-primary dark:text-text-dark">{tech.name || tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-8">
                Fonctionnalités principales
              </h3>
              <div className="space-y-4">
                {project.features && project.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-accent-green mt-1 flex-shrink-0" size={20} />
                    <span className="text-text-secondary dark:text-text-light">{feature.feature_text || feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to projects */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/projets">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2" size={20} />
              Retour aux projets
            </Button>
          </Link>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && <GalleryModal />}

      <Footer variant={1} />
    </div>
  );
};

export default ProjectDetailPage;