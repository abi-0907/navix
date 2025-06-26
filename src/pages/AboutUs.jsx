import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-16 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.16 }}
        className="w-full max-w-2xl bg-zinc-950/95 rounded-3xl shadow-2xl p-12 flex flex-col items-center border border-zinc-800 backdrop-blur-xl"
      >
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.32 }}
          className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-400 to-zinc-200 drop-shadow-lg mb-3 tracking-tight text-center"
          style={{ letterSpacing: "-1px" }}
        >
          About Us
        </motion.h1>
        <h2 className="text-2xl md:text-3xl font-michroma text-zinc-100 mb-8 text-center font-semibold">
          We’re Eldwin & Abi <span className="text-cyan-300 font-normal">&nbsp;|&nbsp; Year 1 MAE students at NTU</span>
        </h2>
        <p className="text-lg md:text-xl text-zinc-300 mb-8 text-center leading-relaxed font-normal">
          Navix was built for <span className="font-bold text-cyan-300">SummerBuild 2025</span> to help students and commuters move smarter and greener in Singapore.
        </p>
        <p className="text-base md:text-lg text-zinc-400 mb-6 text-center">
          We’re passionate about making tech that’s actually useful in daily life—whether that means live MRT and bus data, carbon tracking, or fun mini-games that brighten your journey.
        </p>
        <p className="text-base md:text-lg text-zinc-500 text-center font-michroma">
          Thanks for checking out our project.<br />
          <span className="text-cyan-300 font-semibold">We hope Navix makes your next trip a little more awesome.</span>
        </p>
      </motion.div>
    </div>
  );
}
