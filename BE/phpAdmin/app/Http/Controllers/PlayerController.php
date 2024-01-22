<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PlayerController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $payload = auth()->payload();
        $id = $payload->get('sub');

        $validated = $request->validate([
            'avatar_id' => 'required|integer',
            'name' => 'required|string'
        ]);

        $avatar_image = DB::table('avatars')
            ->where('id', '=', $validated['avatar_id'])
            ->value('image');

        DB::table('players')->insert([
            'id' => $id,
            'name' => $validated['name'],
            'active_avatar' => $avatar_image
        ]);

        DB::table('user_avatars')->insert([
            'player_id' => $id, 'avatar_id' => $validated['avatar_id']
        ]);

        $player = DB::table('players')->where('id', '=', $id)->first();

        return response()->json($player);
    }

    public function findAll(): JsonResponse
    {
        $players = DB::table('players')->get();

        return response()->json($players);
    }

    public function findById(): JsonResponse
    {
        // get id from token
        $payload = auth()->payload();
        $id = $payload->get('sub');

        $player = DB::table('players')->where('id', '=', $id)->first();

        return response()->json($player);
    }

    public function findByIdAdmin(Request $request): JsonResponse
    {
        $id = $request->route("id");

        $player = DB::table('players')->where('id', '=', $id)->first();

        return response()->json($player);
    }

    public function addDiamond(Request $request): JsonResponse
    {
        $payload = auth()->payload();
        $id = $payload->get('sub');
        $validate = $request->validate(['diamond' => 'required|integer|min:0']);

        $rowAffected = DB::table('players')->where('id', '=', $id)
            ->increment('diamond', $validate['diamond']);

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }

    public function reduceDiamond(Request $request): JsonResponse
    {
        $payload = auth()->payload();
        $id = $payload->get('sub');
        $validate = $request->validate(['diamond' => 'required|integer|min:30']);

        $rowAffected = DB::table('players')->where('id', '=', $id)
            ->decrement('diamond', $validate['diamond']);

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }

    public function resetScore(Request $request): JsonResponse
    {
        $id = $request->route("id");

        $rowAffected = DB::table('players')->where('id', '=', $id)
            ->update(['highest_score' => 0, 'total_score' => 0]);

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }

    public function updateScore(Request $request): JsonResponse
    {
        $payload = auth()->payload();
        $id = $payload->get('sub');
        $validate = $request->validate(['score' => 'required|integer']);

        $oldScore = DB::table('players')->where('id','=',$id)
            ->value('highest_score');


        if($validate['score'] > $oldScore) {
            $rowAffected = DB::table('players')->where('id', '=', $id)
                ->update(['highest_score' => $validate['score']]);
            if($rowAffected == 0) return response()->json(['message' => 'failed'], 500);
        }

        $rowAffected = DB::table('players')->where('id', '=', $id)
            ->increment('total_score', $validate['score']);

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }

    public function updateAvatar(Request $request): JsonResponse
    {
        $payload = auth()->payload();
        $id = $payload->get('sub');
        $validate = $request->validate(['avatar_id' => 'required|integer']);

        $avatar_image = DB::table('avatars')
            ->where('id', '=', $validate['avatar_id'])
            ->value('image');

        $rowAffected = DB::table('players')->where('id', '=', $id)
            ->update(['active_avatar' => $avatar_image]);

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }

    public function buyAvatar(Request $request): JsonResponse
    {
        $payload = auth()->payload();
        $id = $payload->get('sub');
        $validate = $request->validate([
            'avatar_id' => 'required|integer',
            'cost' => 'required|integer'
        ]);

        $isCreated = DB::table('user_avatars')->insert([
            'player_id' => $id, 'avatar_id' => $validate['avatar_id']
        ]);
        if(!$isCreated) return response()->json(['message' => 'failed'], 500);

        $rowAffected = DB::table('players')->where('id', '=', $id)
            ->decrement('diamond', $validate['cost']);

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }

}
