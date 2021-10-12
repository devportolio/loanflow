<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\PaymentMethodService;
use App\Http\Requests\Payment\PaymentMethodRequest;

class PaymentMethodController extends Controller
{
    public function __construct(PaymentMethodService $service)
    {
        $this->service = $service;
        $this->middleware('user.append_id');
    }

    public function index()
    {
        return $this->success($this->service->all());
    }

    public function store(PaymentMethodRequest $request)
    {
        return $this->success($this->service->store());
    }

    public function show($id)
    {
        return $this->success($this->service->findById($id));
    }

    public function update(PaymentMethodRequest $request, $id)
    {
        return $this->success($this->service->update($id));
    }

    public function destroy($id)
    {
        return $this->success($this->service->delete($id));
    }
}
