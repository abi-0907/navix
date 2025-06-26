import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase'; // Adjust if needed

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  // Helper for conditional linking
  const linkOrSignUp = (to) => user ? to : '/signup';

  return (
    <div className="font-michroma bg-black text-white min-h-screen overflow-x-hidden selection:bg-pink-600 selection:text-white">
      {/* Hero Section */}
      <section className="relative text-center py-40 px-6 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="relative z-10">
          <motion.h1 initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="text-7xl md:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-white via-pink-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
            Think Different.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="text-2xl md:text-3xl text-zinc-200 mt-8 mb-16">
            Not just transport. A whole new way to move.
          </motion.p>
          <div className="flex justify-center gap-8 flex-wrap">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="bg-white text-black px-10 py-4 rounded-full hover:bg-zinc-200 transition text-xl shadow-xl"
            >
              Start Now
            </Link>
          </div>
        </div>
      </section>

      {/* Transport Info Preview */}
      <section className="px-4 md:px-12 py-32 bg-black flex flex-col items-center">
        <div className="relative w-full max-w-3xl flex flex-col items-center">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-400 via-violet-400 to-green-400 rounded-full blur-[2px] opacity-50 z-0"></div>
          
          {/* MRT Live Info Card */}
          <motion.div
            whileHover={{ scale: 1.04, y: -8 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 bg-black/70 backdrop-blur-md border-2 border-cyan-400/30 shadow-[0_8px_80px_0px_#06b6d455] rounded-2xl w-full md:w-3/4 mx-auto mb-16 p-10 flex flex-col items-center group-hover:border-cyan-400 group-hover:shadow-cyan-400/40 transition"
          >
            <div className="w-20 h-20 mb-6 rounded-full bg-cyan-400/20 flex items-center justify-center shadow-[0_0_32px_8px_#22d3ee77] border-4 border-cyan-300/40">
              <span className="text-6xl select-none">🚇</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-michroma text-cyan-200 text-center mb-2 tracking-wide drop-shadow-lg group-hover:underline">
              MRT Live Info
            </h2>
            <p className="text-zinc-200 text-lg md:text-xl text-center">
              Timings. Congestion.<br />
              Connections. All in one view.
            </p>
            <div className="mt-8">
              <Link
                to={linkOrSignUp("/pages/MRTHome")}
                className="inline-block px-8 py-2 rounded-xl bg-cyan-800/30 text-cyan-200 border border-cyan-300 hover:bg-cyan-400 hover:text-black font-semibold transition-all duration-200 shadow"
              >
                Open
              </Link>
            </div>
          </motion.div>
          <div className="w-5 h-5 rounded-full bg-cyan-400/70 border-4 border-cyan-200/60 mb-10 z-10"></div>

          {/* Bus Insights Card */}
          <motion.div
            whileHover={{ scale: 1.04, y: 8 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 bg-black/70 backdrop-blur-md border-2 border-fuchsia-400/30 shadow-[0_8px_80px_0px_#a21caf66] rounded-2xl w-full md:w-3/4 mx-auto mb-16 p-10 flex flex-col items-center group-hover:border-fuchsia-400 group-hover:shadow-fuchsia-400/40 transition"
          >
            <div className="w-20 h-20 mb-6 rounded-full bg-fuchsia-400/20 flex items-center justify-center shadow-[0_0_32px_8px_#e879f977] border-4 border-fuchsia-300/40">
              <span className="text-6xl select-none">🚌</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-michroma text-fuchsia-200 text-center mb-2 tracking-wide drop-shadow-lg group-hover:underline">
              Bus Insights
            </h2>
            <p className="text-zinc-200 text-lg md:text-xl text-center">
              Arrival times. Peak hours.<br />
              Disruption alerts.
            </p>
            <div className="mt-8">
              <Link
                to={linkOrSignUp("/Bus/BusDashboard")}
                className="inline-block px-8 py-2 rounded-xl bg-fuchsia-900/30 text-fuchsia-200 border border-fuchsia-300 hover:bg-fuchsia-400 hover:text-black font-semibold transition-all duration-200 shadow"
              >
                Open
              </Link>
            </div>
          </motion.div>
          <div className="w-5 h-5 rounded-full bg-fuchsia-400/70 border-4 border-fuchsia-200/60 mb-0 z-10"></div>
        </div>
      </section>

      {/* Carbon Tracker */}
      <section className="px-8 py-32 bg-gradient-to-r from-lime-950 via-black to-emerald-950 text-center">
        <h2 className="text-6xl mb-6 font-bold text-lime-300">🌱 Your Weekly Impact</h2>
        <p className="text-zinc-300 mb-10 text-xl">Every ride matters. Let’s gamify sustainability.</p>
        <div className="relative w-96 h-8 bg-zinc-800 rounded-full mx-auto mb-4">
          <Link to={linkOrSignUp("/carbon-calculator")} className="absolute inset-0 w-full h-full z-10 rounded-full focus:outline-none" tabIndex={0} aria-label="Go to Carbon Tracker"></Link>
          <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
        </div>
        <p className="text-2xl text-emerald-300">21.4kg CO₂ saved this week</p>
        <div className="mt-4">
          <Link
            to={linkOrSignUp("/carbon-calculator")}
            className="inline-block px-8 py-2 rounded-xl bg-emerald-900/40 text-emerald-200 border border-emerald-400 hover:bg-emerald-500 hover:text-white font-semibold transition-all duration-200 shadow"
          >
            Open Carbon Tracker
          </Link>
        </div>
      </section>

      {/* Games Section - Trackle & EcoSwipe, Play button centered */}
      <section className="px-8 py-36 bg-black flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-16 bg-gradient-to-r from-pink-500 via-green-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
          Mini Games
        </h2>
        <div className="grid md:grid-cols-2 gap-20 md:gap-32 w-full max-w-6xl justify-items-center">
          {/* Trackle */}
          <motion.div
            whileHover={{ scale: 1.07, rotate: -1 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#38bdf8] p-10 shadow-[0_0_64px_8px_#db277733] overflow-hidden hover:shadow-[0_0_88px_16px_#c026d399] transition-all duration-300 flex flex-col items-center justify-center h-[370px]"
          >
            <span className="absolute -top-5 -left-5 text-[5rem] opacity-20 blur-[2px] pointer-events-none">🎯</span>
            <h2 className="text-4xl md:text-5xl font-michroma text-white drop-shadow-xl mb-5 flex items-center gap-2">
              <span className="drop-shadow">🚆</span> Trackle
            </h2>
            <p className="text-lg md:text-2xl text-white/90 mb-8 font-michroma text-center">
              Guess the MRT station.<br />Hints, logic, and flair.
            </p>
            <Link
              to={linkOrSignUp("/games/Trackle")}
              className="inline-block px-8 py-2 rounded-xl bg-white/10 text-pink-200 border border-pink-200 hover:bg-pink-600 hover:text-white font-semibold transition-all duration-200 shadow mx-auto"
            >
              Play
            </Link>
            <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/10 transition-all duration-300"></div>
          </motion.div>

          {/* EcoSwipe */}
          <motion.div
            whileHover={{ scale: 1.07, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-[#22c55e] via-[#4ade80] to-[#16a34a] p-10 shadow-[0_0_64px_8px_#4ade8055] overflow-hidden hover:shadow-[0_0_88px_16px_#22c55e99] transition-all duration-300 flex flex-col items-center justify-center h-[370px]"
          >
            <span className="absolute -top-5 -left-5 text-[5rem] opacity-20 blur-[2px] pointer-events-none">💚</span>
            <h2 className="text-4xl md:text-5xl font-michroma text-white drop-shadow-xl mb-5 flex items-center gap-2">
              <span className="drop-shadow">🌎</span> EcoSwipe
            </h2>
            <p className="text-lg md:text-2xl text-white/90 mb-8 font-michroma text-center">
              Swipe fast. Think green.<br />Build better habits.
            </p>
            <Link
              to={linkOrSignUp("/games/EcoSwipe")}
              className="inline-block px-8 py-2 rounded-xl bg-white/10 text-emerald-200 border border-emerald-200 hover:bg-emerald-500 hover:text-white font-semibold transition-all duration-200 shadow mx-auto"
            >
              Play
            </Link>
            <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/10 transition-all duration-300"></div>
          </motion.div>
        </div>
      </section>

     
    </div>
  );
}
