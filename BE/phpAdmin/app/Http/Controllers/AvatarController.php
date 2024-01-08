<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AvatarController extends Controller
{
    public function _construct(): void
    {
        $this->middleware("auth:api", ['except' => ['get-all-free-avatar',
            'getAllFreeAvatar']]);
    }

    public function getAllFreeAvatar(Request $request): JsonResponse
    {
        $payload = auth()->payload();
        $id = $payload->get('sub');

        $avatars = DB::table('avatars')->where('cost', '=', 0)
            ->get();


        return response()->json($avatars);
    }
}

