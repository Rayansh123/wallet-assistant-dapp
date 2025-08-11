// src/components/WalletConnect.jsx
import React from 'react';
import { useWallet } from '../hooks/useWallet';

export default function WalletConnect() {
  const { address, isConnected, connect, disconnect } = useWallet();

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center space-x-4">
          <span className="bg-gray-200 px-3 py-1 rounded">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={() => disconnect()}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => connect()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
