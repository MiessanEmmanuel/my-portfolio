

-- Table des utilisateurs
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(500) NULL,
    bio TEXT NULL,
    role ENUM('user', 'instructor', 'admin') DEFAULT 'user',
    is_premium BOOLEAN DEFAULT FALSE,
    github_username VARCHAR(100) NULL,
    twitter_username VARCHAR(100) NULL,
    website_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des catégories de formations
CREATE TABLE formation_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NULL,
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50) NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des instructeurs
CREATE TABLE instructors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    specialties JSON NULL, -- ["React", "Laravel", "JavaScript"]
    experience_years INT DEFAULT 0,
    formations_count INT DEFAULT 0,
    students_count INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    bio_long TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des formations
CREATE TABLE formations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NULL,
    image VARCHAR(500) NULL,
    trailer_video_url VARCHAR(500) NULL,
    category_id INT NOT NULL,
    instructor_id INT NOT NULL,
    level ENUM('Débutant', 'Intermédiaire', 'Avancé', 'Expert') NOT NULL,
    duration_total_minutes INT DEFAULT 0, -- Durée totale en minutes
    price DECIMAL(8,2) DEFAULT 0.00,
    discount_price DECIMAL(8,2) NULL,
    is_free BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    difficulty_score INT DEFAULT 1, -- 1-10
    rating DECIMAL(3,2) DEFAULT 0.00,
    students_count INT DEFAULT 0,
    reviews_count INT DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0.00,
    requirements JSON NULL, -- ["JavaScript ES6+", "Node.js"]
    objectives JSON NULL, -- ["Maîtriser React", "Créer des apps"]
    technologies JSON NULL, -- ["React", "Redux", "Next.js"]
    has_certificate BOOLEAN DEFAULT TRUE,
    certificate_template_url VARCHAR(500) NULL,
    featured_at TIMESTAMP NULL,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES formation_categories(id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id),
    INDEX idx_formations_category (category_id),
    INDEX idx_formations_instructor (instructor_id),
    INDEX idx_formations_status (status),
    INDEX idx_formations_published (published_at),
    INDEX idx_formations_featured (featured_at)
);

-- Table des chapitres/modules
CREATE TABLE formation_chapters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    formation_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    sort_order INT DEFAULT 0,
    duration_minutes INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
    INDEX idx_chapters_formation (formation_id)
);

-- Table des leçons
CREATE TABLE formation_lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    formation_id INT NOT NULL,
    chapter_id INT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NULL,
    long_description TEXT NULL, -- Contenu HTML riche pour les leçons
    content TEXT NULL, -- Contenu markdown pour les leçons texte
    type ENUM('video', 'text', 'exercise', 'quiz', 'live') DEFAULT 'video',
    video_url VARCHAR(500) NULL,
    video_duration_seconds INT NULL,
    video_quality ENUM('720p', '1080p', '4k') DEFAULT '1080p',
    exercise_url VARCHAR(500) NULL, -- URL de l'exercice principal
    exercise_github_url VARCHAR(500) NULL,
    exercise_sandbox_url VARCHAR(500) NULL,
    resources JSON NULL, -- [{"title": "Slides", "url": "...", "type": "pdf"}]
    sort_order INT DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    difficulty INT DEFAULT 1, -- 1-5
    estimated_time_minutes INT DEFAULT 0,
    transcription TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES formation_chapters(id) ON DELETE SET NULL,
    INDEX idx_lessons_formation (formation_id),
    INDEX idx_lessons_chapter (chapter_id),
    INDEX idx_lessons_type (type),
    UNIQUE KEY unique_lesson_slug (formation_id, slug)
);

-- Table des inscriptions des utilisateurs
CREATE TABLE formation_enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    formation_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    last_accessed_at TIMESTAMP NULL,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    time_spent_seconds INT DEFAULT 0,
    current_lesson_id INT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completion_rate DECIMAL(5,2) DEFAULT 0.00,
    certificate_issued_at TIMESTAMP NULL,
    certificate_url VARCHAR(500) NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
    FOREIGN KEY (current_lesson_id) REFERENCES formation_lessons(id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_formation (user_id, formation_id),
    INDEX idx_enrollments_user (user_id),
    INDEX idx_enrollments_formation (formation_id),
    INDEX idx_enrollments_progress (progress_percentage)
);

-- Table du progrès des leçons
CREATE TABLE lesson_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    enrollment_id INT NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    last_position_seconds INT DEFAULT 0, -- Position de la vidéo
    watch_time_seconds INT DEFAULT 0,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    is_completed BOOLEAN DEFAULT FALSE,
    notes TEXT NULL,
    bookmarks JSON NULL, -- [{"time": 120, "note": "Important point"}]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES formation_lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (enrollment_id) REFERENCES formation_enrollments(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_lesson (user_id, lesson_id),
    INDEX idx_lesson_progress_user (user_id),
    INDEX idx_lesson_progress_lesson (lesson_id)
);

