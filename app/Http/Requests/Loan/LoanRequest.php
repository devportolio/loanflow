<?php

namespace App\Http\Requests\Loan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class LoanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $base_rules = [
            'user_id' => 'required',
            'lender_id' => 'required',
            'amount' => 'required|integer',
            'duration' => 'required|integer',
            'rate' => 'required|integer',
            'has_interest' => 'required|boolean'
        ];

        if (request()->get('has_interest') != 1) {
            $base_rules = Arr::only($base_rules, ['user_id', 'lender_id', 'amount']);
        }

        return $base_rules;
    
    }
}
