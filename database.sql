-- =============================================
-- Base de données Portfolio Développeur - MySQL
-- Version : Prête pour production
-- Compatibilité : MySQL 5.7+ / MySQL 8.0+
-- =============================================

-- Création de la base de données
DROP DATABASE IF EXISTS portfolio_dev;
CREATE DATABASE portfolio_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_dev;

-- =============================================
-- TABLES UTILISATEURS
-- =============================================

-- Table des utilisateurs
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    avatar VARCHAR(500),
    role ENUM('admin', 'user') DEFAULT 'user',
    join_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des profils utilisateur
CREATE TABLE user_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    bio TEXT,
    phone VARCHAR(20),
    location VARCHAR(100),
    website VARCHAR(255),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    twitter VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================
-- TABLES PROJETS
-- =============================================

-- Table des projets
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    image VARCHAR(500),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    status ENUM('Terminé', 'En cours', 'En pause') DEFAULT 'En cours',
    date_completed YEAR,
    client VARCHAR(100),
    duration VARCHAR(50),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des technologies utilisées dans les projets
CREATE TABLE technologies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(50),
    color VARCHAR(7),
    icon VARCHAR(100)
);

-- Table de liaison projets-technologies
CREATE TABLE project_technologies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    technology_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_tech (project_id, technology_id)
);

-- Table des fonctionnalités des projets
CREATE TABLE project_features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    feature_text TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Table de la galerie des projets
CREATE TABLE project_gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- =============================================
-- TABLES FORMATIONS
-- =============================================

-- Table des formations
CREATE TABLE formations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(50),
    level ENUM('Débutant', 'Intermédiaire', 'Avancé') NOT NULL,
    color VARCHAR(100),
    icon VARCHAR(10),
    total_exercises INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des exercices
CREATE TABLE exercises (
    id INT PRIMARY KEY AUTO_INCREMENT,
    formation_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT,
    difficulty ENUM('Facile', 'Moyen', 'Difficile') DEFAULT 'Facile',
    estimated_time VARCHAR(50),
    type ENUM('Pratique', 'Projet', 'Théorie') DEFAULT 'Pratique',
    status ENUM('available', 'locked', 'completed') DEFAULT 'locked',
    code_template TEXT,
    solution TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_formation_slug (formation_id, slug)
);

-- Table des ressources d'exercices
CREATE TABLE exercise_resources (
    id INT PRIMARY KEY AUTO_INCREMENT,
    exercise_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- Table des inscriptions aux formations
CREATE TABLE user_enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    formation_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_formation (user_id, formation_id)
);

-- Table de progression des exercices
CREATE TABLE user_exercise_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    exercise_id INT NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    completed_at TIMESTAMP NULL,
    code_submission TEXT,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_exercise (user_id, exercise_id)
);

-- =============================================
-- TABLES CONTACT
-- =============================================

-- Table des messages de contact
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(100),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    budget ENUM('1k-5k', '5k-10k', '10k-25k', '25k+'),
    timeline ENUM('asap', '1month', '3months', 'flexible'),
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    replied_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INSERTION DES DONNÉES
-- =============================================

-- Insertion des utilisateurs
INSERT INTO users (name, email, avatar, role, join_date) VALUES
('Admin Portfolio', 'admin@monportfolio.dev', 'https://placehold.co/100x100/6366f1/ffffff?text=AP', 'admin', '2024-01-01'),
('Jean Dupont', 'jean.dupont@email.com', 'https://placehold.co/100x100/6366f1/ffffff?text=JD', 'user', '2024-01-15'),
('Marie Martin', 'marie.martin@email.com', 'https://placehold.co/100x100/ec4899/ffffff?text=MM', 'user', '2024-02-01'),
('Pierre Dubois', 'pierre.dubois@email.com', 'https://placehold.co/100x100/10b981/ffffff?text=PD', 'user', '2024-02-15');

-- Insertion des profils utilisateur
INSERT INTO user_profiles (user_id, bio, phone, location, github, linkedin) VALUES
(1, 'Développeur full-stack passionné avec 5+ années d''expérience', '+33 1 23 45 67 89', 'Paris, France', 'https://github.com/admin', 'https://linkedin.com/in/admin'),
(2, 'Étudiant en développement web', '+33 6 12 34 56 78', 'Lyon, France', 'https://github.com/jeandupont', 'https://linkedin.com/in/jeandupont');

