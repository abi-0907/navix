import { useState } from 'react';
import axios from 'axios';

export default function BusDuration() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || '';

  const handleSubmit = async () => {
    setError('');
    setDuration('');

    if (!start || !end) {
      setError('Please enter both start and end stop codes.');
      return;
    }

    try {
      const { data } = await axios.get(`${API_BASE}/api/bus-duration`, {
        params: { start, end },
      });

      console.log('Duration response:', data);

      if (data.error) {
        setError(data.error);
      } else if (!data.duration_min) {
        setError('Duration not found in response.');
      } else {
        setDuration(data.duration_min);
      }
    } catch (err) {
      console.error('❌ API Error:', err.response?.data || err.message);
      setError('Failed to fetch travel duration. Please try again.');
    }
  };

  return (
    <div className="bg-zinc-950 text-white flex justify-center pt-10 pb-20 px-4 font-michroma min-h-[100px]">
      <div className="w-full max-w-xl bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center">Bus Travel Duration</h2>

        <div className="max-w-md w-full mx-auto space-y-4">
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
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
          >
            Get Travel Duration
          </button>
        </div>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {duration && (
          <div className="mt-6 bg-zinc-800 text-white p-4 rounded-lg text-center font-mono text-lg shadow-inner border border-blue-500">
            <p><span className="text-blue-400">Duration:</span> {duration} min</p>
          </div>
        )}
      </div>
    </div>
  );
}
