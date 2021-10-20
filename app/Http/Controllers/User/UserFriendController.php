<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserFriendService;
use App\Http\Requests\User\UserFriendRequest;
use App\Models\UserFriend;

class UserFriendController extends Controller
{
    public function __construct(UserFriendService $service)
    {
        $this->service = $service;  
        $this->middleware('user.append_id');  
    }

    public function index()
    {
        return  $this->success($this->service->getUserFriends());
    }

    public function search($email)
    {
        return  $this->success($this->service->searchUser($email));
    }

    public function addFriend(UserFriendRequest $request)
    {    
        return  $this->success($this->service->addFriend($request));
    }

    public function accept($id)
    {    
        return  $this->success($this->service->acceptFriend($id));
    }

    public function decline($id)
    {    
        return  $this->success($this->service->declineFriend($id));
    }
}
