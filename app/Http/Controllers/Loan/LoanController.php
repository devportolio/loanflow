<?php

namespace App\Http\Controllers\Loan;

use App\Http\Controllers\Controller;
use App\Services\LoanService;
use App\Http\Requests\Loan\LoanRequest;

class LoanController extends Controller
{
    public function __construct(LoanService $service)
    {
        $this->service = $service;
        $this->middleware('user.append_id');
    }

    public function index()
    { 
        return $this->success($this->service->all());  
    }

    public function store()
    {
        return $this->success($this->service->store());
    }
}
