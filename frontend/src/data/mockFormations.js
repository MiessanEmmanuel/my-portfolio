// Mock data for formations platform
export const mockFormations = [
  {
    id: 1,
    title: "Maîtriser React.js de A à Z",
    slug: "maitriser-react-js",
    description: "Apprenez React.js depuis les bases jusqu'aux concepts avancés avec des projets pratiques",
    longDescription: "Cette formation complète vous permettra de maîtriser React.js, l'une des bibliothèques JavaScript les plus populaires. Vous apprendrez les hooks, le state management, les tests, et bien plus encore.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    category: "Frontend",
    level: "Intermédiaire",
    duration: "12h 30min",
    price: 79,
    isPremium: true,
    isFree: false,
    status: "published",
    rating: 4.8,
    studentsCount: 1247,
    instructor: {
      id: 1,
      name: "Jonathan Boyer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Développeur Full-Stack avec 10 ans d'expérience"
    },
    technologies: ["React", "JavaScript", "Redux", "Next.js"],
    requirements: [
      "Connaissances de base en JavaScript",
      "Notions de HTML/CSS",
      "Un éditeur de code (VS Code recommandé)"
    ],
    objectives: [
      "Maîtriser les concepts fondamentaux de React",
      "Créer des applications React performantes",
      "Utiliser les hooks et le context API",
      "Implémenter des tests unitaires",
      "Déployer une application React"
    ],
    lessons: [
      {
        id: 1,
        title: "Introduction à React",
        duration: "15:30",
        type: "video",
        isFree: true,
        isCompleted: false,
        description: "Découverte de React et de son écosystème",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>Bienvenue dans le monde de React !</h2>
          <p>Dans cette première leçon, nous allons découvrir <strong>React.js</strong>, l'une des bibliothèques JavaScript les plus populaires pour créer des interfaces utilisateur.</p>
          
          <h3>Ce que vous allez apprendre :</h3>
          <ul>
            <li>Qu'est-ce que React et pourquoi l'utiliser</li>
            <li>Les concepts fondamentaux : composants, props, state</li>
            <li>L'écosystème React et ses outils</li>
            <li>Comparaison avec d'autres frameworks</li>
          </ul>

          <h3>Code exemple :</h3>
          <pre><code class="language-jsx">
import React from 'react';

function HelloWorld() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Bonjour React !&lt;/h1&gt;
      &lt;p&gt;Mon premier composant React&lt;/p&gt;
    &lt;/div&gt;
  );
}

export default HelloWorld;
          </code></pre>

          <div class="alert alert-info">
            <strong>💡 Astuce :</strong> React utilise JSX, une syntaxe qui combine JavaScript et HTML pour créer des composants réutilisables.
          </div>

          <h3>Ressources utiles :</h3>
          <ul>
            <li><a href="https://reactjs.org/" target="_blank">Documentation officielle React</a></li>
            <li><a href="https://create-react-app.dev/" target="_blank">Create React App</a></li>
          </ul>
        `
      },
      {
        id: 2,
        title: "JSX et les composants",
        duration: "22:45",
        type: "video",
        isFree: false,
        isCompleted: false,
        description: "Apprendre à créer des composants avec JSX",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>Maîtriser JSX et les composants React</h2>
          <p>JSX est au cœur de React. Cette syntaxe révolutionnaire nous permet d'écrire du HTML directement dans notre JavaScript.</p>

          <h3>Les règles importantes de JSX :</h3>
          <ol>
            <li>Un seul élément parent par composant</li>
            <li>Utiliser <code>className</code> au lieu de <code>class</code></li>
            <li>Fermer toutes les balises, même les auto-fermantes</li>
            <li>Utiliser <code>camelCase</code> pour les attributs</li>
          </ol>

          <h3>Exemple de composant fonctionnel :</h3>
          <pre><code class="language-jsx">
function UserCard({ name, email, avatar }) {
  return (
    &lt;div className="user-card"&gt;
      &lt;img src={avatar} alt={name} className="avatar" /&gt;
      &lt;h3&gt;{name}&lt;/h3&gt;
      &lt;p&gt;{email}&lt;/p&gt;
    &lt;/div&gt;
  );
}
          </code></pre>

          <div class="alert alert-warning">
            <strong>⚠️ Attention :</strong> N'oubliez pas d'importer React dans vos fichiers JSX !
          </div>

          <h3>Bonnes pratiques :</h3>
          <ul>
            <li>Un composant par fichier</li>
            <li>Noms de composants en PascalCase</li>
            <li>Props destructurées dans les paramètres</li>
            <li>Utiliser des fragments pour éviter les divs inutiles</li>
          </ul>
        `
      },
      {
        id: 3,
        title: "Props et state",
        duration: "18:20",
        type: "video",
        isFree: false,
        isCompleted: false,
        description: "Gestion des données dans React",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>Props et State : Les données dans React</h2>
          <p>Comprendre la différence entre <strong>props</strong> et <strong>state</strong> est crucial pour maîtriser React.</p>

          <h3>Les Props (propriétés) :</h3>
          <ul>
            <li>Données passées du parent vers l'enfant</li>
            <li>Immutables (read-only)</li>
            <li>Permettent la communication descendante</li>
          </ul>

          <pre><code class="language-jsx">
// Composant parent
function App() {
  return &lt;Button text="Cliquez-moi" color="blue" /&gt;;
}

// Composant enfant
function Button({ text, color }) {
  return (
    &lt;button style={{ backgroundColor: color }}&gt;
      {text}
    &lt;/button&gt;
  );
}
          </code></pre>

          <h3>Le State (état local) :</h3>
          <ul>
            <li>Données internes au composant</li>
            <li>Mutable avec setState ou hooks</li>
            <li>Déclenche un re-render quand modifié</li>
          </ul>

          <pre><code class="language-jsx">
import { useState } from 'react';

function Counter() {
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
          </code></pre>

          <div class="alert alert-success">
            <strong>✅ Règle d'or :</strong> Si une donnée change et doit provoquer un re-render, utilisez le state. Sinon, utilisez les props.
          </div>
        `
      },
      {
        id: 4,
        title: "Exercice pratique - Todo List",
        duration: "45:00",
        type: "exercise",
        isFree: false,
        isCompleted: false,
        description: "Créer une application Todo List complète",
        exerciseUrl: "https://codesandbox.io/s/react-todo-example",
        longDescription: `
          <h2>🚀 Exercice Pratique : Todo List</h2>
          <p>Il est temps de mettre en pratique tout ce que vous avez appris ! Nous allons créer une application de gestion de tâches complète.</p>

          <h3>Objectifs de l'exercice :</h3>
          <ul>
            <li>Créer une interface pour ajouter des tâches</li>
            <li>Afficher la liste des tâches</li>
            <li>Marquer les tâches comme terminées</li>
            <li>Supprimer des tâches</li>
            <li>Filtrer les tâches (toutes, actives, terminées)</li>
          </ul>

          <h3>Structure recommandée :</h3>
          <pre><code class="language-jsx">
// App.js - Composant principal
function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Vos fonctions ici...

  return (
    &lt;div className="app"&gt;
      &lt;h1&gt;Ma Todo List&lt;/h1&gt;
      &lt;TodoForm onAdd={addTodo} /&gt;
      &lt;TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} /&gt;
      &lt;TodoFilter filter={filter} onFilterChange={setFilter} /&gt;
    &lt;/div&gt;
  );
}
          </code></pre>

          <h3>Composants à créer :</h3>
          <ol>
            <li><strong>TodoForm</strong> : Formulaire d'ajout</li>
            <li><strong>TodoList</strong> : Liste des tâches</li>
            <li><strong>TodoItem</strong> : Item individuel</li>
            <li><strong>TodoFilter</strong> : Boutons de filtrage</li>
          </ol>

          <div class="alert alert-info">
            <strong>💡 Conseils :</strong>
            <ul>
              <li>Utilisez un ID unique pour chaque tâche</li>
              <li>Gérez l'état dans le composant parent</li>
              <li>Passez les fonctions de modification via les props</li>
            </ul>
          </div>

          <h3>Bonus (optionnel) :</h3>
          <ul>
            <li>Sauvegarder dans localStorage</li>
            <li>Ajouter des animations CSS</li>
            <li>Compteur de tâches restantes</li>
            <li>Modification en double-clic</li>
          </ul>
        `
      },
      {
        id: 5,
        title: "Les hooks React",
        duration: "35:15",
        type: "video",
        isFree: false,
        isCompleted: false,
        description: "useState, useEffect et hooks personnalisés",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>Les Hooks React : La révolution</h2>
          <p>Les hooks ont révolutionné React en permettant d'utiliser l'état et les fonctionnalités de cycle de vie dans les composants fonctionnels.</p>

          <h3>useState - Gérer l'état local</h3>
          <p>Le hook le plus fondamental pour gérer l'état dans un composant.</p>

          <pre><code class="language-jsx">
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) =&gt; {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input 
        type="email" 
        value={email}
        onChange={(e) =&gt; setEmail(e.target.value)}
        placeholder="Email"
      /&gt;
      &lt;input 
        type="password" 
        value={password}
        onChange={(e) =&gt; setPassword(e.target.value)}
        placeholder="Mot de passe"
      /&gt;
      &lt;button type="submit" disabled={isLoading}&gt;
        {isLoading ? 'Connexion...' : 'Se connecter'}
      &lt;/button&gt;
    &lt;/form&gt;
  );
}
          </code></pre>

          <h3>useEffect - Effets de bord</h3>
          <p>Pour gérer les appels API, les abonnements, et les nettoyages.</p>

          <pre><code class="language-jsx">
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =&gt; {
    // Effet qui se déclenche quand userId change
    async function fetchUser() {
      setLoading(true);
      try {
        const userData = await api.getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Dépendance : se re-exécute si userId change

  if (loading) return &lt;div&gt;Chargement...&lt;/div&gt;;

  return (
    &lt;div&gt;
      &lt;h2&gt;{user.name}&lt;/h2&gt;
      &lt;p&gt;{user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}
          </code></pre>

          <h3>Hook personnalisé</h3>
          <p>Créez vos propres hooks pour réutiliser la logique :</p>

          <pre><code class="language-jsx">
// Hook personnalisé
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =&gt; {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setStoredValue = (newValue) =&gt; {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

// Utilisation
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    &lt;button onClick={() =&gt; setTheme(theme === 'light' ? 'dark' : 'light')}&gt;
      Thème : {theme}
    &lt;/button&gt;
  );
}
          </code></pre>

          <div class="alert alert-warning">
            <strong>⚠️ Règles des hooks :</strong>
            <ul>
              <li>Toujours appeler les hooks au niveau racine</li>
              <li>Ne jamais dans des boucles, conditions, ou fonctions imbriquées</li>
              <li>Seuls les composants et hooks personnalisés peuvent utiliser des hooks</li>
            </ul>
          </div>
        `
      }
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20"
  },
  {
    id: 2,
    title: "Laravel 11 - Développement moderne",
    slug: "laravel-11-developpement-moderne",
    description: "Créez des applications web robustes avec Laravel 11 et découvrez les dernières fonctionnalités",
    longDescription: "Formation complète sur Laravel 11 couvrant l'architecture MVC, l'ORM Eloquent, l'authentification, les APIs REST, et le déploiement moderne.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "Backend",
    level: "Avancé",
    duration: "18h 45min",
    price: 129,
    isPremium: true,
    isFree: false,
    status: "published",
    rating: 4.9,
    studentsCount: 892,
    instructor: {
      id: 1,
      name: "Jonathan Boyer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Développeur Full-Stack avec 10 ans d'expérience"
    },
    technologies: ["Laravel", "PHP", "MySQL", "Docker"],
    requirements: [
      "Bonnes connaissances en PHP",
      "Notions de base de données",
      "Composer installé",
      "Docker (optionnel)"
    ],
    objectives: [
      "Maîtriser l'architecture Laravel",
      "Créer des APIs REST performantes",
      "Implémenter l'authentification",
      "Optimiser les performances",
      "Déployer avec Docker"
    ],
    lessons: [
      {
        id: 6,
        title: "Installation et configuration",
        duration: "12:30",
        type: "video",
        isFree: true,
        isCompleted: false,
        description: "Mise en place de l'environnement Laravel",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>Installation et Configuration de Laravel 11</h2>
          <p>Commençons par installer Laravel 11 et configurer notre environnement de développement.</p>

          <h3>Prérequis :</h3>
          <ul>
            <li>PHP 8.2 ou supérieur</li>
            <li>Composer installé</li>
            <li>Node.js et npm</li>
            <li>Base de données (MySQL/PostgreSQL)</li>
          </ul>

          <h3>Installation via Composer :</h3>
          <pre><code class="language-bash">
# Créer un nouveau projet Laravel
composer create-project laravel/laravel mon-projet

# Aller dans le dossier
cd mon-projet

# Installer les dépendances
composer install
npm install
          </code></pre>

          <h3>Configuration de l'environnement :</h3>
          <pre><code class="language-bash">
# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer la base de données dans .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
          </code></pre>

          <div class="alert alert-info">
            <strong>💡 Astuce :</strong> Utilisez Laravel Sail pour un environnement Docker clé en main !
          </div>
        `
      },
      {
        id: 7,
        title: "Architecture MVC",
        duration: "25:15",
        type: "video",
        isFree: false,
        isCompleted: false,
        description: "Comprendre le pattern MVC dans Laravel",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>L'Architecture MVC dans Laravel</h2>
          <p>Laravel suit le pattern MVC (Model-View-Controller) pour organiser le code de manière claire et maintenable.</p>

          <h3>Les 3 composants :</h3>
          <ul>
            <li><strong>Model</strong> : Gestion des données et logique métier</li>
            <li><strong>View</strong> : Interface utilisateur (templates Blade)</li>
            <li><strong>Controller</strong> : Logique de contrôle et coordination</li>
          </ul>

          <h3>Exemple de Controller :</h3>
          <pre><code class="language-php">
&lt;?php

namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
        ]);

        User::create($request->all());
        return redirect()->route('users.index');
    }
}
          </code></pre>

          <h3>Routes correspondantes :</h3>
          <pre><code class="language-php">
// routes/web.php
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
          </code></pre>
        `
      },
      {
        id: 8,
        title: "Eloquent ORM",
        duration: "32:40",
        type: "video",
        isFree: false,
        isCompleted: false,
        description: "Maîtriser l'ORM de Laravel",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>Eloquent ORM - La magie de Laravel</h2>
          <p>Eloquent est l'ORM (Object-Relational Mapping) intégré à Laravel qui simplifie considérablement les interactions avec la base de données.</p>

          <h3>Créer un modèle :</h3>
          <pre><code class="language-bash">
# Créer un modèle avec migration
php artisan make:model Post -m

# Avec contrôleur et migration
php artisan make:model Post -mc
          </code></pre>

          <h3>Exemple de modèle :</h3>
          <pre><code class="language-php">
&lt;?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'user_id',
        'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Relations
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
          </code></pre>

          <h3>Utilisation dans un contrôleur :</h3>
          <pre><code class="language-php">
// Récupérer tous les posts publiés
$posts = Post::published()->with('user')->get();

// Créer un nouveau post
$post = Post::create([
    'title' => 'Mon titre',
    'content' => 'Mon contenu',
    'user_id' => auth()->id(),
]);

// Recherche
$posts = Post::where('title', 'like', '%Laravel%')
    ->orderBy('created_at', 'desc')
    ->paginate(10);
          </code></pre>

          <div class="alert alert-success">
            <strong>✅ Bonnes pratiques :</strong>
            <ul>
              <li>Utilisez les relations Eloquent plutôt que les jointures SQL</li>
              <li>Définissez les $fillable ou $guarded pour la sécurité</li>
              <li>Utilisez les scopes pour les requêtes récurrentes</li>
            </ul>
          </div>
        `
      }
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18"
  },
  {
    id: 3,
    title: "Vue.js 3 Composition API",
    slug: "vue-js-3-composition-api",
    description: "Découvrez Vue.js 3 et sa nouvelle Composition API pour créer des applications modernes",
    longDescription: "Apprenez Vue.js 3 avec la Composition API, TypeScript, Pinia pour le state management, et les meilleures pratiques de développement.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    category: "Frontend",
    level: "Intermédiaire",
    duration: "10h 15min",
    price: 0,
    isPremium: false,
    isFree: true,
    status: "published",
    rating: 4.7,
    studentsCount: 2156,
    instructor: {
      id: 2,
      name: "Marie Dubois",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      bio: "Expert Vue.js et formateur passionné"
    },
    technologies: ["Vue.js", "TypeScript", "Pinia", "Vite"],
    requirements: [
      "Connaissances JavaScript ES6+",
      "Notions de développement web",
      "Node.js installé"
    ],
    objectives: [
      "Maîtriser Vue.js 3 et la Composition API",
      "Utiliser TypeScript avec Vue",
      "Gérer l'état avec Pinia",
      "Créer des composants réutilisables",
      "Optimiser les performances"
    ],
    lessons: [
      {
        id: 9,
        title: "Introduction à Vue.js 3",
        duration: "18:45",
        type: "video",
        isFree: true,
        isCompleted: false,
        description: "Les nouveautés de Vue.js 3",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>Vue.js 3 : Une nouvelle ère</h2>
          <p>Vue.js 3 apporte des améliorations significatives en termes de performances, de taille et de facilité d'utilisation.</p>

          <h3>Les principales nouveautés :</h3>
          <ul>
            <li><strong>Composition API</strong> : Nouvelle façon d'organiser la logique</li>
            <li><strong>Performance</strong> : Jusqu'à 2x plus rapide</li>
            <li><strong>Tree-shaking</strong> : Bundle plus petit</li>
            <li><strong>TypeScript</strong> : Support natif amélioré</li>
            <li><strong>Fragments</strong> : Multiple root nodes</li>
          </ul>

          <h3>Installation :</h3>
          <pre><code class="language-bash">
# Via npm
npm create vue@latest mon-projet

# Via Vite
npm create vite@latest mon-projet -- --template vue

# Installation manuelle
npm install vue@next
          </code></pre>

          <h3>Premier composant Vue 3 :</h3>
          <pre><code class="language-vue">
&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;{{ title }}&lt;/h1&gt;
    &lt;button @click="increment"&gt;
      Cliqué {{ count }} fois
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref } from 'vue'

export default {
  setup() {
    const title = ref('Vue.js 3 est génial !')
    const count = ref(0)

    const increment = () =&gt; {
      count.value++
    }

    return {
      title,
      count,
      increment
    }
  }
}
&lt;/script&gt;
          </code></pre>

          <div class="alert alert-info">
            <strong>💡 Différence clé :</strong> La fonction <code>setup()</code> remplace les options <code>data</code>, <code>methods</code>, <code>computed</code> etc.
          </div>
        `
      },
      {
        id: 10,
        title: "Composition API vs Options API",
        duration: "24:30",
        type: "video",
        isFree: true,
        isCompleted: false,
        description: "Comprendre les différences et avantages",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>Composition API vs Options API</h2>
          <p>Vue.js 3 introduit la Composition API tout en gardant la compatibilité avec l'Options API. Voyons les différences.</p>

          <h3>Options API (Vue 2 style) :</h3>
          <pre><code class="language-vue">
&lt;template&gt;
  &lt;div&gt;
    &lt;h2&gt;{{ user.name }}&lt;/h2&gt;
    &lt;p&gt;{{ user.email }}&lt;/p&gt;
    &lt;button @click="updateUser"&gt;Mettre à jour&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      user: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    updateUser() {
      // Logique de mise à jour
    },
    fetchUser() {
      // Logique de récupération
    }
  },
  mounted() {
    this.fetchUser()
  }
}
&lt;/script&gt;
          </code></pre>

          <h3>Composition API (Vue 3 style) :</h3>
          <pre><code class="language-vue">
&lt;template&gt;
  &lt;div&gt;
    &lt;h2&gt;{{ user.name }}&lt;/h2&gt;
    &lt;p&gt;{{ user.email }}&lt;/p&gt;
    &lt;button @click="updateUser"&gt;Mettre à jour&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const user = ref({
      name: '',
      email: ''
    })

    const updateUser = () =&gt; {
      // Logique de mise à jour
    }

    const fetchUser = () =&gt; {
      // Logique de récupération
    }

    onMounted(() =&gt; {
      fetchUser()
    })

    return {
      user,
      updateUser
    }
  }
}
&lt;/script&gt;
          </code></pre>

          <h3>Avantages de la Composition API :</h3>
          <ul>
            <li><strong>Réutilisabilité</strong> : Logique extractible en composables</li>
            <li><strong>Organisation</strong> : Code groupé par fonctionnalité</li>
            <li><strong>TypeScript</strong> : Meilleur support et inférence</li>
            <li><strong>Performance</strong> : Optimisations au build time</li>
          </ul>

          <div class="alert alert-success">
            <strong>✅ Conseil :</strong> Utilisez la Composition API pour les nouveaux projets et les composants complexes, l'Options API reste parfaite pour les cas simples.
          </div>

          <h3>Composable exemple :</h3>
          <pre><code class="language-javascript">
