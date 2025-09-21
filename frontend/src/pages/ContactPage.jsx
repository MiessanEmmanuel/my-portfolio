import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { contactService } from '../services/contactService';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  User,
  MessageSquare,
  Briefcase,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Loader,
  AlertCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const contactInfo = {
    email: 'contact@monportfolio.dev',
    phone: '+33 1 23 45 67 89',
    location: 'Paris, France',
    availability: 'Disponible pour nouveaux projets',
    responseTime: 'Réponse sous 24h'
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/monprofil', color: 'hover:text-gray-900' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/monprofil', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/monprofil', color: 'hover:text-blue-400' },
    { name: 'Website', icon: Globe, url: 'https://monportfolio.dev', color: 'hover:text-primary' }
  ];

  const services = [
    { title: 'Développement Web', description: 'Applications React, Vue.js, sites responsifs' },
    { title: 'Applications Mobile', description: 'React Native, Flutter, développement cross-platform' },
    { title: 'Backend & API', description: 'Node.js, Python, bases de données, API REST' },
    { title: 'Consulting', description: 'Architecture, code review, formation équipes' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await contactService.sendMessage(formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        budget: '',
        timeline: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitError(error.message || 'Une erreur est survenue lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
        <NavBar variant={1} />
        
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-12 shadow-xl border border-border dark:border-border">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-accent-green to-accent-blue rounded-full flex items-center justify-center">
                <CheckCircle className="text-white" size={48} />
              </div>
              
              <h1 className="text-4xl font-bold text-text-primary dark:text-text-dark mb-6">
                Message envoyé avec succès !
              </h1>
              
              <p className="text-lg text-text-secondary dark:text-text-light mb-8">
                Merci pour votre message. Je vous répondrai dans les plus brefs délais, généralement sous 24h.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="gradient" 
                  size="lg"
                  onClick={() => setIsSubmitted(false)}
                >
                  Envoyer un autre message
                </Button>
                <Button variant="outline" size="lg">
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <Footer variant={1} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <NavBar variant={1} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary dark:text-text-dark mb-6">
            Travaillons <span className="text-primary">ensemble</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary dark:text-text-light max-w-3xl mx-auto mb-8">
            Vous avez un projet en tête ? Je serais ravi d'en discuter avec vous et de voir comment 
            nous pouvons donner vie à vos idées.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark rounded-full shadow-sm border border-border dark:border-border">
              <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent-green">{contactInfo.availability}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark rounded-full shadow-sm border border-border dark:border-border">
              <Clock className="text-primary" size={16} />
              <span className="text-sm text-text-primary dark:text-text-dark">{contactInfo.responseTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-xl border border-border dark:border-border">
              <h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-8">
                Parlez-moi de votre projet
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                          errors.name ? 'border-red-500' : 'border-border dark:border-border'
                        }`}
                        placeholder="Votre nom"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                          errors.email ? 'border-red-500' : 'border-border dark:border-border'
                        }`}
                        placeholder="votre@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Entreprise
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Budget estimé
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                    >
                      <option value="">Sélectionnez une fourchette</option>
                      <option value="1k-5k">1 000€ - 5 000€</option>
                      <option value="5k-10k">5 000€ - 10 000€</option>
                      <option value="10k-25k">10 000€ - 25 000€</option>
                      <option value="25k+">25 000€+</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Sujet *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark ${
                          errors.subject ? 'border-red-500' : 'border-border dark:border-border'
                        }`}
                        placeholder="Sujet de votre message"
                      />
                    </div>
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Délai souhaité
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                      >
                        <option value="">Quand souhaitez-vous commencer ?</option>
                        <option value="asap">Dès que possible</option>
                        <option value="1month">Dans 1 mois</option>
                        <option value="3months">Dans 3 mois</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark resize-none ${
                      errors.message ? 'border-red-500' : 'border-border dark:border-border'
                    }`}
                    placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                    <AlertCircle className="text-red-500" size={20} />
                    <p className="text-red-700">{submitError}</p>
                  </div>
                )}

                <Button 
                  type="submit"
                  variant="gradient" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info & Services */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-xl border border-border dark:border-border">
                <h3 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-6">
                  Informations de contact
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary dark:text-text-dark">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-primary hover:text-primary-hover transition-smooth">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Phone className="text-secondary" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary dark:text-text-dark">Téléphone</p>
                      <a href={`tel:${contactInfo.phone}`} className="text-secondary hover:text-secondary-hover transition-smooth">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                      <MapPin className="text-accent-blue" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary dark:text-text-dark">Localisation</p>
                      <p className="text-text-secondary dark:text-text-light">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border dark:border-border">
                  <h4 className="font-semibold text-text-primary dark:text-text-dark mb-4">Suivez-moi</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 bg-gray-100 dark:bg-background-dark rounded-lg flex items-center justify-center text-text-secondary transition-smooth ${social.color}`}
                        >
                          <IconComponent size={20} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-xl border border-border dark:border-border">
                <h3 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-6">
                  Services proposés
                </h3>
                
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="p-4 bg-background dark:bg-background-dark rounded-lg">
                      <h4 className="font-semibold text-text-primary dark:text-text-dark mb-2">
                        {service.title}
                      </h4>
                      <p className="text-sm text-text-secondary dark:text-text-light">
                        {service.description}
                      </p>
                    </div>
                  ))}
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

export default ContactPage;