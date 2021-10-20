<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;

class UserFriendRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // check if they're trying to add their own id
        if(request()->user_id == request()->friend_id) {
            abort(422, 'Cannot process with your own id');
        }

        // check if the user id is valid
        User::findOrFail(request()->friend_id); 

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'friend_id' => 'required|integer',
        ];
    }
}
