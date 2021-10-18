<?php

namespace App\Traits;

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

        return $this->amount + $total_interest - $this->total_paid;
    }


}