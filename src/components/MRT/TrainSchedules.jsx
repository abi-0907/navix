import { useEffect, useState } from 'react';
import Select from 'react-select';
import mrtData from '../../data/mrt_route_data.json';

function formatHHMMtoTimeString(hhmm) {
  if (!hhmm) return '—';
  const h = parseInt(hhmm.slice(0, 2), 10);
  const m = parseInt(hhmm.slice(2), 10);
  const d = new Date();
  d.setHours(h);
  d.setMinutes(m);
  return d.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function isTrainAvailable(first, last) {
  if (!first || !last) return false;
  const now = new Date();
  const current = now.getHours() * 100 + now.getMinutes();
  const firstNum = parseInt(first, 10);
  const lastNum = parseInt(last, 10);

  if (firstNum <= lastNum) {
    return current >= firstNum && current <= lastNum;
  } else {
    return current >= firstNum || current <= lastNum;
  }
}

export default function TrainSchedules() {
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState('');
  const [routes, setRoutes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const stationSet = new Set();
    Object.keys(mrtData).forEach((path) => {
      const [from, to] = path.split('->');
      stationSet.add(from.trim());
      stationSet.add(to.trim());
    });
    setStations([...stationSet].sort());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!station) {
      setRoutes([]);
      return;
    }

    const results = [];

    Object.entries(mrtData).forEach(([path, data]) => {
      const [from, to] = path.split('->').map(s => s.trim());
      if ((data.distance_km ?? 1) === 0) return;
      if (from === station) {
        const first = data.first_train;
        const last = data.last_train;

        results.push({
          direction: `${from} → ${to}`,
          first,
          last,
          isAvailable: isTrainAvailable(first, last)
        });
      }
    });

    setRoutes(results);
  }, [station]);

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto border border-zinc-800 backdrop-blur-sm transition-all duration-300">
      <h2 className="text-3xl font-michroma mb-6 tracking-wide text-center">Train Schedules</h2>

      <div className="mb-6">
        <label className="block mb-2 text-sm text-zinc-300">Select Station (Code or Name)</label>
        <Select
          className="text-black"
          options={stations.map(s => ({ label: s, value: s }))}
          onChange={(selected) => setStation(selected?.value || '')}
          placeholder="Search or scroll for a station..."
          isSearchable
          isClearable
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#18181b',
              borderColor: '#3f3f46',
              borderRadius: '0.5rem',
              padding: '4px',
              color: 'white'
            }),
            input: (base) => ({ ...base, color: 'white' }),
            singleValue: (base) => ({ ...base, color: 'white' }),
            menu: (base) => ({ ...base, backgroundColor: '#18181b', color: 'white' }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#27272a' : '#18181b',
              color: 'white',
              cursor: 'pointer'
            })
          }}
        />
      </div>

      <p className="text-sm mb-6 text-zinc-400 text-center">
        Current Time: {currentTime.toLocaleTimeString('en-SG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}
      </p>

      {routes.length > 0 && (
        <div className="space-y-6">
          {routes.map((r, idx) => (
            <div key={idx} className="bg-zinc-800 p-4 rounded-lg shadow border border-zinc-700 transition hover:border-blue-500">
              <p className="text-base font-semibold text-zinc-200">{r.direction}</p>
              <p className="text-sm">First Train: <span className="text-white">{formatHHMMtoTimeString(r.first)}</span></p>
              <p className="text-sm">Last Train: <span className="text-white">{formatHHMMtoTimeString(r.last)}</span></p>
              <p className="text-sm">
                Status: {r.isAvailable
                  ? <span className="text-green-400">Train available now ✅</span>
                  : <span className="text-yellow-400">No train at this time 🕐</span>}
              </p>
            </div>
          ))}
        </div>
      )}

      {!station && (
        <p className="text-zinc-400 text-center mt-6">Please select a station to view train schedules.</p>
      )}
    </div>
  );
}
