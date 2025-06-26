import { Link } from 'react-router-dom';

const busQueries = [
  { label: 'Bus Live Timings', path: '/bus/live' },
  { label: 'Travel Duration', path: '/bus/duration' },
  { label: 'Travel Fare', path: '/bus/fare' },
  
];

export default function BusDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 font-michroma flex flex-col items-center">
      <h1 className="text-3xl mb-8 text-center">Bus Queries</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {busQueries.map((q) => (
          <Link
            key={q.label}
            to={q.path}
            className="h-16 bg-zinc-800 hover:bg-zinc-700 rounded-xl shadow-md flex items-center justify-center text-center transition text-base"
          >
            {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
