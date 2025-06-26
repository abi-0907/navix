import { useEffect, useState } from 'react';
import stationData from '../../data/station_coordinates.json';
import routeData from '../../data/mrt_route_data.json';

export default function MRTRoute() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);
  const [transfers, setTransfers] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState({ x: 1, y: 1 });

  useEffect(() => {
    if (imageLoaded) {
      const img = document.getElementById('mrt-map');
      if (img) {
        const scaleX = img.offsetWidth / 1689;
        const scaleY = img.offsetHeight / 1689;
        setScale({ x: scaleX, y: scaleY });
      }
    }
  }, [imageLoaded]);

  const handleClick = (station) => {
    if (!start) {
      setStart(station);
      setEnd(null);
      setPath([]);
      setTransfers(0);
    } else if (!end && station !== start) {
      setEnd(station);
    }
  };

  useEffect(() => {
    if (start && end) {
      const { bestPath, minTransfers } = findLeastTransfersPath(routeData, start, end);
      setPath(bestPath);
      setTransfers(minTransfers);
    }
  }, [start, end]);

  const findLeastTransfersPath = (data, startStation, endStation) => {
    const graph = {};

    for (const key in data) {
      const [fromFull, toFull] = key.split('->').map(s => s.trim());
      const fromCode = fromFull.split(' ')[0];
      const fromName = fromFull.split(' ').slice(1).join(' ');
      const toCode = toFull.split(' ')[0];
      const toName = toFull.split(' ').slice(1).join(' ');

      if (!graph[fromName]) graph[fromName] = [];
      if (!graph[toName]) graph[toName] = [];

      const fromLine = fromCode.replace(/[0-9]+$/, '');
      const toLine = toCode.replace(/[0-9]+$/, '');

      graph[fromName].push({ name: toName, line: fromLine });
      graph[toName].push({ name: fromName, line: toLine });
    }

    const visited = new Map();
    const queue = [{
      station: startStation,
      path: [startStation],
      transfers: 0,
      line: null
    }];

    while (queue.length > 0) {
      queue.sort((a, b) => {
        if (a.transfers !== b.transfers) return a.transfers - b.transfers;
        return a.path.length - b.path.length;
      });

      const { station, path, transfers, line } = queue.shift();

      if (station === endStation) {
        return { bestPath: path, minTransfers: transfers };
      }

      for (const neighbor of graph[station] || []) {
        const nextTransfers = line && neighbor.line !== line ? transfers + 1 : transfers;
        const key = `${neighbor.name}-${neighbor.line}`;

        if (!visited.has(key) || visited.get(key) > nextTransfers) {
          visited.set(key, nextTransfers);
          queue.push({
            station: neighbor.name,
            path: [...path, neighbor.name],
            transfers: nextTransfers,
            line: neighbor.line
          });
        }
      }
    }

    return { bestPath: [], minTransfers: 0 };
  };

  return (
    <div className="overflow-auto max-w-full max-h-screen">
      <div className="relative mx-auto" style={{ width: '1689px', height: '1689px' }}>
        <img
          id="mrt-map"
          src="/mrt-map.jpg"
          alt="MRT Map"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-contain"
        />

        {imageLoaded &&
          stationData.map(({ name, x, y }) => {
            const scaledX = x * scale.x;
            const scaledY = y * scale.y;

            const isStart = name === start;
            const isEnd = name === end;
            const isInPath = path.includes(name);
            const isIntermediate = isInPath && !isStart && !isEnd;

            const innerColor = isStart || isEnd
              ? 'bg-red-500'
              : isIntermediate
              ? 'bg-green-500'
              : 'bg-[rgba(0,0,0,0.35)]';

            const outerRing = isStart || isEnd
              ? 'border-red-400 shadow-[0_0_24px_10px_rgba(255,0,0,0.4)] animate-pulse'
              : isIntermediate
              ? 'border-green-400 shadow-[0_0_24px_10px_rgba(0,255,0,0.4)] animate-pulse'
              : 'border-[rgba(0,0,0,0.35)]';

            return (
              <div
                key={name}
                onClick={() => handleClick(name)}
                className="absolute w-[32px] h-[32px] flex items-center justify-center"
                style={{
                  left: `${scaledX}px`,
                  top: `${scaledY}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  cursor: 'pointer'
                }}
                title={name}
              >
                <div className={`w-[18px] h-[18px] rounded-full ${innerColor}`} />
                <div className={`absolute w-[22px] h-[22px] rounded-full border ${outerRing}`} />
              </div>
            );
          })}

        <div className="absolute top-[200px] left-4 bg-zinc-900 text-white px-4 py-2 rounded-xl shadow-lg font-michroma text-sm z-20">
          <p>Start: {start || '—'}</p>
          <p>End: {end || '—'}</p>
          {path.length > 1 && <p>Stops: {path.length - 1}</p>}
          {path.length > 1 && <p>Transfers: {transfers}</p>}
          {(start || end) && (
            <button
              onClick={() => {
                setStart(null);
                setEnd(null);
                setPath([]);
                setTransfers(0);
              }}
              className="mt-2 bg-white text-black px-3 py-1 rounded-lg hover:bg-gray-300 transition font-bold"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
