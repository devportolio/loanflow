<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class UserFriendResource extends JsonResource
{  
    public function toArray($request)
    {
        $friend = $is_added = null;

        if (auth()->user()->id == $this->user_id) {
            $friend = new UserResource($this->friend);
            $is_added = true;
        } else {
            $friend = new UserResource($this->friend);
            $is_added = false;
        }

        return [
            'id' => $this->id,
            'friend' => $friend,
            'is_accepted' => !!$this->is_accepted,
            'is_added' => $is_added,
        ];
    }
}