-- Insertion des technologies
INSERT INTO technologies (name, category, color, icon) VALUES
('React', 'Frontend', '#61dafb', '⚛️'),
('Node.js', 'Backend', '#339933', '🟢'),
('Express', 'Backend', '#000000', '🚀'),
('MongoDB', 'Database', '#47A248', '🍃'),
('PostgreSQL', 'Database', '#336791', '🐘'),
('TypeScript', 'Language', '#3178c6', '📘'),
('JavaScript', 'Language', '#f7df1e', '⚡'),
('Python', 'Language', '#3776ab', '🐍'),
('Vue.js', 'Frontend', '#4FC08D', '💚'),
('Angular', 'Frontend', '#DD0031', '🔺'),
('Django', 'Backend', '#092E20', '🎯'),
('Flask', 'Backend', '#000000', '🌶️'),
('Docker', 'DevOps', '#2496ED', '🐳'),
('AWS', 'Cloud', '#FF9900', '☁️'),
('Firebase', 'Backend', '#FFCA28', '🔥'),
('Tailwind CSS', 'CSS', '#06B6D4', '🎨'),
('Sass', 'CSS', '#CC6699', '💄'),
('Webpack', 'Build', '#8DD6F9', '📦'),
('Vite', 'Build', '#646CFF', '⚡'),
('Jest', 'Testing', '#C21325', '🧪'),
('Cypress', 'Testing', '#17202C', '🔍'),
('Git', 'Version Control', '#F05032', '🌿'),
('GitHub', 'Platform', '#181717', '🐙'),
('Vercel', 'Deployment', '#000000', '▲'),
('Netlify', 'Deployment', '#00C7B7', '🌐');

-- Insertion des projets
INSERT INTO projects (title, slug, category, description, long_description, image, live_url, github_url, status, date_completed, client, duration, featured) VALUES
('Plateforme E-commerce', 'plateforme-ecommerce', 'React & Node.js', 'Application de commerce en ligne avec paiement intégré et tableau de bord admin.', 'Une plateforme e-commerce complète développée avec React et Node.js, intégrant un système de paiement sécurisé avec Stripe, un tableau de bord administrateur pour la gestion des produits et commandes, et une API REST robuste. L''application inclut également un système d''authentification JWT, la gestion d''inventaire en temps réel, et des notifications push.', 'https://placehold.co/600x400/6366f1/ffffff?text=E-commerce', 'https://example.com', 'https://github.com/exemple/ecommerce', 'Terminé', 2024, 'Startup Tech', '6 mois', TRUE),

('API de Gestion', 'api-gestion', 'Backend', 'API REST robuste avec authentification JWT et documentation Swagger.', 'API complète pour la gestion d''entreprise développée avec Node.js et Express, incluant un système d''authentification avancé, la gestion des rôles et permissions, et une documentation automatique avec Swagger. L''API gère les utilisateurs, les projets, les tâches et génère des rapports détaillés.', 'https://placehold.co/600x400/ec4899/ffffff?text=API+Management', 'https://api.example.com/docs', 'https://github.com/exemple/management-api', 'Terminé', 2024, 'Entreprise PME', '4 mois', TRUE),

('App Mobile Finance', 'app-mobile-finance', 'React Native', 'Application mobile de gestion financière avec synchronisation cloud.', 'Application mobile cross-platform développée avec React Native pour la gestion des finances personnelles. Elle inclut la synchronisation cloud, des graphiques interactifs, la catégorisation automatique des transactions, et des notifications de budget. L''app est connectée à une API backend sécurisée.', 'https://placehold.co/600x400/8b5cf6/ffffff?text=Finance+App', 'https://apps.apple.com/app/finance-example', 'https://github.com/exemple/finance-app', 'En cours', 2024, 'Projet personnel', '8 mois', TRUE),

('Dashboard Analytics', 'dashboard-analytics', 'Vue.js', 'Tableau de bord interactif avec visualisation de données en temps réel.', 'Dashboard avancé développé avec Vue.js 3 et TypeScript, offrant des visualisations de données en temps réel avec des graphiques interactifs. Le tableau de bord se connecte à plusieurs sources de données via des APIs et propose des filtres avancés, des exports, et un système de rapports personnalisables.', 'https://placehold.co/600x400/06b6d4/ffffff?text=Analytics+Dashboard', 'https://dashboard.example.com', 'https://github.com/exemple/analytics-dashboard', 'Terminé', 2023, 'Agence Marketing', '5 mois', TRUE),

