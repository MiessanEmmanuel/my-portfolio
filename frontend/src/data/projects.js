export const projects = [
  {
    id: 1,
    title: 'Plateforme E-commerce',
    category: 'React & Node.js',
    description: 'Application de commerce en ligne avec paiement intégré et tableau de bord admin.',
    longDescription: 'Une plateforme e-commerce complète développée avec React et Node.js, intégrant un système de paiement sécurisé avec Stripe, un tableau de bord administrateur pour la gestion des produits et commandes, et une API REST robuste. L\'application inclut également un système d\'authentification JWT, la gestion d\'inventaire en temps réel, et des notifications push.',
    image: 'https://placehold.co/600x400/6366f1/ffffff?text=E-commerce',
    gallery: [
      'https://placehold.co/800x600/6366f1/ffffff?text=Homepage',
      'https://placehold.co/800x600/8b5cf6/ffffff?text=Product+Page',
      'https://placehold.co/800x600/06b6d4/ffffff?text=Cart',
      'https://placehold.co/800x600/10b981/ffffff?text=Admin+Dashboard'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'Socket.io'],
    features: [
      'Interface utilisateur moderne et responsive',
      'Système de paiement sécurisé avec Stripe',
      'Tableau de bord administrateur',
      'Gestion d\'inventaire en temps réel',
      'Notifications push',
      'API REST documentée',
      'Tests unitaires et d\'intégration'
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/exemple/ecommerce',
    status: 'Terminé',
    date: '2024',
    client: 'Startup Tech',
    duration: '6 mois'
  },
  {
    id: 2,
    title: 'API de Gestion',
    category: 'Backend',
    description: 'API REST robuste avec authentification JWT et documentation Swagger.',
    longDescription: 'API complète pour la gestion d\'entreprise développée avec Node.js et Express, incluant un système d\'authentification avancé, la gestion des rôles et permissions, et une documentation automatique avec Swagger. L\'API gère les utilisateurs, les projets, les tâches et génère des rapports détaillés.',
    image: 'https://placehold.co/600x400/ec4899/ffffff?text=API+Management',
    gallery: [
      'https://placehold.co/800x600/ec4899/ffffff?text=API+Documentation',
      'https://placehold.co/800x600/f59e0b/ffffff?text=Dashboard',
      'https://placehold.co/800x600/ef4444/ffffff?text=Analytics'
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger', 'Docker', 'Redis'],
    features: [
      'Authentification JWT sécurisée',
      'Gestion des rôles et permissions',
      'Documentation Swagger automatique',
      'Rate limiting et sécurité avancée',
      'Tests automatisés avec Jest',
      'Déploiement Docker',
      'Monitoring et logs'
    ],
    liveUrl: 'https://api.example.com/docs',
    githubUrl: 'https://github.com/exemple/management-api',
    status: 'Terminé',
    date: '2024',
    client: 'Entreprise PME',
    duration: '4 mois'
  },
  {
    id: 3,
    title: 'App Mobile Finance',
    category: 'React Native',
    description: 'Application mobile de gestion financière avec synchronisation cloud.',
    longDescription: 'Application mobile cross-platform développée avec React Native pour la gestion des finances personnelles. Elle inclut la synchronisation cloud, des graphiques interactifs, la catégorisation automatique des transactions, et des notifications de budget. L\'app est connectée à une API backend sécurisée.',
    image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Finance+App',
    gallery: [
      'https://placehold.co/400x800/8b5cf6/ffffff?text=Mobile+Home',
      'https://placehold.co/400x800/06b6d4/ffffff?text=Charts',
      'https://placehold.co/400x800/10b981/ffffff?text=Transactions'
    ],
    technologies: ['React Native', 'Expo', 'Firebase', 'Chart.js', 'AsyncStorage', 'Push Notifications'],
    features: [
      'Interface native iOS et Android',
      'Synchronisation cloud en temps réel',
      'Graphiques et analyses financières',
      'Notifications push personnalisées',
      'Mode hors ligne',
      'Sécurité biométrique',
      'Export des données'
    ],
    liveUrl: 'https://apps.apple.com/app/finance-example',
    githubUrl: 'https://github.com/exemple/finance-app',
    status: 'En cours',
    date: '2024',
    client: 'Projet personnel',
    duration: '8 mois'
  },
  {
    id: 4,
    title: 'Dashboard Analytics',
    category: 'Vue.js',
    description: 'Tableau de bord interactif avec visualisation de données en temps réel.',
    longDescription: 'Dashboard avancé développé avec Vue.js 3 et TypeScript, offrant des visualisations de données en temps réel avec des graphiques interactifs. Le tableau de bord se connecte à plusieurs sources de données via des APIs et propose des filtres avancés, des exports, et un système de rapports personnalisables.',
    image: 'https://placehold.co/600x400/06b6d4/ffffff?text=Analytics+Dashboard',
    gallery: [
      'https://placehold.co/800x600/06b6d4/ffffff?text=Dashboard+Home',
      'https://placehold.co/800x600/8b5cf6/ffffff?text=Charts+View',
      'https://placehold.co/800x600/10b981/ffffff?text=Reports'
    ],
    technologies: ['Vue.js 3', 'TypeScript', 'Chart.js', 'Vuetify', 'Pinia', 'Axios', 'WebSocket'],
    features: [
      'Visualisations interactives en temps réel',
      'Filtres et recherche avancés',
      'Système de rapports personnalisables',
      'Export PDF et Excel',
      'Notifications en temps réel',
      'Interface responsive',
      'Mode sombre'
    ],
    liveUrl: 'https://dashboard.example.com',
    githubUrl: 'https://github.com/exemple/analytics-dashboard',
    status: 'Terminé',
    date: '2023',
    client: 'Agence Marketing',
    duration: '5 mois'
  },
  {
    id: 5,
    title: 'Site Web Corporate',
    category: 'Next.js',
    description: 'Site web d\'entreprise avec CMS headless et optimisation SEO.',
    longDescription: 'Site web corporate moderne développé avec Next.js et intégrant un CMS headless (Strapi) pour la gestion de contenu. Le site est entièrement optimisé pour le SEO avec génération statique, lazy loading, et performances web optimales. Il inclut un blog, une section portfolio, et un système de contact.',
    image: 'https://placehold.co/600x400/10b981/ffffff?text=Corporate+Website',
    gallery: [
      'https://placehold.co/800x600/10b981/ffffff?text=Homepage',
      'https://placehold.co/800x600/f59e0b/ffffff?text=About+Page',
      'https://placehold.co/800x600/ef4444/ffffff?text=Blog'
    ],
    technologies: ['Next.js', 'React', 'Strapi CMS', 'TailwindCSS', 'Framer Motion', 'Vercel'],
    features: [
      'Performance web optimisée (95+ Lighthouse)',
      'SEO avancé avec métadonnées dynamiques',
      'CMS headless pour la gestion de contenu',
      'Animations fluides avec Framer Motion',
      'Blog intégré avec recherche',
      'Formulaires de contact avancés',
      'Mode sombre automatique'
    ],
    liveUrl: 'https://corporate.example.com',
    githubUrl: 'https://github.com/exemple/corporate-website',
    status: 'Terminé',
    date: '2023',
    client: 'Cabinet de Conseil',
    duration: '3 mois'
  },
  {
    id: 6,
    title: 'Plateforme IoT',
    category: 'Python & React',
    description: 'Solution IoT pour la surveillance d\'équipements industriels.',
    longDescription: 'Plateforme complète IoT développée avec Python (Django) pour le backend et React pour le frontend, permettant la surveillance en temps réel d\'équipements industriels. La solution inclut la collecte de données de capteurs, l\'analyse prédictive, les alertes automatiques, et des tableaux de bord personnalisables.',
    image: 'https://placehold.co/600x400/f59e0b/ffffff?text=IoT+Platform',
    gallery: [
      'https://placehold.co/800x600/f59e0b/ffffff?text=IoT+Dashboard',
      'https://placehold.co/800x600/ef4444/ffffff?text=Sensor+Data',
      'https://placehold.co/800x600/8b5cf6/ffffff?text=Alerts'
    ],
    technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'MQTT', 'Docker', 'AWS IoT'],
    features: [
      'Collecte de données en temps réel',
      'Analyse prédictive avec ML',
      'Alertes et notifications automatiques',
      'Tableaux de bord personnalisables',
      'API REST pour intégrations',
      'Sécurité industrielle renforcée',
      'Scalabilité cloud'
    ],
    liveUrl: 'https://iot.example.com',
    githubUrl: 'https://github.com/exemple/iot-platform',
    status: 'En cours',
    date: '2024',
    client: 'Industrie 4.0',
    duration: '12 mois'
  }
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === parseInt(id));
};

export const getProjectsByCategory = (category) => {
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = (limit = 4) => {
  return projects.slice(0, limit);
};