'use client';

import { useState } from 'react';
import { Textarea } from '@/components/Textarea';
import { MessageContainer } from '@/components/MessageContainer';
import { optimizePrompt } from '@/features/dashboard/actions';

export default function ChatInterface() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'ai'; content: string }[]
  >([]);

  async function handleImprove() {
    if (!prompt.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: prompt }]);

    const data = await optimizePrompt(prompt);

    setMessages(prev => [
      ...prev,
      { role: 'ai', content: JSON.stringify(data, null, 2) },
    ]);

    setPrompt('');
  }

  const ImprovePrompt = () => (
    <button
      className="bg-gray-800  h-4 w-4 leading-4 rounded"
      onClick={handleImprove}
    >
      +
    </button>
  );

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto border">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <MessageContainer
            key={i}
            direction={msg.role === 'user' ? 'right' : 'left'}
          >
            {msg.content}
          </MessageContainer>
        ))}
      </div>

      <Textarea
        placeholder="Input prompt"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        endBtns={[<ImprovePrompt key="improve" />]}
      />
    </div>
  );
}
