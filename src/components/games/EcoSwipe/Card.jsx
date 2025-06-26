import { motion } from 'framer-motion';

export default function Card({ choice, onSwipe, feedback }) {
  let borderGlow = '';

  if (feedback === 'correct') {
    borderGlow = 'ring-4 ring-green-400 shadow-[0_0_32px_#00ff88]';
  } else if (feedback === 'wrong') {
    borderGlow = 'ring-4 ring-red-400 shadow-[0_0_32px_#ff4444]';
  } else {
    borderGlow = ''; // no hover glow
  }

  return (
    <motion.div
      className={`bg-black text-green-300 font-pressstart text-sm rounded-xl px-8 py-6 text-center w-[28rem] h-48 flex items-center justify-center select-none transition-all duration-300 border-2 border-[#00ffcc] ${borderGlow}`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 180 }}
    >
      {choice.text}
    </motion.div>
  );
}
