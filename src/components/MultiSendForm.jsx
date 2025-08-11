// src/components/MultiSendForm.jsx
import React, { useState } from 'react';
import { useMultiSend } from '../hooks/useMultiSend';

export default function MultiSendForm() {
  const [token, setToken] = useState('BNB');
  const [amount, setAmount] = useState('');
  const [recipientsText, setRecipientsText] = useState('');
  const [conditionPrice, setConditionPrice] = useState('');
  const { status, multiSend } = useMultiSend();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipients = recipientsText
      .split('\n')
      .map((addr) => addr.trim())
      .filter(Boolean);

    if (!amount || recipients.length === 0) {
      alert('Please enter amount and at least one recipient address.');
      return;
    }

    const condition = conditionPrice
      ? { tokenPriceGreaterThan: parseFloat(conditionPrice) }
      : null;

    const result = await multiSend({ token, amount, recipients, condition });
    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">Multi-Send Tokens</h2>

      <div>
        <label className="block mb-1 font-medium">Token</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value.toUpperCase())}
          className="w-full border rounded px-2 py-1"
          placeholder="e.g., BNB, USDT"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Amount per Recipient</label>
        <input
          type="number"
          step="any"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="Amount"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Recipient Addresses (one per line)
        </label>
        <textarea
          rows={4}
          value={recipientsText}
          onChange={(e) => setRecipientsText(e.target.value)}
          className="w-full border rounded px-2 py-1 resize-none"
          placeholder="0xabc...123&#10;0xdef...456"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Condition - Send only if Token Price &gt; USD
        </label>
        <input
          type="number"
          step="any"
          min="0"
          value={conditionPrice}
          onChange={(e) => setConditionPrice(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="e.g., 2000"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Send
      </button>

      {status && <p className="mt-2 text-gray-700">{status}</p>}
    </form>
  );
}
