<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::with('profile');

        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $users = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($users);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user->load(['profile', 'enrollments.formation', 'exerciseProgress']));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'avatar' => 'nullable|string|max:500',
            'role' => 'required|in:admin,user',
            'is_active' => 'boolean',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => $request->avatar,
            'role' => $request->role,
            'join_date' => now()->toDateString(),
            'is_active' => $request->boolean('is_active', true),
        ]);

        return response()->json($user->load('profile'), 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'avatar' => 'nullable|string|max:500',
            'role' => 'required|in:admin,user',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('password');

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json($user->load('profile'));
    }

    public function destroy(User $user): JsonResponse
    {
        if ($user->isAdmin() && User::where('role', 'admin')->count() <= 1) {
            return response()->json([
                'message' => 'Cannot delete the last admin user'
            ], 422);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function dashboardStats(): JsonResponse
    {
        $stats = [
            'total_users' => User::where('is_active', true)->count(),
            'total_projects' => Project::count(),
            'featured_projects' => Project::where('featured', true)->count(),
            'total_formations' => Formation::where('is_active', true)->count(),
            'new_messages' => ContactMessage::where('status', 'new')->count(),
            'unread_messages' => ContactMessage::whereIn('status', ['new', 'read'])->count(),
            'recent_users' => User::orderBy('created_at', 'desc')->take(5)->get(),
            'recent_messages' => ContactMessage::orderBy('created_at', 'desc')->take(5)->get(),
        ];

        return response()->json($stats);
    }
}