('Site Web Corporate', 'site-web-corporate', 'Next.js', 'Site web d''entreprise avec CMS headless et optimisation SEO.', 'Site web corporate moderne développé avec Next.js et intégrant un CMS headless (Strapi) pour la gestion de contenu. Le site est entièrement optimisé pour le SEO avec génération statique, lazy loading, et performances web optimales. Il inclut un blog, une section portfolio, et un système de contact.', 'https://placehold.co/600x400/10b981/ffffff?text=Corporate+Website', 'https://corporate.example.com', 'https://github.com/exemple/corporate-website', 'Terminé', 2023, 'Cabinet de Conseil', '3 mois', FALSE),

('Plateforme IoT', 'plateforme-iot', 'Python & React', 'Solution IoT pour la surveillance d''équipements industriels.', 'Plateforme complète IoT développée avec Python (Django) pour le backend et React pour le frontend, permettant la surveillance en temps réel d''équipements industriels. La solution inclut la collecte de données de capteurs, l''analyse prédictive, les alertes automatiques, et des tableaux de bord personnalisables.', 'https://placehold.co/600x400/f59e0b/ffffff?text=IoT+Platform', 'https://iot.example.com', 'https://github.com/exemple/iot-platform', 'En cours', 2024, 'Industrie 4.0', '12 mois', FALSE);

-- Association des technologies aux projets
INSERT INTO project_technologies (project_id, technology_id) VALUES
-- Projet E-commerce
(1, 1), (1, 2), (1, 3), (1, 4), (1, 7), (1, 13), (1, 22),
-- API de Gestion
(2, 2), (2, 3), (2, 5), (2, 6), (2, 13), (2, 20),
-- App Mobile Finance
(3, 1), (3, 15), (3, 7), (3, 13),
-- Dashboard Analytics
(4, 9), (4, 6), (4, 16), (4, 19),
-- Site Corporate
(5, 1), (5, 6), (5, 16), (5, 24),
-- Plateforme IoT
(6, 8), (6, 11), (6, 1), (6, 5), (6, 13), (6, 14);

-- Insertion des fonctionnalités des projets
INSERT INTO project_features (project_id, feature_text, display_order) VALUES
-- E-commerce
(1, 'Interface utilisateur moderne et responsive', 1),
(1, 'Système de paiement sécurisé avec Stripe', 2),
(1, 'Tableau de bord administrateur', 3),
(1, 'Gestion d''inventaire en temps réel', 4),
(1, 'Notifications push', 5),
(1, 'API REST documentée', 6),
(1, 'Tests unitaires et d''intégration', 7),

-- API de Gestion
(2, 'Authentification JWT sécurisée', 1),
(2, 'Gestion des rôles et permissions', 2),
(2, 'Documentation Swagger automatique', 3),
(2, 'Rate limiting et sécurité avancée', 4),
(2, 'Tests automatisés avec Jest', 5),
(2, 'Déploiement Docker', 6),
(2, 'Monitoring et logs', 7);

-- Galerie des projets
INSERT INTO project_gallery (project_id, image_url, alt_text, display_order) VALUES
-- E-commerce
(1, 'https://placehold.co/800x600/6366f1/ffffff?text=Homepage', 'Page d''accueil e-commerce', 1),
(1, 'https://placehold.co/800x600/8b5cf6/ffffff?text=Product+Page', 'Page produit', 2),
(1, 'https://placehold.co/800x600/06b6d4/ffffff?text=Cart', 'Panier d''achat', 3),
(1, 'https://placehold.co/800x600/10b981/ffffff?text=Admin+Dashboard', 'Dashboard admin', 4),

-- API de Gestion
(2, 'https://placehold.co/800x600/ec4899/ffffff?text=API+Documentation', 'Documentation API', 1),
(2, 'https://placehold.co/800x600/f59e0b/ffffff?text=Dashboard', 'Dashboard', 2),
(2, 'https://placehold.co/800x600/ef4444/ffffff?text=Analytics', 'Analytics', 3);

