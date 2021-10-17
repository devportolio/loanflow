<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\LoanInterest;

class Loan extends Model
{
    use HasFactory, LoanInterest;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'lender_id',
        'amount',
        'frequency',
        'duration',
        'rate',
        'has_interest',
        'total_interest',
        'no_of_payment',
        'date_started',
        'type',
        'status'
    ];    

    
}
