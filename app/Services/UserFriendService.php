<?php

namespace App\Services;
use App\Models\User;
use App\Models\UserFriend;
use App\Http\Resources\UserFriendResource;
use App\Http\Resources\UserResource;

class UserFriendService extends BaseService
{
    public function getUserFriends()
    {
        $friends = auth()->user()->friends()->with('user')->get();
        // return $friends;
        return UserFriendResource::collection($friends);
    }

    public function searchUser($email)
    {
        // Search if the email is associated to a registered user
        $friend = User::where('email', $email)->first();
        $this->itemFoundCheck($friend, 'User');   
        
        return new UserResource($friend);
    }

    public function addFriend($request)
    {
        $friend = UserFriend::firstOrCreate($request->all());

        return !!$friend;
    }

    public function acceptFriend($id)
    {
        $friend = UserFriend::findOrFail($id);

        $friend->update(['is_accepted' => true]);

        return $friend->wasChanged();
    }

    public function declineFriend($id)
    {
        $friend = UserFriend::findOrFail($id);

        if (!$friend->is_accepted) {

            return $friend->delete();
        }

        return false;

    }
}