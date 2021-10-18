<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\{LoanInterest, LoanBalance, UpdateLoan};
use App\Enums\Payment;

class Loan extends Model
{
    use HasFactory, LoanInterest, LoanBalance;

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
        'total_paid',
        'no_of_payment',
        'date_started',
        'type',
        'status'
    ];    

    public function loanPayments()
    {
        return $this->hasMany(LoanPayment::class);
    }

    public function updateTotalPaid()
    {
        $total_paid = $this->loanPayments()
            ->where('status', Payment::CONFIRMED)
            ->sum('amount');
        $this->update(['total_paid' => $total_paid]);
    }
}
