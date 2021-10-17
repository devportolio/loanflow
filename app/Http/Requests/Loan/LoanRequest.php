<?php

namespace App\Http\Requests\Loan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use App\Enums\Interest;

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
            'type' => ['required', Rule::in([Interest::FIXED, Interest::FLEXIBLE])],
            'duration' => 'required|integer',
            'frequency' => ['required', Rule::in([Interest::DAILY, Interest::WEEKLY, Interest::MONTHLY, Interest::YEARLY])],
            'rate' => 'required|integer',
            'no_of_payment' => 'required|integer|min:1',
            'has_interest' => 'required|boolean'
        ];

        if (request()->get('has_interest') != 1) {
            $base_rules = Arr::only($base_rules, ['user_id', 'lender_id', 'amount', 'has_interest']);
        }

        if (request()->get('type') == Interest::FLEXIBLE) {
            $base_rules = Arr::except($base_rules, ['no_of_payment']);
        }

        return $base_rules;
    
    }
}
