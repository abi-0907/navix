import { useState } from 'react';
import axios from 'axios';

export default function BusLiveTimings() {
  const [busStopCode, setBusStopCode] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log('✅ DEBUG VITE_BACKEND_URL:', backendUrl);

  const fetchBusTimings = async (code) => {
    try {
      const response = await axios.get(`${backendUrl}/bus-arrival/${code}`);
      return response.data;
    } catch (err) {
      console.error('❌ Error fetching bus timings:', err);
      throw err;
    }
  };

  const handleGetTimings = async () => {
    if (!busStopCode.trim()) {
      setError('Please enter a valid bus stop code.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchBusTimings(busStopCode);
      if (!data.Services || data.Services.length === 0) {
        setServices([]);
        setError('No bus services found for this stop. Please check the code.');
      } else {
        setServices(data.Services);
      }
    } catch {
      setError('Could not fetch bus timings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 font-michroma px-4 py-8">
      <h1 className="text-3xl mb-6 text-center text-neutral-100">Live Bus Timings</h1>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          value={busStopCode}
          onChange={(e) => setBusStopCode(e.target.value)}
          placeholder="Enter Bus Stop Code"
          className="px-4 py-2 bg-neutral-700 text-neutral-100 rounded-md w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-neutral-600"
        />
        <button
          onClick={handleGetTimings}
          className="bg-neutral-700 text-neutral-100 font-semibold px-6 py-2 rounded-md shadow hover:bg-neutral-600 transition"
        >
          Get Timings
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-center text-neutral-400">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Bus Results */}
      <div className="max-w-5xl mx-auto space-y-6">
        {services.map((service) => (
          <div
            key={service.ServiceNo}
            className="rounded-xl border border-neutral-700 bg-neutral-800 p-6 shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">
              Bus {service.ServiceNo}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-neutral-200">
              {[service.NextBus, service.NextBus2, service.NextBus3].map((bus, index) => {
                const load = bus.Load;
                const type = bus.Type;

                const loadColor = load === 'SEA' ? 'text-green-400'
                  : load === 'SDA' ? 'text-yellow-300'
                  : load === 'LSD' ? 'text-red-400'
                  : 'text-neutral-200';

                const typeColor = type === 'DD' ? 'text-blue-400'
                  : type === 'SD' ? 'text-gray-300'
                  : type === 'BD' ? 'text-purple-400'
                  : 'text-neutral-200';

                const loadText = load === 'SEA' ? 'Seats Available'
                  : load === 'SDA' ? 'Standing Available'
                  : load === 'LSD' ? 'Limited Standing'
                  : load;

                const typeText = type === 'DD' ? 'Double Decker'
                  : type === 'SD' ? 'Single Deck'
                  : type === 'BD' ? 'Bendy Bus'
                  : type;

                const isValidTime = bus.EstimatedArrival && !isNaN(new Date(bus.EstimatedArrival));

                return (
                  <div
                    key={index}
                    className="flex flex-col gap-2 border border-neutral-700 p-4 rounded-md bg-neutral-900 min-w-[200px]"
                  >
                    <p className="text-neutral-400 font-medium">Arrival {index + 1}</p>
                    {isValidTime ? (
                      <>
                        <p>
                          <span className="text-neutral-400">Time:</span>{' '}
                          {new Date(bus.EstimatedArrival).toLocaleTimeString()}
                        </p>
                        <p>
                          <span className="text-neutral-400">Load:</span>{' '}
                          <span className={`${loadColor} font-semibold`}>{loadText}</span>
                        </p>
                        <p>
                          <span className="text-neutral-400">Type:</span>{' '}
                          <span className={`${typeColor} font-semibold`}>{typeText}</span>
                        </p>
                      </>
                    ) : (
                      <p className="text-red-400 font-semibold">No upcoming service</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
