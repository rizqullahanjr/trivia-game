<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace App\Http\Controllers\api;

/*
 * Google Controller
 */

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GoogleController extends Controller
{
    /*
     * Gets a google client
     *
     * @return \Google_client
     */
    private function getClient():\Google_Client {
        // load our config.json that contains our credentials for accessing google's api as a json string
        $configJson = base_path().'/config.json';

        // define an application name
        $applicationName = 'triviaGame';

        // create the client
        $client = new \Google_Client();
        $client->setApplicationName($applicationName);
        $client->setAuthConfig($configJson);
        $client->setAccessType('offline'); // necessary for getting the refresh token
        $client->setApprovalPrompt('force'); // necessary for getting the refresh token

        // scopes determine what google endpoints we can access
        $client->setScopes(
            [
                \Google\Service\Oauth2::USERINFO_PROFILE,
                \Google\Service\Oauth2::USERINFO_EMAIL,
                \Google\Service\Oauth2::OPENID,
                \Google\Service\Drive::DRIVE_METADATA_READONLY // allow reading of google drive metadata
            ]
        );
        $client->setIncludeGrantedScopes(true);
        return $client;
    }

    /*
     * Return the url of the google auth.
     * FE should call this and then direct to this url.
     *
     * @return JsonResponse
     *
     */
    public function getAuthUrl(Request $request):JsonResponse
    {
        /*
         * Create google client
         */
        $client = $this->getClient();

        /**
         * Generate the url at google we redirect to
         */
        $authUrl = $client->createAuthUrl();

        return response()->json($authUrl, 200);
    }

    /**
     * Login and register
     * Gets registration data by calling google Oauth2 service
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function postLogin(Request $request):JsonResponse
    {
        /**
         * Get auth code from the query string
         * Url decode if necessary
         */
        $authCode = urldecode($request->input('auth_code'));

        /**
         * Google client
         */
        $client = $this->getClient();

        /**
         * Exchange auth code for access token
         *
         */
        $accessToken =$client->fetchAccessTokenWithAuthCode($authCode);

        /**
         * Set the access token with google. nb json
         */

        $client->setAccessToken($accessToken['access_token']);

        /**
         * Get user's data from google
         */
        $service = new \Google\Service\Oauth2($client);
        $userFromGoogle = $service->userinfo->get();

        /**
         * Select user if already exists
         */
        $user = User::where('provider_name', '=', 'google')
            ->where('provider_id', '=', $userFromGoogle->id)
            ->first();

        /**
         *
         */
        if (!$user) {
            $user = User::create([
                'provider_id' => $userFromGoogle->id,
                'provider_name' => 'google',
                'google_access_token_json' => json_encode($accessToken),
                'name' => $userFromGoogle->name,
                'email' => $userFromGoogle->email,
                //'avatar' => $providerUser->picture,
            ]);
        }

        /**
         * Save new access token from existing user
         */
        else {
            $user->google_access_token_json = json_encode($accessToken['access_token']);
            $user->save();
        }

        /**
         * Log in and return token
         * HTTP 201
         */
        $token = $user->createToken("Google")->accessToken;
        return response()->json($accessToken, 201);
    }

//    /**
//     * Returns a google client that is logged into the current user
//     *
//     * @return \Google_Client
//     */
//    private function getUserClient():\Google_Client
//    {
//        /**
//         * Get Logged in user
//         */
//        $user = User::where('id', '=', auth()->guard('api')->user()->id);
//
//        /**
//         * Strip slashes from the access token json
//         *
//         */
//        $accessTokenJson = stripslashes($user->google_access_token_json);
//
//        /**
//         * Get client and set access token
//         */
//
//
//
//    }
}
