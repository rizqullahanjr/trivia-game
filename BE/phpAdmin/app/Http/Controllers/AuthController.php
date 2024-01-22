<?php /** @noinspection PhpUnused */

/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace App\Http\Controllers;

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
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email'
        ]);

        DB::table('users')->insertOrIgnore([
            'name' => $validated['name'],
            'email' => $validated['email']
        ]);

        $id = DB::table('users')->where('email', '=', $validated['email'])
            ->value('id');

        $token = auth()->tokenById($id);

        if($token == null) {
            return response()->json(["message" => "failed create token"], 500);
        } else {
            return response()->json($token);
        }
    }

    public function adminLogin(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string'
        ]);

        if($validated['name'] != env('ADMIN_NAME')
            && $validated['password'] != env('ADMIN_PASSWORD')) {
            return response()->json(["message" => "error"], 400);
        }

        $token = auth()->tokenById("1");

        if($token == null) {
            return response()->json(["message" => "failed create token"], 500);
        } else {
            return response()->json($token);
        }
    }


    public function check(): JsonResponse
    {
        return response()->json(['message' => 'valid']);
    }
}
