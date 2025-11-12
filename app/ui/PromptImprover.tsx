'use client';

import { useState } from 'react';

export function PromptImprover() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [tries, setTries] = useState(0);

  function handleImprove() {
    if (tries >= 2) {
      alert('Please log in to continue using the prompt improver!');
      return;
    }

    // Temporary: just reverse the prompt as a placeholder
    setResult(prompt.split('').reverse().join(''));
    setTries((prev) => prev + 1);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col gap-3">
      <textarea
        className="border p-2 rounded w-full h-24"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button
        className="bg-green-600 text-white p-2 rounded"
        onClick={handleImprove}
      >
        Improve Prompt
      </button>
      {result && (
        <div className="border p-2 rounded bg-gray-50">
          <strong>Improved Prompt:</strong>
          <p>{result}</p>
        </div>
      )}
      {!result && tries > 0 && <p className="text-sm text-gray-500">Tries used: {tries}/2</p>}
    </div>
  );
}