// composables/useCounter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  
  const increment = () =&gt; count.value++
  const decrement = () =&gt; count.value--
  const reset = () =&gt; count.value = 0

  return {
    count,
    increment,
    decrement,
    reset
  }
}

// Dans un composant
import { useCounter } from './composables/useCounter'

export default {
  setup() {
    const { count, increment, decrement } = useCounter()
    
    return {
      count,
      increment,
      decrement
    }
  }
}
          </code></pre>
        `
      }
    ],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-15"
  },
  {
    id: 4,
    title: "Docker pour les développeurs",
    slug: "docker-pour-developpeurs",
    description: "Maîtrisez Docker et Docker Compose pour optimiser votre workflow de développement",
    longDescription: "Formation pratique sur Docker et la conteneurisation, de l'installation aux déploiements en production.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
    category: "DevOps",
    level: "Débutant",
    duration: "8h 20min",
    price: 59,
    isPremium: true,
    isFree: false,
    status: "published",
    rating: 4.6,
    studentsCount: 743,
    instructor: {
      id: 3,
      name: "Pierre Martin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "DevOps Engineer et consultant en conteneurisation"
    },
    technologies: ["Docker", "Docker Compose", "Kubernetes", "CI/CD"],
    requirements: [
      "Connaissances de base en ligne de commande",
      "Notions de développement web",
      "Docker installé"
    ],
    objectives: [
      "Comprendre les concepts de conteneurisation",
      "Créer et gérer des conteneurs Docker",
      "Utiliser Docker Compose",
      "Déployer des applications containerisées",
      "Mettre en place une pipeline CI/CD"
    ],
    lessons: [
      {
        id: 11,
        title: "Qu'est-ce que Docker ?",
        duration: "16:20",
        type: "video",
        isFree: true,
        isCompleted: false,
        description: "Introduction aux concepts de conteneurisation"
      }
    ],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12"
  },
  {
    id: 5,
    title: "JavaScript ES2024 - Les nouveautés",
    slug: "javascript-es2024-nouveautes",
    description: "Découvrez les dernières fonctionnalités JavaScript ES2024 avec des exemples pratiques",
    longDescription: "Restez à jour avec les dernières évolutions de JavaScript et apprenez à utiliser les nouvelles fonctionnalités dans vos projets.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
    category: "JavaScript",
    level: "Intermédiaire",
    duration: "6h 45min",
    price: 0,
    isPremium: false,
    isFree: true,
    status: "published",
    rating: 4.5,
    studentsCount: 1832,
    instructor: {
      id: 1,
      name: "Jonathan Boyer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Développeur Full-Stack avec 10 ans d'expérience"
    },
    technologies: ["JavaScript", "ES2024", "Node.js"],
    requirements: [
      "Bonnes bases en JavaScript",
      "Connaissances ES6+",
      "Un environnement de développement"
    ],
    objectives: [
      "Découvrir les nouveautés ES2024",
      "Apprendre les nouvelles syntaxes",
      "Optimiser le code existant",
      "Comprendre les performances",
      "Préparer la migration"
    ],
    lessons: [
      {
        id: 12,
        title: "Les nouvelles méthodes Array",
        duration: "22:15",
        type: "video",
        isFree: true,
        isCompleted: false,
        description: "Découverte des nouvelles méthodes pour les tableaux",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        longDescription: `
          <h2>JavaScript ES2024 : Nouvelles méthodes Array</h2>
          <p>ES2024 introduit de nouvelles méthodes pour les tableaux qui simplifient les opérations courantes.</p>

          <h3>Array.prototype.with() :</h3>
          <p>Crée un nouveau tableau avec un élément modifié à un index donné.</p>
          <pre><code class="language-javascript">
