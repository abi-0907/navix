export default function EndGameModal({ isWin, answer, onRestart }) {
  return (
    <div className="mt-10 bg-zinc-800 text-white rounded-xl p-6 text-center w-full max-w-sm shadow-lg">
      <h2 className={`text-2xl font-bold mb-2 ${isWin ? 'text-green-400' : 'text-red-400'}`}>
        {isWin ? 'You got it!' : 'Out of tries!'}
      </h2>
      <p className="mb-4 text-zinc-300">The correct station was:</p>
      <div className="text-xl font-semibold text-blue-300 mb-4">{answer}</div>
      <button
        onClick={onRestart}
        className="mt-2 bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-md"
      >
        Play Again
      </button>
    </div>
  );
}
