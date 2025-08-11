// src/hooks/useMultiSend.js
import { useState } from 'react';
import useWalletStore from '../store/walletStore';
import { fetchTokenPrice } from '../services/coingecko';
import { meetsConditions } from '../utils/conditions';

export function useMultiSend() {
  const [status, setStatus] = useState(null);
  const walletAddress = useWalletStore((state) => state.walletAddress);

  // params = { token, amount, recipients: [], condition: { tokenPriceGreaterThan: number } }
  const multiSend = async (params) => {
    setStatus('Checking conditions...');

    if (params.condition) {
      const price = await fetchTokenPrice(params.token);
      if (!meetsConditions(price, params.condition)) {
        setStatus(`Condition not met: ${params.token} price is ${price} USD`);
        return { success: false, message: 'Condition not met' };
      }
    }

    setStatus('Sending transactions...');

    // Placeholder: Implement actual multi-send blockchain txs here
    // For now simulate success
    await new Promise((r) => setTimeout(r, 2000));

    setStatus('Multi-send completed successfully.');
    return { success: true, message: 'Multi-send done' };
  };

  return { status, multiSend };
}
