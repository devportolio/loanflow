<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;

class EmailVerification extends VerifyEmailBase
{
    use Queueable;

    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable);
        }

        // Replace & with * for frontend encoding
        $frontend_url = str_replace('&', '*', $this->verificationUrl($notifiable));

        $spa_url = config('app.frontend_url')."/verify-email?url=".$frontend_url;

        return (new MailMessage)
            ->subject('Verify Email Address')
            ->line('Please click the button below to verify your email address.')
            ->action('Verify Email Address', $spa_url)
            ->line('If you did not create an account, no further action is required.');
    }
}
