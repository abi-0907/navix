export default function CluesDisplay({ clues }) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold text-blue-400 mb-4 font-michroma">Clues</h2>
      <ul className="list-disc list-inside text-zinc-300 space-y-2 text-sm">
        {clues.map((clue, index) => (
          <li key={index}>{clue}</li>
        ))}
      </ul>
    </div>
  );
}
