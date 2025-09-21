<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
        $profile = $user->profile;

        if (!$profile) {
            $profile = UserProfile::create([
                'user_id' => $user->id,
            ]);
        }

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users,email,' . $request->user()->id,
            'avatar' => 'nullable|string|max:500',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'location' => 'nullable|string|max:100',
            'website' => 'nullable|url|max:255',
            'github' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'twitter' => 'nullable|url|max:255',
        ]);

        $user = $request->user();

        // Update user information
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'avatar' => $request->avatar,
        ]);

        // Update or create profile
        $profile = UserProfile::updateOrCreate([
            'user_id' => $user->id,
        ], [
            'bio' => $request->bio,
            'phone' => $request->phone,
            'location' => $request->location,
            'website' => $request->website,
            'github' => $request->github,
            'linkedin' => $request->linkedin,
            'twitter' => $request->twitter,
        ]);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user->fresh(),
            'profile' => $profile,
        ]);
    }
}
