<?php /** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace App\Http\Controllers;


use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AvatarController extends Controller
{
    public function findAllFree(): JsonResponse
    {
        $avatars = DB::table('avatars')->where('cost', '=', 0)
            ->get();

        return response()->json($avatars);
    }

    public function findAll(): JsonResponse
    {
        $avatars = DB::table('avatars')->get();

        return response()->json($avatars);
    }

    public function findById(Request $request): JsonResponse
    {
        $id = $request->route('id');

        $avatars = DB::table('avatars')->where('id', '=', $id)->first();

        return response()->json($avatars);
    }

    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'required|file',
            'cost' => 'required|integer'
        ]);

        $imageUrl = Cloudinary::upload($validated['image']->getRealPath(), [
            'folder' => 'trivia-game-avatar'
        ]);

        $isCreated = DB::table('avatars')->insert([
            'cost' => $validated['cost'],
            'image' => $imageUrl->getSecurePath()
        ]);

        if($isCreated) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }

    }

    public function update(Request $request): JsonResponse
    {
        $id = $request->route('id');
        $validated = $request->validate([
            'image' => 'required|file',
            'cost' => 'required|integer'
        ]);

        // delete old image
        $image = DB::table('avatars')->where('id', '=', $id)
            ->value('image');

        $array = explode('/', $image);
        $oldFile = explode('.', $array[sizeof($array)-1]);
        Cloudinary::destroy('trivia-game-avatar/'.$oldFile[0]);


        $imageUrl = Cloudinary::upload($validated['image']->getRealPath(), [
            'folder' => 'trivia-game-avatar'
        ]);
        $rowAffected = DB::table('avatars')->where('id', '=', $id)->update([
            'cost' => $validated['cost'],
            'image' => $imageUrl->getSecurePath()
        ]);

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }

    public function delete(Request $request): JsonResponse
    {
        $id = $request->route('id');

        // delete image on cloudinary
        $image = DB::table('avatars')->where('id', '=', $id)
            ->value('image');
        $array = explode('/', $image);
        $oldFile = explode('.', $array[sizeof($array)-1]);
        Cloudinary::destroy('trivia-game-avatar/'.$oldFile[0]);

        $rowAffected = DB::table('avatars')->where('id', '=', $id)->delete();

        if($rowAffected == 1) {
            return response()->json(['message' => 'success']);
        } else {
            return response()->json(['message' => 'failed'], 500);
        }
    }
}

