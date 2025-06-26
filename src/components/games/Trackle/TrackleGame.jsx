import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import fullStationData from './trackleData';

const winningMessages = [
  '🎉 YOU WIN! You deserve a standing ovation... at every station!',
  '🚇 Perfect score! You’re officially the MRT Whisperer.',
  '🧠 10/10 brainpower! You just outsmarted the entire train map.',
  '🥳 You rode the logic rails straight to victory!',
  '🚀 You’re an MRT mind reader — next stop: genius!',
  '💡 All aboard the brain train! You crushed it.',
];

export default function TrackleGame() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [error, setError] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const stationData = useMemo(() => {
    const shuffled = [...fullStationData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, []);

  const currentStation = stationData[currentIndex];

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 2500);
  };

  useEffect(() => {
    if (gameOver || gameWon) return;

    setTimeLeft(30); // reset on question change

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver || gameWon) return;

    if (!guess.trim()) {
      showError('Please enter a station name.');
      return;
    }

    const newGuess = guess.trim();
    const updatedGuesses = [...guesses, newGuess];
    setGuesses(updatedGuesses);
    setGuess('');

    if (newGuess.toLowerCase() === currentStation.answer.toLowerCase()) {
      if (currentIndex === stationData.length - 1) {
        setGameWon(true);
      } else {
        setCurrentIndex(currentIndex + 1);
        setGuesses([]);
        setIsCorrect(true);
        setTimeout(() => setIsCorrect(false), 1000);
      }
    } else if (updatedGuesses.length >= 3) {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    window.location.reload(); // restart game
  };

  const winningMessage =
    winningMessages[Math.floor(Math.random() * winningMessages.length)];

  useEffect(() => {
    if (gameWon) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        zIndex: 9999,
      });
    }
  }, [gameWon]);

  return (
    <div className="min-h-screen bg-blue-500 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden font-michroma">
      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-md z-30 flex items-center justify-center">
          <div className="text-center space-y-4 px-10 py-10 border-4 border-blue-300 text-white rounded-2xl shadow-[0_0_40px_#00eaff] bg-blue-800/90">
            <h2 className="text-5xl font-bold drop-shadow-md">GAME OVER</h2>
            <p className="text-lg text-white/80">
              Correct answer was:{' '}
              <span className="font-bold">{currentStation.answer}</span>
            </p>
            <p className="text-lg text-white/80">Play Again?</p>
            <div className="flex justify-center gap-6 text-lg">
              <button
                onClick={handleRestart}
                className="px-6 py-2 border border-white bg-green-400 hover:bg-green-500 text-black font-bold rounded-md shadow-md transition-all"
              >
                YES
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 border border-white bg-red-400 hover:bg-red-500 text-black font-bold rounded-md shadow-md transition-all"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Winning Modal */}
      {gameWon && (
        <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-md z-30 flex items-center justify-center">
          <div className="text-center px-10 py-10 border-4 border-blue-300 text-white rounded-2xl shadow-[0_0_40px_#00eaff] bg-blue-800/90 space-y-6">
            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-5xl sm:text-6xl font-bold text-white drop-shadow-[0_0_20px_#00ffe0]"
            >
              🏆 CONGRATULATIONS!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold text-white drop-shadow-[0_0_10px_#00ffe0] animate-bounce"
            >
              {winningMessage}
            </motion.p>

            <button
              onClick={handleRestart}
              className="mt-2 px-8 py-3 bg-green-400 hover:bg-green-500 text-black font-bold rounded-lg border border-white shadow-md transition-all"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-8 bg-red-500 text-white px-6 py-2 rounded-xl shadow-lg font-semibold z-20"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.h1
        initial={{ scale: 0.8, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="text-5xl sm:text-6xl font-luckiest text-white tracking-wide mb-2 drop-shadow-lg flex items-center gap-2"
      >
        Trackle 🚇
      </motion.h1>

      {/* Timer */}
      <p className="text-white font-bold text-lg mb-4 z-10">
        Time Left:{' '}
        <span className={timeLeft <= 10 ? 'text-red-400' : 'text-green-300'}>
          {timeLeft}s
        </span>
      </p>

      {/* Clue Box */}
      <div className="bg-[#14213d] text-white border border-blue-300 px-10 py-8 rounded-xl max-w-xl w-full shadow-[0_0_18px_#00e5ff] z-10">
        <p className="text-blue-300 uppercase font-bold mb-4 text-center tracking-widest text-sm">
          Clues
        </p>
        <ul className="list-disc list-inside space-y-2 font-semibold text-white/90 text-sm leading-relaxed">
          {currentStation.clues.map((clue, idx) => (
            <li key={idx}>{clue}</li>
          ))}
        </ul>
      </div>

      {/* Input */}
      {!gameOver && !gameWon && (
        <form onSubmit={handleSubmit} className="mt-6 z-10 flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter MRT station name"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="px-4 py-3 rounded-lg w-72 bg-black/30 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-400 hover:bg-blue-500 text-black font-bold rounded-lg border border-white/30 shadow-md"
          >
            Submit
          </button>
        </form>
      )}

      {/* Correct Feedback */}
      <div className="mt-6 text-white/70 text-sm z-10 text-center">
        {isCorrect && (
          <p className="text-green-300 font-bold text-lg">Correct! ✅</p>
        )}
      </div>

      {/* Guesses */}
      <div className="mt-4 text-white/90 text-sm z-10">
        <p className="mb-1">{guesses.length > 0 && 'Previous Guesses:'}</p>
        <ul className="text-white">
          {guesses.map((g, idx) => (
            <li key={idx}>• {g}</li>
          ))}
        </ul>
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
      <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-full opacity-20 animate-ping" />
      <div className="absolute bottom-12 right-12 w-24 h-24 bg-white rounded-full opacity-10 animate-pulse" />
      <div className="absolute top-[30%] right-[25%] w-12 h-12 bg-white rounded-full opacity-10 animate-ping" />
      <div className="absolute bottom-[40%] left-[20%] w-14 h-14 bg-white rounded-full opacity-15 animate-pulse" />
      <div className="absolute top-[65%] right-[40%] w-10 h-10 bg-white rounded-full opacity-10 animate-ping" />
      <div className="absolute top-[15%] left-[45%] w-6 h-6 bg-white rounded-full opacity-10 animate-bounce" />
    </div>
  );
}