-- Table des quiz
CREATE TABLE formation_quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    questions JSON NOT NULL, -- Questions et réponses
    passing_score INT DEFAULT 70,
    max_attempts INT DEFAULT 3,
    time_limit_minutes INT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES formation_lessons(id) ON DELETE CASCADE
);

-- Table des tentatives de quiz
CREATE TABLE quiz_attempts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    answers JSON NOT NULL, -- Réponses de l'utilisateur
    score INT NOT NULL,
    passed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_taken_seconds INT NULL,
    attempt_number INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES formation_quizzes(id) ON DELETE CASCADE,
    INDEX idx_quiz_attempts_user (user_id),
    INDEX idx_quiz_attempts_quiz (quiz_id)
);

-- Table des avis/évaluations
CREATE TABLE formation_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    formation_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255) NULL,
    comment TEXT NULL,
    pros JSON NULL, -- Points positifs
    cons JSON NULL, -- Points négatifs
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_formation_review (user_id, formation_id),
    INDEX idx_reviews_formation (formation_id),
    INDEX idx_reviews_rating (rating)
);

-- Table des commentaires sur les leçons
CREATE TABLE lesson_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    parent_id INT NULL, -- Pour les réponses
    content TEXT NOT NULL,
    video_timestamp INT NULL, -- Timestamp de la vidéo
    is_question BOOLEAN DEFAULT FALSE,
    is_resolved BOOLEAN DEFAULT FALSE,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES formation_lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES lesson_comments(id) ON DELETE CASCADE,
    INDEX idx_comments_lesson (lesson_id),
    INDEX idx_comments_user (user_id),
    INDEX idx_comments_parent (parent_id)
);

-- Table des likes sur les commentaires
CREATE TABLE comment_likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES lesson_comments(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_comment_like (user_id, comment_id)
);

-- Table des certificats
CREATE TABLE certificates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    formation_id INT NOT NULL,
    enrollment_id INT NOT NULL,
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade VARCHAR(10) NULL, -- A+, A, B+, B, C
    final_score DECIMAL(5,2) NULL,
    certificate_url VARCHAR(500) NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    metadata JSON NULL, -- Informations supplémentaires
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
    FOREIGN KEY (enrollment_id) REFERENCES formation_enrollments(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_formation_certificate (user_id, formation_id),
    INDEX idx_certificates_user (user_id),
    INDEX idx_certificates_formation (formation_id)
);

-- Table des objectifs/achievements
CREATE TABLE user_achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    achievement_type ENUM('first_formation', 'streak_7', 'streak_30', 'fast_learner', 'quiz_master', 'certificate_earned', 'review_writer') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    icon VARCHAR(100) NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSON NULL, -- Données spécifiques à l'achievement
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_achievements_user (user_id),
    INDEX idx_achievements_type (achievement_type)
);

-- Table des sessions d'apprentissage
CREATE TABLE learning_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    formation_id INT NULL,
    lesson_id INT NULL,
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end TIMESTAMP NULL,
    duration_seconds INT NULL,
    activities_count INT DEFAULT 0,
    progress_made DECIMAL(5,2) DEFAULT 0.00,
    device_info JSON NULL, -- Informations sur l'appareil
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE SET NULL,
    FOREIGN KEY (lesson_id) REFERENCES formation_lessons(id) ON DELETE SET NULL,
    INDEX idx_sessions_user (user_id),
    INDEX idx_sessions_date (session_start)
);

-- Table des favoris
CREATE TABLE user_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    formation_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_favorite (user_id, formation_id)
);

-- Table des notifications
CREATE TABLE user_notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('new_lesson', 'formation_update', 'certificate_ready', 'reminder', 'achievement') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url VARCHAR(500) NULL,
    is_read BOOLEAN DEFAULT FALSE,
    metadata JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notifications_user (user_id),
    INDEX idx_notifications_read (is_read),
    INDEX idx_notifications_created (created_at)
);

-- Insertion des données d'exemple