const arr = [1, 2, 3, 4, 5];
const newArr = arr.with(2, 'nouveau');
console.log(newArr); // [1, 2, 'nouveau', 4, 5]
console.log(arr);    // [1, 2, 3, 4, 5] (inchangé)

// Avant ES2024
const oldWay = [...arr.slice(0, 2), 'nouveau', ...arr.slice(3)];
          </code></pre>

          <h3>Array.prototype.toReversed() :</h3>
          <p>Retourne une copie inversée du tableau sans modifier l'original.</p>
          <pre><code class="language-javascript">
const numbers = [1, 2, 3, 4, 5];
const reversed = numbers.toReversed();
console.log(reversed); // [5, 4, 3, 2, 1]
console.log(numbers);  // [1, 2, 3, 4, 5] (inchangé)

// Avant ES2024
const oldReversed = [...numbers].reverse();
          </code></pre>

          <h3>Array.prototype.toSorted() :</h3>
          <p>Retourne une copie triée du tableau.</p>
          <pre><code class="language-javascript">
const fruits = ['banana', 'apple', 'cherry'];
const sorted = fruits.toSorted();
console.log(sorted); // ['apple', 'banana', 'cherry']
console.log(fruits); // ['banana', 'apple', 'cherry'] (inchangé)

// Avec une fonction de comparaison
const numbers = [3, 1, 4, 1, 5];
const sortedNumbers = numbers.toSorted((a, b) => a - b);
console.log(sortedNumbers); // [1, 1, 3, 4, 5]
          </code></pre>

          <h3>Array.prototype.toSpliced() :</h3>
          <p>Retourne une copie du tableau avec des éléments supprimés/ajoutés.</p>
          <pre><code class="language-javascript">
