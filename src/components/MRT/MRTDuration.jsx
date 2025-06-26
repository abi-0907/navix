import { useState, useEffect } from 'react';
import Select from 'react-select';
import mrtDataRaw from '../../data/mrt_route_data.json';

export default function MRTDuration() {
  const [stations, setStations] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [path, setPath] = useState([]);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState('');

  const [stationNameMap, setStationNameMap] = useState({});
  const [codeGroupMap, setCodeGroupMap] = useState({});

  useEffect(() => {
    const nameToCodes = {};
    const stationToName = {};
    const codeGroups = {};

    Object.keys(mrtDataRaw).forEach((key) => {
      const [a, b] = key.split('->').map(s => s.trim());
      const aCode = a.split(' ')[0];
      const aName = a.split(' ').slice(1).join(' ');
      const bCode = b.split(' ')[0];
      const bName = b.split(' ').slice(1).join(' ');

      if (!nameToCodes[aName]) nameToCodes[aName] = new Set();
      if (!nameToCodes[bName]) nameToCodes[bName] = new Set();

      nameToCodes[aName].add(aCode);
      nameToCodes[bName].add(bCode);

      stationToName[a] = aName;
      stationToName[b] = bName;
    });

    const options = Object.entries(nameToCodes).map(([name, codes]) => {
      const mergedCodes = Array.from(codes).sort();
      const mergedLabel = `${mergedCodes.join('/')} ${name}`;
      const fullCodes = Object.keys(stationToName).filter(k => stationToName[k] === name);
      fullCodes.forEach(code => { codeGroups[code] = mergedLabel; });
      return { label: mergedLabel, value: fullCodes };
    }).sort((a, b) => a.label.localeCompare(b.label));

    setStations(options);
    setStationNameMap(stationToName);
    setCodeGroupMap(codeGroups);
  }, []);

  const mergeDuplicateStations = (pathArray) => {
    const result = [];
    let lastLabel = '';
    for (let i = 0; i < pathArray.length; i++) {
      const code = pathArray[i];
      const label = codeGroupMap[code] || code;
      const prevCode = i > 0 ? pathArray[i - 1] : null;
      const nextCode = i < pathArray.length - 1 ? pathArray[i + 1] : null;
      const prevLine = prevCode ? prevCode.split(' ')[0].match(/[A-Z]+/)[0] : null;
      const currLine = code.split(' ')[0].match(/[A-Z]+/)[0];
      const nextLine = nextCode ? nextCode.split(' ')[0].match(/[A-Z]+/)[0] : null;

      const isTransfer = (prevLine && prevLine !== currLine) || (nextLine && currLine !== nextLine);
      const isBetweenDifferentLines = (prevLine && nextLine && prevLine !== nextLine);

      if (label !== lastLabel) {
        result.push({ code, label, isTransfer: isBetweenDifferentLines });
        lastLabel = label;
      }
    }
    return result;
  };

  const calculatePathAndDuration = () => {
    setError('');
    if (!from || !to) {
      setError('Please select both starting and destination stations.');
      return;
    }

    if (from.label === to.label) {
      setError('Start and end stations cannot be the same.');
      return;
    }

    const graph = {};
    Object.keys(mrtDataRaw).forEach(key => {
      const [a, b] = key.split('->').map(s => s.trim());
      if (!graph[a]) graph[a] = [];
      graph[a].push({ station: b, distance: mrtDataRaw[key].distance_km });
    });

    let resultPath = null;
    outer:
    for (const start of from.value) {
      for (const end of to.value) {
        const visited = new Set();
        const queue = [[start, [start]]];

        while (queue.length) {
          const [current, p] = queue.shift();
          if (current === end) {
            resultPath = p;
            break outer;
          }
          if (visited.has(current)) continue;
          visited.add(current);
          for (const neighbor of graph[current] || []) {
            queue.push([neighbor.station, [...p, neighbor.station]]);
          }
        }
      }
    }

    if (!resultPath) {
      setError('No path found between selected stations.');
      return;
    }

    const totalDistance = resultPath.reduce((sum, curr, idx, arr) => {
      if (idx === 0) return 0;
      const key1 = `${arr[idx - 1]}->${curr}`;
      const key2 = `${curr}->${arr[idx - 1]}`;
      const dist = mrtDataRaw[key1]?.distance_km || mrtDataRaw[key2]?.distance_km || 0;
      return sum + dist;
    }, 0);

    const avgSpeed = 38;
    const timeMin = (totalDistance / avgSpeed) * 60;
    setPath(mergeDuplicateStations(resultPath));
    setDuration(timeMin.toFixed(1));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-michroma mb-6">Travel Duration</h2>

      <div className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-[700px] text-sm">
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
          <div className="w-[300px]">
            <label className="text-sm mb-1 block">From</label>
            <Select
              options={stations}
              value={from}
              onChange={setFrom}
              placeholder="Select starting station"
              className="text-black"
              styles={{
                control: (base) => ({ ...base, backgroundColor: '#1c1c1c', color: 'white' }),
                singleValue: (base) => ({ ...base, color: 'white' }),
                menu: (base) => ({ ...base, backgroundColor: '#1c1c1c', color: 'white' }),
                input: (base) => ({ ...base, color: 'white' }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? '#333' : '#1c1c1c',
                  color: 'white'
                })
              }}
              isClearable
            />
          </div>
          <div className="w-[300px]">
            <label className="text-sm mb-1 block">To</label>
            <Select
              options={stations}
              value={to}
              onChange={setTo}
              placeholder="Select destination"
              className="text-black"
              styles={{
                control: (base) => ({ ...base, backgroundColor: '#1c1c1c', color: 'white' }),
                singleValue: (base) => ({ ...base, color: 'white' }),
                menu: (base) => ({ ...base, backgroundColor: '#1c1c1c', color: 'white' }),
                input: (base) => ({ ...base, color: 'white' }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? '#333' : '#1c1c1c',
                  color: 'white'
                })
              }}
              isClearable
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <div className="flex justify-center mb-4">
          <button
            onClick={calculatePathAndDuration}
            className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg text-sm"
          >
            Calculate Duration
          </button>
        </div>

        {path.length > 0 && (
          <div className="mt-4 bg-zinc-800 p-4 rounded-lg">
            <h3 className="text-lg font-michroma mb-4">Estimated Travel Info</h3>
            <p className="mb-4 text-zinc-300">
              Duration: {duration} minutes <br />
              Stops: {path.length - 1}<br />
              <em className="text-xs text-zinc-400">Note: Interchange transfer time is not included in duration.</em>
            </p>
            <div className="flex flex-col items-center gap-3 text-zinc-300">
              {path.map((s, i) => {
                const prev = path[i - 1]?.code.split(' ')[0].match(/[A-Z]+/)[0];
                const curr = s.code.split(' ')[0].match(/[A-Z]+/)[0];
                const next = path[i + 1]?.code.split(' ')[0].match(/[A-Z]+/)[0];
                const lineNames = {
                  NS: 'North South Line',
                  EW: 'East West Line',
                  NE: 'North East Line',
                  CC: 'Circle Line',
                  DT: 'Downtown Line',
                  TE: 'Thomson-East Coast Line',
                  CE: 'Circle Line Extension',
                };

                const transferNote = s.isTransfer && prev && next && prev !== next
                  ? `(Switch from ${lineNames[prev] || prev} to ${lineNames[next] || next})`
                  : '';

                return (
                  <div key={s.label + i} className="flex flex-col items-center">
                    <span className={`px-3 py-1 rounded-full ${s.isTransfer ? 'bg-yellow-600 text-white' : 'bg-zinc-700'}`}>
                      {s.label}
                    </span>
                    {transferNote && (
                      <span className="text-sm text-zinc-400 italic mt-1">{transferNote}</span>
                    )}
                    {i < path.length - 1 && <span className="text-zinc-500 text-lg">↓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
