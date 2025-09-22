<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Models\FormationReview;
use App\Models\UserEnrollment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class FormationReviewController extends Controller
{
    public function index(Request $request, $formationSlug): JsonResponse
    {
        $formation = Formation::where('slug', $formationSlug)->firstOrFail();
        
        $query = $formation->reviews()->with('user');
        
        if ($request->has('rating')) {
            $query->byRating($request->rating);
        }
        
        if ($request->has('verified_only') && $request->boolean('verified_only')) {
            $query->verified();
        }
        
        if ($request->has('featured_only') && $request->boolean('featured_only')) {
            $query->featured();
        }
        
        $sortBy = $request->get('sort_by', 'newest');
        switch ($sortBy) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'helpful':
                $query->orderBy('helpful_count', 'desc');
                break;
            case 'rating_high':
                $query->orderBy('rating', 'desc');
                break;
            case 'rating_low':
                $query->orderBy('rating', 'asc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }
        
        $reviews = $query->paginate(10);
        
        $stats = [
            'total_reviews' => $formation->reviews()->count(),
            'average_rating' => $formation->reviews()->avg('rating'),
            'rating_distribution' => $formation->reviews()
                ->select('rating', DB::raw('count(*) as count'))
                ->groupBy('rating')
                ->orderBy('rating', 'desc')
                ->get()
                ->pluck('count', 'rating')
                ->toArray()
        ];

        return response()->json([
            'reviews' => $reviews,
            'stats' => $stats
        ]);
    }

    public function store(Request $request, $formationSlug): JsonResponse
    {
        $formation = Formation::where('slug', $formationSlug)->firstOrFail();
        $user = $request->user();
        
        $enrollment = UserEnrollment::where('user_id', $user->id)
            ->where('formation_id', $formation->id)
            ->first();
        
        if (!$enrollment) {
            return response()->json([
                'message' => 'Vous devez être inscrit à cette formation pour laisser un avis'
            ], 403);
        }
        
        $existingReview = FormationReview::where('user_id', $user->id)
            ->where('formation_id', $formation->id)
            ->first();
        
        if ($existingReview) {
            return response()->json([
                'message' => 'Vous avez déjà laissé un avis pour cette formation'
            ], 422);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:255',
            'comment' => 'required|string|max:2000',
            'pros' => 'array',
            'cons' => 'array'
        ]);

        $review = FormationReview::create([
            'user_id' => $user->id,
            'formation_id' => $formation->id,
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'pros' => $request->pros ?? [],
            'cons' => $request->cons ?? [],
            'is_verified_purchase' => true,
            'is_featured' => false,
            'helpful_count' => 0
        ]);

        $this->updateFormationRating($formation);

        return response()->json([
            'message' => 'Avis ajouté avec succès',
            'review' => $review->load('user')
        ], 201);
    }

    public function show(FormationReview $review): JsonResponse
    {
        $review->load(['user', 'formation']);
        
        return response()->json($review);
    }

    public function update(Request $request, FormationReview $review): JsonResponse
    {
        if ($review->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Vous ne pouvez modifier que vos propres avis'
            ], 403);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:255',
            'comment' => 'required|string|max:2000',
            'pros' => 'array',
            'cons' => 'array'
        ]);

        $review->update([
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'pros' => $request->pros ?? [],
            'cons' => $request->cons ?? []
        ]);

        $this->updateFormationRating($review->formation);

        return response()->json([
            'message' => 'Avis mis à jour avec succès',
            'review' => $review->load('user')
        ]);
    }

    public function destroy(Request $request, FormationReview $review): JsonResponse
    {
        if ($review->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Vous ne pouvez supprimer que vos propres avis'
            ], 403);
        }

        $formation = $review->formation;
        $review->delete();
        
        $this->updateFormationRating($formation);

        return response()->json([
            'message' => 'Avis supprimé avec succès'
        ]);
    }

    public function markHelpful(Request $request, FormationReview $review): JsonResponse
    {
        $user = $request->user();
        
        if ($review->user_id === $user->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas marquer votre propre avis comme utile'
            ], 422);
        }

        $review->increment('helpful_count');

        return response()->json([
            'message' => 'Avis marqué comme utile',
            'helpful_count' => $review->helpful_count
        ]);
    }

    public function getUserReview(Request $request, $formationSlug): JsonResponse
    {
        $formation = Formation::where('slug', $formationSlug)->firstOrFail();
        $user = $request->user();
        
        $review = FormationReview::where('user_id', $user->id)
            ->where('formation_id', $formation->id)
            ->with('user')
            ->first();

        if (!$review) {
            return response()->json([
                'message' => 'Aucun avis trouvé'
            ], 404);
        }

        return response()->json($review);
    }

    private function updateFormationRating(Formation $formation)
    {
        $averageRating = $formation->reviews()->avg('rating');
        $reviewsCount = $formation->reviews()->count();
        
        $formation->update([
            'rating' => round($averageRating, 1),
            'reviews_count' => $reviewsCount
        ]);
    }
}
