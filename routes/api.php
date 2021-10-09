<?php

use Illuminate\Support\Facades\Route;

Route::group(['as' => 'auth.'], function() {
    Route::post('register', 'User\AuthController@register')->name('register');
    Route::post('login', 'User\AuthController@login')->name('login');
    Route::post('logout', 'User\AuthController@logout')->name('logout')->middleware('auth:sanctum');
});

Route::post('forgot-password', 'User\PasswordController@forgotPassword')->name('forgot-password');
Route::post('reset-password', 'User\PasswordController@resetPassword')->name('reset-password');

Route::get('verify-email/{id}/{hash}', 'User\EmailVerificationController@verify')->name('verification.verify')->middleware('auth:sanctum');