<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AppendUserId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if(!!$user) {
            $request->merge(["user_id"=>$user->id]);
        }

        return $next($request);
    }
}