const arr = [1, 2, 3, 4, 5];

// Supprimer 2 éléments à partir de l'index 1
const spliced1 = arr.toSpliced(1, 2);
console.log(spliced1); // [1, 4, 5]

// Remplacer 1 élément à l'index 2 par 'nouveau'
const spliced2 = arr.toSpliced(2, 1, 'nouveau');
console.log(spliced2); // [1, 2, 'nouveau', 4, 5]

// Insérer sans supprimer
const spliced3 = arr.toSpliced(2, 0, 'inséré');
console.log(spliced3); // [1, 2, 'inséré', 3, 4, 5]

console.log(arr); // [1, 2, 3, 4, 5] (toujours inchangé)
          </code></pre>

          <div class="alert alert-info">
            <strong>💡 Pattern commun :</strong> Toutes ces méthodes suivent le principe d'immutabilité - elles retournent de nouveaux tableaux sans modifier l'original.
          </div>

          <h3>Cas d'usage pratiques :</h3>
          <pre><code class="language-javascript">
// Gestion d'état immutable
const todoList = [
  { id: 1, text: 'Apprendre React', done: false },
  { id: 2, text: 'Faire les courses', done: true },
  { id: 3, text: 'Écrire du code', done: false }
];

// Marquer une tâche comme terminée
const updateTodo = (todos, id) => {
  const index = todos.findIndex(todo => todo.id === id);
  return todos.with(index, { ...todos[index], done: true });
};

