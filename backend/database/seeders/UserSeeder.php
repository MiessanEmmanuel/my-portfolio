<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer un utilisateur administrateur
        User::updateOrCreate(
            ['email' => 'admin@portfolio.com'],
            [
                'name' => 'Administrateur',
                'email' => 'admin@portfolio.com',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
                'role' => 'admin',
                'bio' => 'Administrateur principal du site',
                'website_url' => 'https://portfolio.com',
                'join_date' => now()->toDateString(),
            ]
        );

        // Créer un utilisateur normal pour les tests
        User::updateOrCreate(
            ['email' => 'user@test.com'],
            [
                'name' => 'Utilisateur Test',
                'email' => 'user@test.com',
                'password' => Hash::make('user123'),
                'email_verified_at' => now(),
                'role' => 'user',
                'bio' => 'Utilisateur test pour la plateforme',
                'join_date' => now()->toDateString(),
            ]
        );

        // Créer un instructeur
        User::updateOrCreate(
            ['email' => 'instructor@test.com'],
            [
                'name' => 'Instructeur Test',
                'email' => 'instructor@test.com',
                'password' => Hash::make('instructor123'),
                'email_verified_at' => now(),
                'role' => 'instructor',
                'bio' => 'Instructeur spécialisé en développement web',
                'join_date' => now()->toDateString(),
            ]
        );

        $this->command->info('Utilisateurs créés avec succès :');
        $this->command->info('- Admin: admin@portfolio.com / admin123');
        $this->command->info('- User: user@test.com / user123');
        $this->command->info('- Instructor: instructor@test.com / instructor123');
    }
}