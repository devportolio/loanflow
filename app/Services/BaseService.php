<?php

namespace App\Services;

class BaseService
{
    protected function itemFoundCheck($item, $name = "Item")
    {
        if (!$item) {
            throw new \Exception($name.' is not found');
        }
    }
}