-- Catégories
INSERT INTO formation_categories (name, slug, description, color, sort_order) VALUES
('Frontend', 'frontend', 'Développement côté client avec React, Vue.js, Angular...', '#3B82F6', 1),
('Backend', 'backend', 'Développement serveur avec Laravel, Node.js, Python...', '#10B981', 2),
('DevOps', 'devops', 'Déploiement, CI/CD, Docker, Kubernetes...', '#F59E0B', 3),
('JavaScript', 'javascript', 'Le langage JavaScript et son écosystème', '#EF4444', 4),
('Mobile', 'mobile', 'Développement d\'applications mobiles', '#8B5CF6', 5),
('Base de données', 'database', 'MySQL, PostgreSQL, MongoDB...', '#06B6D4', 6);

-- Utilisateurs
INSERT INTO users (name, email, password, avatar, bio, role, github_username, twitter_username, website_url) VALUES
('Jonathan Boyer', 'jonathan@grafikart.fr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', 'Développeur Full-Stack avec 10 ans d\'expérience, créateur de Grafikart', 'instructor', 'Grafikart', 'grafikart_fr', 'https://grafikart.fr'),
('Marie Dubois', 'marie@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100', 'Expert Vue.js et formateur passionné', 'instructor', 'mariedubois', 'marie_dev', NULL),
('Pierre Martin', 'pierre@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', 'DevOps Engineer et consultant en conteneurisation', 'instructor', 'pierremartin', 'pierre_devops', NULL),
('Étudiant Test', 'etudiant@test.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, NULL, 'user', NULL, NULL, NULL);

-- Instructeurs
INSERT INTO instructors (user_id, specialties, experience_years, formations_count, students_count, rating, bio_long) VALUES
(1, '["React", "Laravel", "JavaScript", "PHP"]', 10, 25, 15000, 4.9, 'Passionné par le développement web depuis plus de 10 ans, j\'ai créé Grafikart pour partager mes connaissances et aider la communauté francophone à progresser.'),
(2, '["Vue.js", "TypeScript", "CSS", "UX/UI"]', 6, 8, 4200, 4.8, 'Spécialisée en développement frontend moderne, je me concentre sur Vue.js et les meilleures pratiques de développement.'),
(3, '["Docker", "Kubernetes", "AWS", "CI/CD"]', 8, 12, 3800, 4.7, 'Expert en DevOps et conteneurisation, j\'aide les équipes à optimiser leurs workflows de déploiement.');

-- Formations
INSERT INTO formations (title, slug, description, long_description, image, category_id, instructor_id, level, duration_total_minutes, price, is_free, status, requirements, objectives, technologies, published_at) VALUES
('Maîtriser React.js de A à Z', 'maitriser-react-js', 'Apprenez React.js depuis les bases jusqu\'aux concepts avancés avec des projets pratiques', 'Cette formation complète vous permettra de maîtriser React.js, l\'une des bibliothèques JavaScript les plus populaires. Vous apprendrez les hooks, le state management, les tests, et bien plus encore.', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 1, 1, 'Intermédiaire', 750, 79.00, FALSE, 'published', '["JavaScript ES6+", "HTML/CSS", "VS Code"]', '["Maîtriser React", "Créer des apps performantes", "Utiliser les hooks", "Implémenter des tests"]', '["React", "JavaScript", "Redux", "Next.js"]', NOW()),
('Laravel 11 - Développement moderne', 'laravel-11-developpement-moderne', 'Créez des applications web robustes avec Laravel 11 et découvrez les dernières fonctionnalités', 'Formation complète sur Laravel 11 couvrant l\'architecture MVC, l\'ORM Eloquent, l\'authentification, les APIs REST, et le déploiement moderne.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop', 2, 1, 'Avancé', 1125, 129.00, FALSE, 'published', '["PHP", "Base de données", "Composer"]', '["Maîtriser Laravel", "Créer des APIs", "Authentification", "Optimisation"]', '["Laravel", "PHP", "MySQL", "Docker"]', NOW()),
('Vue.js 3 Composition API', 'vue-js-3-composition-api', 'Découvrez Vue.js 3 et sa nouvelle Composition API pour créer des applications modernes', 'Apprenez Vue.js 3 avec la Composition API, TypeScript, Pinia pour le state management, et les meilleures pratiques de développement.', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop', 1, 2, 'Intermédiaire', 615, 0.00, TRUE, 'published', '["JavaScript ES6+", "Développement web", "Node.js"]', '["Maîtriser Vue.js 3", "Composition API", "TypeScript", "Pinia"]', '["Vue.js", "TypeScript", "Pinia", "Vite"]', NOW()),
('Docker pour les développeurs', 'docker-pour-developpeurs', 'Maîtrisez Docker et Docker Compose pour optimiser votre workflow de développement', 'Formation pratique sur Docker et la conteneurisation, de l\'installation aux déploiements en production.', 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop', 3, 3, 'Débutant', 500, 59.00, FALSE, 'published', '["Ligne de commande", "Développement web"]', '["Comprendre Docker", "Gérer des conteneurs", "Docker Compose", "Déploiement"]', '["Docker", "Docker Compose", "Kubernetes", "CI/CD"]', NOW());

-- Chapitres
INSERT INTO formation_chapters (formation_id, title, description, sort_order, duration_minutes) VALUES
(1, 'Introduction à React', 'Découverte des concepts fondamentaux', 1, 180),
(1, 'Composants et JSX', 'Création de composants réutilisables', 2, 240),
(1, 'State et hooks', 'Gestion de l\'état avec les hooks', 3, 210),
(1, 'Projet pratique', 'Application complète avec React', 4, 120);

-- Leçons
INSERT INTO formation_lessons (formation_id, chapter_id, title, slug, description, long_description, type, video_url, video_duration_seconds, exercise_url, sort_order, is_free, estimated_time_minutes) VALUES
(1, 1, 'Introduction à React', 'introduction-react', 'Découverte de React et de son écosystème', 
'<h2>Bienvenue dans le monde de React !</h2>
<p>Dans cette première leçon, nous allons découvrir <strong>React.js</strong>, l''une des bibliothèques JavaScript les plus populaires pour créer des interfaces utilisateur.</p>
<h3>Ce que vous allez apprendre :</h3>
<ul>
<li>Les concepts fondamentaux de React</li>
<li>L''écosystème React et ses outils</li>
<li>Pourquoi choisir React pour vos projets</li>
</ul>
<div class="alert alert-info">
<strong>💡 Astuce :</strong> React utilise une approche déclarative qui rend votre code plus prévisible et plus facile à déboguer.
</div>', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 930, NULL, 1, TRUE, 15),

(1, 1, 'Installation et configuration', 'installation-configuration', 'Mise en place de l\'environnement de développement',
'<h2>Configuration de l''environnement React</h2>
<p>Apprenons à configurer un environnement de développement <strong>moderne</strong> pour React.</p>
<h3>Outils nécessaires :</h3>
<pre><code class="language-bash">
# Installation de Node.js et npm
npm install -g create-react-app

# Création d''un nouveau projet
npx create-react-app mon-app
cd mon-app
npm start
</code></pre>
<div class="alert alert-success">
<strong>✅ Conseil :</strong> Utilisez toujours la dernière version LTS de Node.js pour une meilleure stabilité.
</div>', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1200, NULL, 2, TRUE, 20),

(1, 2, 'JSX et les composants', 'jsx-composants', 'Apprendre à créer des composants avec JSX',
'<h2>JSX : La syntaxe magique de React</h2>
<p><strong>JSX</strong> permet d''écrire du HTML directement dans JavaScript. C''est plus puissant qu''il n''y paraît !</p>
<h3>Exemple de composant :</h3>
<pre><code class="language-jsx">
function MonComposant() {
  const nom = "React";
  return (
    &lt;div className="container"&gt;
      &lt;h1&gt;Bonjour {nom} !&lt;/h1&gt;
      &lt;p&gt;Bienvenue dans le monde des composants.&lt;/p&gt;
    &lt;/div&gt;
  );
}
</code></pre>
<div class="alert alert-warning">
<strong>⚠️ Attention :</strong> Utilisez <code>className</code> au lieu de <code>class</code> en JSX.
</div>', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1365, NULL, 3, FALSE, 22),

(1, 2, 'Props et state', 'props-state', 'Gestion des données dans React',
'<h2>Props et State : Les données dans React</h2>
<p>Comprenez comment <strong>faire circuler les données</strong> dans vos applications React.</p>
<h3>Les Props :</h3>
<pre><code class="language-jsx">
function Accueil({ nom, age }) {
  return &lt;h1&gt;Bonjour {nom}, vous avez {age} ans !&lt;/h1&gt;;
}

// Utilisation
&lt;Accueil nom="Alice" age={25} /&gt;
</code></pre>
<h3>Le State :</h3>
<pre><code class="language-jsx">
import { useState } from ''react'';

function Compteur() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;Compteur : {count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Incrémenter
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1100, NULL, 4, FALSE, 18),

(1, 2, 'Exercice pratique - Todo List', 'exercice-todo-list', 'Créer une application Todo List complète',
'<h2>🚀 Projet pratique : Todo List</h2>
<p>Mettez en pratique vos connaissances en créant une <strong>application Todo List complète</strong>.</p>
<h3>Fonctionnalités à implémenter :</h3>
<ul>
<li>Ajouter une nouvelle tâche</li>
<li>Marquer une tâche comme terminée</li>
<li>Supprimer une tâche</li>
<li>Filtrer les tâches (toutes, actives, terminées)</li>
</ul>
<div class="alert alert-info">
<strong>💻 Exercice :</strong> Cliquez sur le bouton ci-dessous pour accéder au CodeSandbox avec le code de départ.
</div>
<h3>Structure suggérée :</h3>
<pre><code class="language-jsx">
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(''all'');
  
  // Vos fonctions ici...
  
  return (
    &lt;div className="todo-app"&gt;
      {/* Votre interface ici */}
    &lt;/div&gt;
  );
}
</code></pre>', 'exercise', NULL, NULL, 'https://codesandbox.io/s/react-todo-starter', 5, FALSE, 45),

(1, 3, 'Les hooks React', 'hooks-react', 'useState, useEffect et hooks personnalisés',
'<h2>🪝 Les Hooks React</h2>
<p>Les <strong>hooks</strong> révolutionnent la façon d''écrire des composants React. Découvrez leur puissance !</p>
<h3>useState - Gérer l''état local :</h3>
<pre><code class="language-jsx">
import { useState } from ''react'';

function Exemple() {
  const [nom, setNom] = useState('''');
  const [age, setAge] = useState(0);
  
  return (
    &lt;form&gt;
      &lt;input 
        value={nom} 
        onChange={(e) =&gt; setNom(e.target.value)}
        placeholder="Votre nom"
      /&gt;
      &lt;input 
        type="number"
        value={age} 
        onChange={(e) =&gt; setAge(parseInt(e.target.value))}
        placeholder="Votre âge"
      /&gt;
    &lt;/form&gt;
  );
}
</code></pre>
<h3>useEffect - Effets de bord :</h3>
<pre><code class="language-jsx">
import { useEffect, useState } from ''react'';

function UtilisateurProfil({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() =&gt; {
    fetch(`/api/users/${userId}`)
      .then(res =&gt; res.json())
      .then(setUser);
  }, [userId]); // Se déclenche quand userId change
  
  if (!user) return &lt;div&gt;Chargement...&lt;/div&gt;;
  
  return &lt;h1&gt;{user.name}&lt;/h1&gt;;
}
</code></pre>
<div class="alert alert-success">
<strong>🎯 Objectif :</strong> Maîtriser useState et useEffect vous donne 80% de la puissance de React !
</div>', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2115, NULL, 6, FALSE, 35);

-- Inscriptions exemple
INSERT INTO formation_enrollments (user_id, formation_id, enrolled_at, started_at, progress_percentage, time_spent_seconds, current_lesson_id) VALUES
(4, 1, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY, 45.00, 8100, 4),
(4, 3, NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY, 20.00, 2700, 2);

-- Progrès des leçons
INSERT INTO lesson_progress (user_id, lesson_id, enrollment_id, started_at, completed_at, completion_percentage, is_completed, watch_time_seconds) VALUES
(4, 1, 1, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY, 100.00, TRUE, 930),
(4, 2, 1, NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY, 100.00, TRUE, 1200),
(4, 3, 1, NOW() - INTERVAL 3 DAY, NULL, 65.00, FALSE, 887);

-- Index et optimisations
CREATE INDEX idx_formations_search ON formations(title, description);
CREATE INDEX idx_lessons_search ON formation_lessons(title, description);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_enrollments_user_progress ON formation_enrollments(user_id, progress_percentage);
CREATE INDEX idx_lesson_progress_completed ON lesson_progress(user_id, is_completed);

-- Vues utiles pour les statistiques
CREATE VIEW formation_stats AS
SELECT 
    f.id,
    f.title,
    f.slug,
    COUNT(DISTINCT e.user_id) as total_students,
    AVG(e.progress_percentage) as avg_progress,
    COUNT(DISTINCT CASE WHEN e.is_completed = TRUE THEN e.user_id END) as completed_students,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as total_reviews
FROM formations f
LEFT JOIN formation_enrollments e ON f.id = e.formation_id
LEFT JOIN formation_reviews r ON f.id = r.formation_id
WHERE f.status = 'published'
GROUP BY f.id;

CREATE VIEW user_learning_stats AS
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(DISTINCT e.formation_id) as formations_enrolled,
    COUNT(DISTINCT CASE WHEN e.is_completed = TRUE THEN e.formation_id END) as formations_completed,
    SUM(e.time_spent_seconds) as total_time_seconds,
    AVG(e.progress_percentage) as avg_progress,
    COUNT(DISTINCT c.id) as certificates_earned
FROM users u
LEFT JOIN formation_enrollments e ON u.id = e.user_id
LEFT JOIN certificates c ON u.id = c.user_id
GROUP BY u.id;