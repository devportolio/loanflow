<?php

namespace App\Traits;

trait UpdateLoanInterest
{
    public static function bootUpdateLoanInterest()
    {
        static::updated(function ($model) {
            logger('here again');
            // get the associated loan
            $loan = $model->fresh()->loan;

            logger(json_encode($model->fresh()));

            // check if loan balance is 0 or less
            logger($loan->getLoanBalance());
            if ($loan->getLoanBalance() <= 0) {
                //set total interest
                $loan->setFinalTotalInterest();

                //set status to completed
                $loan->setStatusAsCompleted();
            }

            $loan->updateTotalPaid();
        });
    }
}