-- Insertion des formations
INSERT INTO formations (title, slug, description, duration, level, color, icon, total_exercises, is_active) VALUES
('HTML/CSS Fondamentaux', 'html-css-fondamentaux', 'Apprenez les bases du développement web avec HTML et CSS', '6 semaines', 'Débutant', 'from-orange-500 to-red-500', '🌐', 12, TRUE),
('JavaScript Moderne', 'javascript-moderne', 'Maîtrisez JavaScript ES6+ et les concepts avancés', '8 semaines', 'Intermédiaire', 'from-yellow-500 to-orange-500', '⚡', 15, TRUE),
('React Développement', 'react-developpement', 'Créez des applications web modernes avec React', '10 semaines', 'Avancé', 'from-blue-500 to-cyan-500', '⚛️', 20, TRUE),
('Node.js Backend', 'nodejs-backend', 'Développez des APIs robustes avec Node.js', '8 semaines', 'Intermédiaire', 'from-green-500 to-emerald-500', '🚀', 18, TRUE);

-- Insertion des exercices
INSERT INTO exercises (formation_id, title, slug, description, instructions, difficulty, estimated_time, type, status, code_template, display_order) VALUES
-- HTML/CSS Exercices
(1, 'Structure HTML de base', 'structure-html-base', 'Créez votre première page HTML avec les éléments essentiels', '# Structure HTML de base\n\n## Objectif\nCréer une page HTML complète avec la structure de base et les éléments essentiels.\n\n## Instructions\n1. Créez un fichier `index.html`\n2. Ajoutez la déclaration DOCTYPE HTML5\n3. Structurez votre page avec les balises `<html>`, `<head>`, et `<body>`\n4. Dans le `<head>`, ajoutez :\n   - Un titre pour la page\n   - L''encodage de caractères UTF-8\n   - Une description meta\n5. Dans le `<body>`, créez :\n   - Un en-tête `<h1>` avec votre nom\n   - Un paragraphe de présentation\n   - Une liste de vos hobbies', 'Facile', '30 min', 'Pratique', 'available', '<!DOCTYPE html>\n<html lang="fr">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title><!-- Votre titre ici --></title>\n</head>\n<body>\n    <!-- Votre contenu ici -->\n</body>\n</html>', 1),

(1, 'Styles CSS de base', 'styles-css-base', 'Appliquez vos premiers styles CSS pour améliorer l''apparence', '# Styles CSS de base\n\n## Objectif\nAppliquer des styles CSS pour améliorer l''apparence de votre page HTML.\n\n## Instructions\n1. Créez un fichier `styles.css`\n2. Liez le CSS à votre HTML\n3. Stylisez les éléments', 'Facile', '45 min', 'Pratique', 'locked', '/* styles.css */\nbody {\n    /* Vos styles ici */\n}\n\nh1 {\n    /* Styles pour le titre */\n}\n\n/* Ajoutez d''autres sélecteurs */', 2),

(1, 'Mise en page Flexbox', 'mise-en-page-flexbox', 'Utilisez Flexbox pour créer des mises en page flexibles', '# Mise en page Flexbox\n\n## Objectif\nMaîtriser les bases de Flexbox pour créer des mises en page modernes.', 'Moyen', '60 min', 'Pratique', 'locked', '/* Flexbox Template */\n.header {\n    display: flex;\n    /* Ajoutez vos propriétés */\n}\n\n.main {\n    display: flex;\n    /* Configuration flex */\n}\n\n.footer {\n    /* Footer sticky */\n}', 3),

