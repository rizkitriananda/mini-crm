<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;




class AuthenticationController extends Controller
{

public function authenticate(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    // Cek apakah email ada di database
    $user = User::where('email', $credentials['email'])->first();

    // Jika email tidak ada, kembalikan pesan kesalahan
    if (!$user) {
        return response()->json([
            'status' => 'failed_email',
            'message' => 'Email is incorrect'
        ], 401);
    }

    // Cek apakah password benar
    if (!Auth::attempt($credentials)) {
        return response()->json([
            'status' => 'failed_password',
            'message' => 'Password is incorrect'
        ], 401);
    }

    // Regenerate session ID to prevent session fixation attacks
    //$request->session()->regenerate();

    return response()->json([
        'status' => 'success',
        'message' => 'Login successful',
        'user' => Auth::user() // Optional: Return user details
    ], 200);
}


public function resetPassword(Request $request)
{
        $request->validate([
            'email' => 'required|email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
}

    public function logout(Request $request)
        {
            Auth::logout();

            /*$request->session()->invalidate();
            $request->session()->regenerateToken();*/

            /*return response()->json([
                'status' => 'success', 
                'message' => 'You have logged out'
            ]);*/
            return redirect('/');
    }
}
