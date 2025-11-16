'use client';

import { useState } from 'react';
import { Textarea } from '@/components/Textarea';
import { systemPromptImprover } from '@/lib/prompts';
import { MessageContainer } from '@/components/MessageContainer';

export default function DashboardPage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'ai'; content: string }[]
  >([]);

  async function handleImprove() {
    if (!prompt.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: prompt }]);

    const res = await fetch('/api/improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: "gpt-5-nano", systemPrompt: systemPromptImprover, prompt })
    });

    const data = await res.json();
    console.log("data:", data);

    setMessages(prev => [
      ...prev,
      { role: 'ai', content: data.output }
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
