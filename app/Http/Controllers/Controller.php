<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController; 

class Controller extends BaseController
{
    protected function success($content)
    {
        return response()->json($content, 200);
    }
}
