<?php

namespace App\Services;

use App\Http\Resources\PaymentMethodResource;
use App\Models\PaymentMethod;
use App\Traits\FileUpload;
use App\Services\BaseService;

class PaymentMethodService extends BaseService
{
    use FileUpload;

    const FILE_KEY = 'attachment';
    const FILE_PATH = 'images/payment_method/';

    public function all()
    {
        return PaymentMethodResource::collection(PaymentMethod::all());
    }

    public function findById($id)
    {
        $payment_method = PaymentMethod::findOrFail($id);
        return new PaymentMethodResource($payment_method);
    }

    public function store()
    {
        $data = request()->all();

        unset($data[self::FILE_KEY]);
        $new_method = PaymentMethod::create($data);

        if (!!$new_method && request()->hasFile(self::FILE_KEY)) {
            $new_method[self::FILE_KEY] = $this->upload(request(), $new_method->id, self::FILE_KEY, self::FILE_PATH);

            $new_method->save();
        }

        return $new_method->fresh();
    }

    public function update($id)
    {
        $data = request()->all();

        unset($data[self::FILE_KEY]);
        $existing_method = PaymentMethod::findOrFail($id);

        if (!!$existing_method && request()->hasFile(self::FILE_KEY)) {
            $data[self::FILE_KEY] = $this->upload(request(), $existing_method->id, self::FILE_KEY, self::FILE_PATH);
        } else {
            $data[self::FILE_KEY] = null;

            // Remove file if the request has no file attached.
            if (!!$existing_method[self::FILE_KEY]) {
                $this->removeFile($existing_method[self::FILE_KEY]);
            }
        }

        $existing_method->update($data);

        return $existing_method->fresh();
    }
}
