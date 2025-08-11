// src/components/ChatInterface.jsx
import React, { useState } from 'react';
import useWalletStore from '../store/walletStore';
import { processUserInput } from '../ai/agent';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const chatHistory = useWalletStore((state) => state.chatHistory);
  const addChatMessage = useWalletStore((state) => state.addChatMessage);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    addChatMessage({ sender: 'user', text: input });
    
    // Process with AI agent
    const response = await processUserInput(input);

    // Add agent response
    addChatMessage({
      sender: 'agent',
      text: response.message || 'No response',
    });

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded shadow max-w-md mx-auto">
      <div className="flex-1 overflow-auto mb-4 space-y-2">
        {chatHistory.length === 0 && (
          <p className="text-gray-500 text-center">Start chatting with your wallet assistant.</p>
        )}
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <textarea
        className="border rounded p-2 resize-none"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your command here..."
      />
      <button
        onClick={sendMessage}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}


