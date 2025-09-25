<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Models\UserEnrollment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FormationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Formation::published()
            ->with(['category', 'chapters.lessons' => function ($query) {
                $query->published()->orderBy('sort_order');
            }]);
        if ($request->path() == "api/admin/formations") {
            $query = Formation::with(['category', 'chapters.lessons' => function ($query) {
                $query->orderBy('sort_order');
            }]);
        }


        // Filtres
        if ($request->has('category_id')) {
            $query->byCategory($request->category_id);
        }

        if ($request->has('level')) {
            $query->byLevel($request->level);
        }

        if ($request->has('is_free')) {
            if ($request->boolean('is_free')) {
                $query->free();
            }
        }

        if ($request->has('is_premium')) {
            if ($request->boolean('is_premium')) {
                $query->premium();
            }
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Tri
        switch ($request->get('sort', 'popular')) {
            case 'newest':
                $query->orderBy('published_at', 'desc');
                break;
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            default:
                $query->orderBy('students_count', 'desc');
                break;
        }

        $formations = $query->get();

        return response()->json($formations);
    }

    public function show(Request $request, $formationId): JsonResponse
    {
        $formation = Formation::where('slug', $formationId)->published()
            ->with([
                'category',
                'chapters' => fn($q) => $q->published()->orderBy('sort_order'),
                'chapters.lessons' => fn($q) => $q->published()->orderBy('sort_order'),
                'reviews' => fn($q) => $q->with('user')->latest()->limit(5),
            ])
            ->first();

        if ($request->is("api/admin/formations/*")) {
            $formation = Formation::with([
                'category',
                'chapters' => fn($q) => $q->published()->orderBy('sort_order'),
                'chapters.lessons' => fn($q) => $q->published()->orderBy('sort_order'),
                'reviews' => fn($q) => $q->with('user')->latest()->limit(5),
            ])
                ->findOrFail($formationId);
        }

        if (!$formation){
            return response()->json("Formation non trouvé", 404);
        }


        // Ajouter les statistiques
        $formation->total_lessons = $formation->lessons()->published()->count();
        $formation->total_duration = $formation->lessons()->published()->sum('estimated_time_minutes');

        return response()->json($formation);
    }

    public function featured(): JsonResponse
    {
        $formations = Formation::featured()
            ->published()
            ->with(['category'])
            ->limit(6)
            ->get();

        return response()->json($formations);
    }

    public function enroll(Request $request, $slug): JsonResponse
    {
        $user = $request->user();
        $formation = Formation::where('slug', $slug)->published()->firstOrFail();

        $enrollment = UserEnrollment::firstOrCreate([
            'user_id' => $user->id,
            'formation_id' => $formation->id,
        ], [
            'enrolled_at' => now(),
            'progress_percentage' => 0,
        ]);

        if ($enrollment->wasRecentlyCreated) {
            // Incrémenter le nombre d'étudiants
            $formation->increment('students_count');

            return response()->json([
                'message' => 'Inscription réussie à la formation',
                'enrollment' => $enrollment,
            ], 201);
        }

        return response()->json([
            'message' => 'Vous êtes déjà inscrit à cette formation',
            'enrollment' => $enrollment,
        ]);
    }

    public function myFormations(Request $request): JsonResponse
    {
        $user = $request->user();

        $enrollments = UserEnrollment::where('user_id', $user->id)
            ->with([
                'formation' => function ($query) {
                    $query->with(['category', 'instructor.user']);
                },
                'currentLesson'
            ])
            ->orderBy('last_accessed_at', 'desc')
            ->orderBy('enrolled_at', 'desc')
            ->get();

        return response()->json($enrollments);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:formations',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|url',
            'category_id' => 'required|exists:formation_categories,id',

            'level' => 'required|in:Débutant,Intermédiaire,Avancé,Expert',
            'price' => 'numeric|min:0',
            'is_free' => 'boolean',
            'is_premium' => 'boolean',
            'requirements' => 'array',
            'objectives' => 'array',
            'technologies' => 'array',
        ]);

        $formation = Formation::create($request->all());

        return response()->json($formation, 201);
    }

    public function update(Request $request, Formation $formation): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:formations,slug,' . $formation->id,
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|url',
            'category_id' => 'required|exists:formation_categories,id',

            'level' => 'required|in:Débutant,Intermédiaire,Avancé,Expert',
            'price' => 'numeric|min:0',
            'is_free' => 'boolean',
            'is_premium' => 'boolean',
            'requirements' => 'array',
            'objectives' => 'array',
            'technologies' => 'array',
        ]);

        $formation->update($request->all());

        return response()->json($formation);
    }

    public function destroy(Formation $formation): JsonResponse
    {
        $formation->delete();

        return response()->json(['message' => 'Formation supprimée avec succès']);
    }
}
