export const formations = [
  {
    id: 1,
    title: 'HTML/CSS Fondamentaux',
    description: 'Apprenez les bases du développement web avec HTML et CSS',
    duration: '6 semaines',
    level: 'Débutant',
    color: 'from-orange-500 to-red-500',
    icon: '🌐',
    totalExercises: 12,
    completedExercises: 0
  },
  {
    id: 2,
    title: 'JavaScript Moderne',
    description: 'Maîtrisez JavaScript ES6+ et les concepts avancés',
    duration: '8 semaines',
    level: 'Intermédiaire',
    color: 'from-yellow-500 to-orange-500',
    icon: '⚡',
    totalExercises: 15,
    completedExercises: 0
  },
  {
    id: 3,
    title: 'React Développement',
    description: 'Créez des applications web modernes avec React',
    duration: '10 semaines',
    level: 'Avancé',
    color: 'from-blue-500 to-cyan-500',
    icon: '⚛️',
    totalExercises: 20,
    completedExercises: 0
  },
  {
    id: 4,
    title: 'Node.js Backend',
    description: 'Développez des APIs robustes avec Node.js',
    duration: '8 semaines',
    level: 'Intermédiaire',
    color: 'from-green-500 to-emerald-500',
    icon: '🚀',
    totalExercises: 18,
    completedExercises: 0
  }
];

