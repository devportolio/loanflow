<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\UserService;

class UserController extends Controller
{

    public function __construct(UserService $service)
    {
        $this->userService = $service;
    }

    public function show()
    {
        return $this->success($this->userService->getAuthUser());
    }
}
