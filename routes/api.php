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

    Route::group(['namespace' => 'User'], function() {
        Route::get('me', 'UserController@show')->name('user');

        // User Friends
        Route::get('user-friends', 'UserFriendController@index');
        Route::get('user-friends/{email}/search', 'UserFriendController@search');
        Route::post('user-friends', 'UserFriendController@addFriend');
        Route::get('user-friends/{id}/accept', 'UserFriendController@accept');
        Route::get('user-friends/{id}/decline', 'UserFriendController@decline');
    });
    
    // Payment method routes
    Route::apiResource('payment-methods', 'Payment\PaymentMethodController', ['except' => ['update']]);
    Route::post('payment-methods/{id}', 'Payment\PaymentMethodController@update');

    Route::group(['namespace' => 'Loan'], function() {
        // Loan routes
        
        Route::apiResource('loans', 'LoanController', ['only' =>['index', 'store', 'show']]);
        Route::get('loans/{id}/start', 'LoanController@startLoan');

        // Loan payments
        Route::apiResource('loan-payments', 'LoanPaymentController', ['except' =>['destroy']]);

    });
});