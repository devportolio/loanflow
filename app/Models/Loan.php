<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

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
        'running_interest',
        'date_started',
        'status'
    ];    
}
