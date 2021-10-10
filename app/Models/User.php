<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'mobile',
        'email_verified_at',
        'active',
        'photo_path'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\EmailVerification);
    }

    public function sendPasswordResetNotification($token)
    {
        $url = config('app.frontend_url')."/reset-password?token=".$token."&email=".$this->email;
        $this->notify(new \App\Notifications\ResetPasswordNotification($url));
    }

    public function sendPasswordChangeNotification()
    {
        $this->notify(new \App\Notifications\PasswordChangeNotification);
    }
}
