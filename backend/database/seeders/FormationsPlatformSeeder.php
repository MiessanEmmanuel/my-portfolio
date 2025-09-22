<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FormationsPlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed formation categories (only if they don't exist)
        if (DB::table('formation_categories')->count() == 0) {
            DB::table('formation_categories')->insert([
            [
                'name' => 'Frontend',
                'slug' => 'frontend',
                'description' => 'Développement côté client avec React, Vue.js, Angular...',
                'color' => '#3B82F6',
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Backend',
                'slug' => 'backend',
                'description' => 'Développement serveur avec Laravel, Node.js, Python...',
                'color' => '#10B981',
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'DevOps',
                'slug' => 'devops',
                'description' => 'Déploiement, CI/CD, Docker, Kubernetes...',
                'color' => '#F59E0B',
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'JavaScript',
                'slug' => 'javascript',
                'description' => 'Le langage JavaScript et son écosystème',
                'color' => '#EF4444',
                'sort_order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
        }

        // Seed instructor users
        $instructorIds = [];
        
        // Jonathan Boyer - Main instructor
        $instructorIds[] = DB::table('users')->insertGetId([
            'name' => 'Jonathan Boyer',
            'email' => 'jonathan@grafikart.fr',
            'password' => Hash::make('password'),
            'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
            'bio' => 'Développeur Full-Stack avec 10 ans d\'expérience, créateur de Grafikart',
            'role' => 'instructor',
            'github_username' => 'Grafikart',
            'twitter_username' => 'grafikart_fr',
            'website_url' => 'https://grafikart.fr',
            'email_verified_at' => now(),
            'join_date' => now()->subYears(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Marie Dubois - Vue.js expert
        $instructorIds[] = DB::table('users')->insertGetId([
            'name' => 'Marie Dubois',
            'email' => 'marie@example.com',
            'password' => Hash::make('password'),
            'avatar' => 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
            'bio' => 'Expert Vue.js et formateur passionné',
            'role' => 'instructor',
            'github_username' => 'mariedubois',
            'twitter_username' => 'marie_dev',
            'email_verified_at' => now(),
            'join_date' => now()->subYears(6),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create instructor profiles
        DB::table('instructors')->insert([
            [
                'user_id' => $instructorIds[0],
                'specialties' => json_encode(['React', 'Laravel', 'JavaScript', 'PHP']),
                'experience_years' => 10,
                'formations_count' => 25,
                'students_count' => 15000,
                'rating' => 4.9,
                'bio_long' => 'Passionné par le développement web depuis plus de 10 ans, j\'ai créé Grafikart pour partager mes connaissances et aider la communauté francophone à progresser.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $instructorIds[1],
                'specialties' => json_encode(['Vue.js', 'TypeScript', 'CSS', 'UX/UI']),
                'experience_years' => 6,
                'formations_count' => 8,
                'students_count' => 4200,
                'rating' => 4.8,
                'bio_long' => 'Spécialisée en développement frontend moderne, je me concentre sur Vue.js et les meilleures pratiques de développement.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Seed formations
        $formationId = DB::table('formations')->insertGetId([
            'title' => 'Maîtriser React.js de A à Z',
            'slug' => 'maitriser-react-js',
            'description' => 'Apprenez React.js depuis les bases jusqu\'aux concepts avancés avec des projets pratiques',
            'long_description' => 'Cette formation complète vous permettra de maîtriser React.js, l\'une des bibliothèques JavaScript les plus populaires.',
            'image' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
            'category_id' => 1,
            'instructor_id' => 1,
            'level' => 'Intermédiaire',
            'duration_total_minutes' => 750,
            'price' => 79.00,
            'is_free' => false,
            'status' => 'published',
            'requirements' => json_encode(['JavaScript ES6+', 'HTML/CSS', 'VS Code']),
            'objectives' => json_encode(['Maîtriser React', 'Créer des apps performantes', 'Utiliser les hooks', 'Implémenter des tests']),
            'technologies' => json_encode(['React', 'JavaScript', 'Redux', 'Next.js']),
            'published_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed formation chapters
        $chapterIds = [];
        $chapterIds[] = DB::table('formation_chapters')->insertGetId([
            'formation_id' => $formationId,
            'title' => 'Introduction à React',
            'description' => 'Découverte des concepts fondamentaux',
            'sort_order' => 1,
            'duration_minutes' => 180,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $chapterIds[] = DB::table('formation_chapters')->insertGetId([
            'formation_id' => $formationId,
            'title' => 'Composants et JSX',
            'description' => 'Création de composants réutilisables',
            'sort_order' => 2,
            'duration_minutes' => 240,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed formation lessons
        DB::table('formation_lessons')->insert([
            [
                'formation_id' => $formationId,
                'chapter_id' => $chapterIds[0],
                'title' => 'Introduction à React',
                'slug' => 'introduction-react',
                'description' => 'Découverte de React et de son écosystème',
                'long_description' => '<h2>Bienvenue dans le monde de React !</h2><p>Dans cette première leçon, nous allons découvrir <strong>React.js</strong>...</p>',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'video_duration_seconds' => 930,
                'sort_order' => 1,
                'is_free' => true,
                'estimated_time_minutes' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'formation_id' => $formationId,
                'chapter_id' => $chapterIds[1],
                'title' => 'JSX et les composants',
                'slug' => 'jsx-composants',
                'description' => 'Apprendre à créer des composants avec JSX',
                'long_description' => '<h2>JSX : La syntaxe magique de React</h2><p><strong>JSX</strong> permet d\'écrire du HTML directement dans JavaScript...</p>',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'video_duration_seconds' => 1365,
                'sort_order' => 3,
                'is_free' => false,
                'estimated_time_minutes' => 22,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->command->info('Formation platform seeded successfully!');
    }
}