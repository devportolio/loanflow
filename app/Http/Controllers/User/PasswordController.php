<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\{ForgotPasswordRequest, ResetPasswordRequest};
use App\Services\UserService;

class PasswordController extends Controller
{
    public function __construct(UserService $service)
    {
        $this->userService = $service;
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        return $this->userService->forgotPassword($request->email);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        return $this->userService->resetPassword(
            $request->only('token', 'email', 'password')
        );
    }
}
