<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactMessageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ContactMessage::query()->orderBy('created_at', 'desc');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $messages = $query->paginate(20);

        return response()->json($messages);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:100',
            'subject' => 'required|string|max:200',
            'message' => 'required|string',
            'budget' => 'nullable|in:1k-5k,5k-10k,10k-25k,25k+',
            'timeline' => 'nullable|in:asap,1month,3months,flexible',
        ]);

        $contactMessage = ContactMessage::create([
            'name' => $request->name,
            'email' => $request->email,
            'company' => $request->company,
            'subject' => $request->subject,
            'message' => $request->message,
            'budget' => $request->budget,
            'timeline' => $request->timeline,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $contactMessage,
        ], 201);
    }

    public function show(ContactMessage $contactMessage): JsonResponse
    {
        return response()->json($contactMessage);
    }

    public function markAsRead(ContactMessage $contactMessage): JsonResponse
    {
        $contactMessage->update(['status' => 'read']);

        return response()->json(['message' => 'Message marked as read']);
    }

    public function markAsReplied(ContactMessage $contactMessage): JsonResponse
    {
        $contactMessage->update([
            'status' => 'replied',
            'replied_at' => now(),
        ]);

        return response()->json(['message' => 'Message marked as replied']);
    }

    public function destroy(ContactMessage $contactMessage): JsonResponse
    {
        $contactMessage->delete();

        return response()->json(['message' => 'Message deleted successfully']);
    }
}
