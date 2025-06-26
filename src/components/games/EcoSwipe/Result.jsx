import { motion } from 'framer-motion';

export default function Result({ score, total, onRestart }) {
  const getBadge = () => {
    if (score >= 8) return { label: '🌟 ECO-MASTER', color: 'text-yellow-300' };
    if (score >= 5) return { label: '♻️ ECO-EXPLORER', color: 'text-lime-300' };
    return { label: '🌱 ECO-BEGINNER', color: 'text-emerald-300' };
  };

  const badge = getBadge();

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-black border-4 border-green-400 shadow-[0_0_24px_#00ff88] rounded-xl px-10 py-8 mt-12 text-center text-green-300 font-pressstart text-xs sm:text-sm w-[90%] max-w-md"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h2 className="text-lime-400 mb-4 text-base sm:text-lg">🎉 YOUR SCORE</h2>

      <p className="text-white text-2xl sm:text-3xl mb-6">
        {score} / {total}
      </p>

      <p className={`mb-6 ${badge.color} whitespace-nowrap`}>
        Badge Level:&nbsp;{badge.label}
      </p>

      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 text-black border-2 border-white rounded shadow-[0_0_20px_#00ff88] px-6 py-3 tracking-wider"
      >
        PLAY AGAIN
      </button>
    </motion.div>
  );
}
