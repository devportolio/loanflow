<?php

namespace App\Traits;

trait UserRelations
{
    public function friends()
    {
        return $this->hasMany(\App\Models\UserFriend::class);
    }

    public function loans()
    {
        return $this->hasMany(\App\Models\Loan::class);
    }

    public function lending()
    {
        return $this->hasMany(\App\Models\Loan::class, 'lender_id', 'id');
    }
}