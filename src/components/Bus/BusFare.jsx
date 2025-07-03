import { useState } from 'react';
import axios from 'axios';

export default function BusFare() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [type, setType] = useState('adult');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Use REACT_APP_BACKEND_URL like the working LiveTimings.jsx
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
  console.log('🔍 REACT_APP_BACKEND_URL:', backendUrl);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const { data } = await axios.get(`${backendUrl}/api/bus-duration`, {
        params: { start, end, passengerType: type },
      });
      setResult(data);
    } catch (err) {
      console.error('❌ API Error:', err);
      setError('Error retrieving fare data. Please check your stop codes.');
      setResult(null);
    }
  };

  return (
    <div className="bg-zinc-950 text-white flex justify-center pt-10 pb-20 px-4 font-michroma min-h-[100px]">
      <div className="w-full max-w-xl bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold flex items-center justify-center mb-4">
          <span className="ml-2">Bus Fare Calculator</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Start Bus Stop Code"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="End Bus Stop Code"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="adult">Adult</option>
            <option value="student">Student</option>
            <option value="senior">Senior</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
          >
            Calculate Fare
          </button>
        </form>

        {error && (
          <div className="bg-red-800 text-red-100 p-4 mt-2 rounded">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-zinc-800 text-white p-6 mt-4 rounded-lg text-sm font-mono max-w-md mx-auto shadow-inner space-y-4">
            <div className="border-b border-zinc-600 pb-2 flex justify-between">
              <span className="text-blue-400">From:</span>
              <span className="font-semibold text-right">{result.startStop}</span>
            </div>
            <div className="border-b border-zinc-600 pb-2 flex justify-between">
              <span className="text-blue-400">To:</span>
              <span className="font-semibold text-right">{result.endStop}</span>
            </div>
            <div className="border-b border-zinc-600 pb-2 flex justify-between">
              <span className="text-blue-400">Distance:</span>
              <span className="font-semibold text-right">{result.distance_km} km</span>
            </div>
            <div className="border-b border-zinc-600 pb-2 flex justify-between">
              <span className="text-blue-400">Duration:</span>
              <span className="font-semibold text-right">{result.duration_min} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-400">Fare:</span>
              <span className="font-semibold text-right">{result.fare}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