-- JavaScript Exercices
(2, 'Variables et Types de données', 'variables-types-donnees', 'Découvrez les variables et types de données en JavaScript', '# Variables et Types de données\n\n## Objectif\nComprendre les variables, const, let et les différents types de données JavaScript.', 'Facile', '40 min', 'Pratique', 'available', '// Variables et types\nlet nom = '''';\nconst age = 0;\nvar isStudent = true;\n\n// Votre code ici\n\nfunction afficherPersonne(nom, age) {\n    // Implémentez la fonction\n}\n\n// Tests\nconsole.log(typeof nom);', 1),

(2, 'Fonctions et Scope', 'fonctions-scope', 'Maîtrisez les fonctions JavaScript et la portée des variables', '# Fonctions et Scope\n\n## Objectif\nComprendre les fonctions, les paramètres, le retour de valeurs et la portée.', 'Moyen', '50 min', 'Pratique', 'locked', '// Déclaration de fonction\nfunction addition(a, b) {\n    return a + b;\n}\n\n// Expression de fonction\nconst soustraction = function(a, b) {\n    // Votre code\n};\n\n// Fonction fléchée\nconst multiplication = (a, b) => {\n    // Votre code\n};', 2),

-- React Exercices
(3, 'Premier Composant React', 'premier-composant-react', 'Créez votre premier composant React fonctionnel', '# Premier Composant React\n\n## Objectif\nCréer et comprendre les composants React de base avec JSX.', 'Moyen', '45 min', 'Projet', 'available', 'import React from ''react'';\n\nfunction Profil({ nom, prenom, description, competences, photo }) {\n    return (\n        <div className="profil">\n            {/* Votre JSX ici */}\n        </div>\n    );\n}\n\nexport default Profil;', 1);

-- Ressources des exercices
INSERT INTO exercise_resources (exercise_id, title, url, display_order) VALUES
(1, 'MDN HTML Basics', 'https://developer.mozilla.org/en-US/docs/Web/HTML', 1),
(1, 'HTML5 Cheat Sheet', 'https://htmlcheatsheet.com/', 2),
(2, 'CSS Basics', 'https://developer.mozilla.org/en-US/docs/Web/CSS', 1),
(2, 'CSS Selectors', 'https://www.w3schools.com/css/css_selectors.asp', 2),
(3, 'Flexbox Guide', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', 1),
(3, 'Flexbox Froggy', 'https://flexboxfroggy.com/', 2);

-- Inscriptions aux formations
INSERT INTO user_enrollments (user_id, formation_id, progress_percentage) VALUES
(2, 1, 25.00), -- Jean Dupont inscrit à HTML/CSS
(2, 2, 13.33), -- Jean Dupont inscrit à JavaScript
(2, 3, 5.00),  -- Jean Dupont inscrit à React
(3, 1, 50.00), -- Marie Martin inscrite à HTML/CSS
(3, 2, 26.67); -- Marie Martin inscrite à JavaScript

-- Progression des exercices
INSERT INTO user_exercise_progress (user_id, exercise_id, status, completed_at) VALUES
(2, 1, 'completed', '2024-01-20 10:30:00'), -- Jean a terminé le premier exercice HTML
(2, 4, 'completed', '2024-02-01 14:15:00'), -- Jean a terminé le premier exercice JS
(3, 1, 'completed', '2024-02-05 09:45:00'), -- Marie a terminé le premier exercice HTML
(3, 2, 'completed', '2024-02-10 16:20:00'), -- Marie a terminé le second exercice HTML
(3, 3, 'in_progress', NULL),                 -- Marie travaille sur Flexbox
(3, 4, 'completed', '2024-02-15 11:30:00'); -- Marie a terminé le premier exercice JS

-- Messages de contact (exemples)
INSERT INTO contact_messages (name, email, company, subject, message, budget, timeline, status, created_at) VALUES
('Sophie Bernard', 'sophie.bernard@startup.com', 'TechStartup', 'Développement d''une MVP', 'Bonjour, nous cherchons un développeur pour créer notre MVP. Il s''agit d''une plateforme de mise en relation entre freelances et entreprises. Nous aurions besoin d''une expertise React/Node.js.', '10k-25k', '3months', 'new', '2024-01-10 09:15:00'),

('Marc Dubois', 'marc.dubois@entreprise.fr', 'Solutions Digitales', 'Refonte site web', 'Nous souhaitons refaire complètement notre site web corporate. Le site actuel est obsolète et nous voulons quelque chose de moderne et responsive.', '5k-10k', '1month', 'read', '2024-01-15 14:30:00'),

('Laura Petit', 'laura.petit@gmail.com', NULL, 'Formation React', 'Bonjour, je suis développeuse junior et j''aimerais me former à React. Proposez-vous des formations personnalisées ?', '1k-5k', 'flexible', 'replied', '2024-01-20 11:45:00'),

('Thomas Martin', 'thomas.martin@ecommerce.com', 'E-Shop Plus', 'API pour mobile app', 'Nous avons besoin de développer une API pour notre future application mobile e-commerce. L''API doit gérer les produits, commandes, utilisateurs et paiements.', '25k+', 'asap', 'new', '2024-01-25 16:20:00');

-- =============================================
-- INDEX ET OPTIMISATIONS
-- =============================================

-- Index pour les recherches fréquentes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_formations_level ON formations(level);
CREATE INDEX idx_exercises_formation ON exercises(formation_id);
CREATE INDEX idx_exercises_status ON exercises(status);
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_created ON contact_messages(created_at);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);

-- Index composites pour les jointures fréquentes
CREATE INDEX idx_user_enrollments_user_formation ON user_enrollments(user_id, formation_id);
CREATE INDEX idx_user_progress_user_exercise ON user_exercise_progress(user_id, exercise_id);
CREATE INDEX idx_project_tech_project ON project_technologies(project_id);

-- =============================================
-- VUES UTILES
-- =============================================

-- Vue des projets avec leurs technologies
CREATE VIEW project_details AS
SELECT 
    p.*,
    GROUP_CONCAT(t.name ORDER BY t.name SEPARATOR ', ') as technologies,
    COUNT(pf.id) as features_count,
    COUNT(pg.id) as gallery_images_count
FROM projects p
LEFT JOIN project_technologies pt ON p.id = pt.project_id
LEFT JOIN technologies t ON pt.technology_id = t.id
LEFT JOIN project_features pf ON p.id = pf.project_id
LEFT JOIN project_gallery pg ON p.id = pg.project_id
GROUP BY p.id;

-- Vue des formations avec progression
CREATE VIEW formation_stats AS
SELECT 
    f.*,
    COUNT(DISTINCT ue.user_id) as enrolled_users,
    COUNT(e.id) as exercises_count,
    COALESCE(AVG(ue.progress_percentage), 0) as avg_progress
FROM formations f
LEFT JOIN user_enrollments ue ON f.id = ue.formation_id
LEFT JOIN exercises e ON f.id = e.formation_id
GROUP BY f.id;

-- Vue des utilisateurs avec leurs statistiques
CREATE VIEW user_stats AS
SELECT 
    u.*,
    COUNT(DISTINCT ue.formation_id) as enrolled_formations,
    COUNT(DISTINCT uep.exercise_id) as exercises_attempted,
    COUNT(DISTINCT CASE WHEN uep.status = 'completed' THEN uep.exercise_id END) as completed_exercises,
    COALESCE(
        (COUNT(DISTINCT CASE WHEN uep.status = 'completed' THEN uep.exercise_id END) * 100.0) / 
        NULLIF(COUNT(DISTINCT uep.exercise_id), 0), 
        0
    ) as overall_progress
FROM users u
LEFT JOIN user_enrollments ue ON u.id = ue.user_id
LEFT JOIN user_exercise_progress uep ON u.id = uep.user_id
GROUP BY u.id;

-- =============================================
-- PROCÉDURES STOCKÉES
-- =============================================

DELIMITER //

-- Procédure pour mettre à jour la progression d'une formation
CREATE PROCEDURE UpdateFormationProgress(IN user_id_param INT, IN formation_id_param INT)
BEGIN
    DECLARE total_exercises INT;
    DECLARE completed_exercises INT;
    DECLARE progress_percent DECIMAL(5,2);
    
    -- Compter le total d'exercices dans la formation
    SELECT COUNT(*) INTO total_exercises 
    FROM exercises 
    WHERE formation_id = formation_id_param;
    
    -- Compter les exercices terminés par l'utilisateur
    SELECT COUNT(*) INTO completed_exercises
    FROM user_exercise_progress uep
    JOIN exercises e ON uep.exercise_id = e.id
    WHERE uep.user_id = user_id_param 
    AND e.formation_id = formation_id_param 
    AND uep.status = 'completed';
    
    -- Calculer le pourcentage
    IF total_exercises > 0 THEN
        SET progress_percent = (completed_exercises * 100.0) / total_exercises;
    ELSE
        SET progress_percent = 0;
    END IF;
    
    -- Mettre à jour la progression
    UPDATE user_enrollments 
    SET progress_percentage = progress_percent,
        completed_at = CASE WHEN progress_percent = 100 THEN NOW() ELSE completed_at END
    WHERE user_id = user_id_param AND formation_id = formation_id_param;
END //

DELIMITER ;

-- =============================================
-- TRIGGERS
-- =============================================

DELIMITER //

-- Trigger pour mettre à jour automatiquement la progression quand un exercice est terminé
CREATE TRIGGER update_progress_after_exercise_completion
    AFTER UPDATE ON user_exercise_progress
    FOR EACH ROW
BEGIN
    DECLARE formation_id_var INT;
    
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Récupérer l'ID de la formation
        SELECT formation_id INTO formation_id_var 
        FROM exercises 
        WHERE id = NEW.exercise_id;
        
        -- Mettre à jour la progression
        CALL UpdateFormationProgress(NEW.user_id, formation_id_var);
    END IF;
END //

-- Trigger pour mettre à jour le compteur d'exercices dans les formations
CREATE TRIGGER update_formation_exercise_count
    AFTER INSERT ON exercises
    FOR EACH ROW
BEGIN
    UPDATE formations 
    SET total_exercises = (
        SELECT COUNT(*) 
        FROM exercises 
        WHERE formation_id = NEW.formation_id
    ) 
    WHERE id = NEW.formation_id;
END //

DELIMITER ;

-- =============================================
-- DONNÉES DE TEST SUPPLÉMENTAIRES
-- =============================================

-- Messages de contact supplémentaires pour tester les statistiques
INSERT INTO contact_messages (name, email, subject, message, status, created_at) VALUES
('Alice Moreau', 'alice.moreau@test.com', 'Question sur les tarifs', 'Bonjour, pourriez-vous m''envoyer un devis pour un site vitrine ?', 'read', '2024-02-01 10:00:00'),
('Bob Wilson', 'bob.wilson@test.com', 'Collaboration', 'Intéressé par une collaboration long terme', 'replied', '2024-02-02 15:30:00'),
('Claire Leroy', 'claire.leroy@test.com', 'Formation équipe', 'Formation React pour notre équipe de 5 développeurs', 'new', '2024-02-03 09:15:00');

-- Finalisation
COMMIT;

-- =============================================
-- REQUÊTES UTILES POUR TESTER
-- =============================================

-- Affichage des statistiques finales
SELECT 'Base de données créée avec succès!' as Status;
SELECT COUNT(*) as 'Nombre d''utilisateurs' FROM users;
SELECT COUNT(*) as 'Nombre de projets' FROM projects;
SELECT COUNT(*) as 'Nombre de formations' FROM formations;
SELECT COUNT(*) as 'Nombre d''exercices' FROM exercises;
SELECT COUNT(*) as 'Nombre de messages de contact' FROM contact_messages;
SELECT COUNT(*) as 'Nombre de technologies' FROM technologies;

-- =============================================
-- REQUÊTES D'EXEMPLE POUR L'APPLICATION
-- =============================================

-- Récupérer tous les projets avec leurs technologies
-- SELECT * FROM project_details ORDER BY featured DESC, created_at DESC;

-- Récupérer les formations avec leurs statistiques
-- SELECT * FROM formation_stats WHERE is_active = TRUE ORDER BY level, title;

-- Récupérer la progression d'un utilisateur
-- SELECT * FROM user_stats WHERE id = 2;

-- Récupérer les projets d'une catégorie spécifique
-- SELECT * FROM projects WHERE category LIKE '%React%' AND status = 'Terminé';

-- Récupérer les exercices d'une formation avec progression utilisateur
/*
SELECT 
    e.*,
    COALESCE(uep.status, 'not_started') as user_status,
    uep.completed_at as user_completed_at
FROM exercises e
LEFT JOIN user_exercise_progress uep ON e.id = uep.exercise_id AND uep.user_id = 2
WHERE e.formation_id = 1
ORDER BY e.display_order;
*/

-- Récupérer les messages de contact récents
-- SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 10;

-- Statistiques du tableau de bord admin
/*
SELECT 
    (SELECT COUNT(*) FROM users WHERE is_active = TRUE) as active_users,
    (SELECT COUNT(*) FROM projects WHERE featured = TRUE) as featured_projects,
    (SELECT COUNT(*) FROM formations WHERE is_active = TRUE) as active_formations,
    (SELECT COUNT(*) FROM contact_messages WHERE status = 'new') as new_messages;
*/