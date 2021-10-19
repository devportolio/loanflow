<?php

namespace App\Traits;

trait UpdateTotalPaid
{
    public static function bootUpdateLoan()
    {
        static::updated(function ($model) {
            $model->loan->updateTotalPaid();
        });
    }
}