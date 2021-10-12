<?php

use Illuminate\Support\Facades\Route;

Route::group(['as' => 'auth.', 'namespace' => 'User'], function() {
    Route::post('register', 'AuthController@register')->name('register');
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('logout', 'AuthController@logout')->name('logout')->middleware('auth:sanctum');
});

Route::group(['namespace' => 'User'], function() {
    Route::post('forgot-password', 'PasswordController@forgotPassword')->name('forgot-password');
    Route::post('reset-password', 'PasswordController@resetPassword')->name('reset-password');
    Route::get('verify-email/{id}/{hash}', 'EmailVerificationController@verify')->name('verification.verify')->middleware('auth:sanctum');
});

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('me', 'User\UserController@show')->name('user');
    
    // Payment method routes
    Route::apiResource('payment-methods', 'Payment\PaymentMethodController', ['except' => ['update']]);
    Route::post('payment-methods/{id}', 'Payment\PaymentMethodController@update');

    // Loan routes
    Route::apiResource('loans', 'Loan\LoanController', ['only' =>['index', 'store']]);
});