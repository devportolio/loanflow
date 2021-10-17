<?php

namespace App\Services;

use App\Http\Resources\LoanResource;
use App\Models\Loan;

class LoanService
{

    public function store($loan)
    {
        $loan_created = Loan::create($loan->validated());
        return new LoanResource($loan_created);
    }

    public function all()
    {
        $loans = Loan::where('user_id', request()->user_id)->get();
        return LoanResource::collection($loans);
    }
}
