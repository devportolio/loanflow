<?php

namespace App\Http\Controllers\Loan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Loan\LoanPaymentRequest;
use App\Services\LoanPaymentService;
use App\Models\LoanPayment;

class LoanPaymentController extends Controller
{
    public function __construct(LoanPaymentService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->success($this->service->all(request()->loan_id));
    }

    public function show(LoanPayment $loan_payment)
    {
        return $this->success($this->service->show($loan_payment));
    }

    public function store(LoanPaymentRequest $request)
    {
        return $this->success($this->service->store($request));
    }

    public function update(LoanPayment $loan_payment)
    {
        return $this->success($this->service->confirmStatus($loan_payment));
    }
}
