import { Link } from 'react-router-dom';

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-michroma flex flex-col items-center px-4 pt-20">
      <h1 className="text-4xl md:text-5xl font-bold text-[#00FFC3] mb-12 text-center tracking-wide">
        Choose a Game
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        {/* EcoSwipe */}
        <Link to="/games/ecoswipe">
          <div className="bg-zinc-900 border border-green-400 hover:shadow-[0_0_20px_#22C55E] text-green-300 rounded-2xl py-6 text-center transition-all cursor-pointer text-2xl font-semibold">
            EcoSwipe 🌿
          </div>
        </Link>

        {/* Trackle */}
        <Link to="/games/trackle">
          <div className="bg-zinc-900 border border-blue-400 hover:shadow-[0_0_20px_#3B82F6] text-blue-300 rounded-2xl py-6 text-center transition-all cursor-pointer text-2xl font-semibold">
            Trackle 🚇
          </div>
        </Link>
      </div>
    </div>
  );
}
