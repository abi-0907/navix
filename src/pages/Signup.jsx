import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Sign up successful! Please check your email to verify your account.');
      // Optionally, auto-redirect:
      // setTimeout(() => navigate('/login'), 2500);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-700 via-violet-900 to-emerald-900 p-1 rounded-xl shadow-2xl mt-14">
      <div className="bg-zinc-950 rounded-xl p-8">
        <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-pink-400 via-cyan-400 to-green-400 bg-clip-text text-transparent text-center drop-shadow">
          Create Your Navix Account
        </h2>
        <p className="text-zinc-400 text-center mb-6">Level up your journey. It’s fast & free!</p>
        <form
          onSubmit={handleSignup}
          className="space-y-5"
          autoComplete="off"
        >
          <input
            type="email"
            autoComplete="off"
            placeholder="Your email"
            className="w-full px-4 py-2 rounded-xl bg-zinc-900 text-white border-2 border-pink-400/30 focus:border-pink-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            className="w-full px-4 py-2 rounded-xl bg-zinc-900 text-white border-2 border-cyan-400/30 focus:border-cyan-400 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-green-400 via-pink-400 to-cyan-400 text-black font-bold shadow-lg hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        {errorMsg && (
          <div className="bg-pink-900/80 text-pink-200 rounded-lg p-3 mt-5 text-center animate-pulse">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-emerald-900/70 text-emerald-200 rounded-lg p-3 mt-5 text-center animate-pulse">
            {successMsg}
          </div>
        )}
        <p className="mt-8 text-zinc-400 text-center text-sm">
          Already have an account?{' '}
          <button
            className="text-cyan-400 font-semibold underline"
            onClick={() => navigate('/login')}
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}
