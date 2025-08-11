// src/hooks/useWallet.js
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import useWalletStore from '../store/walletStore';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const setWalletAddress = useWalletStore((state) => state.setWalletAddress);

  // Sync connected address with Zustand store
  React.useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [isConnected, address, setWalletAddress]);

  return { address, isConnected, connect, disconnect };
}
