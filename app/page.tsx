'use client';

import { useState } from 'react';
import { Textarea } from '@/components/Textarea';

export default function DashboardPage() {
  const [ prompt, setPrompt ] = useState('');
  const [ result, setResult ] = useState<string | null>(null);
  const [ tries, setTries ] = useState(0);

  function handleImprove() {
    if (tries >= 2) {
      alert('Please log in to continue using the prompt improver!');
      return;
    }

    // Temporary: just reverse the prompt as a placeholder
    setResult(prompt.split('').reverse().join(''));
    setTries((prev) => prev + 1);
  }

  const ImprovePrompt = () => {
    return <button
      className="bg-gray-800  h-4 w-4 leading-4 rounded"
      onClick={ handleImprove }
    >
      +
    </button>
  }

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto border">
      <div className="flex-1 overflow-y-auto p-4">
        {result && (
          <div className="mb-2 p-2  rounded shadow">
            {result}
          </div>
        )}
      </div>
      <Textarea
        placeholder="Input prompt"
        endBtns={[<ImprovePrompt/>]}
      />
    </div>
  );
}
