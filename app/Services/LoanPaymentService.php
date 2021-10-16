<?php

namespace App\Services;

use App\Models\LoanPayment;
use App\Http\Resources\LoanPaymentResource;
use App\Traits\FileUpload;

class LoanPaymentService
{
    use FileUpload;

    const FILE_KEY = 'screenshot';
    const FILE_PATH = 'images/payments/';

    public function all($loan_id = null)
    {
        $loan_payments = LoanPayment::query();

        if (!$loan_id) {
            $loan_payments = $loan_payments->get();
        } else {
            $loan_payments = $loan_payments->where('loan_id', $loan_id)->get();
        }

        return LoanPaymentResource::collection($loan_payments);
    }

    public function show($loan_payment)
    {
        return new LoanPaymentResource($loan_payment);
    }

    public function store($request)
    {
      $data = $request->except(self::FILE_KEY);

      $new_payment = LoanPayment::create($data);

      if ($new_payment && $request->hasFile(self::FILE_KEY)) {
        $new_payment = $this->getUpdatedPath($new_payment, self::FILE_KEY, self::FILE_PATH);
      }

      return new LoanPaymentResource($new_payment);
    }
}
