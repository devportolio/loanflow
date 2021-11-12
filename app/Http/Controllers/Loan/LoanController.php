<?php

namespace App\Http\Controllers\Loan;

use App\Http\Controllers\Controller;
use App\Services\LoanService;
use App\Http\Requests\Loan\LoanRequest;
use App\Models\Loan;

class LoanController extends Controller
{
    public function __construct(LoanService $service)
    {
        $this->service = $service;
    }

    public function index()
    { 
        return $this->success($this->service->allLoans());  
    }

    public function lending()
    { 
        return $this->success($this->service->allLending());  
    }

    public function show(Loan $loan)
    { 
        return $this->success($this->service->getOne($loan));  
    }

    public function store(LoanRequest $loan)
    {
        return $this->success($this->service->store($loan));
    }

    public function startLoan($id)
    {
        $loan = Loan::findOrFail($id);
        return $this->success($this->service->startLoan($loan));
    }
}
