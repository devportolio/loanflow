<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\LoginRequest;
use App\Services\UserService;

class AuthController extends Controller
{
    public function __construct(UserService $service)
    {
        $this->userService = $service;
    }

    public function register(RegisterRequest $request)
    {
        return $this->userService->createUser($request->all());
    }

    public function login(LoginRequest $request)
    {
        return $this->userService->login($request->all());
    }

    public function logout()
    {
        return $this->userService->logout();
    }
}