export const exercises = [
  // HTML/CSS Exercices
  {
    id: 1,
    formationId: 1,
    title: 'Structure HTML de base',
    description: 'Créez votre première page HTML avec les éléments essentiels',
    difficulty: 'Facile',
    estimatedTime: '30 min',
    type: 'Pratique',
    status: 'available',
    instructions: `
# Structure HTML de base

## Objectif
Créer une page HTML complète avec la structure de base et les éléments essentiels.

## Instructions
1. Créez un fichier \`index.html\`
2. Ajoutez la déclaration DOCTYPE HTML5
3. Structurez votre page avec les balises \`<html>\`, \`<head>\`, et \`<body>\`
4. Dans le \`<head>\`, ajoutez :
   - Un titre pour la page
   - L'encodage de caractères UTF-8
   - Une description meta
5. Dans le \`<body>\`, créez :
   - Un en-tête \`<h1>\` avec votre nom
   - Un paragraphe de présentation
   - Une liste de vos hobbies

## Critères de réussite
- [x] Structure HTML valide
- [x] Titre de page personnalisé
- [x] Contenu organisé et lisible
- [x] Validation HTML sans erreurs
    `,
    resources: [
      { title: 'MDN HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { title: 'HTML5 Cheat Sheet', url: 'https://htmlcheatsheet.com/' }
    ],
    codeTemplate: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><!-- Votre titre ici --></title>
</head>
<body>
    <!-- Votre contenu ici -->
</body>
</html>`,
    completed: false
  },
  {
    id: 2,
    formationId: 1,
    title: 'Styles CSS de base',
    description: 'Appliquez vos premiers styles CSS pour améliorer l\'apparence',
    difficulty: 'Facile',
    estimatedTime: '45 min',
    type: 'Pratique',
    status: 'locked',
    instructions: `
# Styles CSS de base

## Objectif
Appliquer des styles CSS pour améliorer l'apparence de votre page HTML.

## Instructions
1. Créez un fichier \`styles.css\`
2. Liez le CSS à votre HTML
3. Stylisez les éléments suivants :
   - Police de caractères pour toute la page
   - Couleurs pour les titres
   - Espacement et marges
   - Couleur de fond
4. Ajoutez des styles pour :
   - Les liens (couleur, hover)
   - Les listes (style des puces)
   - Un effet d'ombre sur un élément

## Critères de réussite
- [x] CSS correctement lié au HTML
- [x] Styles cohérents et lisibles
- [x] Utilisation de sélecteurs variés
- [x] Page visuellement améliorée
    `,
    resources: [
      { title: 'CSS Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { title: 'CSS Selectors', url: 'https://www.w3schools.com/css/css_selectors.asp' }
    ],
    codeTemplate: `/* styles.css */
body {
    /* Vos styles ici */
}

h1 {
    /* Styles pour le titre */
}

/* Ajoutez d'autres sélecteurs */`,
    completed: false
  },
  {
    id: 3,
    formationId: 1,
    title: 'Mise en page Flexbox',
    description: 'Utilisez Flexbox pour créer des mises en page flexibles',
    difficulty: 'Moyen',
    estimatedTime: '60 min',
    type: 'Pratique',
    status: 'locked',
    instructions: `
# Mise en page Flexbox

## Objectif
Maîtriser les bases de Flexbox pour créer des mises en page modernes.

## Instructions
1. Créez une page avec header, main et footer
2. Utilisez Flexbox pour :
   - Centrer le contenu verticalement et horizontalement
   - Créer une navbar avec éléments espacés
   - Organiser des cartes en grille flexible
3. Implémentez :
   - Un header avec logo et navigation
   - Une section principale avec 3 cartes
   - Un footer collé en bas de page

## Critères de réussite
- [x] Utilisation correcte de display: flex
- [x] Propriétés justify-content et align-items
- [x] Layout responsive avec flex-wrap
- [x] Footer toujours en bas de page
    `,
    resources: [
      { title: 'Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
      { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/' }
    ],
    codeTemplate: `/* Flexbox Template */
.header {
    display: flex;
    /* Ajoutez vos propriétés */
}

.main {
    display: flex;
    /* Configuration flex */
}

.footer {
    /* Footer sticky */
}`,
    completed: false
  },

  // JavaScript Exercices
  {
    id: 4,
    formationId: 2,
    title: 'Variables et Types de données',
    description: 'Découvrez les variables et types de données en JavaScript',
    difficulty: 'Facile',
    estimatedTime: '40 min',
    type: 'Pratique',
    status: 'available',
    instructions: `
# Variables et Types de données

## Objectif
Comprendre les variables, const, let et les différents types de données JavaScript.

## Instructions
1. Déclarez des variables avec \`let\`, \`const\` et \`var\`
2. Créez des exemples pour chaque type :
   - String (chaîne de caractères)
   - Number (nombre)
   - Boolean (booléen)
   - Array (tableau)
   - Object (objet)
3. Utilisez \`typeof\` pour vérifier les types
4. Créez une fonction qui affiche les informations d'une personne

## Critères de réussite
- [x] Utilisation correcte de let/const
- [x] Exemples de tous les types de base
- [x] Fonction fonctionnelle
- [x] Console.log pour tester le code
    `,
    resources: [
      { title: 'JavaScript Variables', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let' },
      { title: 'Data Types', url: 'https://javascript.info/types' }
    ],
    codeTemplate: `// Variables et types
let nom = '';
const age = 0;
var isStudent = true;

// Votre code ici

function afficherPersonne(nom, age) {
    // Implémentez la fonction
}

// Tests
console.log(typeof nom);`,
    completed: false
  },
  {
    id: 5,
    formationId: 2,
    title: 'Fonctions et Scope',
    description: 'Maîtrisez les fonctions JavaScript et la portée des variables',
    difficulty: 'Moyen',
    estimatedTime: '50 min',
    type: 'Pratique',
    status: 'locked',
    instructions: `
# Fonctions et Scope

## Objectif
Comprendre les fonctions, les paramètres, le retour de valeurs et la portée.

## Instructions
1. Créez des fonctions de différentes manières :
   - Déclaration de fonction
   - Expression de fonction
   - Fonction fléchée (arrow function)
2. Implémentez une calculatrice avec :
   - Addition, soustraction, multiplication, division
   - Fonction pour valider les entrées
3. Démontrez le scope (portée) :
   - Variables globales vs locales
   - Block scope avec let/const

## Critères de réussite
- [x] 3 types de déclarations de fonction
- [x] Calculatrice fonctionnelle
- [x] Gestion d'erreurs basique
- [x] Exemples de scope clairs
    `,
    resources: [
      { title: 'Functions Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions' },
      { title: 'Arrow Functions', url: 'https://javascript.info/arrow-functions-basics' }
    ],
    codeTemplate: `// Déclaration de fonction
function addition(a, b) {
    return a + b;
}

// Expression de fonction
const soustraction = function(a, b) {
    // Votre code
};

// Fonction fléchée
const multiplication = (a, b) => {
    // Votre code
};

// Calculatrice
function calculer(operation, a, b) {
    // Implémentez ici
}`,
    completed: false
  },

  // React Exercices
  {
    id: 6,
    formationId: 3,
    title: 'Premier Composant React',
    description: 'Créez votre premier composant React fonctionnel',
    difficulty: 'Moyen',
    estimatedTime: '45 min',
    type: 'Projet',
    status: 'available',
    instructions: `
# Premier Composant React

## Objectif
Créer et comprendre les composants React de base avec JSX.

## Instructions
1. Créez un composant \`Profil\` qui affiche :
   - Photo de profil
   - Nom et prénom
   - Description courte
   - Liste de compétences
2. Utilisez les props pour passer les données
3. Stylisez avec CSS modules ou classes
4. Créez plusieurs instances avec des données différentes

## Critères de réussite
- [x] Composant fonctionnel valide
- [x] Utilisation correcte des props
- [x] JSX bien structuré
- [x] Réutilisabilité démontrée
    `,
    resources: [
      { title: 'React Components', url: 'https://react.dev/learn/your-first-component' },
      { title: 'JSX Guide', url: 'https://react.dev/learn/writing-markup-with-jsx' }
    ],
    codeTemplate: `import React from 'react';

function Profil({ nom, prenom, description, competences, photo }) {
    return (
        <div className="profil">
            {/* Votre JSX ici */}
        </div>
    );
}

export default Profil;`,
    completed: false
  }
];

export const getFormationById = (id) => {
  return formations.find(formation => formation.id === parseInt(id));
};

export const getExercisesByFormation = (formationId) => {
  return exercises.filter(exercise => exercise.formationId === parseInt(formationId));
};

export const getExerciseById = (id) => {
  return exercises.find(exercise => exercise.id === parseInt(id));
};

// Simuler un utilisateur connecté
export const currentUser = {
  id: 1,
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  avatar: 'https://placehold.co/100x100/6366f1/ffffff?text=JD',
  enrolledFormations: [1, 2, 3], // IDs des formations auxquelles l'utilisateur est inscrit
  joinDate: '2024-01-15',
  progress: {
    1: { completed: 0, total: 12 }, // HTML/CSS
    2: { completed: 0, total: 15 }, // JavaScript
    3: { completed: 0, total: 20 }  // React
  }
};