import { useEffect, useState } from 'react';
import stationData from '../../data/station_coordinates.json';
import routeData from '../../data/mrt_route_data.json';

export default function MRTMap() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);
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
    } else if (!end && station !== start) {
      setEnd(station);
    }
  };

  useEffect(() => {
    if (start && end) {
      const graph = buildGraph(routeData);
      const shortest = dijkstra(graph, start, end);
      setPath(shortest);
    }
  }, [start, end]);

  const buildGraph = (data) => {
    const graph = {};
    for (const key in data) {
      const [rawA, rawB] = key.split('->');
      const stationA = rawA.split(' ').slice(1).join(' ');
      const stationB = rawB.split(' ').slice(1).join(' ');
      const distance = data[key].distance_km;

      if (!graph[stationA]) graph[stationA] = {};
      if (!graph[stationB]) graph[stationB] = {};
      graph[stationA][stationB] = distance;
      graph[stationB][stationA] = distance;
    }
    return graph;
  };

  const dijkstra = (graph, start, end) => {
    const distances = {};
    const previous = {};
    const queue = new Set(Object.keys(graph));
    for (const node of queue) {
      distances[node] = node === start ? 0 : Infinity;
    }

    while (queue.size > 0) {
      const current = [...queue].reduce((a, b) =>
        distances[a] < distances[b] ? a : b
      );
      queue.delete(current);
      if (current === end) break;
      for (const neighbor in graph[current]) {
        const newDist = distances[current] + graph[current][neighbor];
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = current;
        }
      }
    }

    const path = [];
    let node = end;
    while (node) {
      path.unshift(node);
      node = previous[node];
    }
    return path;
  };

  return (
    <div className="overflow-auto max-w-full max-h-screen">
      <div className="relative mx-auto" style={{ width: '1689px', height: '1689px' }}>
        {/* MRT Map Image */}
        <img
          id="mrt-map"
          src="/mrt-map.jpg"
          alt="MRT Map"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-contain"
        />

        {/* Station Dots */}
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
                }}
                title={name}
              >
                <div className={`w-[18px] h-[18px] rounded-full ${innerColor}`} />
                <div className={`absolute w-[22px] h-[22px] rounded-full border ${outerRing}`} />
              </div>
            );
          })}

        {/* Info Box - slightly above previous position */}
        <div className="absolute top-[200px] left-4 bg-zinc-900 text-white px-4 py-2 rounded-xl shadow-lg font-michroma text-sm z-20">
          <p>Start: {start || '—'}</p>
          <p>End: {end || '—'}</p>
          {path.length > 1 && <p>Stops: {path.length - 1}</p>}
          {(start || end) && (
            <button
              onClick={() => {
                setStart(null);
                setEnd(null);
                setPath([]);
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
