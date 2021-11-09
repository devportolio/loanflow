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
        $id = auth()->user()->id;
        $friends = UserFriend::with('friend', 'user')
            ->whereRaw("$id in (user_id, friend_id)")
            ->get();

        return UserFriendResource::collection($friends);
    }

    public function searchUser($email)
    {
        if (auth()->user()->email == $email) {
            abort(422, 'Cannot search own email');
        }

        // Search if the email is associated to a registered user
        $friend = User::where('email', $email)->first();
        $this->itemFoundCheck($friend, 'User');   
        
        return new UserResource($friend);
    }

    public function addFriend($request)
    {
        $friend = UserFriend::firstOrCreate($request->all());

        return new UserFriendResource($friend);
    }

    public function acceptFriend($id)
    {
        $friend = UserFriend::findOrFail($id);

        if (!$friend->is_accepted) {
            $friend->update(['is_accepted' => true]);
        }

        return $friend->wasChanged();
    }

    public function declineFriend($id)
    {
        $friend = UserFriend::findOrFail($id);

        return $friend->delete();

    }
}