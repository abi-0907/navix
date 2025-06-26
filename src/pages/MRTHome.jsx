import { Link } from 'react-router-dom';

const queries = [
  { label: 'Travel Route', path: '/mrt/travel-route' }, // 🔁 Combined MRT Map + Least Transfers
  { label: 'Train Schedules', path: '/mrt/train-schedules' },
  { label: 'Travel Duration', path: '/mrt/duration' },
  { label: 'Travel Fare', path: '/mrt/fare' },
  { label: 'Peak/Off-Peak Congestion', path: '/mrt/congestion' },
];

export default function MRTHome() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 font-michroma flex flex-col items-center">
      <h1 className="text-3xl mb-8 text-center">MRT Queries</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {queries.map((q) => (
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
