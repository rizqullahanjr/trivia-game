<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function findAll(): JsonResponse
    {
        $quiz = DB::connection('mongodb')->table('quiz')
            ->get();

        return response()->json($quiz);
    }

    public function findById(Request $request): JsonResponse
    {
        $id = $request->route('id');

        $quiz = DB::connection('mongodb')->table('quiz')
            ->where('_id', '=', $id)->first();

        return response()->json($quiz);
    }

    public function update(Request $request): JsonResponse
    {
        $id = $request->route('id');
        $validated = $request->validate([
            'question' => 'required|string|max:100',
            'answer' => 'required|string'
        ]);

        $rowAffected = DB::connection('mongodb')->table('quiz')
            ->where('_id', '=', $id)->update([
                'Question' => $validated['question'],
                'Answer' => $validated['answer']
            ]);

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }


    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:100',
            'answer' => 'required|string'
        ]);

        $isCreated = DB::connection('mongodb')->table('quiz')->insert([
            'Question' => $validated['question'],
            'Answer' => $validated['answer'],
            'Options' => ['true', 'false']
        ]);

        if($isCreated) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }

    public function delete(Request $request): JsonResponse
    {
        $id = $request->route('id');

        $rowAffected = DB::connection('mongodb')->table('quiz')
            ->where('_id', '=', $id)->delete();

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }
}
