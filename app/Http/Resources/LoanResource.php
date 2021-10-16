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
            'has_interest' => $this->has_interest,
        ];

        if ($this->has_interest != 1) {
            $data = Arr::except($data, ['rate', 'duration', 'frequency',]);
        }

        return $data;
    }
}
