import { useState } from 'react';
import TrackleGame from './TrackleGame';
import { motion } from 'framer-motion';

export default function TrackleStart() {
  const [started, setStarted] = useState(false);

  if (started) return <TrackleGame />;

  return (
    <div className="min-h-screen bg-blue-500 text-white flex flex-col items-center justify-center font-michroma px-4 text-center relative overflow-hidden">
      {/* Cartoon burst shape */}
      <div className="relative z-10 bg-white rounded-full px-20 py-10 shadow-xl border-4 border-black flex items-center justify-center min-w-[280px]">
        <motion.h1
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          className="text-5xl sm:text-6xl font-extrabold text-black drop-shadow-lg tracking-wider font-luckiest text-center"
        >
          TRACKLE
        </motion.h1>
      </div>

      {/* Play Button */}
      <motion.button
        onClick={() => setStarted(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 z-10 bg-orange-500 hover:bg-orange-600 text-black px-10 py-4 rounded-full text-2xl font-bold shadow-md border-2 border-black transition-all"
      >
        PLAY
      </motion.button>

      {/* Instructions */}
      <div className="mt-8 max-w-2xl text-sm text-white bg-black/20 px-8 py-5 rounded-xl border border-white/30 z-10 shadow-[0_0_12px_#00e5ff]">
        <p className="mb-2 font-semibold uppercase tracking-widest text-white/80">How to Play</p>
        <ul className="list-disc list-inside text-left text-white/90">
          <li>You have <span className="text-green-300 font-bold">3 tries</span> to guess the MRT station.</li>
          <li>You have <span className="text-yellow-300 font-bold">30 seconds</span> for each question.</li>
          <li>Each wrong guess is recorded — keep an eye on your history!</li>
          <li>Type the full station name (e.g. "Dhoby Ghaut").</li>
        </ul>
      </div>

      {/* Background comic burst lines and sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
      {/* Bubbles */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-full opacity-20 animate-ping" />
      <div className="absolute bottom-12 right-12 w-24 h-24 bg-white rounded-full opacity-10 animate-pulse" />
      <div className="absolute top-[30%] right-[25%] w-12 h-12 bg-white rounded-full opacity-10 animate-ping" />
      <div className="absolute bottom-[40%] left-[20%] w-14 h-14 bg-white rounded-full opacity-15 animate-pulse" />
      <div className="absolute top-[65%] right-[40%] w-10 h-10 bg-white rounded-full opacity-10 animate-ping" />
      <div className="absolute top-[15%] left-[45%] w-6 h-6 bg-white rounded-full opacity-10 animate-bounce" />
    </div>
  );
}
