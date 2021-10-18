<?php

namespace App\Services;

use App\Models\{LoanPayment, Loan};
use App\Http\Resources\LoanPaymentResource;
use App\Traits\FileUpload;
use App\Enums\Payment;

use DB;

class LoanPaymentService extends BaseService
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
        $data = $request->except([self::FILE_KEY]);

        $loan = Loan::find($request->loan_id);
        $this->itemFoundCheck($loan, 'Loan');

        DB::beginTransaction();
        $new_payment = $loan->loanPayments()->create($data);

        if ($new_payment && $request->hasFile(self::FILE_KEY)) {
            $new_payment = $this->getUpdatedPath($new_payment, self::FILE_KEY, self::FILE_PATH);
        }

        DB::commit();
        return new LoanPaymentResource($new_payment);
    }

    public function confirmStatus($loan_payment)
    {
        if (request()->status == Payment::CONFIRMED && $loan_payment->status == Payment::PENDING) {
            $loan_payment->status = Payment::CONFIRMED;
            $loan_payment->save();
            return true;
        }

        return false;
    }
}
