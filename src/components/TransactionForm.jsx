// src/components/TransactionForm.jsx
import React, { useState } from 'react';

export default function TransactionForm() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Send ${amount} BNB to ${to} (functionality coming soon)`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-semibold">Send Transaction</h2>
      <div>
        <label className="block mb-1 font-medium">Recipient Address</label>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="0x..."
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount (BNB)</label>
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="0.01"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
}
