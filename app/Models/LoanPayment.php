<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\UpdateLoanInterest;

class LoanPayment extends Model
{
    use HasFactory, UpdateLoanInterest;

    protected $fillable = [
        'loan_id',
        'amount',
        'date_paid',
        'screenshot',
        'notes',
        'status'
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }

}
