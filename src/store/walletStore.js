import { create } from 'zustand';

const useWalletStore = create((set) => ({
  walletAddress: null,
  balance: null,
  chainId: null,
  chatHistory: [],
  transactionHistory: [],

  setWalletAddress: (address) => set({ walletAddress: address }),
  setBalance: (balance) => set({ balance }),
  setChainId: (id) => set({ chainId: id }),

  addChatMessage: (message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),

  setChatHistory: (history) => set({ chatHistory: history }),

  addTransaction: (tx) =>
    set((state) => ({
      transactionHistory: [...state.transactionHistory, tx],
    })),
}));

export default useWalletStore;
