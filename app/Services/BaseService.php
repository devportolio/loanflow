<?php

namespace App\Services;

class BaseService
{
    protected function itemFoundCheck($item, $name = "Item")
    {
        if (!$item) {
            abort(404, $name.' is not found');
        }
    }
}