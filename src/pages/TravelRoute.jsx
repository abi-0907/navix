import { useNavigate } from 'react-router-dom';

export default function TravelRoute() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12 font-inter">
      <div className="mx-auto bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl w-full max-w-md p-6 text-center">
        <h1 className="text-lg sm:text-xl font-michroma tracking-wide mb-6 whitespace-nowrap">
          Select Travel Route Type
        </h1>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/mrt/map')}
            className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-base shadow-sm"
          >
            Shortest Route
          </button>

          <button
            onClick={() => navigate('/mrt/route')}
            className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-base shadow-sm"
          >
            Route with Least Transfers
          </button>
        </div>
      </div>
    </div>
  );
}
