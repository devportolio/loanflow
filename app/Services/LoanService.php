<?php

namespace App\Services;

use App\Http\Resources\LoanResource;
use App\Models\Loan;
use Carbon\Carbon;

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

    public function getOne($loan)
    {
        return new LoanResource($loan);
    }

    public function startLoan($loan)
    {
        if ($loan->status == Loan::PENDING) {

            $loan->update([
                'date_started' => Carbon::now()->toDateString(),
                'status' => Loan::IN_PROGRESS
            ]);

            return true;
        }

        return false;
    }
}
