<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class LoanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'lender_id' => $this->lender_id,
            'amount' => $this->amount,
            'frequency' => $this->frequency,
            'duration' => $this->duration,
            'rate' => $this->rate,
            'total_interest' => $this->getTotalInterest(),
            'has_interest' => $this->has_interest,
            'date_started' => $this->date_started,
            'type' => $this->type,
            'amount_to_pay' => $this->getAmountToPay(),
            'no_of_payment' => $this->no_of_payment,
            'total_paid' => $this->getTotalPaid(),
            'balance' => $this->getLoanBalance(),
            'status' => $this->status
        ];

        if ($this->has_interest != 1) {
            $data = Arr::except($data, ['rate', 'duration', 'frequency', 'type', 'no_of_payment']);
        }

        return $data;
    }
}
