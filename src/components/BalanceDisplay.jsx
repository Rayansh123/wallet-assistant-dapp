// src/components/BalanceDisplay.jsx
import React from 'react';
import useWalletStore from '../store/walletStore';
import { useUserBalance } from '../hooks/useBalance';

export default function BalanceDisplay() {
  const walletAddress = useWalletStore((state) => state.walletAddress);
  const { balance } = useUserBalance(walletAddress);

  if (!walletAddress) {
    return <div className="text-gray-500">Connect your wallet to see balance.</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Wallet Info</h2>
      <p>
        <strong>Address:</strong> {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
      </p>
      <p>
        <strong>Balance:</strong> {balance ? `${balance} BNB` : 'Loading...'}
      </p>
    </div>
  );
}
