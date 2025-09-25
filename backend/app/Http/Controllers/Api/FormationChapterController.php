<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormationChapter;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FormationChapterController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = FormationChapter::with(['formation', 'lessons']);

        // Filtres
        if ($request->has('formation_id')) {
            $query->where('formation_id', $request->formation_id);
        }

        if ($request->has('published_only') && $request->boolean('published_only')) {
            $query->published();
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Tri
        switch ($request->get('sort', 'order')) {
            case 'title':
                $query->orderBy('title');
                break;
            case 'duration':
                $query->orderBy('duration_minutes', 'desc');
                break;
            case 'created':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('sort_order');
                break;
        }

        $chapters = $query->get();

        return response()->json($chapters);
    }

    public function show(FormationChapter $formationChapter): JsonResponse
    {
        $formationChapter->load(['formation', 'lessons' => function($query) {
            $query->published()->orderBy('sort_order');
        }]);

        return response()->json($formationChapter);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
            'duration_minutes' => 'nullable|integer|min:0',
            'is_published' => 'boolean'
        ]);

        $chapter = FormationChapter::create($request->all());
        $chapter->load(['formation', 'lessons']);

        return response()->json($chapter, 201);
    }

    public function update(Request $request, FormationChapter $formationChapter): JsonResponse
    {
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
            'duration_minutes' => 'nullable|integer|min:0',
            'is_published' => 'boolean'
        ]);

        $formationChapter->update($request->all());
        $formationChapter->load(['formation', 'lessons']);

        return response()->json($formationChapter);
    }

    public function destroy(FormationChapter $formationChapter): JsonResponse
    {
        $formationChapter->delete();

        return response()->json(['message' => 'Chapitre supprimé avec succès']);
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'chapters' => 'required|array',
            'chapters.*.id' => 'required|exists:formation_chapters,id',
            'chapters.*.sort_order' => 'required|integer|min:0'
        ]);

        foreach ($request->chapters as $chapterData) {
            FormationChapter::where('id', $chapterData['id'])
                ->update(['sort_order' => $chapterData['sort_order']]);
        }

        return response()->json(['message' => 'Ordre des chapitres mis à jour avec succès']);
    }

    public function publish(FormationChapter $formationChapter): JsonResponse
    {
        $formationChapter->update(['is_published' => true]);

        return response()->json([
            'message' => 'Chapitre publié avec succès',
            'chapter' => $formationChapter
        ]);
    }

    public function unpublish(FormationChapter $formationChapter): JsonResponse
    {
        $formationChapter->update(['is_published' => false]);

        return response()->json([
            'message' => 'Chapitre dépublié avec succès',
            'chapter' => $formationChapter
        ]);
    }
}