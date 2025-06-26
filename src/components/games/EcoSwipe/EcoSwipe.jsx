import { useState } from 'react';
import allChoices from './choices';
import Card from './Card';
import Result from './Result';
import { motion } from 'framer-motion';

const getRandomizedChoices = () => {
  const shuffled = [...allChoices].sort(() => Math.random() - 0.5);
  const easy = shuffled.filter(q => q.difficulty === 'easy').slice(0, 4);
  const medium = shuffled.filter(q => q.difficulty === 'medium').slice(0, 3);
  const hard = shuffled.filter(q => q.difficulty === 'hard').slice(0, 3);
  return [...easy, ...medium, ...hard].sort(() => Math.random() - 0.5);
};

export default function EcoSwipe() {
  const [showIntro, setShowIntro] = useState(true);
  const [choices, setChoices] = useState(getRandomizedChoices());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [swipeFeedback, setSwipeFeedback] = useState(null);

  const handleSwipe = (direction) => {
    const current = choices[index];
    const isCorrect =
      (direction === 'right' && current.isGood) ||
      (direction === 'left' && !current.isGood);

    setSwipeFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      setSwipeFeedback(null);
      const next = index + 1;
      if (next < choices.length) {
        setIndex(next);
      } else {
        setFinished(true);
      }
    }, 500);
  };

  const restartGame = () => {
    setChoices(getRandomizedChoices());
    setIndex(0);
    setScore(0);
    setFinished(false);
    setSwipeFeedback(null);
    setShowIntro(true);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-[#0f2e1d] text-white font-pressstart relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {showIntro && (
        <motion.div
          className="absolute z-50 bg-black border-4 border-green-500 p-8 rounded-lg max-w-3xl w-[90%] text-green-300 shadow-[0_0_24px_#00ff88] text-xs sm:text-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 className="text-red-500 text-xl sm:text-2xl text-center mb-6 tracking-wider">
            ▶ HOW TO PLAY ◀
          </h2>

          <ul className="space-y-4 tracking-tight">
            <li>
              🟢 <span className="text-green-400">SWIPE</span>{' '}
              <span className="text-lime-300">RIGHT</span> if the action is{' '}
              <span className="text-emerald-300">ECO-FRIENDLY</span>.
            </li>
            <li>
              🔴 <span className="text-green-400">SWIPE</span>{' '}
              <span className="text-red-400">LEFT</span> if the action is{' '}
              <span className="text-orange-400">NOT ECO-FRIENDLY</span>.
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="mb-4 text-lg text-yellow-300">🎖 BADGE LEVELS</h3>
            <ul className="space-y-2">
              <li>
                🌟 <span className="text-yellow-300">ECO-MASTER</span>:{' '}
                <span className="text-zinc-100">8–10 correct</span>
              </li>
              <li>
                ♻️ <span className="text-lime-300">ECO-EXPLORER</span>:{' '}
                <span className="text-zinc-100">5–7 correct</span>
              </li>
              <li>
                🌱 <span className="text-emerald-400">ECO-BEGINNER</span>:{' '}
                <span className="text-zinc-100">0–4 correct</span>
              </li>
            </ul>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setShowIntro(false)}
              className="mt-2 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 text-black border-2 border-white rounded shadow-[0_0_20px_#00ff88] tracking-wide"
            >
              CLICK HERE TO START
            </button>
          </div>
        </motion.div>
      )}

      {!showIntro && (
        <>
          <motion.h1
            className="text-3xl sm:text-4xl text-green-300 mt-10 mb-6 tracking-widest"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            🌎 ECOSWIPE 🌎
          </motion.h1>

          {!finished ? (
            <>
              <div className="mb-4 text-xs text-lime-300 tracking-wider">
                ▶ QUESTION {index + 1} / {choices.length}
              </div>
              <Card
                choice={choices[index]}
                onSwipe={handleSwipe}
                feedback={swipeFeedback}
              />
            </>
          ) : (
            <Result
              score={score}
              total={choices.length}
              onRestart={restartGame}
            />
          )}
        </>
      )}
    </motion.div>
  );
}
