import { motion } from 'framer-motion';

export default function ContactUs() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-16 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.18 }}
        className="w-full max-w-xl bg-zinc-950/95 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-zinc-800 backdrop-blur-xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-cyan-400 to-green-300 drop-shadow-lg mb-5 tracking-tight text-center">
          Contact Us
        </h1>
        <p className="text-lg text-zinc-300 mb-6 text-center">
          Questions? Feedback? Say hello!
        </p>
        <a
          href="mailto:M240004@e.ntu.edu.sg"
          className="text-xl text-cyan-300 font-semibold underline hover:text-cyan-400 transition"
        >
          M240004@e.ntu.edu.sg
        </a>
      </motion.div>
    </div>
  );
}
