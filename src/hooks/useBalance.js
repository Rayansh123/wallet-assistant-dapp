// src/hooks/useBalance.js
import { useBalance } from 'wagmi';
import useWalletStore from '../store/walletStore';
import { useEffect } from 'react';

export function useUserBalance(address) {
  const { data, refetch } = useBalance({ address });
  const setBalance = useWalletStore((state) => state.setBalance);

  useEffect(() => {
    if (data?.formatted) {
      setBalance(data.formatted);
    }
  }, [data, setBalance]);

  return { balance: data?.formatted, refetch };
}
