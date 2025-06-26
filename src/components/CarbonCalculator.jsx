import { useState } from 'react';
import axios from 'axios';

export default function CarbonCalculator() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!start || !end) {
      setError('Please enter both origin and destination.');
      return;
    }

    try {
      const { data } = await axios.get('/api/emissions', {
        params: { start, end },
      });
      setResult(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        'Could not calculate CO₂ savings. Please try again.'
      );
      setResult(null);
    }
  };

  const handleReset = () => {
    setStart('');
    setEnd('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-14 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black font-michroma overflow-hidden relative">
      {/* Decorative bubbles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="animate-floating-bubbles absolute top-1/2 left-1/2 w-72 h-72 bg-green-400/10 rounded-full blur-3xl" />
      </div>

      {/* Main calculator card */}
      <div className="bg-gradient-to-br from-green-500/10 via-green-400/5 to-white/5 backdrop-blur-lg border border-green-500/20 shadow-2xl rounded-3xl px-6 py-8 w-full max-w-[720px] transition-all duration-300 hover:shadow-green-500/40">
        <h2 className="text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-lime-300 to-emerald-400 font-bold mb-6">
          Carbon Emission Tracker
        </h2>

        <div className="space-y-4">
          <input
            className="w-full px-5 py-3.5 bg-zinc-800/80 text-white text-base rounded-xl focus:outline-none focus:ring-4 focus:ring-lime-400 transition"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="🌍 Origin (postal code or place)"
          />
          <input
            className="w-full px-5 py-3.5 bg-zinc-800/80 text-white text-base rounded-xl focus:outline-none focus:ring-4 focus:ring-lime-400 transition"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="🎯 Destination (postal code or place)"
          />
          <div className="flex flex-col sm:flex-row gap-5">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-gradient-to-r from-lime-500 to-green-500 hover:from-green-400 hover:to-emerald-500 text-black font-semibold py-3.5 rounded-xl shadow-md transition hover:shadow-lg text-base"
            >
              🚀 Track Carbon Savings
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-blue-500 hover:to-cyan-600 text-white font-semibold py-3.5 rounded-xl shadow-md transition hover:shadow-lg text-base"
            >
              ♻️ Reset
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-6 mb-2 text-center text-white space-y-2 animate-fade-in-up delay-300">
            <p className="text-lg">
              🛣️ Distance: <span className="font-bold text-green-300">{result.distance_km} km</span>
            </p>
            <p className="text-lg">
              🌿 CO₂ Saved: <span className="font-bold text-lime-400">{result.co2_saved_kg} kg</span>
            </p>
            <p className="text-sm text-zinc-400 italic">
              Thanks for making a greener choice! 💚
            </p>
          </div>
        )}

        {error && <p className="text-red-500 mt-5 text-center text-sm">{error}</p>}
      </div>
    </div>
  );
}
