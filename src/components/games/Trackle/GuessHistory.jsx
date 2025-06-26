export default function GuessHistory({ guesses, answer }) {
  return (
    <div className="mt-6">
      <h2 className="text-md text-zinc-400 font-semibold mb-2 font-michroma">
        Previous Guesses
      </h2>
      <ul className="space-y-2">
        {guesses.map((guess, index) => {
          const isCorrect = guess.trim().toLowerCase() === answer.toLowerCase();
          return (
            <li
              key={index}
              className={`py-2 px-4 rounded-xl text-sm font-medium ${
                isCorrect
                  ? 'bg-green-800 text-green-200 border border-green-500'
                  : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
              }`}
            >
              {guess}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
