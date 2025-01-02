namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);

        $token = Str::random(60);
        PasswordReset::updateOrCreate(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => Carbon::now()]
        );

        // Simulasi pengiriman email
        return redirect()->route('password.reset', ['token' => $token, 'email' => $request->email]);
    }

    public function resetPassword(Request $request, $token)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        $passwordReset = PasswordReset::where('token', $token)->where('email', $request->email)->first();

        if (!$passwordReset) {
            return back()->withErrors(['email' => 'Token tidak valid atau sudah kadaluarsa.']);
        }

        $user = User::where('email', $request->email)->first();
        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();
            $passwordReset->delete();

            return redirect()->route('login')->with('status', 'Password berhasil direset!');
        }

        return back()->withErrors(['email' => 'Email tidak ditemukan.']);
    }
}