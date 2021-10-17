<?php

namespace App\Traits;

use App\Enums\Interest;
use Carbon\Carbon;

trait LoanInterest
{
    
    public function getTotalInterest()
    {
        if ($this->date_started == null) {
            return 0;
        }


        /**
         * Formula: A = P (1 + rt)
         * A - final amount
         * P - principal amount
         * r - rate
         * t - time (no of day, week, month)
         * 
         */

         $principal_amount = $this->amount;
         $rate = $this->rate / 100;
         $time = $this->getTotalTime();

         logger("time: ". $time);

         $final_amount = $principal_amount * (1 + ($rate * $time));

         return $final_amount - $principal_amount;
    }

    private function getTotalTime()
    {
        $now = Carbon::now();
        $difference = 1.0;
        $date = null;

        switch($this->frequency) {
            case Interest::DAILY: 
                $difference = $now->floatDiffInDays($this->date_started);
                break;
            case Interest::WEEKLY: 
                $difference = $now->floatDiffInWeeks($this->date_started);
                break;
            case Interest::MONTHLY: 
                $difference = $now->floatDiffInMonths($this->date_started);
                break;
            case Interest::YEARLY: 
                $difference = $now->floatDiffInYears($this->date_started);
                break;
            default:
                $difference = 0;
        }

        return ceil(abs($difference));
    }

    public function getAmountToPay()
    {
        $amount = 0;

        if ($this->type == Interest::FIXED) {
            $interest = $this->amount * ($this->rate / 100) * $this->no_of_payment;
            $total = $this->amount + $interest;
            $amount = $total / $this->no_of_payment;
        }

        return ceil($amount);
    }
}