// Ajouter une nouvelle tâche au début
const addTodo = (todos, newTodo) => {
  return todos.toSpliced(0, 0, newTodo);
};

// Supprimer une tâche
const removeTodo = (todos, id) => {
  const index = todos.findIndex(todo => todo.id === id);
  return todos.toSpliced(index, 1);
};

// Trier par statut
const sortedTodos = todoList.toSorted((a, b) => a.done - b.done);
          </code></pre>

          <div class="alert alert-success">
            <strong>✅ Avantages :</strong>
            <ul>
              <li>Code plus lisible et expressif</li>
              <li>Moins d'erreurs liées à la mutation</li>
              <li>Compatibilité avec les patterns modernes (Redux, React hooks)</li>
              <li>Performance optimisée par les moteurs JS</li>
            </ul>
          </div>

          <h3>Support navigateur :</h3>
          <p>Ces méthodes sont supportées dans :</p>
          <ul>
            <li>Chrome 110+</li>
            <li>Firefox 115+</li>
            <li>Safari 16+</li>
            <li>Node.js 20+</li>
          </ul>

          <div class="alert alert-warning">
            <strong>⚠️ Polyfill :</strong> Pour les navigateurs plus anciens, utilisez des polyfills ou des bibliothèques comme Lodash/fp.
          </div>
        `
      }
    ],
    createdAt: "2024-01-03",
    updatedAt: "2024-01-10"
  }
];

export const mockCategories = [
  { id: 1, name: "Frontend", slug: "frontend", color: "#3B82F6", count: 2 },
  { id: 2, name: "Backend", slug: "backend", color: "#10B981", count: 1 },
  { id: 3, name: "DevOps", slug: "devops", color: "#F59E0B", count: 1 },
  { id: 4, name: "JavaScript", slug: "javascript", color: "#EF4444", count: 1 },
  { id: 5, name: "Mobile", slug: "mobile", color: "#8B5CF6", count: 0 },
  { id: 6, name: "Base de données", slug: "database", color: "#06B6D4", count: 0 }
];

export const mockUserProgress = {
  userId: 1,
  formationsInProgress: [
    {
      formationId: 1,
      progress: 45,
      completedLessons: [1, 2],
      lastLesson: 3,
      timeSpent: "2h 15min",
      startedAt: "2024-01-18"
    },
    {
      formationId: 3,
      progress: 20,
      completedLessons: [9],
      lastLesson: 10,
      timeSpent: "45min",
      startedAt: "2024-01-20"
    }
  ],
  completedFormations: [
    {
      formationId: 5,
      completedAt: "2024-01-15",
      grade: "A+",
      certificate: true
    }
  ],
  totalTimeSpent: "18h 30min",
  certificatesEarned: 1,
  currentStreak: 5
};

export const mockInstructors = [
  {
    id: 1,
    name: "Jonathan Boyer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Développeur Full-Stack avec 10 ans d'expérience, créateur de Grafikart",
    specialties: ["React", "Laravel", "JavaScript", "PHP"],
    formationsCount: 25,
    studentsCount: 15000,
    rating: 4.9,
    social: {
      twitter: "@grafikart_fr",
      github: "Grafikart",
      website: "https://grafikart.fr"
    }
  },
  {
    id: 2,
    name: "Marie Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    bio: "Expert Vue.js et formateur passionné, consultante frontend",
    specialties: ["Vue.js", "TypeScript", "CSS", "UX/UI"],
    formationsCount: 8,
    studentsCount: 4200,
    rating: 4.8
  },
  {
    id: 3,
    name: "Pierre Martin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "DevOps Engineer et consultant en conteneurisation",
    specialties: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    formationsCount: 12,
    studentsCount: 3800,
    rating: 4.7
  }
];