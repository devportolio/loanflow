<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

use App\Models\User;
use App\Http\Resources\UserResource;
use App\Notifications\EmailVerification;

class UserService
{

    public function getAuthUser()
    {
        return new UserResource(auth()->user());
    }

    private function getAccessToken($user)
    {
        return $user->createToken('Access Token')->plainTextToken;
    }

    private function getAuthResponse($user)
    {
        return [
            'user' => new UserResource($user),
            'access_token' => $this->getAccessToken($user)
        ];
    }

    public function createUser($data)
    {
        try {

            DB::beginTransaction();
    
            $user = User::create($data);
    
            // Send email verification
            $user->sendEmailVerificationNotification();
    
            DB::commit();

            return $this->getAuthResponse($user);
        } catch (\Exception $e) {
            DB::rollBack(); 
            throw new \Exception("Unable to register");
        }
    }

    public function login($data)
    {
        if (!auth()->attempt($data)) {
             throw new \Exception("Invalid Credentials");
        }

        return $this->getAuthResponse(auth()->user());
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logout Successfully'
        ];
    }

    public function forgotPassword($email)
    {
        if (Password::sendResetLink(compact('email')) == Password::RESET_LINK_SENT) {

            return ['message' => 'Password reset link sent'];
        }
        
        throw new \Exception("Unable to send link"); 

    }

    public function resetPassword($data)
    {
        $status = Password::reset(
            $data,
            function($user) use ($data) {
                $user->update([
                    'password' => $data['password'],
                    'remember_token' => Str::random(60)
                ]);

                $user->sendPasswordChangeNotification();
            }   
        );

        if ($status == Password::PASSWORD_RESET) {
            return ['message' => 'Password reset successfully'];
        }

        throw new \Exception("Token is already expired");
    }
}