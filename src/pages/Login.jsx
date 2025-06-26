import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-cyan-700 via-zinc-900 to-pink-800 p-1 rounded-xl shadow-2xl mt-14">
      <div className="bg-zinc-950 rounded-xl p-8">
        <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 via-pink-400 to-green-400 bg-clip-text text-transparent text-center drop-shadow">
          Login to Navix
        </h2>
        <p className="text-zinc-400 text-center mb-6">Welcome back! Start your journey.</p>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            autoComplete="username"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-xl bg-zinc-900 text-white border-2 border-cyan-400/30 focus:border-cyan-400 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-xl bg-zinc-900 text-white border-2 border-pink-400/30 focus:border-pink-400 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-green-400 via-pink-400 to-cyan-400 text-black font-bold shadow-lg hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {errorMsg && (
          <div className="bg-pink-900/80 text-pink-200 rounded-lg p-3 mt-5 text-center animate-pulse">
            {errorMsg}
          </div>
        )}

        <p className="mt-8 text-center text-zinc-400 text-sm">
          Don&apos;t have an account?{' '}
          <button
            className="bg-gradient-to-r from-pink-500 to-cyan-400 text-white px-3 py-1 rounded-lg font-bold ml-1 hover:from-pink-400 hover:to-cyan-300 transition"
            onClick={() => navigate('/signup')}
          >
            Sign up here, it’s free.
          </button>
        </p>
      </div>
    </div>
  );
}
