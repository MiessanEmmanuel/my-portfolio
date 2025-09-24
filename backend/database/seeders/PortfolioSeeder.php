<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Technology;
use App\Models\Project;
use App\Models\ProjectFeature;
use App\Models\ProjectGallery;
use App\Models\Formation;
use App\Models\Exercise;
use App\Models\ExerciseResource;
use App\Models\ContactMessage;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // Create Users
        $admin = User::create([
            'name' => 'Admin Portfolio',
            'email' => 'admin@monportfolio.dev',
            'password' => bcrypt('password'),
            'avatar' => 'https://placehold.co/100x100/6366f1/ffffff?text=AP',
            'role' => 'admin',
            'join_date' => '2024-01-01',
        ]);

        $user1 = User::create([
            'name' => 'Jean Dupont',
            'email' => 'jean.dupont@email.com',
            'password' => bcrypt('password'),
            'avatar' => 'https://placehold.co/100x100/6366f1/ffffff?text=JD',
            'role' => 'user',
            'join_date' => '2024-01-15',
        ]);

        $user2 = User::create([
            'name' => 'Marie Martin',
            'email' => 'marie.martin@email.com',
            'password' => bcrypt('password'),
            'avatar' => 'https://placehold.co/100x100/ec4899/ffffff?text=MM',
            'role' => 'user',
            'join_date' => '2024-02-01',
        ]);

        // Create User Profiles
        UserProfile::create([
            'user_id' => $admin->id,
            'bio' => 'Développeur full-stack passionné avec 5+ années d\'expérience',
            'phone' => '+33 1 23 45 67 89',
            'location' => 'Paris, France',
            'github' => 'https://github.com/admin',
            'linkedin' => 'https://linkedin.com/in/admin',
        ]);

        UserProfile::create([
            'user_id' => $user1->id,
            'bio' => 'Étudiant en développement web',
            'phone' => '+33 6 12 34 56 78',
            'location' => 'Lyon, France',
            'github' => 'https://github.com/jeandupont',
            'linkedin' => 'https://linkedin.com/in/jeandupont',
        ]);

        // Create Technologies
        $technologies = [
            ['name' => 'React', 'category' => 'Frontend', 'color' => '#61dafb', 'icon' => '⚛️'],
            ['name' => 'Node.js', 'category' => 'Backend', 'color' => '#339933', 'icon' => '🟢'],
            ['name' => 'Express', 'category' => 'Backend', 'color' => '#000000', 'icon' => '🚀'],
            ['name' => 'MongoDB', 'category' => 'Database', 'color' => '#47A248', 'icon' => '🍃'],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'color' => '#336791', 'icon' => '🐘'],
            ['name' => 'TypeScript', 'category' => 'Language', 'color' => '#3178c6', 'icon' => '📘'],
            ['name' => 'JavaScript', 'category' => 'Language', 'color' => '#f7df1e', 'icon' => '⚡'],
            ['name' => 'Python', 'category' => 'Language', 'color' => '#3776ab', 'icon' => '🐍'],
            ['name' => 'Vue.js', 'category' => 'Frontend', 'color' => '#4FC08D', 'icon' => '💚'],
            ['name' => 'Laravel', 'category' => 'Backend', 'color' => '#FF2D20', 'icon' => '🔥'],
        ];

        foreach ($technologies as $tech) {
            Technology::create($tech);
        }

        // Create Projects
        $project1 = Project::create([
            'title' => 'Plateforme E-commerce',
            'slug' => 'plateforme-ecommerce',
            'category' => 'React & Node.js',
            'description' => 'Application de commerce en ligne avec paiement intégré et tableau de bord admin.',
            'long_description' => 'Une plateforme e-commerce complète développée avec React et Node.js, intégrant un système de paiement sécurisé avec Stripe.',
            'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=E-commerce',
            'live_url' => 'https://example.com',
            'github_url' => 'https://github.com/exemple/ecommerce',
            'status' => 'Terminé',
            'date_completed' => 2024,
            'client' => 'Startup Tech',
           /*  'duration' => '6 mois', */
            'featured' => true,
        ]);

        $project2 = Project::create([
            'title' => 'API de Gestion',
            'slug' => 'api-gestion',
            'category' => 'Backend',
            'description' => 'API REST robuste avec authentification JWT et documentation Swagger.',
            'long_description' => 'API complète pour la gestion d\'entreprise développée avec Laravel.',
            'image' => 'https://placehold.co/600x400/ec4899/ffffff?text=API+Management',
            'live_url' => 'https://api.example.com/docs',
            'github_url' => 'https://github.com/exemple/management-api',
            'status' => 'Terminé',
            'date_completed' => 2024,
            'client' => 'Entreprise PME',
           /*  'duration' => '4 mois', */
            'featured' => true,
        ]);

        // Associate technologies with projects
        $project1->technologies()->attach([1, 2, 3, 7]); // React, Node.js, Express, JavaScript
        $project2->technologies()->attach([2, 3, 10, 6]); // Node.js, Express, Laravel, TypeScript

        // Create Project Features
        ProjectFeature::create([
            'project_id' => $project1->id,
            'feature_text' => 'Interface utilisateur moderne et responsive',
            'display_order' => 1,
        ]);

        ProjectFeature::create([
            'project_id' => $project1->id,
            'feature_text' => 'Système de paiement sécurisé avec Stripe',
            'display_order' => 2,
        ]);

        // Create Project Gallery
        ProjectGallery::create([
            'project_id' => $project1->id,
            'image_url' => 'https://placehold.co/800x600/6366f1/ffffff?text=Homepage',
            'alt_text' => 'Page d\'accueil e-commerce',
            'display_order' => 1,
        ]);

        // Create Formations
        $formation1 = Formation::create([
            'title' => 'HTML/CSS Fondamentaux',
            'slug' => 'html-css-fondamentaux',
            'description' => 'Apprenez les bases du développement web avec HTML et CSS',
          /*   'duration' => '6 semaines', */
            'level' => 'Débutant',
            'color' => 'from-orange-500 to-red-500',
            'icon' => '🌐',
            'total_exercises' => 12,
            'is_active' => true,
        ]);

        $formation2 = Formation::create([
            'title' => 'JavaScript Moderne',
            'slug' => 'javascript-moderne',
            'description' => 'Maîtrisez JavaScript ES6+ et les concepts avancés',
            /* 'duration' => '8 semaines', */
            'level' => 'Intermédiaire',
            'color' => 'from-yellow-500 to-orange-500',
            'icon' => '⚡',
            'total_exercises' => 15,
            'is_active' => true,
        ]);

        // Create Exercises
        $exercise1 = Exercise::create([
            'formation_id' => $formation1->id,
            'title' => 'Structure HTML de base',
            'slug' => 'structure-html-base',
            'description' => 'Créez votre première page HTML avec les éléments essentiels',
            'instructions' => 'Créez un fichier index.html avec la structure de base HTML5',
            'difficulty' => 'Facile',
            'estimated_time' => '30 min',
            'type' => 'Pratique',
            'status' => 'available',
            'code_template' => '<!DOCTYPE html>\n<html lang="fr">\n<head>\n    <!-- Votre code ici -->\n</head>\n<body>\n    <!-- Votre contenu ici -->\n</body>\n</html>',
            'display_order' => 1,
        ]);

        // Create Exercise Resources
        ExerciseResource::create([
            'exercise_id' => $exercise1->id,
            'title' => 'MDN HTML Basics',
            'url' => 'https://developer.mozilla.org/en-US/docs/Web/HTML',
            'display_order' => 1,
        ]);

        // Create Contact Messages
        ContactMessage::create([
            'name' => 'Sophie Bernard',
            'email' => 'sophie.bernard@startup.com',
            'company' => 'TechStartup',
            'subject' => 'Développement d\'une MVP',
            'message' => 'Bonjour, nous cherchons un développeur pour créer notre MVP.',
            'budget' => '10k-25k',
            'timeline' => '3months',
            'status' => 'new',
            'created_at' => '2024-01-10 09:15:00',
        ]);

        ContactMessage::create([
            'name' => 'Marc Dubois',
            'email' => 'marc.dubois@entreprise.fr',
            'company' => 'Solutions Digitales',
            'subject' => 'Refonte site web',
            'message' => 'Nous souhaitons refaire complètement notre site web corporate.',
            'budget' => '5k-10k',
            'timeline' => '1month',
            'status' => 'read',
            'created_at' => '2024-01-15 14:30:00',
        ]);
    }
}