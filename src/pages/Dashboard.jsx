import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("Supabase user data:", data);
      console.log("Supabase error:", error);

      if (!data?.user) {
        console.log("No user found. Redirecting to login.");
        navigate('/login');
      } else {
        console.log("User logged in:", data.user.email);
        setUser(data.user);
      }
    };

    getUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative font-michroma">
      {user && (
        <div className="absolute top-4 left-6 text-sm text-zinc-400">
          Signed in as {user.email}
        </div>
      )}

      <div className="flex flex-col items-center pt-24 gap-8">
        <h2 className="text-4xl font-bold tracking-wide text-center">
          DASHBOARD
        </h2>

        <div className="flex flex-col gap-4 w-[28rem]">
          <Link to="/mrt">
            <button className="py-3 text-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition w-full">
              MRT
            </button>
          </Link>

          <Link to="/bus">
            <button className="py-3 text-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition w-full">
              BUS
            </button>
          </Link>

          <Link to="/carbon-calculator">
            <button className="py-3 text-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition w-full">
              CARBON TRACKER
            </button>
          </Link>

          <Link to="/games">
            <button className="py-3 text-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition w-full">
              GAMES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
