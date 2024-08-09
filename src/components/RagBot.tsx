'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [loading, setLoading] = useState(false);

  const askQuestion = async (question: string) => {
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const data: unknown = await response.json();
     
      handleSubmit({ role: 'assistant', content: data.answer });
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you can handle error state here
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askQuestion(input);
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m, index) => (
          <div key={index} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              <p>{m.content}</p>
            </div>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>

      <form onSubmit={handleFormSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
