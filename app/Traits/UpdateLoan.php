<?php

namespace App\Traits;

trait UpdateLoan
{
    public static function bootUpdateLoan()
    {
  
        // static::created(function ($model) {
        //     $model->loan->updateTotalPaid();
        // });

        static::updated(function ($model) {
            $model->loan->updateTotalPaid();
        });
    }
}