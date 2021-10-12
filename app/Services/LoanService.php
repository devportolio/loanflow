<?php

namespace App\Services;

use App\Http\Resources\LoanResource;
use App\Models\Loan;

class LoanService
{

    public function store()
    {
        $data = request()->except('status', 'running_interest');

        // Check if loan doesn't have an interest
        if (!$data['has_interest']) {
            $data = request()->only('user_id', 'lender_id', 'amount');
            request()->only('user_id', 'lender_id', 'amount')->validate();
        } else {
            request()->validate();
        }


        return Loan::create($data);
    }

    public function all()
    {
        return LoanResource::collection(Loan::all());
    }
}
