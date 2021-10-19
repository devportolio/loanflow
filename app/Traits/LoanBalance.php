<?php

namespace App\Traits;
use App\Enums\Payment;

trait LoanBalance
{
    public function getLoanBalance()
    {
        /**
         * Formula: amount + total interest - total paid
         */

        $total_interest = method_exists($this, 'getTotalInterest')
                    ? $this->getTotalInterest()
                    : 0;

        return $this->amount + $total_interest - $this->getTotalPaid();
    }

    public function getTotalPaid()
    {
        return $this->status == self::COMPLETED
            ? $this->total_paid
            : $this->loanPayments()
                ->where('status', Payment::CONFIRMED)
                ->sum('amount');
    }
}