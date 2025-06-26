import { useState, useEffect } from 'react';
import Select from 'react-select';
import mrtDataRaw from '../../data/mrt_route_data.json';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#27272a',
    borderColor: '#3f3f46',
    color: 'white',
    padding: '2px',
    borderRadius: '0.5rem',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#27272a',
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#3f3f46' : '#27272a',
    color: 'white',
    cursor: 'pointer',
  }),
};

export default function MRTFare() {
  const [stations, setStations] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [passengerType, setPassengerType] = useState('adult');
  const [fare, setFare] = useState(null);

  useEffect(() => {
    const stationSet = new Set();
    Object.keys(mrtDataRaw).forEach((key) => {
      const [a, b] = key.split('->').map(s => s.trim());
      stationSet.add(a);
      stationSet.add(b);
    });

    const nameMap = {};
    for (let fullCode of stationSet) {
      const parts = fullCode.split(' ');
      const code = parts[0];
      const name = parts.slice(1).join(' ');
      if (!nameMap[name]) nameMap[name] = [];
      nameMap[name].push(code);
    }

    const stationArray = Object.entries(nameMap).map(([name, codes]) => {
      const fullCode = `${codes.sort().join('/')} ${name}`;
      return { value: fullCode, label: fullCode };
    });

    stationArray.sort((a, b) => a.label.localeCompare(b.label));
    setStations(stationArray);
  }, []);

  const buildGraph = () => {
    const graph = {};
    Object.entries(mrtDataRaw).forEach(([key, value]) => {
      const [a, b] = key.split('->').map(s => s.trim());
      const dist = value.distance_km ?? value.distance;
      if (typeof dist !== 'number') return;

      if (!graph[a]) graph[a] = [];
      if (!graph[b]) graph[b] = [];

      graph[a].push({ node: b, weight: dist });
      graph[b].push({ node: a, weight: dist });
    });
    return graph;
  };

  const dijkstra = (graph, start, end) => {
    const distances = {};
    const queue = new Set(Object.keys(graph));

    Object.keys(graph).forEach(station => {
      distances[station] = Infinity;
    });
    distances[start] = 0;

    while (queue.size > 0) {
      const u = Array.from(queue).reduce((minNode, node) =>
        distances[node] < distances[minNode] ? node : minNode
      );
      queue.delete(u);

      if (u === end) break;

      for (const neighbor of graph[u]) {
        const alt = distances[u] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
        }
      }
    }

    return distances[end];
  };

  const getFare = (distance, type) => {
    const tables = {
      adult: [
        { max: 3.2, fare: 119 }, { max: 4.2, fare: 129 }, { max: 5.2, fare: 140 },
        { max: 6.2, fare: 150 }, { max: 7.2, fare: 159 }, { max: 8.2, fare: 166 },
        { max: 9.2, fare: 173 }, { max: 10.2, fare: 177 }, { max: 11.2, fare: 181 },
        { max: 12.2, fare: 185 }, { max: 13.2, fare: 189 }, { max: 14.2, fare: 193 },
        { max: 15.2, fare: 198 }, { max: 16.2, fare: 202 }, { max: 17.2, fare: 206 },
        { max: 18.2, fare: 210 }, { max: 19.2, fare: 214 }, { max: 20.2, fare: 217 },
        { max: 21.2, fare: 220 }, { max: 22.2, fare: 223 }, { max: 23.2, fare: 226 },
        { max: 24.2, fare: 228 }, { max: 25.2, fare: 230 }, { max: 26.2, fare: 232 },
        { max: 27.2, fare: 233 }, { max: 28.2, fare: 234 }, { max: 29.2, fare: 235 },
        { max: 30.2, fare: 236 }, { max: 31.2, fare: 237 }, { max: 32.2, fare: 238 },
        { max: 33.2, fare: 239 }, { max: 34.2, fare: 240 }, { max: 35.2, fare: 241 },
        { max: 36.2, fare: 242 }, { max: 37.2, fare: 243 }, { max: 38.2, fare: 244 },
        { max: 39.2, fare: 245 }, { max: 40.2, fare: 246 }, { max: Infinity, fare: 247 }
      ],
      senior: [
        { max: 3.2, fare: 69 }, { max: 4.2, fare: 76 }, { max: 5.2, fare: 84 },
        { max: 6.2, fare: 91 }, { max: 7.2, fare: 97 }, { max: Infinity, fare: 103 }
      ],
      student: [
        { max: 3.2, fare: 52 }, { max: 4.2, fare: 57 }, { max: 5.2, fare: 63 },
        { max: 6.2, fare: 68 }, { max: 7.2, fare: 71 }, { max: Infinity, fare: 74 }
      ]
    };

    const bracket = tables[type].find(b => distance <= b.max);
    return (bracket.fare / 100).toFixed(2);
  };

  const getFirstCode = (label) => {
    const [codes, ...rest] = label.split(' ');
    return codes.split('/')[0] + ' ' + rest.join(' ');
  };

  const handleCalculate = () => {
    if (!from || !to || from.value === to.value) {
      setFare('Please select valid stations');
      return;
    }

    const graph = buildGraph();
    const start = getFirstCode(from.value);
    const end = getFirstCode(to.value);
    const dist = dijkstra(graph, start, end);

    if (dist === Infinity) {
      setFare('Route not found');
      return;
    }

    setFare(`${getFare(dist, passengerType)} SGD`);
  };

  return (
    <div className="bg-zinc-900 text-white p-8 rounded-2xl shadow-xl max-w-xl mx-auto mt-10 border border-zinc-800">
      <h2 className="text-3xl font-michroma text-center mb-6 text-white tracking-wide">
        MRT Fare Calculator
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Start Station</label>
        <Select
          options={stations}
          value={from}
          onChange={setFrom}
          styles={customStyles}
          isClearable
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">End Station</label>
        <Select
          options={stations}
          value={to}
          onChange={setTo}
          styles={customStyles}
          isClearable
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Passenger Type</label>
        <select
          className="w-full p-2 bg-zinc-800 rounded-md border border-zinc-700"
          value={passengerType}
          onChange={(e) => setPassengerType(e.target.value)}
        >
          <option value="adult">Adult</option>
          <option value="senior">Senior Citizen / Disabled</option>
          <option value="student">Student</option>
        </select>
      </div>

      <button
        onClick={handleCalculate}
        className="bg-blue-600 hover:bg-blue-500 transition duration-200 w-full py-2 rounded-md font-semibold"
      >
        Calculate Fare
      </button>

      {fare && (
        <div className="mt-8 flex justify-center">
          <div className="bg-zinc-800 border border-blue-600/40 backdrop-blur-md text-white rounded-2xl px-6 py-5 shadow-lg animate-fade-in w-full max-w-xs">
            <div className="flex items-center justify-center gap-2 text-blue-400 text-sm font-medium mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" />
              </svg>
              Fare for {passengerType.charAt(0).toUpperCase() + passengerType.slice(1)}
            </div>
            <div className="text-4xl text-center font-bold text-blue-300 tracking-wide">{fare}</div>
          </div>
        </div>
      )}
    </div>
  );
}
