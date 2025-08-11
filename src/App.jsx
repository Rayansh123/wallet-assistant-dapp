// src/App.jsx
import React from 'react';
import WalletConnect from './components/WalletConnect';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionForm from './components/TransactionForm';
import MultiSendForm from './components/MultiSendForm';
import ChatInterface from './components/ChatInterface';
import VoiceInterface from './components/VoiceInterface';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold mb-4">Wallet Assistant Dapp</h1>

      <WalletConnect />

      <div className="w-full max-w-xl space-y-6">
        <BalanceDisplay />
        <TransactionForm />
        <MultiSendForm />
        <ChatInterface />
        <VoiceInterface />
      </div>
    </div>
  );
}


