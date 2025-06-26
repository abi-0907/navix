import { useState } from 'react';
import mrtData from '../data/mrt_route_data.json';

export default function MRTRouteInfo() {
  const stationPairs = Object.keys(mrtData);
  const [selectedPair, setSelectedPair] = useState('');
  const route = mrtData[selectedPair];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">MRT Route Info</h2>

      <select
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setSelectedPair(e.target.value)}
        value={selectedPair}
      >
        <option value="">Select Station Pair</option>
        {stationPairs.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {route && (
        <div className="bg-neutral-50 p-4 rounded shadow">
          <p><strong>🚉 Distance:</strong> {route.distance_km} km</p>
          <p><strong>🕓 First Train:</strong> {formatTime(route.first_train)}</p>
          <p><strong>🌙 Last Train:</strong> {formatTime(route.last_train)}</p>
          <p><strong>🔁 First Train (Opp):</strong> {formatTime(route.first_train_opp)}</p>
          <p><strong>🔁 Last Train (Opp):</strong> {formatTime(route.last_train_opp)}</p>
          <p><strong>⏱ Estimated Duration:</strong> ~{Math.round(route.distance_km * 1.5)} mins</p>
        </div>
      )}
    </div>
  );
}

function formatTime(raw) {
  if (!raw || raw.length !== 4) return raw;
  return `${raw.slice(0, 2)}:${raw.slice(2)}`;
}
