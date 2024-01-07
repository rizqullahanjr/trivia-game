<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function _construct(): void
    {
        $this->middleware("auth:api", ['except' => ['login', 'adminLogin']]);
    }

    /**
     * get a JWT via given credentials
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $name = $request->input('name');
        $email = $request->input('email');



        DB::table('users')->insertOrIgnore([
            'name' => $name,
            'email' => $email
        ]);

        $user = DB::table('users')->whereRaw('email = ?', $email)->get();


        $credentials = [
            'id' => $user[0]->id,
            'name' => $name,
            'email' => $name,
        ];


        $token = auth()->tokenById($user[0]->id);

        if($token == null) {
            return response()->json(["message" => "failed create token"], 500);
        } else {
            return response()->json($token);
        }
    }

    public function check(Request $request)
    {
        return response()->json(['message' => 'valid']);
    }
}
