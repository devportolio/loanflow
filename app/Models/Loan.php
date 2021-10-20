<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Payment;

use App\Traits\{
    LoanInterest,
    LoanBalance,
};

class Loan extends Model
{
    use HasFactory, LoanInterest, LoanBalance;

    const PENDING = 'pending';
    const IN_PROGRESS = 'in-progress';
    const COMPLETED = 'completed';
    const CANCELLED = 'cancelled';

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

    public function setFinalTotalInterest()
    {
        $this->update(['total_interest' => $this->getTotalInterest()]);
    }

    public function setStatusAsCompleted()
    {
        $this->update(['status' => self::COMPLETED]);
    }
}
